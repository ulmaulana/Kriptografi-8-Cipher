RSpec.describe UtsCrypto::Container do
  def mutate_package(encrypted)
    parsed = parsed_package(encrypted)
    yield parsed[:metadata], parsed[:payload]
    described_class.serialize(parsed[:metadata], parsed[:payload])
  end

  it "Menyimpan layout biner v1 dan Base64 payload terpisah dari paket" do
    encrypted = encrypt_text("vigenere", "ATTACKATDAWN")
    bytes = decode(encrypted["containerBase64"])
    expect(bytes.byteslice(0, 8)).to eq("UTSKRIPT")
    expect(bytes.getbyte(8)).to eq(1)
    length = bytes.byteslice(9, 4).unpack1("N")
    header = JSON.parse(bytes.byteslice(13, length))
    expect(header).to eq(encrypted["metadata"])
    expect(bytes.byteslice(13 + length..)).to eq("LXFOPVEFRNHR")
    expect(described_class.parse(bytes)[:payload]).to eq(decode(encrypted["payloadBase64"]))
    expect(bytes).not_to eq(encrypted["payloadBase64"])
  end

  it "Kontainer tidak menyimpan kunci, posisi rotor, plainteks, atau file asli" do
    key = default_enigma_key.merge("plugboard" => "AB CD", "ringSettings" => [13, 22, 7])
    encrypted = encrypt_text("enigma-i", "SOMELONGSECRETPLAINTEXT", key)
    metadata = parsed_package(encrypted)[:metadata]
    expect(metadata.keys).to contain_exactly("algorithm", "inputMode", "codec", "payloadEncoding", "payloadLength", "expectedLength", "checksumAlgorithm", "sha256")
    expect(JSON.generate(metadata)).not_to include("rotors", "ringSettings", "initialPositions", "reflector", "plugboard", "SOMELONGSECRETPLAINTEXT")
  end

  it "Membersihkan nama file dari path dan karakter terlarang" do
    expect(described_class.sanitize_filename("../../.secret:?.bin")).to eq("secret__.bin")
    expect(described_class.sanitize_filename("C:\\dir\\laporan.txt")).to eq("laporan.txt")
    expect(described_class.sanitize_filename(".. ")).to eq("hasil-dekripsi.bin")
  end

  it "Menolak header terpotong, magic salah, versi baru, dan alokasi tidak masuk akal" do
    valid = decode(encrypt_text("vigenere", "HELLOWORLD")["containerBase64"])
    [valid.byteslice(0, 7), valid.byteslice(0, 12), "BADMAGIC" + valid.byteslice(8..),
     "UTSKRIPT" + [2, 0].pack("CN"), "UTSKRIPT" + [1, described_class::MAX_METADATA_LENGTH + 1].pack("CN"),
     "UTSKRIPT" + [1, 1000].pack("CN") + "{}"].each do |invalid|
      expect { described_class.parse(invalid) }.to raise_error(UtsCrypto::ContainerError)
    end
  end

  it "Menolak JSON rusak dan metadata UTF-8 invalid" do
    ["{garbage}", "\xff".b].each do |header|
      invalid = "UTSKRIPT".b + [1, header.bytesize].pack("CN") + header
      expect { described_class.parse(invalid) }.to raise_error(UtsCrypto::ContainerError)
    end
  end

  {
    "algorithm" => "aes", "inputMode" => "raw", "codec" => "bytes-v1", "payloadEncoding" => "bytes",
    "payloadLength" => 999, "expectedLength" => -1, "checksumAlgorithm" => "MD5", "sha256" => "a" * 63,
    "playfair" => {}, "hill" => {}, "file" => { "name" => [], "type" => "" }, "sourceFileName" => 12
  }.each do |field, value|
    it "Menolak metadata #{field} yang tidak valid" do
      encrypted = encrypt_text("vigenere", "HELLOWORLD")
      bytes = mutate_package(encrypted) { |metadata, _| metadata[field] = value }
      expect { described_class.parse(bytes) }.to raise_error(UtsCrypto::ContainerError)
    end
  end

  it "Memastikan padding Hill dan panjang hasil konsisten" do
    encrypted = encrypt_text("hill", "ACTX")
    [{ "n" => 1, "padCount" => 0 }, { "n" => 3, "padCount" => 3 }, { "n" => 2, "padCount" => 0 }].each do |hill|
      bytes = mutate_package(encrypted) { |metadata, _| metadata["hill"] = hill }
      expect { described_class.parse(bytes) }.to raise_error(UtsCrypto::ContainerError)
    end
  end

  it "Memastikan bitset Playfair panjang, jumlah, dan bit sisanya konsisten" do
    encrypted = encrypt_text("playfair", "JIG")
    [{ "filler" => "" }, { "fillerCount" => 0 }, { "filler" => "/w==" },
     { "jCount" => 0 }, { "j" => "gA==" }, { "markers" => "positions-v0" }].each do |change|
      bytes = mutate_package(encrypted) { |metadata, _| metadata["playfair"].merge!(change) }
      expect { described_class.parse(bytes) }.to raise_error(UtsCrypto::ContainerError)
    end
  end

  it "Marker pengisi Playfair skala bitset, bukan array setiap huruf" do
    encrypted = encrypt_text("playfair", "X" * 8000)
    metadata = encrypted["metadata"]
    expect(metadata["playfair"]["fillerCount"]).to eq(8000)
    expect(decode(metadata["playfair"]["filler"]).bytesize).to eq(2000)
    expect(JSON.generate(metadata).bytesize).to be < 5000
  end
end
