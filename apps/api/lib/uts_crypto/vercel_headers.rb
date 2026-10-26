module UtsCrypto
  # The Vercel Ruby runtime passes every request header as HTTP_*, including
  # Content-Type and Content-Length. Rack reads CONTENT_TYPE and CONTENT_LENGTH,
  # so JSON and multipart bodies are not recognised unless both are moved back.
  class VercelHeaders
    def initialize(app)
      @app = app
    end

    def call(env)
      %w[CONTENT_TYPE CONTENT_LENGTH].each do |name|
        value = env.delete("HTTP_#{name}")
        env[name] ||= value if value
      end
      @app.call(env)
    end
  end
end
