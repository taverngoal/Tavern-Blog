class Log < ActiveRecord::Base

  class << self
    def do(message, trace, ip)
      Log.create! message: message, trace: trace, ip: ip
    end
  end
end