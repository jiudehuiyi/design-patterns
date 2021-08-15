/**
 *  单例模式: 只实例化一个实例，保证了只有一个实例的存在
 *  应用: redux、弹窗、react-native toast的封装
 * 
*/
// 用法:
// 1. 解决命名空间问题,类似于jq
// eg：在公共类中组合使用
const Utils = {

    fetch: {
        get:function(){},

        post: function(){}
    },

    tool: {
        method:function(){}
    }

}

// 2.惰性单例模式:
const LazySingle = (function(){
    
    let _instance = null;

    function Single(){
        //定义属性和方法
    }
    Single.prototype = {};

    return function(){
        if(!_instance) {
            _instance = Single();
        }
        return _instance;
    }

})();
