require "base64"
require_relative "errors"

module UtsCrypto
  module Codecs
    ALPHA25 = "ABCDEFGHIKLMNOPQRSTUVWXYZ".b.freeze
    ALPHA25_INVERSE = Array.new(256, -1).tap do |table|
      ALPHA25.each_byte.with_index { |value, index| table[value] = index }
    end.freeze
    module_function

    # Filter ASCII first: Unicode uppercase expansions must not create new letters.
    def normalize(text)
      text.b.gsub(/[^A-Za-z]/n, "").upcase
    end

    def base64(bytes)
      Base64.strict_encode64(bytes)
    end

    def unbase64(text, field = "cipherInput")
      raise InputError.new("Base64 harus berupa teks.", field) unless text.is_a?(String)

      clean = text.delete(" \t\r\n")
      unless clean.match?(/\A(?:[A-Za-z0-9+\/]{4})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=)?\z/)
        raise InputError.new("Base64 tidak valid: periksa karakter, panjang, dan padding.", field)
      end
      bytes = Base64.strict_decode64(clean).b
      unless base64(bytes) == clean
        raise InputError.new("Bit sisa sebelum padding tidak nol. Base64 rusak.", field)
      end
      bytes
    rescue ArgumentError
      raise InputError.new("Base64 tidak valid.", field)
    end

    def alpha25_encode(bytes)
      out = "\0".b * (bytes.bytesize * 2)
      bytes.each_byte.with_index do |byte, i|
        out.setbyte(i * 2, ALPHA25.getbyte(byte / 25))
        out.setbyte(i * 2 + 1, ALPHA25.getbyte(byte % 25))
      end
      out
    end

    def alpha25_decode(letters)
      raise InputError, "Panjang codec alpha25 harus genap." if letters.bytesize.odd?

      out = "\0".b * (letters.bytesize / 2)
      out.bytesize.times do |i|
        first = ALPHA25_INVERSE[letters.getbyte(i * 2)]
        second = ALPHA25_INVERSE[letters.getbyte(i * 2 + 1)]
        if first.negative? || second.negative?
          raise InputError, "Simbol codec alpha25 di luar alfabet tanpa J."
        end
        value = first * 25 + second
        raise InputError, "Pasangan codec alpha25 melebihi nilai byte 255." if value > 255

        out.setbyte(i, value)
      end
      out
    end

    def bitset(length)
      "\0".b * ((length + 7) / 8)
    end

    def set_bit(bits, index)
      offset = index / 8
      bits.setbyte(offset, bits.getbyte(offset) | (1 << (index % 8)))
    end

    def get_bit(bits, index)
      !bits.nil? && (bits.getbyte(index / 8).to_i & (1 << (index % 8))) != 0
    end

    def count_bits(bits)
      bits.each_byte.sum { |byte| byte.digits(2).sum }
    end

    def utf8?(bytes)
      bytes.dup.force_encoding(Encoding::UTF_8).valid_encoding?
    end
  end
end
