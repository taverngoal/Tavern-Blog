require './config/environment'
use ActiveRecord::ConnectionAdapters::ConnectionManagement
use Rack::TryStatic, :root => 'web', :urls => %w[/ /assets /views], :try => %w(.html .js .css index.html)

map '/api' do
  run Etrain
end