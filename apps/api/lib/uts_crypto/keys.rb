require_relative "codecs"
require_relative "ciphers/modular"
require_relative "ciphers/enigma"

module UtsCrypto
  module Keys
    HILL_MAX_SIZE = 10
    MAX_SAFE_INTEGER = (1 << 53) - 1
    MAX_KEY_CHARACTERS = 65_536
    CIPHER_IDS = %w[vigenere autokey extended-vigenere playfair affine hill super enigma-i].freeze
    BYTE_CIPHERS = %w[extended-vigenere super].freeze
    module_function

    def alpha?(cipher)
      !BYTE_CIPHERS.include?(cipher)
    end

    def cipher!(cipher)
      unless CIPHER_IDS.include?(cipher)
        raise InputError.new("Algoritma tidak dikenal.", "cipher")
      end
      cipher
    end

    def error!(field, message)
      raise KeyError.new({ field => message })
    end

    def text!(values, field)
      value = values[field]
      error!(field, "Kunci #{field} harus berupa teks.") unless value.is_a?(String)
      error!(field, "Batas implementasi: kunci maksimal #{MAX_KEY_CHARACTERS} karakter.") if value.length > MAX_KEY_CHARACTERS
      value
    end

    def alphabetic(values, field, label)
      raw = text!(values, field)
      error!(field, "#{label} wajib diisi.") if raw.strip.empty?
      result = Codecs.normalize(raw)
      error!(field, "#{label} tidak mengandung huruf A-Z sehingga kosong setelah normalisasi.") if result.empty?
      result
    end

    def integer(values, field, label)
      raw = text!(values, field).strip
      error!(field, "#{label} wajib diisi.") if raw.empty?
      error!(field, "#{label} harus bilangan bulat.") unless raw.match?(/\A[+-]?\d+\z/)
      value = raw.to_i
      error!(field, "#{label} terlalu besar.") if value.abs > MAX_SAFE_INTEGER
      value
    end

    def byte_key(values)
      raw = text!(values, "byteKey")
      format = values["byteKeyFormat"]
      unless %w[text hex].include?(format)
        error!("byteKeyFormat", "Format kunci byte harus text atau hex.")
      end
      if format == "hex"
        clean = raw.gsub(/0x/i, "").gsub(/[\s,:]/, "")
        error!("byteKey", "Kunci heksadesimal wajib diisi.") if clean.empty?
        error!("byteKey", "Kunci heksadesimal hanya boleh berisi 0-9 dan A-F.") unless clean.match?(/\A[0-9a-fA-F]+\z/)
        error!("byteKey", "Jumlah digit heksadesimal harus genap (dua digit per byte).") if clean.length.odd?
        [clean].pack("H*").b
      else
        error!("byteKey", "Kunci byte wajib diisi (minimal satu byte).") if raw.empty?
        raw.encode(Encoding::UTF_8).b
      end
    end

    def matrix(values)
      raw = text!(values, "hillMatrix")
      rows = raw.delete("[").split(/[\];\n]/).map { |row| row.gsub(/\A[\s,]+|[\s,]+\z/, "") }.reject(&:empty?)
      error!("hillMatrix", "Matriks Hill wajib diisi.") if rows.empty?
      n = rows.length
      error!("hillMatrix", "Matriks Hill minimal berukuran 2 x 2.") if n < 2
      error!("hillMatrix", "Batas implementasi: ukuran matriks maksimal #{HILL_MAX_SIZE} x #{HILL_MAX_SIZE}.") if n > HILL_MAX_SIZE
      rows.map.with_index do |row, index|
        cells = row.split(/[\s,]+/)
        unless cells.length == n
          error!("hillMatrix", "Matriks harus persegi: ada #{n} baris tetapi baris #{index + 1} berisi #{cells.length} elemen.")
        end
        cells.map do |cell|
          error!("hillMatrix", "Elemen #{cell.inspect} bukan bilangan bulat.") unless cell.match?(/\A[+-]?\d+\z/)
          value = cell.to_i
          error!("hillMatrix", "Elemen #{cell.inspect} terlalu besar.") if value.abs > MAX_SAFE_INTEGER
          value % 26
        end
      end
    end

    def enigma(values)
      errors = {}
      rotors = values["rotors"]
      if !rotors.is_a?(Array) || rotors.length != 3 || !rotors.all? { |r| Enigma::ROTORS.key?(r) }
        errors["rotors"] = "Pilih tepat tiga rotor I sampai V dalam urutan kiri, tengah, kanan."
      elsif rotors.uniq.length != 3
        errors["rotors"] = "Ketiga rotor harus berbeda."
      end
      rings = values["ringSettings"]
      unless rings.is_a?(Array) && rings.length == 3 && rings.all? { |r| r.is_a?(Integer) && r.between?(1, 26) }
        errors["ringSettings"] = "Ring setting harus tiga bilangan bulat 1 sampai 26 (kiri, tengah, kanan)."
      end
      positions = values["initialPositions"]
      unless positions.is_a?(Array) && positions.length == 3 && positions.all? { |p| p.is_a?(String) && p.match?(/\A[A-Z]\z/) }
        errors["initialPositions"] = "Posisi awal harus tiga huruf A sampai Z (kiri, tengah, kanan)."
      end
      reflector = values["reflector"]
      errors["reflector"] = "Reflector harus B atau C." unless Enigma::REFLECTORS.key?(reflector)
      raw_board = values["plugboard"]
      board = (0...26).to_a
      pair_count = 0
      if !raw_board.is_a?(String)
        errors["plugboard"] = "Plugboard harus berupa teks pasangan dua huruf; boleh kosong."
      elsif raw_board.length > MAX_KEY_CHARACTERS
        errors["plugboard"] = "Plugboard terlalu panjang."
      else
        pairs = raw_board.strip.split(/\s+/)
        pair_count = pairs.length
        if pair_count > 13
          errors["plugboard"] = "Plugboard maksimal 13 pasangan."
        else
          used = []
          pairs.each do |pair|
            unless pair.match?(/\A[A-Za-z]{2}\z/)
              errors["plugboard"] = "Setiap pasangan plugboard harus tepat dua huruf A sampai Z."
              break
            end
            a, b = pair.upcase.bytes.map { |v| v - 65 }
            if a == b
              errors["plugboard"] = "Pasangan plugboard tidak boleh memasangkan huruf dengan dirinya sendiri."
              break
            elsif used.include?(a) || used.include?(b)
              errors["plugboard"] = "Setiap huruf hanya boleh digunakan pada satu pasangan plugboard."
              break
            end
            used.concat([a, b])
            board[a], board[b] = b, a
          end
        end
      end
      raise KeyError.new(errors) unless errors.empty?

      {
        rotors: rotors.dup.freeze, rings: rings.map { |r| r - 1 }.freeze,
        positions: positions.map { |p| p.ord - 65 }.freeze,
        reflector: reflector, plugboard: board.freeze, pair_count: pair_count
      }.freeze
    end

    def parse(cipher, values)
      cipher!(cipher)
      raise KeyError.new({ "key" => "Konfigurasi kunci harus berupa objek." }) unless values.is_a?(Hash)

      key = { cipher: cipher }
      notes = []
      case cipher
      when "vigenere", "autokey", "playfair"
        label = cipher == "autokey" ? "Primer" : "Kata kunci"
        key[:keyword] = alphabetic(values, "keyword", label)
        notes << "#{label} setelah normalisasi: #{key[:keyword]}"
      when "extended-vigenere", "super"
        key[:bytes] = byte_key(values)
        notes << "Kunci byte: #{key[:bytes].bytesize} byte #{values['byteKeyFormat'] == 'hex' ? 'dari heksadesimal' : 'UTF-8; spasi dan kapitalisasi dipertahankan'}."
        if cipher == "super"
          key[:column] = alphabetic(values, "columnKey", "Kata kunci kolom")
          notes << "Kata kunci kolom setelah normalisasi: #{key[:column]}"
        end
      when "affine"
        raw_a = integer(values, "affineA", "Nilai a")
        raw_b = integer(values, "affineB", "Nilai b")
        key[:a], key[:b] = raw_a % 26, raw_b % 26
        if key[:a].gcd(26) != 1
          error!("affineA", "a = #{raw_a} (mod 26 = #{key[:a]}) tidak relatif prima terhadap 26. Nilai a valid: 1, 3, 5, 7, 9, 11, 15, 17, 19, 21, 23, 25.")
        end
        notes << "Kunci direduksi modulo 26: a = #{key[:a]}, b = #{key[:b]}." if raw_a != key[:a] || raw_b != key[:b]
      when "hill"
        key[:matrix] = matrix(values)
        key[:determinant], key[:inverse] = Modular.matrix_inverse(key[:matrix])
        unless key[:inverse]
          error!("hillMatrix", "Determinan mod 26 = #{key[:determinant]}, tidak relatif prima terhadap 26 sehingga matriks tidak mempunyai invers.")
        end
        notes << "Matriks #{key[:matrix].length} x #{key[:matrix].length} mod 26: #{key[:matrix].inspect}, determinan mod 26 = #{key[:determinant]}."
        notes << "Invers modulo 26: #{key[:inverse].inspect}."
      when "enigma-i"
        key[:enigma] = enigma(values)
        notes << "Enigma I: tiga rotor kiri, tengah, kanan; #{key[:enigma][:pair_count]} pasangan plugboard. Setiap operasi dimulai dari konfigurasi awal."
      end
      [key, notes]
    end
  end
end
