RSpec.describe UtsCrypto::Enigma do
  def machine(key = default_enigma_key)
    parsed, = UtsCrypto::Keys.parse("enigma-i", key)
    described_class.new(parsed[:enigma])
  end

  it "Double stepping ADU menghasilkan ADV, AEW, BFX sebelum sinyal" do
    key = default_enigma_key.merge("initialPositions" => %w[A D U])
    engine = machine(key)
    expect(engine.step).to eq("ADV")
    expect(engine.step).to eq("AEW")
    expect(engine.step).to eq("BFX")
  end

  it "Ring setting tidak menggeser turnover terhadap huruf jendela" do
    engine = machine(default_enigma_key.merge("initialPositions" => %w[A D U], "ringSettings" => [4, 18, 26]))
    expect([engine.step, engine.step, engine.step]).to eq(%w[ADV AEW BFX])
  end

  reference = JSON.parse(File.read(File.join(__dir__, "support", "enigma_reference.json"), encoding: "bom|utf-8"))
  reference["cases"].each_with_index do |vector, index|
    it "Cocok dengan Py-Enigma 1.0.2 vektor independen non-default #{index + 1}" do
      engine = machine(vector["key"])
      expect(engine.transform(vector["plain"])).to eq(vector["cipher"])
      expect(engine.positions).to eq(vector["finalPositions"])
      expect(machine(vector["key"]).transform(vector["cipher"])).to eq(vector["plain"])
    end
  end

  it "Mesin tetap berjalan saat file diproses dalam blok dan mempertahankan state" do
    letters = UtsCrypto::Codecs.alpha25_encode((0..255).to_a.pack("C*") * 4)
    whole = machine.transform(letters)
    engine = machine
    segmented = (0...letters.length).step(37).map { |i| engine.transform(letters.byteslice(i, 37)) }.join
    expect(segmented).to eq(whole)
    expect(UtsCrypto::Codecs.alpha25_decode(machine.transform(whole))).to eq((0..255).to_a.pack("C*") * 4)
  end

  it "Angka dan tanda baca tidak menggerakkan rotor dan I/J tidak digabung" do
    a = encrypt_text("enigma-i", "H E L L O 12! WORLD")
    b = encrypt_text("enigma-i", "HELLOWORLD")
    expect(a["payloadBase64"]).to eq(b["payloadBase64"])
    original = "IJJIJ"
    result = decrypt_package(encrypt_text("enigma-i", original), default_enigma_key)
    expect(decode(result["bytesBase64"])).to eq(original)
  end

  it "Permintaan identik dan paralel selalu reset tanpa mengubah konfigurasi awal" do
    key = default_enigma_key.merge("plugboard" => "AB CD EF GH IJ KL MN OP QR ST UV WX YZ")
    original = Marshal.load(Marshal.dump(key))
    expected = encrypt_text("enigma-i", "HELLOWORLD", key)["payloadBase64"]
    outputs = 12.times.map do |i|
      Thread.new do
        encrypt_text("enigma-i", "OTHERREQUEST", key.merge("initialPositions" => ["Z", "Z", (65 + i).chr]))
        encrypt_text("enigma-i", "HELLOWORLD", key)["payloadBase64"]
      end
    end.map(&:value)
    expect(outputs).to all(eq(expected))
    expect(key).to eq(original)
    expect(decode(decrypt_package(encrypt_text("enigma-i", "HELLOWORLD", key), key)["bytesBase64"])).to eq("HELLOWORLD")
  end
end
