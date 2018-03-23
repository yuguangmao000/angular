/**
 * Created by Administrator on 2017/1/7.
 */


var detailModule = angular.module("douban.detail",[]);
detailModule.controller("MovieDetailCtrl",function ($scope,$http,$routeParams,URLConfig) {

    // 先获取电影id
    console.log($routeParams);
    var movieID = $routeParams.movieID;
    // https://api.douban.com/v2/movie/subject/26721478
    var url = URLConfig.appUrl + "/subject/" + movieID+"?callback=success";

    $http.jsonp(url);
    $scope.loading = true;
    window.success = function (data) {

        console.log(data);

        $scope.movie = data;
        $scope.loading = false;
    }

});