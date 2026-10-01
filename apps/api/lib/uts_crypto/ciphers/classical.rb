require_relative "../errors"
require_relative "../codecs"
require_relative "modular"

module UtsCrypto
  module Classical
    module_function

    def vigenere(text, keyword, decrypt: false, autokey: false)
      out = "\0".b * text.bytesize
      text.each_byte.with_index do |byte, i|
        shift = if autokey && i >= keyword.bytesize
                  (decrypt ? out : text).getbyte(i - keyword.bytesize) - 65
                else
                  keyword.getbyte(i % keyword.bytesize) - 65
                end
        value = byte - 65 + (decrypt ? -shift : shift)
        out.setbyte(i, value % 26 + 65)
      end
      out
    end

    def extended(bytes, key, decrypt: false)
      out = "\0".b * bytes.bytesize
      bytes.each_byte.with_index do |byte, i|
        shift = key.getbyte(i % key.bytesize)
        out.setbyte(i, (byte + (decrypt ? -shift : shift)) % 256)
      end
      out
    end

    def affine(text, a, b, decrypt: false)
      out = "\0".b * text.bytesize
      inv = Modular.inverse(a, 26) if decrypt
      text.each_byte.with_index do |byte, i|
        value = byte - 65
        out.setbyte(i, (decrypt ? inv * (value - b) : a * value + b) % 26 + 65)
      end
      out
    end

    def hill(text, matrix)
      n = matrix.length
      unless (text.bytesize % n).zero?
        raise InputError.new("Panjang cipherteks Hill (#{text.bytesize}) bukan kelipatan #{n}.", "cipherInput")
      end
      out = "\0".b * text.bytesize
      (0...text.bytesize).step(n) do |base|
        n.times do |r|
          sum = 0
          n.times { |c| sum += matrix[r][c] * (text.getbyte(base + c) - 65) }
          out.setbyte(base + r, sum % 26 + 65)
        end
      end
      out
    end

    def column_order(keyword)
      (0...keyword.bytesize).sort_by { |index| [keyword.getbyte(index), index] }
    end

    def transpose(bytes, keyword, decrypt: false)
      n = keyword.bytesize
      order = column_order(keyword)
      out = "\0".b * bytes.bytesize
      cursor = 0
      order.each do |column|
        index = column
        while index < bytes.bytesize
          if decrypt
            out.setbyte(index, bytes.getbyte(cursor))
          else
            out.setbyte(cursor, bytes.getbyte(index))
          end
          cursor += 1
          index += n
        end
      end
      out
    end

    def super_cipher(bytes, key, column_key, decrypt: false)
      if decrypt
        extended(transpose(bytes, column_key, decrypt: true), key, decrypt: true)
      else
        transpose(extended(bytes, key), column_key)
      end
    end
  end
end
