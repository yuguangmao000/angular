/**
 * Created by Administrator on 2017/1/6.
 */


var app = angular.module("Douban",['ngRoute','douban.list',"douban.directive","douban.detail"]);


app.config(["$routeProvider",function($routeProvider){

    /*
    * 给子路径取名字
    * type
    * 正在热映： in_theaters
    * 即将上映： coming_soon
    * top250 ： top250
    * */
    $routeProvider.when('/subject/:movieID',{
        templateUrl:"movie/movie_detail.html",
        controller:"MovieDetailCtrl"
    }).when('/:type/:start',{
        templateUrl:"movie/movie_list.html",
        controller:"MovieListCtrl as ctrl"

    }).otherwise({
        redirectTo: "/in_theaters/0"
    });

}]);

app.constant("URLConfig",{
    appUrl: "https://api.douban.com/v2/movie",
    count : 13
});

// 是应用程序运行的时候执行, 只运行一次
app.run(function ($rootScope,$location) {

    // 添加事件，监听子路径的变化
    $rootScope.$on("$locationChangeStart",function (event,newStr,oldStr) {
        // 获取到当前路径的子路径
        console.log($location.url());
        // 获取当前子路径
        var subUrl = $location.url();
        // $rootScope.selectedIndex
        if (subUrl == "/in_theaters/0") {
            $rootScope.selectedIndex = 0;
        } else if (subUrl == "/coming_soon/0"){
            $rootScope.selectedIndex = 1;
        } else if (subUrl == "/top250/0"){
            $rootScope.selectedIndex = 2;
        }
    });
});