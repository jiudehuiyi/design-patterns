/**
 *  外观模式: 隐藏系统复杂性，向外提供一个可以访问系统的接口
 * 
*/

// eg:
function bindEvent(elem, type, selector, fn) {
    //隐藏参数的相关细节
    if(fn === null) {
        fn = selector;
        selector = null;
    }
}

//通过一个高层参数，只实现了一个函数
bindEvent(elem, "click", "#div", fn);
bindEvent(elem, "click", fn);
