/**
 *  惰性模式: 减少每次代码执行的时候重复性判断，通过对对象重定义来屏蔽原对象的分支判断
*/
// eg: 事件兼容
let A = {};
//这种方法每一次绑定事件触发事件都会进行判断
A.on = function(dom, type, fn) {
    if(dom.addEventListener) {
        dom.addEventListener(type, fn, false);
    }else if(dom.attachEvent) {
        dom.attachEvent("on"+type, fn)
    }else {
        dom["on"+type] = fn;
    }
}

//惰性模式下的优化: 只有在第一次下才会进行判断(这是非常nice的一种形式)
A.on = function(dom, type, fn) {
    if(dom.addEventListener) {
        A.on = dom.addEventListener(type, fn, false);
    }else if(dom.attachEvent) {
        A.on = dom.attachEvent("on"+type, fn);
    }else {
        A.on = dom["on" + type] = fn;
    }
}

