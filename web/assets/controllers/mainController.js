define(['angular', 'angular-material', 'angular-animate', 'dist/articleController.min', 'angular-route',
    'dist/articleService.min', 'dist/toolkitService.min', 'dist/userService.min'], function (ng) {

    return ng.module("Etrain", [
        'ngMaterial', 'Etrain.Service.User', 'ngAnimate', 'Etrain.Article', 'ngRoute',
        'Etrain.Service.Toolkit', 'Etrain.Service.Article'
    ])
        .config(['$routeProvider', "$httpProvider", function ($routeProvider, $httpProvider) {
            $routeProvider
                .when("/", {
                    controller: 'indexController',
                    templateUrl: 'views/index.html'
                })
                .when("/login", {
                    controller: 'loginController',
                    templateUrl: 'views/login.html'
                })
                .when("/setting", {
                    controller: 'settingController',
                    templateUrl: 'views/index.html'
                });

            $httpProvider.interceptors.push(["$rootScope", "$q", "$timeout", function ($rootScope, $q, $timeout) {
                return {
                    'request': function (config) {
                        $rootScope.Config.Loading = $rootScope.Config.Loading || 0;
                        $timeout(function () {
                            $rootScope.Config.Loading += 1;
                        }, 200);
                        return config || $q.when(config);
                    },
                    'response': function (rejection) {
                        $rootScope.Config.Loading = $rootScope.Config.Loading || 0;
                        $rootScope.Config.Loading -= 1;
                        return rejection || $q.when(rejection);
                    },
                    'responseError': function (rejection) {
                        $rootScope.Config.Loading -= 1;
                        if (rejection.status == 500)
                            $rootScope.Toolkit.exceptionHandler.Handle(rejection.data);
                        if (rejection.status == 401 && "message" in rejection.data)
                            $rootScope.Toolkit.exceptionHandler.Handle(rejection.data);
                        return $q.reject(rejection);
                    }
                };
            }]);
        }])
        .controller("mainController", ['$scope', '$mdSidenav', "$location", "$rootScope", "$toolkit", "userService",
            function ($scope, $mdSidenav, $location, $rootScope, $toolkit, userService) {
                $rootScope.Config = {
                    User: null,
                    Module: "",
                    OAuthUser: null
                };
                $rootScope.GlobalFun = {
                    Logout: function () {
                        userService.Logout();
                    }
                };
                $rootScope.Config.User =
                    userService.User.current(function (content) {
                    });
                $rootScope.NavTrace = $toolkit.NavTrace;
                $rootScope.Toolkit = $toolkit;

                $scope.$on('$routeChangeSuccess', function (obj, end, start) {
                    $rootScope.NavTrace.clear();
                });

                $scope.location = $location;

                $scope.$mdSidenav = $mdSidenav;
            }])
        .
        controller("indexController", ['$scope', "$location", function ($scope, $location) {
            $scope.controller_name = "indexController";
            $location.path("article")
        }])
        .controller("loginController", ["$scope", "userService", "$toolkit", "$rootScope", "$location",
            function ($scope, userService, $toolkit, $rootScope, $location) {
                $rootScope.Config.Module = "Login";
                $scope.NavTrace.unshift("登录", "#/login");
                $scope.login = new userService.User();
                $scope.reg = new userService.User({gender: '1'});
                $scope.Login = function (user) {
                    user.$login(function (user) {
                        $scope.Config.User = user;
                        $location.path('/')
                    }, function (res) {
                    });
                };
                $scope.Reg = function (user) {
                    $scope.temp_password = angular.copy(user.password);
                    user.$reg(function () {
                        $toolkit.Notice.show("注册成功，正在自动登录");
                        user.password = $scope.temp_password;
                        $scope.Login(user, function () {
                            delete $scope.temp_password;
                        });
                    }, function () {
                    })
                };
            }])
        .controller("settingController", ["$scope", "userService", "$mdToast", "$location",
            function ($scope, userService, $mdToast, $location) {
                if (!$scope.Config.User)
                    return $location.path('/');
                $scope.user = userService.User.get({id: $scope.Config.User.id}, function () {
                    console.log(arguments)
                });
            }])
        ;
});