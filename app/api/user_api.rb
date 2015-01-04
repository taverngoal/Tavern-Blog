class Etrain::UserApi < Grape::API
  format :json
  resources :users do
    params do
      requires :username, type: String
      requires :password, type: String
      optional :gender, type: Integer
    end
    post :reg do
      error! message: '私人博客，暂时不开放注册！'
      User.reg(params[:username], params[:password], params[:gender]).safe_attributes
    end

    params do
      requires :username, type: String
      requires :password, type: String
    end
    post :login do
      user = User.login params[:username], params[:password]
      user.response_to_cookie cookies
      user.safe_attributes
    end

    post :logout do
      User.logout cookies
    end

    get :current do
      @current_user.safe_attributes if @current_user
    end
  end
end