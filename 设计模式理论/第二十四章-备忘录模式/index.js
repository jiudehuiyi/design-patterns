/**
 *  备忘录模式: 在不破坏对象的封装性前提下，在对象之外捕获并保存该对象的内部状态,以便日后对象的使用或者对象恢复到以前的某个状态
 *  类似缓存分页数据,减少请求,具体可看民宿宝web
*/

const cachePage = function(){
    let cache = {};

    return function(page, fn){
        if(cache[page]) {
            //存在缓存
            //执行相应的函数逻辑
            fn?.();
        }else {
            //不存在缓存
            //执行相应的数据请求

        }
    }
}();




