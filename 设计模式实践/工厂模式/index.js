/**
 *  工厂模式: 
 *  使用new创建都应该考虑是否使用工厂模式
 * 
*/

// 应用场景：$("div")  和  React.createElement

class jQuery {
    constructor(selector) {
        let slice = Array.prototype.slice;
        let dom = slice.call(document.querySelectorAll(selector));
        let len = dom ? dom.length : 0;
        for(let i=0; i < len; i++) {
            this[i] = dom[i];
        }
        this.length = len;
        this.selector = selector || "";
    }

    append(node) {};

    addClass(name) {};

    html(data) {};
}

window.$ = function(selector) {
    return new jQuery(selector);
}
