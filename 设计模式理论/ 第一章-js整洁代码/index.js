/**
 *      第一章： js整洁代码
 * 
 */

// 1. 使用对象收编变量:
let _funcCollection = {
    getName: function (){},

    getAge: function(){},

    getJob: function(){}
}

//2. 利用类的思想来收编变量(prototype)

class FuncCollection {
    getName() {
        return this; //支持链式调用
    };

    getAge(){
        return this;
    };

    getJob(){
        return this;
    };
}

// 3. 当想在原型拓展不要直接添加方法和属性，这样会污染原生对象，最好的做法是抽象一个addMethod统一的抽象方法:
Function.prototype.addMethod = function(name, fn){
    this[name] = fn;
    return this; //支持链式调用
}
