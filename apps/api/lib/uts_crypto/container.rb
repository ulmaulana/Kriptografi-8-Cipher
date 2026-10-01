require "json"
require_relative "keys"

module UtsCrypto
  module Container
    MAGIC = "UTSKRIPT".b.freeze
    VERSION = 1
    FIXED_HEADER_LENGTH = 13
    MAX_METADATA_LENGTH = 64 * 1024 * 1024
    MAX_PAYLOAD_LENGTH = 256 * 1024 * 1024
    module_function

    def codec(cipher, mode)
      if Keys.alpha?(cipher)
        mode == "file" ? "alpha25-v1" : "alpha-text-v1"
      else
        mode == "file" ? "bytes-v1" : "utf8-v1"
      end
    end

    def sanitize_filename(name)
      base = name.split(/[\\\/]/).last.to_s
      result = base.gsub(/[\x00-\x1f\x7f<>:"|?*]/, "_").sub(/\A\.+/, "").strip[0, 200]
      result.empty? ? "hasil-dekripsi.bin" : result
    end

    def serialize(metadata, payload)
      header = JSON.generate(metadata).encode(Encoding::UTF_8).b
      raise ContainerError, "Panjang metadata melebihi batas." if header.bytesize > MAX_METADATA_LENGTH
      raise ContainerError, "Panjang payload melebihi batas." if payload.bytesize > MAX_PAYLOAD_LENGTH

      MAGIC + [VERSION, header.bytesize].pack("CN") + header + payload.b
    end

    def fail!(message)
      raise ContainerError, "Metadata paket tidak valid: #{message}"
    end

    def nonnegative?(value)
      value.is_a?(Integer) && value.between?(0, Keys::MAX_SAFE_INTEGER)
    end

    def decode_bitset(value, length, label)
      begin
        bits = Codecs.unbase64(value, "package")
      rescue InputError => e
        fail!("#{label} bukan Base64 yang valid (#{e.message}).")
      end
      fail!("panjang #{label} tidak sesuai dengan panjang data.") unless bits.bytesize == (length + 7) / 8
      remainder = length % 8
      if remainder != 0 && (bits.getbyte(-1) >> remainder) != 0
        fail!("#{label} memuat bit di luar panjang data.")
      end
      bits
    end

    def validate(raw, payload_length)
      fail!("bukan objek JSON.") unless raw.is_a?(Hash)
      algorithm = raw["algorithm"]
      fail!("algoritma tidak dikenal.") unless Keys::CIPHER_IDS.include?(algorithm)
      mode = raw["inputMode"]
      fail!("mode masukan tidak dikenal.") unless %w[text file].include?(mode)
      alpha = Keys.alpha?(algorithm)
      fail!("codec tidak sesuai dengan algoritma dan mode.") unless raw["codec"] == codec(algorithm, mode)
      encoding = alpha ? "ascii-letters" : "bytes"
      fail!("encoding payload tidak sesuai algoritma.") unless raw["payloadEncoding"] == encoding
      length = raw["payloadLength"]
      fail!("panjang payload tidak masuk akal.") unless nonnegative?(length) && length <= MAX_PAYLOAD_LENGTH
      unless length == payload_length
        raise ContainerError, "Panjang payload tidak cocok: metadata menyebut #{length} byte, paket berisi #{payload_length} byte."
      end
      expected = raw["expectedLength"]
      fail!("ukuran hasil tidak masuk akal.") unless nonnegative?(expected) && expected <= MAX_PAYLOAD_LENGTH
      fail!("algoritma checksum tidak didukung.") unless raw["checksumAlgorithm"] == "SHA-256"
      checksum = raw["sha256"]
      fail!("checksum SHA-256 tidak valid.") unless checksum.is_a?(String) && checksum.match?(/\A[0-9a-f]{64}\z/)
      metadata = {
        "algorithm" => algorithm, "inputMode" => mode, "codec" => raw["codec"],
        "payloadEncoding" => encoding, "payloadLength" => length, "expectedLength" => expected,
        "checksumAlgorithm" => "SHA-256", "sha256" => checksum
      }
      if raw.key?("file")
        file = raw["file"]
        unless file.is_a?(Hash) && file["name"].is_a?(String) && file["type"].is_a?(String) && file["name"].length <= 1024 && file["type"].length <= 255
          fail!("informasi file asal rusak atau terlalu panjang.")
        end
        metadata["file"] = { "name" => sanitize_filename(file["name"]), "type" => file["type"] }
      end
      if raw.key?("sourceFileName")
        name = raw["sourceFileName"]
        fail!("nama file sumber rusak.") unless name.is_a?(String) && name.length <= 1024
        metadata["sourceFileName"] = sanitize_filename(name)
      end
      letters_length = length
      playfair_bits = nil
      if algorithm == "playfair"
        p = raw["playfair"]
        fail!("metadata Playfair tidak ada.") unless p.is_a?(Hash)
        fail!("representasi penanda Playfair tidak didukung.") unless p["markers"] == "bitset-lsb-v1"
        fail!("payload Playfair harus berpanjang genap.") if length.odd?
        unless nonnegative?(p["fillerCount"]) && nonnegative?(p["jCount"])
          fail!("jumlah penanda Playfair rusak.")
        end
        filler = decode_bitset(p["filler"], length, "bitset pengisi")
        fail!("jumlah pengisi tidak cocok dengan bitset.") unless Codecs.count_bits(filler) == p["fillerCount"]
        letters_length = length - p["fillerCount"]
        js = nil
        if p.key?("j")
          fail!("mode file tidak memakai penanda J.") if mode == "file"
          js = decode_bitset(p["j"], letters_length, "bitset J")
          fail!("jumlah J tidak cocok dengan bitset.") unless Codecs.count_bits(js) == p["jCount"]
        elsif p["jCount"] != 0
          fail!("bitset J tidak ada.")
        end
        metadata["playfair"] = p.slice("markers", "filler", "fillerCount", "jCount", "j")
        playfair_bits = { filler: filler, j: js }
      elsif raw.key?("playfair")
        fail!("metadata Playfair hanya untuk algoritma Playfair.")
      end
      if algorithm == "hill"
        h = raw["hill"]
        fail!("metadata Hill tidak ada.") unless h.is_a?(Hash)
        n = h["n"]
        fail!("ukuran blok Hill tidak valid.") unless n.is_a?(Integer) && n.between?(2, Keys::HILL_MAX_SIZE)
        pad = h["padCount"]
        fail!("jumlah padding Hill tidak valid.") unless nonnegative?(pad) && pad < n && pad <= length
        fail!("panjang payload Hill bukan kelipatan ukuran blok.") unless (length % n).zero?
        letters_length = length - pad
        metadata["hill"] = { "n" => n, "padCount" => pad }
      elsif raw.key?("hill")
        fail!("metadata Hill hanya untuk algoritma Hill.")
      end
      if alpha
        expected_letters = mode == "file" ? expected * 2 : expected
        fail!("ukuran hasil tidak konsisten dengan panjang payload.") unless letters_length == expected_letters
      elsif expected != length
        fail!("ukuran hasil harus sama dengan panjang payload untuk cipher byte.")
      end
      { metadata: metadata, playfair_bits: playfair_bits }
    end

    def parse(bytes)
      if bytes.bytesize < MAGIC.bytesize
        raise ContainerError, "Header paket terpotong: hanya #{bytes.bytesize} byte."
      end
      raise ContainerError, "Data bukan paket UTSKRIPT (penanda format tidak ditemukan)." unless bytes.start_with?(MAGIC)
      raise ContainerError, "Header paket terpotong: minimal #{FIXED_HEADER_LENGTH} byte." if bytes.bytesize < FIXED_HEADER_LENGTH
      version = bytes.getbyte(8)
      raise ContainerError, "Versi paket #{version} tidak didukung. Versi yang didukung: #{VERSION}." unless version == VERSION
      metadata_length = bytes.byteslice(9, 4).unpack1("N")
      raise ContainerError, "Panjang metadata #{metadata_length} byte melebihi batas." if metadata_length > MAX_METADATA_LENGTH
      if FIXED_HEADER_LENGTH + metadata_length > bytes.bytesize
        raise ContainerError, "Paket terpotong: metadata menyatakan #{metadata_length} byte tetapi data tidak mencukupi."
      end
      header = bytes.byteslice(FIXED_HEADER_LENGTH, metadata_length).force_encoding(Encoding::UTF_8)
      raise ContainerError, "Metadata paket rusak: bukan JSON UTF-8 yang valid." unless header.valid_encoding?
      begin
        raw = JSON.parse(header, max_nesting: 100)
      rescue JSON::ParserError
        raise ContainerError, "Metadata paket rusak: bukan JSON UTF-8 yang valid."
      end
      payload = bytes.byteslice(FIXED_HEADER_LENGTH + metadata_length..).b
      validate(raw, payload.bytesize).merge(payload: payload, version: version, metadata_length: metadata_length)
    end
  end
end
