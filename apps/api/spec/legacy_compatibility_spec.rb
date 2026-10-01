RSpec.describe "Kompatibilitas paket TypeScript UTSKRIPT v1 sebelum migrasi" do
  fixture_path = File.expand_path("../../../tests/migration/legacy-typescript-v1.json", __dir__)
  fixtures = JSON.parse(File.read(fixture_path, encoding: "bom|utf-8"))["cases"]

  fixtures.each do |item|
    it "Ruby membaca paket legacy #{item['cipher']} #{item['mode']}" do
      result = UtsCrypto::Engine.decrypt("kind" => "package", "containerBase64" => item["packageBase64"], "key" => item["key"])
      expect(result["bytesBase64"]).to eq(item["plainBase64"])
      expect(result["sha256"]).to eq(item["sha256"])
      expect(result["verified"]).to be(true)
    end

    it "Ruby mempertahankan keluaran byte/paket legacy #{item['cipher']} #{item['mode']}" do
      input = if item["mode"] == "text"
                { "kind" => "text", "text" => item["input"]["text"] }
              else
                { "kind" => "file", "bytes" => decode(item["input"]["bytesBase64"]), "readAs" => "bytes",
                  "name" => item["input"]["name"], "type" => item["input"]["type"] }
              end
      result = UtsCrypto::Engine.encrypt("cipher" => item["cipher"], "key" => item["key"], "input" => input)
      expect(result["payloadBase64"]).to eq(item["payloadBase64"])
      expect(result["plainBase64"]).to eq(item["plainBase64"])
      expect(result["metadata"]).to eq(item["metadata"])
      expect(result["containerBase64"]).to eq(item["packageBase64"])
    end
  end
end
