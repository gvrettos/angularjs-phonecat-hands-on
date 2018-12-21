// Cfr
// https://scotch.io/@arctic_sniper/angularjs-from-scratch-part-i
// https://github.com/angular/angular-seed

angular.module("App", ['main']);

angular.module("main", []);

angular.module("main").controller("mainController", function($scope) {
    $scope.itWorks = 'AngularJS works!';
});