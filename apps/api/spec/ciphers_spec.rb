RSpec.describe "Vektor cipher Ruby" do
  [
    ["vigenere", "ATTACKATDAWN", "LXFOPVEFRNHR"],
    ["autokey", "ATTACKATDAWN", "QNXEPVYTWTWP"],
    ["playfair", "HIDETHEGOLDINTHETREESTUMP", "BMODZBXDNABEKUDMUIXMMOUVIF"],
    ["affine", "AFFINECIPHER", "IHHWVCSWFRCP"],
    ["hill", "ACT", "POH"],
    ["enigma-i", "AAAAA", "BDZGO"],
    ["enigma-i", "HELLOWORLD", "ILBDAAMTAZ"]
  ].each do |cipher, plain, expected|
    it "#{cipher}: #{plain} menjadi #{expected} dan pulih melalui paket" do
      encrypted = encrypt_text(cipher, plain)
      expect(decode(encrypted["payloadBase64"])).to eq(expected)
      result = decrypt_package(encrypted, test_key(cipher))
      expect(decode(result["bytesBase64"])).to eq(plain)
      expect(result["verified"]).to be(true)
    end
  end

  it "Extended Vigenere menambah byte modulo 256 (TV-03)" do
    plain = [0, 65, 255].pack("C*")
    key = [1, 2].pack("C*")
    expect(UtsCrypto::Classical.extended(plain, key).bytes).to eq([1, 67, 0])
    expect(UtsCrypto::Classical.extended([1, 67, 0].pack("C*"), key, decrypt: true)).to eq(plain)
  end

  it "Super menjalankan Extended lalu transposisi stable tanpa padding (TV-07)" do
    plain = [0, 1, 2, 3, 254, 255, 128].pack("C*")
    key = [1, 2].pack("C*")
    intermediate = UtsCrypto::Classical.extended(plain, key)
    expect(intermediate.bytes).to eq([1, 3, 3, 5, 255, 1, 129])
    expect(UtsCrypto::Classical.column_order("BABA")).to eq([1, 3, 0, 2])
    output = UtsCrypto::Classical.super_cipher(plain, key, "BABA")
    expect(output.bytes).to eq([3, 1, 5, 1, 255, 3, 129])
    expect(UtsCrypto::Classical.super_cipher(output, key, "BABA", decrypt: true)).to eq(plain)
  end

  it "Playfair mentah mempertahankan pengisi dan I yang berasal dari J" do
    result = UtsCrypto::Engine.decrypt(
      "kind" => "raw-letters", "cipher" => "playfair", "text" => "BMODZBXDNABEKUDMUIXMMOUVIF", "key" => test_key("playfair")
    )
    expect(decode(result["bytesBase64"])).to eq("HIDETHEGOLDINTHETREXESTUMP")
    expect(result["verified"]).to be(false)
  end

  %w[BALLOON JIG XX XQX X Q AXQX].each do |plain|
    it "Playfair memulihkan #{plain} tepat melalui marker I/J dan pengisi" do
      encrypted = encrypt_text("playfair", plain)
      result = decrypt_package(encrypted, test_key("playfair"))
      expect(decode(result["bytesBase64"])).to eq(plain)
    end
  end

  it "Hill menangani matriks invertibel tanpa pivot invertibel modulo 26" do
    key = { "hillMatrix" => "2 1;13 7" }
    parsed, = UtsCrypto::Keys.parse("hill", key)
    expect(parsed[:determinant]).to eq(1)
    expect(parsed[:inverse]).to eq([[7, 25], [13, 2]])
    result = decrypt_package(encrypt_text("hill", "ACTX", key), key)
    expect(decode(result["bytesBase64"])).to eq("ACTX")
  end

  %w[ACT ACTX ACTXXX].each do |plain|
    it "Hill mempertahankan X asli dalam #{plain} dan membuang tepat padding tercatat" do
      encrypted = encrypt_text("hill", plain)
      result = decrypt_package(encrypted, test_key("hill"))
      expect(decode(result["bytesBase64"])).to eq(plain)
      raw = UtsCrypto::Engine.decrypt(
        "kind" => "payload-base64", "cipher" => "hill", "base64" => encrypted["payloadBase64"], "key" => test_key("hill")
      )
      expect(decode(raw["bytesBase64"])).to eq(plain + "X" * ((3 - plain.length % 3) % 3))
    end
  end

  it "Normalisasi menyaring ASCII sebelum uppercase Unicode" do
    expect(UtsCrypto::Codecs.normalize("Serang pukul 10.30! é ß ı ﬀ" )).to eq("SERANGPUKUL")
  end

  %w[A ABCDEFGH ABCDEFGHIJKLMNOPQRSTUVWXYZ].each do |keyword|
    %w[vigenere autokey playfair].each do |cipher|
      it "#{cipher} menerima kunci #{keyword.length} huruf, termasuk lebih panjang dari pesan" do
        key = { "keyword" => keyword }
        plain = "LONGPLAINTEXTFORAUTOKEY"
        expect(decode(decrypt_package(encrypt_text(cipher, plain, key), key)["bytesBase64"])).to eq(plain)
      end
    end
  end

  ["BABA", "Z", "KEYLONGERTHANINPUT", "BANANA"].each do |column_key|
    it "Transposisi #{column_key} membalik data pendek dan baris tidak penuh" do
      ["", "\0".b, (0..10).to_a.pack("C*")].each do |bytes|
        cipher = UtsCrypto::Classical.transpose(bytes, column_key)
        expect(UtsCrypto::Classical.transpose(cipher, column_key, decrypt: true)).to eq(bytes)
        expect(cipher.bytesize).to eq(bytes.bytesize)
      end
    end
  end

  it "Extended menerima byte 0-255 dan teks UTF-8 multibyte" do
    all_bytes = (0..255).to_a.pack("C*")
    key = [0, 255, 1].pack("C*")
    cipher = UtsCrypto::Classical.extended(all_bytes, key)
    expect(UtsCrypto::Classical.extended(cipher, key, decrypt: true)).to eq(all_bytes)
    plain = "Ruby, kriptografi — é✓🎉\n"
    encrypted = encrypt_text("extended-vigenere", plain)
    expect(decode(decrypt_package(encrypted, test_key("extended-vigenere"))["bytesBase64"])).to eq(plain.b)
  end
end
