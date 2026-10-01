require_relative "../codecs"

module UtsCrypto
  module Playfair
    module_function

    def matrix(keyword)
      cells = (keyword.tr("J", "I") + Codecs::ALPHA25).bytes.uniq
      positions = Array.new(256, -1)
      cells.each_with_index { |letter, i| positions[letter] = i }
      [cells, positions]
    end

    def prepare(text)
      merged = text.tr("J", "I")
      prepared = String.new(encoding: Encoding::BINARY, capacity: text.bytesize * 2)
      fillers = Codecs.bitset(text.bytesize * 2)
      js = Codecs.bitset(text.bytesize)
      j_count = 0
      filler_count = 0
      text.each_byte.with_index do |byte, i|
        next unless byte == 74

        Codecs.set_bit(js, i)
        j_count += 1
      end
      i = 0
      while i < merged.bytesize
        a = merged.getbyte(i)
        b = merged.getbyte(i + 1)
        prepared << a
        if b.nil? || a == b
          prepared << (a == 88 ? 81 : 88)
          Codecs.set_bit(fillers, prepared.bytesize - 1)
          filler_count += 1
          i += 1
        else
          prepared << b
          i += 2
        end
      end
      {
        prepared: prepared, filler: fillers.byteslice(0, (prepared.bytesize + 7) / 8),
        j: js, filler_count: filler_count, j_count: j_count
      }
    end

    def transform(text, keyword, decrypt: false)
      if text.bytesize.odd?
        raise InputError.new("Cipherteks Playfair harus berpanjang genap.", "cipherInput")
      end
      cells, positions = matrix(keyword)
      out = "\0".b * text.bytesize
      shift = decrypt ? 4 : 1
      (0...text.bytesize).step(2) do |index|
        a = positions[text.getbyte(index)]
        b = positions[text.getbyte(index + 1)]
        if a.negative? || b.negative?
          raise InputError.new("Cipherteks Playfair tidak boleh memuat J.", "cipherInput")
        end
        if a == b
          raise InputError.new("Pasangan Playfair berisi huruf sama.", "cipherInput")
        end
        ra, ca = a.divmod(5)
        rb, cb = b.divmod(5)
        if ra == rb
          a = ra * 5 + (ca + shift) % 5
          b = rb * 5 + (cb + shift) % 5
        elsif ca == cb
          a = ((ra + shift) % 5) * 5 + ca
          b = ((rb + shift) % 5) * 5 + cb
        else
          a = ra * 5 + cb
          b = rb * 5 + ca
        end
        out.setbyte(index, cells[a])
        out.setbyte(index + 1, cells[b])
      end
      out
    end

    def restore(prepared, filler, js)
      out = String.new(encoding: Encoding::BINARY, capacity: prepared.bytesize)
      prepared.each_byte.with_index { |byte, i| out << byte unless Codecs.get_bit(filler, i) }
      out.bytesize.times do |i|
        next unless Codecs.get_bit(js, i)

        unless out.getbyte(i) == 73
          raise InputError.new("Metadata posisi J tidak cocok dengan hasil dekripsi. Periksa kunci atau data paket.", "key")
        end
        out.setbyte(i, 74)
      end
      out
    end
  end
end
