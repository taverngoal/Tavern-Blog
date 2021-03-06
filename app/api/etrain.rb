class Etrain < Grape::API
  include Grape::ActiveRecord::Extension
  prefix :api
  format :json

  before do
    @current_user= User.auth_with_cookie cookies
  end

  rescue_from :all do |e|
    Log.do(e.message, e.backtrace.as_json.join(','), env['REMOTE_ADDR'])
    error_response status: 500, message: {message: e.message, class: e.class.name, statck: e.backtrace}.as_json
  end

  require "#{__dir__}/user_api"
  require "#{__dir__}/article_api"
  require "#{__dir__}/tag_api"
  require "#{__dir__}/comment_api"

  # use Rack::Session::Cookie

  mount Etrain::UserApi => '/'
  mount Etrain::ArticleApi => '/'
  mount Etrain::TagApi => '/'
  mount Etrain::CommentApi => '/'

end