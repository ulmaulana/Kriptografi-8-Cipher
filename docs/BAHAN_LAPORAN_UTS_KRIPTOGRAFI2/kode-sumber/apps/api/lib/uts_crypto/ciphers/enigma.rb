module UtsCrypto
  # Enigma I, entry wheel identity, three rotors (left/middle/right).
  # A machine instance owns the running positions; its initial key is never mutated.
  class Enigma
    ROTORS = {
      "I" => ["EKMFLGDQVZNTOWYHXUSPAIBRCJ", "Q"],
      "II" => ["AJDKSIRUXBLHWTMCQGZNPYFVOE", "E"],
      "III" => ["BDFHJLCPRTXVZNYEIWGAKMUSQO", "V"],
      "IV" => ["ESOVPZJAYQUIRHXLNFTGKDCMWB", "J"],
      "V" => ["VZBRGITYUPSDNHLXAWMJQOFECK", "Z"]
    }.transform_values do |(wiring, notch)|
      forward = wiring.bytes.map { |v| v - 65 }.freeze
      reverse = Array.new(26)
      forward.each_with_index { |value, index| reverse[value] = index }
      { forward: forward, reverse: reverse.freeze, notch: notch.ord - 65 }.freeze
    end.freeze
    REFLECTORS = {
      "B" => "YRUHQSLDPXNGOKMIEBFZCWVJAT",
      "C" => "FVPJIAOYEDRZXWGCTKUQSBNMHL"
    }.transform_values { |s| s.bytes.map { |v| v - 65 }.freeze }.freeze

    def initialize(config)
      @rotors = config.fetch(:rotors).map { |name| ROTORS.fetch(name) }
      @rings = config.fetch(:rings).dup
      @positions = config.fetch(:positions).dup
      @reflector = REFLECTORS.fetch(config.fetch(:reflector))
      @plugboard = config.fetch(:plugboard).dup
    end

    def positions
      @positions.map { |p| (p + 65).chr }.join
    end

    def step
      advance
      positions
    end

    def transform(letters)
      out = "\0".b * letters.bytesize
      letters.each_byte.with_index do |byte, index|
        advance
        signal = @plugboard[byte - 65]
        signal = through(signal, 2, :forward)
        signal = through(signal, 1, :forward)
        signal = through(signal, 0, :forward)
        signal = @reflector[signal]
        signal = through(signal, 0, :reverse)
        signal = through(signal, 1, :reverse)
        signal = through(signal, 2, :reverse)
        out.setbyte(index, @plugboard[signal] + 65)
      end
      out
    end

    private

    def advance
      right_turnover = @positions[2] == @rotors[2][:notch]
      middle_turnover = @positions[1] == @rotors[1][:notch]
      @positions[0] = (@positions[0] + 1) % 26 if middle_turnover
      @positions[1] = (@positions[1] + 1) % 26 if right_turnover || middle_turnover
      @positions[2] = (@positions[2] + 1) % 26
    end

    def through(signal, index, direction)
      offset = (@positions[index] - @rings[index]) % 26
      (@rotors[index][direction][(signal + offset) % 26] - offset) % 26
    end
  end
end
