CarrierWave.configure do |config|
  config.asset_host = "https://api.equipment-build.com"
  config.storage = :file
  config.cache_storage = :file
end
