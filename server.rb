require './config/environment'
require 'goliath'
class Application < Goliath::API
  use Goliath::Rack::Params
  use Goliath::Rack::Render
  use ActiveRecord::ConnectionAdapters::ConnectionManagement
  # use Goliath::Rack::Render, 'json'
  use Rack::TryStatic, :root => "#{__dir__}/web", :urls => %w[/ /assets /views], :try => %w(.html .js .css index.html)
  def response(env)
    ::Etrain.call(env)
  end
end