Tavern-Blog
===========

用Grape和Goliath配合打造的个人博客，本来是想用在其他项目的，但其他项目另有打算。 刚好本程序也做完CMS部分，所以就拿来充当博客使用了。

###运行之前

用bower安装好前端库
```
bower install
```
安装grunt和一系列库
```
npm install
```
运行grunt，主要是用于uglify
```
grunt
```
grunt的watcher，用于自动`uglify`angular的controller和services，有`web/assets/controllers`和`web/assets/services`
执行如下：
```
grunt watcher
```

接下来是`Ruby`部分，先安装gem
```
bundle
```
然后是`ActiveRecord`的db:migrate，数据库默认都是在db目录下的sqlite3，数据库配置文件在`config/database.yml`
```
rake db:migrate RACK_ENV=prodction    or   rake db:migrate RACK_ENV=development 
```


###运行
完成上述部分之后呢，开始运行，都是[Goliath](https://github.com/postrank-labs/goliath)的用法和参数
```
ruby server.rb -p PORT -e development
```

###最后
感谢支持， Powered and designed by Tavern  ＾＾

