/**
 *  第四章：工厂方法模式
*/
// 1.安全的工厂模式:
let Factory = function(type, content){

    if(this instanceof Factory) {
        const result = new this[type][content];
        return result;
    }else {
        return new Factory(type, content);
    }

}

Factory.prototype = {
    Java: function(content){

    },
    Javascript: function(content){
        
    }
}

// tip:！！！！！！！！！！！！！
//例如 React.createElement就是一个完美的工厂方法模式 x