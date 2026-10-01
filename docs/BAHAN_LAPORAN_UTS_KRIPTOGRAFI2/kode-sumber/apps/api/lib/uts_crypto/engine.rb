require "digest"
require_relative "container"
require_relative "ciphers/classical"
require_relative "ciphers/playfair"
require_relative "ciphers/enigma"

module UtsCrypto
  module Engine
    MAX_FILE_BYTES = 50 * 1024 * 1024
    CHECK_KEY_HINT = "Kemungkinan kunci salah atau data paket rusak."
    module_function

    def object!(value, field)
      raise InputError.new("#{field} harus berupa objek.", field) unless value.is_a?(Hash)
      value
    end

    def string!(value, field)
      raise InputError.new("#{field} harus berupa teks.", field) unless value.is_a?(String)
      value
    end

    def limit!(bytes, field = "file")
      if bytes.bytesize > MAX_FILE_BYTES
        raise InputError.new("Ukuran masukan #{bytes.bytesize} byte melebihi batas implementasi #{MAX_FILE_BYTES} byte (50 MiB).", field)
      end
    end

    def encrypt_letters(key, text, input_mode)
      details = []
      recovery = {}
      payload = case key[:cipher]
                when "vigenere", "autokey"
                  Classical.vigenere(text, key[:keyword], autokey: key[:cipher] == "autokey")
                when "affine"
                  Classical.affine(text, key[:a], key[:b])
                when "hill"
                  n = key[:matrix].length
                  pad = (n - text.bytesize % n) % n
                  recovery["hill"] = { "n" => n, "padCount" => pad }
                  details << "Padding X ditambahkan: #{pad} huruf (blok #{n} huruf)."
                  Classical.hill(text + "X".b * pad, key[:matrix])
                when "playfair"
                  prep = Playfair.prepare(text)
                  recovery["playfair"] = {
                    "markers" => "bitset-lsb-v1", "filler" => Codecs.base64(prep[:filler]),
                    "fillerCount" => prep[:filler_count], "jCount" => prep[:j_count]
                  }
                  recovery["playfair"]["j"] = Codecs.base64(prep[:j]) if input_mode == "text"
                  rows = Playfair.matrix(key[:keyword]).first.each_slice(5).map { |row| row.pack("C*").chars.join(" ") }
                  details << "Matriks Playfair: #{rows.join(' / ')}"
                  details << "Huruf pengisi disisipkan: #{prep[:filler_count]}. Huruf J digabung ke I: #{prep[:j_count]}."
                  Playfair.transform(prep[:prepared], key[:keyword])
                when "enigma-i"
                  machine = Enigma.new(key[:enigma])
                  result = machine.transform(text)
                  details << "Posisi akhir rotor: #{machine.positions} (kiri, tengah, kanan). Dekripsi memakai posisi awal yang sama."
                  result
                end
      [payload, recovery, details]
    end

    def decrypt_letters(key, text, parsed = nil)
      result = case key[:cipher]
               when "vigenere", "autokey"
                 Classical.vigenere(text, key[:keyword], decrypt: true, autokey: key[:cipher] == "autokey")
               when "affine"
                 Classical.affine(text, key[:a], key[:b], decrypt: true)
               when "hill"
                 if parsed && key[:matrix].length != parsed[:metadata]["hill"]["n"]
                   raise InputError.new("Paket dibuat dengan matriks #{parsed[:metadata]['hill']['n']} x #{parsed[:metadata]['hill']['n']}, sedangkan kunci berukuran #{key[:matrix].length} x #{key[:matrix].length}.", "hillMatrix")
                 end
                 Classical.hill(text, key[:inverse])
               when "playfair"
                 Playfair.transform(text, key[:keyword], decrypt: true)
               when "enigma-i"
                 Enigma.new(key[:enigma]).transform(text)
               end
      if parsed && key[:cipher] == "playfair"
        bits = parsed[:playfair_bits]
        result = Playfair.restore(result, bits[:filler], bits[:j])
      elsif parsed && key[:cipher] == "hill"
        result = result.byteslice(0, result.bytesize - parsed[:metadata]["hill"]["padCount"])
      end
      result
    end

    def bytes_cipher(key, bytes, decrypt: false)
      if key[:cipher] == "super"
        Classical.super_cipher(bytes, key[:bytes], key[:column], decrypt: decrypt)
      else
        Classical.extended(bytes, key[:bytes], decrypt: decrypt)
      end
    end

    def encrypt(request)
      object!(request, "request")
      cipher = Keys.cipher!(request["cipher"])
      key, notes = Keys.parse(cipher, request["key"])
      input = object!(request["input"], "input")
      unless %w[text file].include?(input["kind"])
        raise InputError.new("Mode masukan harus text atau file.", "input")
      end
      alpha = Keys.alpha?(cipher)
      details = []
      if input["kind"] == "text"
        original = string!(input["text"], "message").encode(Encoding::UTF_8).b
        limit!(original, "message")
        mode = "text"
        plain = alpha ? Codecs.normalize(original) : original
        if plain.empty?
          raise InputError.new(original.empty? ? "Pesan wajib diisi." : "Pesan tidak menyisakan huruf A-Z setelah normalisasi.", "message")
        end
        letters = plain if alpha
      else
        original = string!(input["bytes"], "file").b
        limit!(original)
        read_as = input["readAs"]
        unless %w[bytes alpha-text].include?(read_as)
          raise InputError.new("Cara membaca file harus bytes atau alpha-text.", "file")
        end
        name = string!(input["name"], "file")
        type = string!(input["type"], "file")
        raise InputError.new("Nama atau MIME file terlalu panjang.", "file") if name.length > 1024 || type.length > 255
        if alpha && read_as == "alpha-text"
          mode = "text"
          plain = Codecs.normalize(original)
          raise InputError.new("Isi file tidak menyisakan huruf A-Z setelah normalisasi.", "file") if plain.empty?
          letters = plain
        else
          mode = "file"
          plain = original
          if alpha
            letters = Codecs.alpha25_encode(original)
            details << "Codec alpha25-v1: #{plain.bytesize} byte menjadi #{letters.bytesize} huruf sebelum cipher."
          end
        end
      end
      recovery = {}
      if alpha
        payload, recovery, algorithm_details = encrypt_letters(key, letters, mode)
        details.concat(algorithm_details)
      else
        payload = bytes_cipher(key, plain)
      end
      metadata = {
        "algorithm" => cipher, "inputMode" => mode, "codec" => Container.codec(cipher, mode),
        "payloadEncoding" => alpha ? "ascii-letters" : "bytes", "payloadLength" => payload.bytesize,
        "expectedLength" => plain.bytesize, "checksumAlgorithm" => "SHA-256", "sha256" => Digest::SHA256.hexdigest(plain)
      }
      if input["kind"] == "file"
        if mode == "file"
          metadata["file"] = { "name" => Container.sanitize_filename(name), "type" => type }
        else
          metadata["sourceFileName"] = Container.sanitize_filename(name)
        end
      end
      metadata.merge!(recovery)
      {
        "cipher" => cipher, "inputMode" => mode,
        "plainBase64" => Codecs.base64(plain), "payloadBase64" => Codecs.base64(payload),
        "containerBase64" => Codecs.base64(Container.serialize(metadata, payload)),
        "metadata" => metadata, "keyNotes" => notes, "details" => details
      }
    end

    def package_bytes(request)
      return request["container"].b if request["container"].is_a?(String)
      Codecs.unbase64(request["containerBase64"], "package")
    end

    def inspect(request)
      object!(request, "request")
      metadata = Container.parse(package_bytes(request))[:metadata]
      {
        "algorithm" => metadata["algorithm"], "inputMode" => metadata["inputMode"], "codec" => metadata["codec"],
        "payloadLength" => metadata["payloadLength"], "expectedLength" => metadata["expectedLength"],
        "fileName" => metadata.dig("file", "name"), "fileType" => metadata.dig("file", "type"),
        "sourceFileName" => metadata["sourceFileName"]
      }
    end

    def decrypt_package(request)
      parsed = Container.parse(package_bytes(request))
      metadata = parsed[:metadata]
      payload = parsed[:payload]
      cipher = metadata["algorithm"]
      key, notes = Keys.parse(cipher, request["key"])
      details = []
      if Keys.alpha?(cipher)
        unless payload.match?(/\A[A-Z]*\z/n)
          raise ContainerError, "Payload cipher alfabet berisi karakter selain A-Z."
        end
        letters = decrypt_letters(key, payload, parsed)
        if metadata["playfair"]
          p = metadata["playfair"]
          details << "Pengisi dibuang sesuai metadata: #{p['fillerCount']}. J dipulihkan: #{p['jCount']}."
        end
        if metadata["hill"]
          details << "Padding X dibuang sesuai metadata: #{metadata['hill']['padCount']}."
        end
        if metadata["codec"] == "alpha25-v1"
          begin
            bytes = Codecs.alpha25_decode(letters)
          rescue InputError => e
            raise InputError.new("Dekripsi gagal: hasil tidak dapat dikembalikan menjadi byte file. #{CHECK_KEY_HINT} (Detail: #{e.message})", "key")
          end
          details << "Codec alpha25-v1: #{letters.bytesize} huruf dikembalikan menjadi #{bytes.bytesize} byte."
        else
          bytes = letters
        end
      else
        bytes = bytes_cipher(key, payload, decrypt: true)
      end
      unless bytes.bytesize == metadata["expectedLength"]
        raise InputError.new("Ukuran hasil #{bytes.bytesize} byte tidak sama dengan ukuran yang diharapkan #{metadata['expectedLength']} byte. #{CHECK_KEY_HINT}", "key")
      end
      checksum = Digest::SHA256.hexdigest(bytes)
      unless checksum == metadata["sha256"]
        raise InputError.new("Checksum SHA-256 hasil dekripsi tidak cocok dengan paket sehingga pemulihan tidak dinyatakan berhasil. #{CHECK_KEY_HINT}", "key")
      end
      representation = metadata["inputMode"] == "file" ? "binary" : (Keys.alpha?(cipher) ? "letters" : "utf8")
      {
        "cipher" => cipher, "source" => "package", "inputMode" => metadata["inputMode"],
        "representation" => representation, "bytesBase64" => Codecs.base64(bytes), "payloadBase64" => Codecs.base64(payload),
        "verified" => true, "sha256" => checksum, "expectedSha256" => metadata["sha256"],
        "fileName" => metadata.dig("file", "name"), "fileType" => metadata.dig("file", "type"),
        "keyNotes" => notes, "details" => details
      }
    end

    def decrypt(request)
      object!(request, "request")
      kind = request["kind"]
      return decrypt_package(request) if kind == "package"
      unless %w[raw-letters payload-base64].include?(kind)
        raise InputError.new("Format dekripsi tidak dikenal.", "cipherInput")
      end
      cipher = Keys.cipher!(request["cipher"])
      alpha = Keys.alpha?(cipher)
      if kind == "raw-letters"
        raise InputError.new("Cipherteks alfabet mentah hanya untuk enam cipher alfabet.", "cipherInput") unless alpha
        payload = Codecs.normalize(string!(request["text"], "cipherInput"))
      else
        payload = Codecs.unbase64(request["base64"])
      end
      if payload.bytesize > Container::MAX_PAYLOAD_LENGTH
        raise InputError.new("Panjang payload melebihi batas 256 MiB.", "cipherInput")
      end
      key, notes = Keys.parse(cipher, request["key"])
      details = []
      if alpha
        letters = Codecs.normalize(payload)
        raise InputError.new("Cipherteks tidak berisi huruf A-Z.", "cipherInput") if letters.empty?
        bytes = decrypt_letters(key, letters)
        representation = "letters"
        details << "Tanpa metadata, huruf pengisi dan I hasil penggabungan J tetap ada pada hasil." if cipher == "playfair"
        details << "Tanpa metadata, padding X di akhir tetap ada pada hasil." if cipher == "hill"
      else
        bytes = bytes_cipher(key, payload, decrypt: true)
        representation = Codecs.utf8?(bytes) ? "utf8" : "binary"
      end
      details << "Jalur mentah tidak memiliki checksum sehingga kunci salah tidak selalu dapat dikenali."
      {
        "cipher" => cipher, "source" => kind, "inputMode" => "raw", "representation" => representation,
        "bytesBase64" => Codecs.base64(bytes), "payloadBase64" => Codecs.base64(payload), "verified" => false,
        "sha256" => Digest::SHA256.hexdigest(bytes), "expectedSha256" => nil, "fileName" => nil, "fileType" => nil,
        "keyNotes" => notes, "details" => details
      }
    end
  end
end
