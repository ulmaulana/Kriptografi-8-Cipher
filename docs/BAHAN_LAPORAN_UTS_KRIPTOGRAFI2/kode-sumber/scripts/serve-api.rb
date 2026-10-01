# Bundler resolves Gemfile.lock in this process. Loading Puma directly avoids
# a Windows bundle-exec sub-process interpreting spaces in RUBYOPT paths.
require "bundler/setup"
load Gem.bin_path("puma", "puma")
