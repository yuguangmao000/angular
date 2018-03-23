/**
 * Created by Administrator on 2017/1/7.
 */


var listModule = angular.module("douban.list",[]);
listModule.controller("MovieListCtrl",[
    "$scope",
    "$http",
    "$routeParams",
    "URLConfig",
    "$route",
    function ($scope,$http,$routeParams,URLConfig,$route) {

    /*
    * 正在热映：https://api.douban.com/v2/movie/in_theaters?count=20&start=0
    * https://api.douban.com/v2/movie/in_theaters?count=10&start=0&callback=success
     即将上映：https://api.douban.com/v2/movie/coming_soon?count=20&start=0
     top250 ：https://api.douban.com/v2/movie/top250?count=30&start=0
    * */
    console.log($routeParams);
    var type = $routeParams.type
    var start = $routeParams.start;
    // 做请求
    // 凭借动态的请求地址
    var url = URLConfig.appUrl+"/"+type+"?count="+URLConfig.count+"&start="+start+"&callback=success";
        console.log(url);
    $http.jsonp(url);

    var that = this;
    // 加载数据之前需要显示模态框
    that.loading = true;


    window.success = function (data) {
        console.log(data);

        // // 标题
        // $scope.title = data.title;
        // // 每一条电影数据
        // $scope.movies = data.subjects;
        // // 总条数
        // $scope.total = data.total;
        that.title = data.title;
        that.movies = data.subjects;
        that.total = data.total;

        // 数据加载完毕需要隐藏模态框
        that.loading = false;
    }

    // 分页控制
    that.next = function (isNext) {

        // 写分页的逻辑，把大数据变成小数据来计算

        // 计算当前的页面数 start 开始的位置， count 每页显示部数
        // 向上取整：保证就算只剩两个数据，也创建新的一页显示
        var currentPage = Math.ceil(start/URLConfig.count);  // 0 / 10 0 10/10 1 20/10 2

        isNext ? currentPage++ : currentPage--;  // 0 2

        // 修改url里面start的值
        // 1 得到最新的开始值
        var newStrat = URLConfig.count*currentPage;

        // 2 判断一下当前newStrat值是否大于请求数据的总数，或者是否小于0
        if (newStrat >= that.total || newStrat < 0){
            return;

        }

        // 3 更新start
        $route.updateParams({
            start: newStrat
        })

    }
}]);