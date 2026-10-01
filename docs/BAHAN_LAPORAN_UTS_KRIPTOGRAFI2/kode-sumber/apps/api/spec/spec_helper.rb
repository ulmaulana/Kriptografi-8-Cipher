ENV["APP_ENV"] = "test"
require "rspec"
require "json"
require "tempfile"
require "rack/test"
require_relative "../app"

module CryptoSpecHelpers
  def default_enigma_key
    {
      "rotors" => %w[I II III], "ringSettings" => [1, 1, 1],
      "initialPositions" => %w[A A A], "reflector" => "B", "plugboard" => ""
    }
  end

  def test_key(cipher)
    case cipher
    when "vigenere" then { "keyword" => "LEMON" }
    when "autokey" then { "keyword" => "QUEENLY" }
    when "playfair" then { "keyword" => "PLAYFAIREXAMPLE" }
    when "extended-vigenere" then { "byteKey" => "0102", "byteKeyFormat" => "hex" }
    when "super" then { "byteKey" => "0102", "byteKeyFormat" => "hex", "columnKey" => "BABA" }
    when "affine" then { "affineA" => "5", "affineB" => "8" }
    when "hill" then { "hillMatrix" => "6 24 1;13 16 10;20 17 15" }
    when "enigma-i" then default_enigma_key
    end
  end

  def encrypt_text(cipher, text, key = test_key(cipher))
    UtsCrypto::Engine.encrypt("cipher" => cipher, "key" => key, "input" => { "kind" => "text", "text" => text })
  end

  def encrypt_file(cipher, bytes, key = test_key(cipher), name: "semua-byte.bin", type: "application/octet-stream", read_as: "bytes")
    UtsCrypto::Engine.encrypt(
      "cipher" => cipher, "key" => key,
      "input" => { "kind" => "file", "bytes" => bytes, "readAs" => read_as, "name" => name, "type" => type }
    )
  end

  def decrypt_package(encrypted, key)
    UtsCrypto::Engine.decrypt("kind" => "package", "containerBase64" => encrypted["containerBase64"], "key" => key)
  end

  def decode(value)
    UtsCrypto::Codecs.unbase64(value)
  end

  def parsed_package(encrypted)
    UtsCrypto::Container.parse(decode(encrypted["containerBase64"]))
  end

  def json_fixture(path)
    JSON.parse(File.read(path, encoding: "bom|utf-8"))
  end
end

RSpec.configure do |config|
  config.include CryptoSpecHelpers
  config.order = :random
  config.disable_monkey_patching!
  config.expect_with(:rspec) { |expectations| expectations.syntax = :expect }
end
