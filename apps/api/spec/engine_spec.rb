RSpec.describe UtsCrypto::Engine do
  UtsCrypto::Keys::CIPHER_IDS.each do |cipher|
    ["".b, "\xff".b, (0..255).to_a.pack("C*")].each do |bytes|
      it "#{cipher}: file #{bytes.bytesize} byte (termasuk kosong/bukan UTF-8) pulih seluruhnya" do
        encrypted = encrypt_file(cipher, bytes, name: "foto.data.png", type: "image/png")
        recovered = decrypt_package(encrypted, test_key(cipher))
        expect(decode(recovered["bytesBase64"])).to eq(bytes)
        expect(recovered["fileName"]).to eq("foto.data.png")
        expect(recovered["fileType"]).to eq("image/png")
        expect(recovered["representation"]).to eq("binary")
        expect(recovered["verified"]).to be(true)
        expect(recovered["sha256"]).to eq(Digest::SHA256.hexdigest(bytes))
      end
    end
  end

  it "Mode file utuh default memproses seluruh header, mode alpha-text disengaja menormalisasi" do
    bytes = "Serang pukul 10.30! é\n".b
    whole = encrypt_file("enigma-i", bytes, name: "pesan.txt", type: "text/plain")
    expect(whole["inputMode"]).to eq("file")
    expect(decode(decrypt_package(whole, default_enigma_key)["bytesBase64"])).to eq(bytes)
    text = encrypt_file("enigma-i", bytes, name: "pesan.txt", type: "text/plain", read_as: "alpha-text")
    expect(text["inputMode"]).to eq("text")
    expect(text["metadata"]["sourceFileName"]).to eq("pesan.txt")
    expect(decode(decrypt_package(text, default_enigma_key)["bytesBase64"])).to eq("SERANGPUKUL")
  end

  it "Base64 alfabet didekode dulu; filter tidak membuang simbol Base64" do
    request = { "kind" => "payload-base64", "cipher" => "vigenere", "base64" => "TFhGT1BWRUZSTkhS", "key" => test_key("vigenere") }
    result = described_class.decrypt(request)
    expect(decode(result["bytesBase64"])).to eq("ATTACKATDAWN")
    expect(result["verified"]).to be(false)
  end

  it "Inspector memulihkan algoritma, mode, dan nama dari paket tanpa state lama" do
    encrypted = encrypt_file("enigma-i", "\x89PNG\r\n\x1a\n\xff".b, name: "gambar.png", type: "image/png")
    summary = described_class.inspect("containerBase64" => encrypted["containerBase64"])
    expect(summary).to include("algorithm" => "enigma-i", "inputMode" => "file", "codec" => "alpha25-v1", "fileName" => "gambar.png")
  end

  it "Kunci salah dan payload rusak gagal checksum tanpa klaim berhasil" do
    encrypted = encrypt_text("enigma-i", "HELLOWORLD")
    wrong_key = default_enigma_key.merge("initialPositions" => %w[A A B])
    expect { decrypt_package(encrypted, wrong_key) }.to raise_error(UtsCrypto::InputError, /Checksum/)
    parsed = parsed_package(encrypted)
    parsed[:payload].setbyte(0, 65)
    corrupt = { "containerBase64" => UtsCrypto::Codecs.base64(UtsCrypto::Container.serialize(parsed[:metadata], parsed[:payload])) }
    expect { decrypt_package(corrupt, default_enigma_key) }.to raise_error(UtsCrypto::InputError, /Checksum/)
  end

  it "Menolak payload package alfabet nonhuruf sebelum cipher" do
    encrypted = encrypt_text("enigma-i", "HELLOWORLD")
    parsed = parsed_package(encrypted)
    parsed[:payload].setbyte(0, 0)
    corrupt = { "containerBase64" => UtsCrypto::Codecs.base64(UtsCrypto::Container.serialize(parsed[:metadata], parsed[:payload])) }
    expect { decrypt_package(corrupt, default_enigma_key) }.to raise_error(UtsCrypto::ContainerError, /selain A-Z/)
  end

  it "Matriks Hill berbeda ukuran ditolak sesuai metadata" do
    encrypted = encrypt_text("hill", "ACT")
    expect { decrypt_package(encrypted, { "hillMatrix" => "2 1;13 7" }) }.to raise_error(UtsCrypto::InputError) { |error| expect(error.field).to eq("hillMatrix") }
  end

  it "Menolak pesan kosong/tanpa huruf serta jenis request tidak dikenal" do
    ["", "123?!", "éßﬀ"].each do |text|
      expect { encrypt_text("enigma-i", text) }.to raise_error(UtsCrypto::InputError)
    end
    expect { encrypt_text("extended-vigenere", "") }.to raise_error(UtsCrypto::InputError)
    expect { described_class.encrypt("cipher" => "aes", "input" => {}) }.to raise_error(UtsCrypto::InputError)
    expect { described_class.decrypt("kind" => "guess") }.to raise_error(UtsCrypto::InputError)
    expect { described_class.encrypt([]) }.to raise_error(UtsCrypto::InputError)
  end

  it "Batas input 50 MiB ditolak sebelum cipher tanpa memotong file" do
    oversized = "\0".b * (described_class::MAX_FILE_BYTES + 1)
    expect { encrypt_file("enigma-i", oversized) }.to raise_error(UtsCrypto::InputError, /50 MiB/)
  end

  it "Jalur mentah Playfair dan Hill menolak panjang yang salah" do
    %w[playfair hill].each do |cipher|
      expect { described_class.decrypt("kind" => "raw-letters", "cipher" => cipher, "text" => "A", "key" => test_key(cipher)) }.to raise_error(UtsCrypto::InputError)
    end
    expect { described_class.decrypt("kind" => "raw-letters", "cipher" => "playfair", "text" => "AA", "key" => test_key("playfair")) }.to raise_error(UtsCrypto::InputError)
  end
end
