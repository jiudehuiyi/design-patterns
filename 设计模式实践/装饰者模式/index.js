/**
 *  装饰者模式: 给对象动态增加职责的方式称为装饰者模式，它是在不改变对象的基础上，给予对象增加职责
 * 
*/
// 参考es6提案装饰器, AOP实现请查看AOP切面编程模式
// 应用: 数据上报、统计函数的执行时间、动态改变函数参数以及插件式的表单验

// eg1: 比如我们想给window 绑定onload 事件，但是又不确定
// 这个事件是不是已经被其他人绑定过，为了避免覆盖掉之前的window.onload 函数中的行为，我
// 们一般都会先保存好原先的window.onload，把它放入新的window.onload 里执行

window.onload = function(){
    alert(1111)
}

let _onload = window.onload || function(){};

window.onload = function(){
    _onload(); //执行之前的逻辑
    //执行自己需要添加的逻辑
    alert(2222)
}

// 首页这中方式是符合开放封闭原则，但是还需要维护 _onload中间变量，最主要还有this劫持问题， 此时可以运用aop模式进行修改(AOP实现请查看AOP切面编程模式)


// AOP应用举例:

// 数据上报: 

const showLogin = function(){
    console.log("处理相关业务逻辑");
}

const log = function(){
    console.log("上报相关日志");
}
// 处理完业务后进行数据上报:
showLogin.after(log);


// 动态修改函数的参数:
// Function.prototype.before中可以看出，原函数和前置执行函数是公用同一个参数(arguments)

let func = function(params) {
    console.log("params", params); //{ a: "a", b: "b" }
}

func = func.before( function(params){
    params.b = "b";
} )
func({ a: "a" });

//改变函数带不带token问题
let ajax = function(type, url, params){
    console.log("params", params);
}
let getToken = function(){
    return "Token";
}

ajax = ajax.before(function(type, url, params){
    params.token = getToken();
})

//处理表单校验问题: 在表单提交之前需要校验参数是否为空，是否正确, 当只在一个函数中进行校验和数据提交，则违反了单一职责原则
// 所以可以改写 Function.prototype.before进行
Function.prototype.before = function(beforeCallback){
    let _origin = this;
    return function(){
        if( beforeCallback.apply(this, arguments) === false  )  {
            // 当校验不通过的时候不再执行 提交表单操作
            return;
        }
        return _origin.apply(this, arguments);
    }

}

const formSubmit = function(){}; //表单提交逻辑
const validate = function() {}; //表单校验逻辑

formSubmit = formSubmit.before( validate );

submitBtn.onClick = function(){
    formSubmit();    
}

// 拓展，当表单提交成功，需要展示相关的提示语，这个就可以用到后置，也可以更细化到表单提交成功还是失败!






