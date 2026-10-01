module UtsCrypto
  class InputError < StandardError
    attr_reader :field, :field_errors

    def initialize(message, field = nil, field_errors: nil)
      super(message)
      @field = field
      @field_errors = field_errors
    end
  end

  class KeyError < InputError
    def initialize(errors)
      super(errors.values.first || "Kunci tidak valid.", errors.keys.first, field_errors: errors)
    end
  end

  class ContainerError < InputError
    def initialize(message)
      super(message, "package")
    end
  end
end
