CarrierWave.configure do |config|
  # config.asset_host = "https://api.equipment-build.com"
  config.asset_host = "http://localhost:3001"
  config.storage = :file
  config.cache_storage = :file
end
