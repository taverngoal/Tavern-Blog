class Etrain::TagApi < Grape::API
  before_validation do
    error!({message: '请先登录后再试！'}.as_json, 403) unless @current_user
  end

  resources :tags do
    get do
      Tag.all
    end
  end
end