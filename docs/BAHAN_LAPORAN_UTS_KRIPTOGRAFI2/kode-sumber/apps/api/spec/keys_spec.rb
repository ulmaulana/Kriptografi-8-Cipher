RSpec.describe UtsCrypto::Keys do
  {
    "vigenere" => [{ "keyword" => "" }, "keyword"],
    "autokey" => [{ "keyword" => "123é" }, "keyword"],
    "playfair" => [{ "keyword" => "!?" }, "keyword"],
    "extended-vigenere" => [{ "byteKey" => "A", "byteKeyFormat" => "hex" }, "byteKey"],
    "affine" => [{ "affineA" => "2", "affineB" => "8" }, "affineA"],
    "hill" => [{ "hillMatrix" => "1 2;2 4" }, "hillMatrix"],
    "super" => [{ "byteKey" => "key", "byteKeyFormat" => "text", "columnKey" => "123" }, "columnKey"]
  }.each do |cipher, (key, field)|
    it "Menolak kunci #{cipher} yang tidak valid dengan field #{field}" do
      expect { described_class.parse(cipher, key) }.to raise_error(UtsCrypto::KeyError) { |error| expect(error.field).to eq(field) }
    end
  end

  [
    [{ "rotors" => %w[I I III] }, "rotors"],
    [{ "rotors" => %w[I II VI] }, "rotors"],
    [{ "rotors" => %w[I II] }, "rotors"],
    [{ "ringSettings" => [0, 1, 1] }, "ringSettings"],
    [{ "ringSettings" => [1, 27, 1] }, "ringSettings"],
    [{ "ringSettings" => [1.0, 1, 1] }, "ringSettings"],
    [{ "ringSettings" => ["01", 1, 1] }, "ringSettings"],
    [{ "initialPositions" => %w[A B 1] }, "initialPositions"],
    [{ "initialPositions" => "AAA" }, "initialPositions"],
    [{ "initialPositions" => %w[a A A] }, "initialPositions"],
    [{ "reflector" => "A" }, "reflector"],
    [{ "plugboard" => "AA" }, "plugboard"],
    [{ "plugboard" => "AB AC" }, "plugboard"],
    [{ "plugboard" => "AB BA" }, "plugboard"],
    [{ "plugboard" => "A1" }, "plugboard"],
    [{ "plugboard" => "ABC" }, "plugboard"],
    [{ "plugboard" => "Aß" }, "plugboard"],
    [{ "plugboard" => ["AB"] }, "plugboard"],
    [{ "plugboard" => (["AB"] * 14).join(" ") }, "plugboard"]
  ].each do |changes, field|
    it "Enigma menolak #{changes.inspect}" do
      expect { described_class.parse("enigma-i", default_enigma_key.merge(changes)) }.to raise_error(UtsCrypto::KeyError) do |error|
        expect(error.field_errors).to have_key(field)
      end
    end
  end

  it "Mengumpulkan seluruh kesalahan konfigurasi Enigma" do
    expect { described_class.parse("enigma-i", {}) }.to raise_error(UtsCrypto::KeyError) do |error|
      expect(error.field_errors.keys).to contain_exactly("rotors", "ringSettings", "initialPositions", "reflector", "plugboard")
    end
  end

  it "Menerima 0-13 pasangan dan menormalisasi lowercase plugboard" do
    ["", "ab cd", "AB CD EF GH IJ KL MN OP QR ST UV WX YZ"].each do |board|
      key, = described_class.parse("enigma-i", default_enigma_key.merge("plugboard" => board))
      expect(key[:enigma][:pair_count]).to eq(board.split.length)
      expect(key[:enigma][:rings]).to eq([0, 0, 0])
    end
  end

  it "Affine negatif dan besar direduksi dengan modulo nonnegatif" do
    key, = described_class.parse("affine", { "affineA" => "-21", "affineB" => "34" })
    expect([key[:a], key[:b]]).to eq([5, 8])
    expect(decode(encrypt_text("affine", "AFFINECIPHER", { "affineA" => "-21", "affineB" => "34" })["payloadBase64"])).to eq("IHHWVCSWFRCP")
  end

  it "Menerima grid dan matriks bracket, menolak singular dan n di luar 2-10" do
    ["2 1;13 7", "[[2,1],[13,7]]", "2,1\n13,7"].each do |matrix|
      key, = described_class.parse("hill", { "hillMatrix" => matrix })
      expect(key[:matrix]).to eq([[2, 1], [13, 7]])
    end
    ["2 0;0 1", "1", "1 2;3 4 5", "1e2 0;0 1", Array.new(11, Array.new(11, "1").join(" ")).join(";")].each do |matrix|
      expect { described_class.parse("hill", { "hillMatrix" => matrix }) }.to raise_error(UtsCrypto::KeyError)
    end
  end

  it "Kunci hex mengikuti kompatibilitas format lama dan menolak invalid format" do
    key, = described_class.parse("extended-vigenere", { "byteKey" => "0x00: FF, 01", "byteKeyFormat" => "hex" })
    expect(key[:bytes].bytes).to eq([0, 255, 1])
    ["", "A", "FG"].each do |hex|
      expect { described_class.parse("extended-vigenere", { "byteKey" => hex, "byteKeyFormat" => "hex" }) }.to raise_error(UtsCrypto::KeyError)
    end
    expect { described_class.parse("extended-vigenere", { "byteKey" => "abc", "byteKeyFormat" => "bogus" }) }.to raise_error(UtsCrypto::KeyError)
  end
end
