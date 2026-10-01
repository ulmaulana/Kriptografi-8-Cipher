bind "tcp://#{ENV.fetch('API_HOST', '127.0.0.1')}:#{ENV.fetch('API_PORT', '4567')}"
threads 1, Integer(ENV.fetch("API_THREADS", "4"))
environment ENV.fetch("APP_ENV", "development")
