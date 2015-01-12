source 'http://ruby.taobao.org'

gem 'activerecord', require: 'active_record'
gem 'rack'

gem 'grape'
gem 'rake'
gem 'grape-activerecord'
gem 'rack-contrib', git: 'https://github.com/sebglazebrook/rack-contrib.git'

gem 'goliath', :require => false

group :production do
  gem 'mysql2'
end

group :development, :test do
  gem 'sqlite3'
end