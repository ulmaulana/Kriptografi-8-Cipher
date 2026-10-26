require "sinatra/base"
require "rack/tempfile_reaper"
require "json"
require_relative "lib/uts_crypto/engine"

module UtsCrypto
  class App < Sinatra::Base
    # Maximum file 50 MiB; Playfair/codec packages may expand up to fourfold.
    MAX_REQUEST_BYTES = 400 * 1024 * 1024
    use Rack::TempfileReaper

    set :show_exceptions, false
    set :raise_errors, false
    set :logging, false # Request bodies and keys are never logged.
    set :dump_errors, false
    # Comma-separated override for deployments behind a private proxy; "*" permits any host.
    PERMITTED_HOSTS = ENV.fetch("API_PERMITTED_HOSTS", "localhost,127.0.0.1,::1,example.org").split(",").map(&:strip).reject(&:empty?)
    set :host_authorization, { permitted_hosts: PERMITTED_HOSTS.include?("*") ? [] : PERMITTED_HOSTS }

    before do
      content_type :json
      cache_control :no_store
      headers "X-Content-Type-Options" => "nosniff"
      if request.content_length.to_i > MAX_REQUEST_BYTES
        halt 413, JSON.generate(message: "Ukuran request melebihi batas 400 MiB.", field: "file")
      end
    end

    helpers do
      def parse_json(text)
        value = JSON.parse(text, max_nesting: 100)
        raise InputError.new("Body request harus berupa objek JSON.", "request") unless value.is_a?(Hash)
        value
      rescue JSON::ParserError
        raise InputError.new("Request bukan JSON yang valid.", "request")
      end

      def crypto_request(operation)
        if request.media_type == "multipart/form-data"
          metadata = params["metadata"]
          value = metadata.is_a?(String) ? parse_json(metadata) : {}
          upload = params["file"]
          unless upload.is_a?(Hash) && upload[:tempfile].respond_to?(:read)
            raise InputError.new("Unggah bagian biner file pada request multipart.", "file")
          end
          tempfile = upload[:tempfile]
          bound = operation == :encrypt ? Engine::MAX_FILE_BYTES : Container::MAX_PAYLOAD_LENGTH + Container::MAX_METADATA_LENGTH + Container::FIXED_HEADER_LENGTH
          tempfile.rewind
          bytes = (tempfile.read(bound + 1) || "").b
          if bytes.bytesize > bound
            raise InputError.new("Ukuran file melebihi batas implementasi #{bound} byte.", "file")
          end
          if operation == :encrypt
            input = Engine.object!(value["input"], "input")
            raise InputError.new("Request multipart enkripsi harus memakai input.kind=file.", "input") unless input["kind"] == "file"
            input["bytes"] = bytes
          else
            value["kind"] = "package" if operation == :decrypt
            value["container"] = bytes
          end
          value
        elsif request.media_type == "application/json"
          body = request.body.read(MAX_REQUEST_BYTES + 1)
          raise InputError.new("Ukuran request melebihi batas 400 MiB.", "request") if body.bytesize > MAX_REQUEST_BYTES
          value = parse_json(body)
          if operation == :encrypt && value["input"].is_a?(Hash) && value["input"]["kind"] == "file"
            raise InputError.new("File harus dikirim sebagai bagian biner multipart.", "file")
          end
          value
        else
          raise InputError.new("Gunakan application/json untuk teks atau multipart/form-data untuk file.", "request")
        end
      ensure
        # Rack multipart uses temporary files; no input is persisted after processing.
        tempfile&.close!
      end

      def respond_crypto(operation)
        value = crypto_request(operation)
        JSON.generate(Engine.public_send(operation, value))
      end
    end

    get "/health" do
      JSON.generate(status: "ok", engine: "ruby", rubyVersion: RUBY_VERSION, algorithms: Keys::CIPHER_IDS)
    end

    post "/api/crypto/encrypt" do
      respond_crypto(:encrypt)
    end

    post "/api/crypto/decrypt" do
      respond_crypto(:decrypt)
    end

    post "/api/crypto/inspect" do
      respond_crypto(:inspect)
    end

    error InputError do
      exception = env["sinatra.error"]
      status 422
      result = { message: exception.message, field: exception.field }
      result[:fieldErrors] = exception.field_errors if exception.field_errors
      JSON.generate(result)
    end

    error Rack::Multipart::EmptyContentError, Rack::Multipart::MultipartPartLimitError, Rack::Multipart::MultipartTotalPartLimitError do
      status 400
      JSON.generate(message: "Request multipart tidak valid atau terlalu banyak bagian.", field: "file")
    end

    error do
      status 500
      JSON.generate(message: "Layanan Ruby gagal memproses permintaan.", field: "request")
    end

    not_found do
      JSON.generate(message: "Endpoint tidak ditemukan.", field: "request")
    end
  end
end
