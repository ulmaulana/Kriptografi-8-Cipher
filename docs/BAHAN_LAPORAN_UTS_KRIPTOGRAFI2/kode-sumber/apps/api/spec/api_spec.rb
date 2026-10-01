RSpec.describe UtsCrypto::App do
  include Rack::Test::Methods

  def app
    described_class
  end

  def post_json(path, body)
    post path, JSON.generate(body), { "CONTENT_TYPE" => "application/json" }
  end

  def response
    JSON.parse(last_response.body)
  end

  def multipart(path, metadata, bytes, name: "file.bin", type: "application/octet-stream")
    Tempfile.create(["uts-crypto-spec", ".bin"]) do |file|
      file.binmode
      file.write(bytes)
      file.flush
      upload = Rack::Test::UploadedFile.new(file.path, type, true, original_filename: name)
      post path, { "metadata" => JSON.generate(metadata), "file" => upload }
    end
  end

  it "Health menyatakan mesin Ruby nyata dan delapan cipher" do
    get "/health"
    expect(last_response.status).to eq(200)
    expect(response).to include("engine" => "ruby", "rubyVersion" => RUBY_VERSION)
    expect(response["algorithms"]).to eq(UtsCrypto::Keys::CIPHER_IDS)
    expect(last_response.headers["cache-control"]).to include("no-store")
  end

  {
    "vigenere" => ["ATTACKATDAWN", "LXFOPVEFRNHR"],
    "autokey" => ["ATTACKATDAWN", "QNXEPVYTWTWP"],
    "playfair" => ["HIDETHEGOLDINTHETREESTUMP", "BMODZBXDNABEKUDMUIXMMOUVIF"],
    "affine" => ["AFFINECIPHER", "IHHWVCSWFRCP"],
    "hill" => ["ACT", "POH"], "enigma-i" => ["HELLOWORLD", "ILBDAAMTAZ"]
  }.each do |cipher, (plain, expected)|
    it "#{cipher} API JSON menggunakan keluaran acuan Ruby dan memulihkannya" do
      post_json("/api/crypto/encrypt", "cipher" => cipher, "key" => test_key(cipher), "input" => { "kind" => "text", "text" => plain })
      expect(last_response.status).to eq(200)
      result = response
      expect(decode(result["payloadBase64"])).to eq(expected)
      post_json("/api/crypto/decrypt", "kind" => "package", "containerBase64" => result["containerBase64"], "key" => test_key(cipher))
      expect(last_response.status).to eq(200)
      expect(decode(response["bytesBase64"])).to eq(plain)
      expect(response["verified"]).to be(true)
    end
  end

  it "Enigma TV-08 melalui API menghasilkan BDZGO dan reset permintaan" do
    2.times do
      post_json("/api/crypto/encrypt", "cipher" => "enigma-i", "key" => default_enigma_key, "input" => { "kind" => "text", "text" => "A A! 3A AA" })
      expect(last_response.status).to eq(200)
      expect(decode(response["payloadBase64"])).to eq("BDZGO")
    end
  end

  UtsCrypto::Keys::CIPHER_IDS.each do |cipher|
    it "#{cipher} menerima seluruh byte multipart dan memulihkan nama file pada sesi baru" do
      plain = (0..255).to_a.pack("C*")
      request = {
        "cipher" => cipher, "key" => test_key(cipher),
        "input" => { "kind" => "file", "readAs" => "bytes", "name" => "arsip.data.bin", "type" => "application/octet-stream" }
      }
      multipart("/api/crypto/encrypt", request, plain)
      expect(last_response.status).to eq(200)
      encrypted = response
      expect(decode(encrypted["plainBase64"])).to eq(plain)
      container = decode(encrypted["containerBase64"])
      multipart("/api/crypto/inspect", {}, container)
      expect(last_response.status).to eq(200)
      expect(response).to include("algorithm" => cipher, "fileName" => "arsip.data.bin", "expectedLength" => 256)
      multipart("/api/crypto/decrypt", { "kind" => "package", "key" => test_key(cipher) }, container)
      expect(last_response.status).to eq(200)
      expect(response).to include("fileName" => "arsip.data.bin", "verified" => true)
      expect(decode(response["bytesBase64"])).to eq(plain)
    end
  end

  it "API menerima file nol byte multipart" do
    metadata = { "cipher" => "enigma-i", "key" => default_enigma_key, "input" => { "kind" => "file", "readAs" => "bytes", "name" => "empty.bin", "type" => "application/octet-stream" } }
    multipart("/api/crypto/encrypt", metadata, "".b)
    expect(last_response.status).to eq(200)
    expect(response["metadata"]["expectedLength"]).to eq(0)
    container = decode(response["containerBase64"])
    multipart("/api/crypto/decrypt", { "key" => default_enigma_key }, container)
    expect(last_response.status).to eq(200)
    expect(response["bytesBase64"]).to eq("")
    expect(response["verified"]).to be(true)
  end

  it "Membersihkan seluruh tempfile multipart, termasuk bagian tambahan dan request gagal" do
    created = []
    paths = []
    factory = lambda do |_filename, _content_type|
      file = Tempfile.new("uts-multipart-cleanup")
      paths << file.path
      created << file
      file
    end
    Tempfile.create(["uts-cleanup-source", ".bin"]) do |source|
      source.write("binary contents")
      source.flush
      file = Rack::Test::UploadedFile.new(source.path, "application/octet-stream", true)
      invalid = { "cipher" => "enigma-i", "key" => {}, "input" => { "kind" => "file", "readAs" => "bytes", "name" => "test.bin", "type" => "application/octet-stream" } }
      post "/api/crypto/encrypt", { "metadata" => JSON.generate(invalid), "file" => file, "extra" => file }, { "rack.multipart.tempfile_factory" => factory }
      expect(last_response.status).to eq(422)
    end
    expect(created.length).to eq(2)
    expect(created).to all(be_closed)
    expect(paths.none? { |path| File.exist?(path) }).to be(true)
  end

  it "Byte cipher TV-03 dan TV-07 melalui file API" do
    [
      ["extended-vigenere", [0, 65, 255], [1, 67, 0]],
      ["super", [0, 1, 2, 3, 254, 255, 128], [3, 1, 5, 1, 255, 3, 129]]
    ].each do |cipher, plain, expected|
      metadata = { "cipher" => cipher, "key" => test_key(cipher), "input" => { "kind" => "file", "readAs" => "bytes", "name" => "vector.bin", "type" => "application/octet-stream" } }
      multipart("/api/crypto/encrypt", metadata, plain.pack("C*"))
      expect(last_response.status).to eq(200)
      expect(decode(response["payloadBase64"]).bytes).to eq(expected)
    end
  end

  it "API raw dan payload-base64 Enigma memakai konfigurasi awal" do
    [
      { "kind" => "raw-letters", "cipher" => "enigma-i", "text" => "ILBDAAMTAZ", "key" => default_enigma_key },
      { "kind" => "payload-base64", "cipher" => "enigma-i", "base64" => "SUxCREFBTVRBWg==", "key" => default_enigma_key }
    ].each do |body|
      post_json("/api/crypto/decrypt", body)
      expect(last_response.status).to eq(200)
      expect(decode(response["bytesBase64"])).to eq("HELLOWORLD")
      expect(response["verified"]).to be(false)
    end
  end

  it "API memberikan fieldErrors untuk rotor duplikat tanpa hasil palsu" do
    post_json("/api/crypto/encrypt", "cipher" => "enigma-i", "key" => default_enigma_key.merge("rotors" => %w[I I III]), "input" => { "kind" => "text", "text" => "HELLO" })
    expect(last_response.status).to eq(422)
    expect(response["fieldErrors"]).to have_key("rotors")
    expect(response).not_to have_key("payloadBase64")
  end

  it "Checksum salah melalui API gagal sebagai kesalahan kunci atau paket" do
    encrypted = encrypt_text("enigma-i", "HELLOWORLD")
    post_json("/api/crypto/decrypt", "kind" => "package", "containerBase64" => encrypted["containerBase64"], "key" => default_enigma_key.merge("ringSettings" => [2, 2, 2]))
    expect(last_response.status).to eq(422)
    expect(response["message"]).to include("Checksum", "kunci salah atau data paket rusak")
    expect(response).not_to have_key("verified")
  end

  it "API memvalidasi Base64 dan paket sebelum memproses" do
    post_json("/api/crypto/inspect", "containerBase64" => "AB==")
    expect(last_response.status).to eq(422)
    post_json("/api/crypto/decrypt", "kind" => "package", "containerBase64" => "QUFBQQ==", "key" => default_enigma_key)
    expect(last_response.status).to eq(422)
    expect(response["field"]).to eq("package")
  end

  it "API menolak JSON file karena file harus multipart biner" do
    post_json("/api/crypto/encrypt", "cipher" => "vigenere", "key" => test_key("vigenere"), "input" => { "kind" => "file", "bytesBase64" => "AA==" })
    expect(last_response.status).to eq(422)
    expect(response["message"]).to include("multipart")
  end

  it "API menolak tipe nested yang tidak sesuai kontrak dan JSON rusak" do
    [[], { "cipher" => "vigenere", "key" => nil, "input" => [] },
     { "cipher" => "vigenere", "key" => test_key("vigenere"), "input" => [] }].each do |body|
      post_json("/api/crypto/encrypt", body)
      expect(last_response.status).to eq(422)
    end
    post "/api/crypto/encrypt", "{broken", { "CONTENT_TYPE" => "application/json" }
    expect(last_response.status).to eq(422)
  end

  it "API menolak request terlalu besar sebelum membaca body" do
    post "/api/crypto/encrypt", "{}", { "CONTENT_TYPE" => "application/json", "CONTENT_LENGTH" => (described_class::MAX_REQUEST_BYTES + 1).to_s }
    expect(last_response.status).to eq(413)
  end
end
