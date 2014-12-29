module ToolKit
  def paginate_anything
    start, _end = 0, 100
    start, _end = headers['Range'].split('-') if (headers['Range'])
    data, count = yield(start.to_i, _end.to_i)
    header 'Accept-Ranges', 'items'
    header 'Range-Unit', 'items'
    header 'Content-Range', "#{start}-#{start.to_i+data.count-1}/#{count}"
    data
  end
end