RSpec.describe UtsCrypto::Codecs do
  it "Codec alpha25 mencakup semua byte dan tidak mengandung J" do
    bytes = (0..255).to_a.pack("C*")
    encoded = described_class.alpha25_encode(bytes)
    expect(encoded.bytesize).to eq(512)
    expect(encoded).not_to include("J")
    expect(encoded.byteslice(0, 2)).to eq("AA")
    expect(encoded.byteslice(-2, 2)).to eq("LF")
    expect(described_class.alpha25_decode(encoded)).to eq(bytes)
  end

  ["A", "AJ", "ZA", "LZ", "AA!A"].each do |invalid|
    it "Codec menolak #{invalid.inspect}" do
      expect { described_class.alpha25_decode(invalid) }.to raise_error(UtsCrypto::InputError)
    end
  end

  it "Codec menerima file nol byte" do
    expect(described_class.alpha25_encode("".b)).to eq("")
    expect(described_class.alpha25_decode("".b)).to eq("")
  end

  it "Base64 seluruh byte mempertahankan kapitalisasi dan whitespace copy diterima" do
    bytes = (0..255).to_a.pack("C*")
    encoded = described_class.base64(bytes)
    expect(described_class.unbase64(encoded)).to eq(bytes)
    expect(described_class.base64([0, 65, 255].pack("C*"))).to eq("AEH/")
    expect(described_class.unbase64(" A E\r\nH/\t").bytes).to eq([0, 65, 255])
    expect(described_class.unbase64("YWJj")).to eq("abc")
    expect(described_class.unbase64("" )).to eq("")
  end

  ["a", "AA===", "=AAA", "AA=A", "A===", "AA$=", "AB==", "AAB=", "YWJj-", "éAAA"].each do |invalid|
    it "Base64 menolak #{invalid.inspect}, termasuk bit sisa nonzero" do
      expect { described_class.unbase64(invalid) }.to raise_error(UtsCrypto::InputError)
    end
  end

  it "Bitset LSB-first memakai representasi ringkas dan dapat menghitung marker" do
    bits = described_class.bitset(10)
    [0, 7, 9].each { |i| described_class.set_bit(bits, i) }
    expect(bits.bytes).to eq([129, 2])
    expect(described_class.count_bits(bits)).to eq(3)
    expect(described_class.get_bit(bits, 9)).to be(true)
    expect(described_class.get_bit(bits, 8)).to be(false)
  end
end
