# Load the locked bundle in this process. This also supports Windows paths
# containing spaces, without passing Bundler's RUBYOPT to another Ruby process.
require "bundler/setup"
load Gem.bin_path("rspec-core", "rspec")
