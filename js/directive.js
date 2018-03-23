/**
 * Created by Administrator on 2017/1/7.
 */

angular.module("douban.directive",[])
    .directive("selectLink",function () {
        var items = [];
        return {
            restrict:"A",
            link:function (scope,element,attrs) {
                // 拿到所有使用了当前指令的节点
                console.log(element);
                items.push(element);

                // 给指令添加点击事件
                element.bind("click",function () {
                    // 做active类增删操作
                    items.forEach(function (item) {
                        if (item == element){
                            item.addClass("active");
                        } else {
                            item.removeClass("active");
                        }
                    });
                })
            }
        }
    });