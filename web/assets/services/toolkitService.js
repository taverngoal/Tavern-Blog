/**
 * Created by tavern on 14/12/17.
 */
define(["angular", "angular-material", "angular-resource"], function (angular) {
    return angular.module("Etrain.Service.Toolkit", ["ngMaterial", "ngResource"])
        .service("$toolkit", ["$mdToast", "$mdDialog", "$resource", "$rootScope", "$location",
            function ($mdToast, $mdDialog, $resource, $rootScope, $location) {
                var $this = this;

                this.Tag = $resource("api/tags");

                //用户是否登录
                this.Authorize = function (cb) {
                    if (!$rootScope.Config.User.id) {
                        if (cb)cb();
                        history.back()
                    }
                };

                //markdown编辑器
                this.markdownEditor = function (elementID, cb) {
                    require(['marked', 'highlight'], function () {
                        marked.setOptions({
                            highlight: function (code) {
                                return hljs.highlightAuto(code).value;
                            }
                        });
                    });
                    cb();
                };
                //导航跟踪
                this.NavTrace = {
                    _traces: [],
                    push: function (obj) {
                        if (angular.isObject(obj))
                            this._traces.push(obj);
                        else if (angular.isString(arguments[0]) && angular.isString(arguments[1]))
                            this._traces.push({title: arguments[0], url: arguments[1]});
                    },
                    unshift: function (obj) {
                        if (angular.isObject(obj))
                            this._traces.unshift(obj);
                        else if (angular.isString(arguments[0]) && angular.isString(arguments[1]))
                            this._traces.unshift({title: arguments[0], url: arguments[1]});
                    },
                    clear: function () {
                        delete this._traces;
                        this._traces = [];
                    }
                };
                //日期按指定转化
                this.DateParse = function (date, formart) {
                    var datetime = new Date(Date.parse(date));
                    return datetime.Format(formart);
                };

                //确认框
                this.Confirm = {
                    show: function (title, content, okLabel, cancelLabel, okFunc, cancelFunc, e) {
                        var confirm = $mdDialog.confirm()
                            .title(title)
                            .content(content)
                            .ok(okLabel)
                            .cancel(cancelLabel)
                            .targetEvent(e);
                        $mdDialog.show(confirm).then(okFunc, cancelFunc);
                    }
                };

                //弹出框通知
                this.Dialog = {
                    show: function (title, content, okLabel) {
                        $mdDialog.show(
                            $mdDialog.alert().title(title).content(content)
                                .ok(okLabel || "确定")
                            //.targetEvent(ev)
                        );
                    }
                };

                //消息通知
                this.Notice = {
                    show: function (message, position) {
                        if (!position) position = "top right ";
                        var obj = $mdToast.simple().content(message).position(position);
                        $mdToast.show(obj);
                    }
                };
                //异常处理
                this.exceptionHandler = {
                    $types: {
                        BaseError: "出错，请联系管理员",
                        /**
                         * @return {string}
                         */
                        ValidationError: function (err) {
                            var message = "";
                            angular.forEach(err.errors, function (item) {
                                message += item.message + " ";
                            });
                            return message;
                        },
                        DatabaseError: "数据库出错",
                        TimeoutError: "查询超时",
                        UniqueConstraintError: "数据库已经有该值",
                        ForeignKeyConstraintError: "外键",
                        ConnectionError: "连接出错",
                        ConnectionRefusedError: "访问被拒绝",
                        AccessDeniedError: "访问被拒绝",
                        HostNotFoundError: "找不到数据库",
                        HostNotReachableError: "数据库不可达",
                        InvalidConnectionError: "",
                        ConnectionTimedOutError: "数据库连接超时"
                    },

                    Handle: function (err) {
                        err.name = err.name || "";
                        var err_name = err.name.substr(9);
                        var msg = "";
                        if (err_name in this.$types) {
                            if (angular.isString(this.$types[err_name]))
                                msg = this.$types[err_name];
                            else
                                msg = this.$types[err_name](err);
                        } else msg = err.message;
                        $this.Notice.show(msg);
                    }
                }


            }
        ])
});