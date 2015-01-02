class Comment < ActiveRecord::Base
  belongs_to :article
  has_one :o_auth_account

  class << self
    def post(article_id, account_id, content, parent_id)
      Comment.create! article_id: article_id, content: content, comment_id: parent_id, o_auth_account_id: account_id
    end
  end
end