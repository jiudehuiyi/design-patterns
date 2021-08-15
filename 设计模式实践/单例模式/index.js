/*
 *  单例模式: 保证一个类仅有一个实例，并提供一个访问它的全局访问点
     只存在一个实例(实例化两个实例，它们是相等的===)，并且只在内部new，不能在外部创建实例
 *   应用：线程池、全局缓存、浏览器window对象、 登录框、购物车, redux(它实现必须是一个单例，因为数据是共享的)
 */

// 1. 单例:
//1.1-函数的实现: 这种方法的缺点必须通过 SingleObject.getInstance来创建单例，并不能通过new的方式进行
class SingleObject {

    login() {
        console.log("login----");
    }
}

SingleObject.getInstance = ( function() {

    let instance = null;
    return function(){
        if(!instance) {
            instance = new SingleObject();
        }
        return instance;
    }

} )();

// 1.1-class: 拓展： 使用ES6 class Static关键字实现:
class SingleObject {

    constructor(){
        this.instance = null;
    }

    login() {
        console.log("login0----");
    }

    static getInstance(){
        if(!this.instance) {
            this.instance = new SingleObject();
        }
        return this.instance;
    }
}


//使用方式
let obj1 = SingleObject.getInstance();
let obj2 = SingleObject.getInstance();
let obj3 = new SingleObject();

console.log(obj1 === obj2) // true
console.log( obj1 === obj3 ) // false

// 1.2 透明的单例模式: 解决通过new调用创建单例模式:
// 1.2-函数的实现: 
// 缺点: 判断 Single.instance 类型来返回，可能得不到预期结果  耦合度过高
function Singleton(name) {
    if(typeof Singleton.instance === "object") {
        return Singleton.instance;
    }

    this.name = name;
    return Singleton.instance = this;
}
// 1.2-class实现:
class Singleton{
    constructor(name) {
        this.name = name;
        if(!Singleton.instance) {
            Singleton.instance = this;
        }
        return Singleton.instance;
    }
}

// 1.3 代理模式: 解决透明模式的耦合度问题
// 1.3-函数实现:
function Singleton(name) {
    this.name = name;
}
const proxySingleton = ( function(){
    let instance = null;
    return function(name) {
        if(!instance) {
            instance = new Singleton(name);
        }
        return instance;
    }
} )();

// 1.4 通用惰性单例: 需要时才创建类实例对象，缓存了我们想要的结果，并且在我们需要的时候才去调用它，符合封装的单一职责
const Singleton = function(fn){
    let instance = null;
    return function(){
        return instance || (instance = fn.apply(this, arguments));
    }
}

    


// 2. jQuery中只有一个$: 
if(window.jQuery !== null) {
    return window.jQuery
}else {
    // 初始化
}

// 3. 模拟登录框：
class LoginForm{

    constructor(){
        this.state = "hide";
    }

    show() {
        if(this.state === "show") {
            console.log("登录框已经显示");
            return;
        }
        this.state = "show";
        console.log("登录框显示")
    }


    hide() {
        if(this.state === "hide") {
            console.log("登录框已经隐藏");
            return;
        }
        this.state = "hide";
        console.log("登录框隐藏");
    }

}

LoginForm.getInstance = function(){
    let instance = null;
    return function(){
        if(!instance) {
            instance = new LoginForm();
        }
        return instance;
    }
}()