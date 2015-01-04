/**
 * Created by Tavern on 2014/12/18 0018.
 */
require.config({
    baseUrl: '/assets',
    paths: {
        'jquery': 'http://libs.useso.com/js/jquery/2.1.1/jquery.min',
        'angular': 'http://general.qiniudn.com/angular/1.3.6/angular.min',
        'angular-animate': 'http://general.qiniudn.com/angular/1.3.6/angular-animate.min',
        'angular-aria': 'http://general.qiniudn.com/angular/1.3.6/angular-aria.min',
        'angular-material': 'http://general.qiniudn.com/angular/1.3.6/angular-material.min',
        'angular-resource': 'http://general.qiniudn.com/angular/1.3.6/angular-resource.min',
        'angular-route': 'http://general.qiniudn.com/angular/1.3.6/angular-route.min',
        'angular-sanitize': 'http://general.qiniudn.com/angular/1.3.6/angular-sanitize.min',
        'angular-paginate-anything': 'http://general.qiniudn.com/angular/1.3.6/paginate-anything.min',
        'Etrain': 'dist/mainController.min',
        'marked': 'vendor/marked/lib/marked',
        'highlight': "http://cdn.bootcss.com/highlight.js/8.3/highlight.min",
        'epiceditor': 'vendor/epiceditor/epiceditor/js/epiceditor.min',
        'ace': 'http://cdn.bootcss.com/ace/1.1.3/ace',
        'ui-ace': 'vendor/angular-ui-ace/ui-ace.min',
        'angular-ui-select': 'vendor/angular-ui-select/dist/select'
    },
    shim: {
        'angular-ui-select': ['angular'],
        'ui-ace': ['angular', 'ace'],
        highlight: {
            exports: 'hljs'
        },
        angular: {
            exports: 'angular'
        },
        'angular-animate': {
            exports: 'angular-animate',
            deps: ['angular']
        },
        'angular-aria': {
            exports: 'angular-aria',
            deps: ['angular']
        },
        'angular-material': {
            exports: 'angular-material',
            deps: ['angular', 'angular-animate', 'angular-aria']
        },
        'angular-resource': {
            exports: 'angular-resource',
            deps: ['angular']
        },
        'angular-route': {
            exports: 'angular-route',
            deps: ['angular']
        },
        'angular-sanitize': {
            exports: 'angular-sanitize',
            deps: ['angular']
        },
        'angular-paginate-anything': {
            exports: 'angular-paginate-anything',
            deps: ['angular']
        }
    }
});

require(['angular', 'jquery', 'Etrain'], function (angular) {
    angular.bootstrap(document, ['Etrain']);
    //angular.element(document.body).css("display", 'inherit')
});

Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1,                 //月份
        "d+": this.getDate(),                    //日
        "h+": this.getHours(),                   //小时
        "m+": this.getMinutes(),                 //分
        "s+": this.getSeconds(),                 //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};