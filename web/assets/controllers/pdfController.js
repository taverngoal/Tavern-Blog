/**
 * Created by Tavern on 2014/12/15 0015.
 */

define(['angular', 'angular-route'], function (angular) {
    return angular.module("Etrain.PDF", ["ngRoute"])
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider
                .when("/pdf", {
                    controller: 'PDFIndex',
                    templateUrl: 'views/PDF/index.html'
                })
                .when("/pdf/viewer", {
                    controller: 'PDFIndex',
                    templateUrl: 'assets/pdf_viewer/viewer.html'
                })
        }])
        .controller("pdfWrap", ["$scope", "$rootScope", "$toolkit", function ($scope, $rootScope, $toolkit) {
            $scope.NavTrace.unshift("PDF", "#/pdf");
            $rootScope.Config.Module = "PDF";
        }])
        .controller("PDFIndex", ["$scope", function ($scope) {
            $scope.controller_name = "PDFIndex"
        }]);
});
