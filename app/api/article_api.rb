class Etrain::ArticleApi < Grape::API
  resources :articles do
    helpers ::ToolKit

    # before_validation do
    #   error!({message: '请先登录后再试！'}.as_json, 403) unless @current_user
    # end

    desc '获取文章列表'
    get do
      paginate_anything do |start, _end|
        if params[:tagname]
          Article.pagenate_for_tag(params[:tagname], start, _end)
              .as_json(include: {tags: {only: :title}, user: {only: [:id, :username, :name]}})
        else
          Article.paginate(start, _end).as_json(include: {tags: {only: :title}, user: {only: [:id, :username, :name]}})
        end
      end
    end

    desc '添加文章'
    params do
      requires :title, type: String
      requires :tags, type: Array
      requires :content, type: String
    end
    post do
      error!({message: '请先登录后再试！'}.as_json, 403) unless @current_user

      Article.post params[:title], params[:content], params[:tags], @current_user.id
    end

    params do
      requires :id, type: Integer
    end
    namespace ':id' do
      after_validation do
        @article = Article.find_by(id: params[:id])
      end
      get do
        @article.views+=1
        @article.save!
        @article.safe_attributes
      end

      desc '获取带文章的所有评论'
      namespace 'comments' do
        get do
          if @article
            paginate_anything do |start, _end|
              @article.paginate_comments(start, _end)
                  .as_json(includes: {only: [:o_auth_account, :id, :content, :up, :down, :created_at]})
            end
          else
            status(404)
          end
        end

        params do
          requires :content, type: String
          requires :id, type: Integer
          optional :account_id, type: Integer
          optional :parent_id, type: Integer
        end
        post do
          Comment.post(params[:id], params[:account_id], params[:content], params[:parent_id])
        end
      end
    end
  end
end