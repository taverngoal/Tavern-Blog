/**
 * Created by Tavern on 2014/12/18 0018.
 */

define(["angular", "angular-resource"], function (angular) {
    return angular.module("Etrain.Service.Comment", ["ngResource"])
        .service("commentService", ["$resource", "$rootScope", function ($resource, $rootScope) {
            var url = "api/articles/:id";
            var $this = this;
            this.Article = $resource(url, {id: "@id"}, {
                commentPost: {method: "post"}
            });
        }])

        ;
});