class AddReferenceOauthAccountToUser < ActiveRecord::Migration
  def change
    add_reference :users, :o_auth_account, index: true, null: true
  end
end
