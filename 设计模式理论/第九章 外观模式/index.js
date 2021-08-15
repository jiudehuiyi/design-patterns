/**
 *  外观模式: 简化底层操作，封装方法给予上层调用
*/

// eg: 事件兼容

//外观模式的实现：
function addEvent(dom, type, fn) {
    if(dom.addEventListener) {
        dom.addEventListener(type, fn, false)
    }else if( dom.attachEvent ){
        dom.attachEvent("on"+type, fn)
    }
    else {
        dom["on" + type] = fn;
    }
}