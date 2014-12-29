/**
 * Created by tavern on 14/12/16.
 */
define(["angular", "angular-resource"], function (angular) {
    return angular.module("Etrain.Service.User", ["ngResource"])
        .service("userService", ["$resource", "$rootScope", function ($resource, $rootScope) {
            var url = "api/users/:id";
            var $this = this;
            this.User = $resource(url, {id: "@id"}, {
                login: {method: "post", url: "api/users/login"},
                reg: {method: "post", url: "api/users/reg"},
                current: {method: "get", url: "api/users/current"},
                logout: {method: "post", url: "api/users/logout"}
            });
            this.Logout = function () {
                $this.User.logout(function () {
                    $rootScope.Config.User = {$resolved: true}
                });
            }
        }])

        ;
});