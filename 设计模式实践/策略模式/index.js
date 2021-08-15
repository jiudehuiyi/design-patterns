/**
 *  策略模式： 
 *      定义一系列的算法，把它们一个个封装起来，并且使它们可以相互替
 * 
 *      不同的策略分开处理
 *      避免出现大量的if/else 和switch/case 
 */

// 优点：
// 策略模式利用组合、委托和多态等技术和思想，可以有效地避免多重条件选择语句。
// 策略模式提供了对开放—封闭原则的完美支持，将算法封装在独立的strategy 中，使得它们易于切换，易于理解，易于扩展。
// 策略模式中的算法也可以复用在系统的其他地方，从而避免许多重复的复制粘贴工作。在策略模式中利用组合和委托来让Context 拥有执行算法的能力，这也是继承的一种更轻便的替代方案。

//eg:

//解决出现过多is/else
class User {
    constructor(type){
        this.type = type;
    }

    buy(){
        if(this.type === "ordinary"){
            console.log("普通用户");
        }else if(this.type === "member") {
            console.log("会员");
        }else if(this.type === "vip") {
            console.log("vip");
        }
    }
}

//采用策略模式可以拆分为多个类,并且实现对应的类方法
class OrdinaryUser {

    buy(){
        console.log("普通用户");
    }
}

class MemberUser {
    buy(){
        console.log("会员");
    }
}

class VipUser {
    buy(){
        console.log("vip");
    }
}

//使用:
let u1 = new OrdinaryUser();
u1.buy();


//使用对象更简洁的处理:
var strategies = {
    "S": function( salary ){
        return salary * 4;
    },
    "A": function( salary ){
        return salary * 3;
    },
    "B": function( salary ){
        return salary * 2;
    }
}

let calculateBonus = function( level, salary ){
    return strategies[ level ]( salary );
};

// 使用：
calculateBonus( 'S', 20000 )


// 表单校验：
// 用户名不能为空。
// 密码长度不能少于6 位。
// 手机号码必须符合格式。

const strategies = {
    //校验不为空
    isNonEmpty: function(value, errorMsg){
        if(value === ""){
            return errorMsg;
        }
    },
    //限制最小长度
    minLength: function(value, length, errorMsg){
        if(value.length < length){
            return errorMsg
        }
    },

    isMobile: function(value, errorMsg) {
        if(!/(^1[3|5|8][0-9]{9}$)/.test( value )) {
            return errorMsg;
        }
    }
}


// 实现一个Validate类接收用户请求并且委托给strategies对象


let Validator = function(){
    this.cache = []; // 保存校验规则
};

Validator.prototype.add = function( dom, rule, errorMsg ){
    let ary = rule.split( ':' ); // 把strategy 和参数分开
    this.cache.push(function(){ // 把校验的步骤用空函数包装起来，并且放入cache
    let strategy = ary.shift(); // 用户挑选的strategy
    ary.unshift( dom.value ); // 把input 的value 添加进参数列表
    ary.push( errorMsg ); // 把errorMsg 添加进参数列表
        return strategies[ strategy ].apply( dom, ary );
    });
};

Validator.prototype.start = function(){
    for ( var i = 0, validatorFunc; validatorFunc = this.cache[ i++ ]; ){
        let msg = validatorFunc(); // 开始校验，并取得校验后的返回信息
        if ( msg ){ // 如果有确切的返回值，说明校验没有通过
            return msg;
        }
    }
};


// 使用：
// validator.add( registerForm.userName, 'minLength:10', '用户名长度不能小于10 位' );


const validataFunc = function(){
    let validator = new Validator();
    validator.add( registerForm.userName, 'isNonEmpty', '用户名不能为空' );
    validator.add( registerForm.password, 'minLength:6', '密码长度不能少于6 位' );
    validator.add( registerForm.phoneNumber, 'isMobile', '手机号码格式不正确' );

    let errorMsg = validator.start();
    return errorMsg;
}

var registerForm = document.getElementById( 'registerForm' );
    registerForm.onsubmit = function(){
    var errorMsg = validataFunc(); // 如果errorMsg 有确切的返回值，说明未通过校验
    if ( errorMsg ){
        alert ( errorMsg );
        return false; // 阻止表单提交
    }
};

// ！！！！！！！注意上述代码只能校验一种结果:
// 需要实现以下的效果：
validator.add( registerForm.userName, [{
    strategy: 'isNonEmpty',
    errorMsg: '用户名不能为空'
}, {
    strategy: 'minLength:6',
    errorMsg: '用户名长度不能小于10 位'
    }] );    
// 修改如下：
var strategies = {
    isNonEmpty: function( value, errorMsg ){
        if ( value === '' ){
            return errorMsg;
        }
    },
    minLength: function( value, length, errorMsg ){
        if ( value.length < length ){
         return errorMsg;
        }
    },
    isMobile: function( value, errorMsg ){
        if ( !/(^1[3|5|8][0-9]{9}$)/.test( value ) ){
            return errorMsg;
        }
    }
};

/***********************Validator 类**************************/
var Validator = function(){
    this.cache = [];
};
Validator.prototype.add = function( dom, rules ){
    var self = this;
    for ( var i = 0, rule; rule = rules[ i++ ]; ){
        (function( rule ){
                var strategyAry = rule.strategy.split( ':' );
                var errorMsg = rule.errorMsg;
                self.cache.push(function(){
                var strategy = strategyAry.shift();
                strategyAry.unshift( dom.value );
                strategyAry.push( errorMsg );
                return strategies[ strategy ].apply( dom, strategyAry );
            });
        })( rule )
    }
};

Validator.prototype.start = function(){
    for ( var i = 0, validatorFunc; validatorFunc = this.cache[ i++ ]; ){
        var errorMsg = validatorFunc();
        if ( errorMsg ){
            return errorMsg;
        }
    }
};

/***********************客户调用代码**************************/
var registerForm = document.getElementById( 'registerForm' );
var validataFunc = function(){
    var validator = new Validator();
    validator.add( registerForm.userName, [{
        strategy: 'isNonEmpty',
        errorMsg: '用户名不能为空'
    }, {
        strategy: 'minLength:6',
        errorMsg: '用户名长度不能小于10 位'
    }]);
    validator.add( registerForm.password, [{
        strategy: 'minLength:6',
        errorMsg: '密码长度不能小于6 位'
    }]);
    validator.add( registerForm.phoneNumber, [{
        strategy: 'isMobile',
        errorMsg: '手机号码格式不正确'
    }]);
    var errorMsg = validator.start();
    return errorMsg;
}

registerForm.onsubmit = function(){
    var errorMsg = validataFunc();
    if ( errorMsg ){
       alert ( errorMsg );
        return false;
    }
}