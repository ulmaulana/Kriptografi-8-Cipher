# On Vercel the service is reachable only through the private binding from
# Next.js, and its internal host name is not known in advance.
ENV["API_PERMITTED_HOSTS"] ||= "*" if ENV["VERCEL"]

require_relative "app"
require_relative "lib/uts_crypto/vercel_headers"

use UtsCrypto::VercelHeaders
run UtsCrypto::App
