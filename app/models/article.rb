class Article < ActiveRecord::Base
  belongs_to :user
  has_and_belongs_to_many :tags
  has_many :comments

  def safe_attributes
    self.as_json(only: [:id, :title, :content, :views, :user, :created_at, :updated_at, :comment_count],
                 include: {user: {only: [:id, :name, :username]}, tags: {only: :title}})
  end

  def paginate_comments(start=0, _end =100)
    length = _end - start
    length = 100 if length>100
    return self.comments.order(created_at: :desc)
               .offset(start).limit(length+1), self.comments.count
  end

  class << self
    def paginate(start=0, _end=100)
      length = _end - start
      length = 100 if length>100
      return Article.includes(:user, :tags).select(:id, :title, :content, :views, :user_id, :created_at, :comment_count, :updated_at)
                 .order(created_at: :desc).offset(start).limit(length+1), Article.count
    end

    def pagenate_for_tag(tag_name='', start=0, _end=100)
      length = _end - start
      length = 100 if length>100
      tag = Tag.find_by(title: tag_name)
      return tag.articles.select(:id, :title, :content, :views, :user_id, :created_at, :updated_at)
                 .order(created_at: :desc).offset(start).limit(length+1), tag.articles.count
    end

    def post(title, content, tags, user_id)
      tags= Tag.add_mul_increment(tags)
      article = Article.create! title: title, content: content, user_id: user_id
      article.tags << tags
      article
    end

  end
end