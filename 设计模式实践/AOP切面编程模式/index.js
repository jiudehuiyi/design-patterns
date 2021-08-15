/**
 *  AOP切面编程模式: 通过预编译方式和运行期动态代理实现程序功能的统一维护技术
 *  切面编程一般有三种：
 *      前置通知(before)
 *      后置通知(after)
 *      around(环绕通知)
 *  应用: 日志打印、统计数据、数据验证、安全控制、异常处理    
*/

// 1.基础实现：
// 1.1 前置通知实现:
    Function.prototype.before = function(beforeCallback){
        let _origin = this; //保存原函数
        return function() { //代理函数
            beforeCallback.apply(this, arguments); //执行前置函数，修正this
            return _origin.apply(this, arguments);
        }
    }
//1.2 后置通知的实现:
    Function.prototype.after = function(afterCallback){
        let _origin = this; //保存原函数
        return function() {
            let _return = _origin.apply(this, arguments);
            afterCallback.apply(this, arguments);
            return _return;
        }
    }
// 1.3 环绕通知: 在方法执行前后执行
    Function.prototype.around = function(beforeCallback, afterCallback) {
        let _origin = this;
        return function() {
            return _origin.before(beforeCallback).after(afterCallback).apply(this, arguments);
        }
    }

// 2. 装饰器和AOp相结合:
//日志:
class Person {

    @log
    say(nickname){
        return `hello ${nickname}`;
    }
}

function log(target, name, descriptor) {
    let _origin = descriptor.value;

        descriptor.value = function() {
            console.log(`Calling ${name} with`, arguments);
            return _origin.apply(null, arguments);
        }
    return descriptor;
}

//判断用户登录
class User {
    @checkLogin
    getUserInfo(){
        console.log("获取用户信息逻辑代码");
    }
}

function checkLogin(target, name, descriptor){
    let method = descriptor.value;
    descriptor.value = function(...args) {
        //校验用户名，密码，token 
        if(validate(args)){
            method.apply(this, args);
        }else {
            console.log("跳转登录页面")
        }
    }
}

// 3. React和AOP思想相结合: 
// 高阶组件就是一个典型的例子,日志记录、登录验证、redux中间件等。在开发中应该与OOP相辅相成，共同提高软件的健壮性及可维护性。


// 4. 对函数原型链不进行污染:
//前置
const before = function(fn, beforeCallback){
    return function(){
        beforeCallback.apply(this, arguments);
        return fn.apply(this, arguments);
    }
}
//后置
const after = function(fn, afterCallback){
    return function(){
        let _return = fn.apply(this, arguments);
        afterCallback.apply(this, arguments);
        return _return;
    }
}
const useAop = function(){};
//前置使用
before(useAop, function(){
    console.log("前置---")
})
after(useAop, function(){
    console.log("后置---")
})