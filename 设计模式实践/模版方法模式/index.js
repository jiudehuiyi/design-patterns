/**
 * 模版方法模式: 
 *  定义：
 *         第一部分是抽象父类，第二部分是具体的实现子类。通常
            在抽象父类中封装了子类的算法框架，包括实现一些公共方法以及封装子类中所有方法的执行顺
            序。子类通过继承这个抽象类，也继承了整个算法结构，并且可以选择重写父类的方法
    原则： 当使用模版方法模式编写代表那么就意味这子类放弃对自己的控制权，而是改为父类通知子类，也就是高层组件去调用底层组件
            它是一种典型的通过封装变化提高系统扩展性的设计模式,但是我们很多时候不应该照葫芦画瓢，更好的方式是实现一个高阶组件(函数)        
 * 
*/

// 使用场景： 当每个子类之间都存在一些相同的方法和不同的方法，如果每个子类都分别执行各自的行为，那么代码就会显得非常冗余，所以应该将相同的方法搬到一个单一的类中，
//              模版模式就是为了解决这个问题，子类的相同实现部分移到父类，将不同的子类留下来，这就体现了泛化的思想

// eg： 
// 1. 煮咖啡和茶：
// 步骤：
// (1) 把水煮沸
// (2) 用沸水冲泡饮料
// (3) 把饮料倒进杯子
// (4) 加调料
// 父类实现：
var Beverage = function(){};
Beverage.prototype.boilWater = function(){
console.log( '把水煮沸' );
};
Beverage.prototype.brew = function(){}; // 空方法，应该由子类重写
Beverage.prototype.pourInCup = function(){}; // 空方法，应该由子类重写
Beverage.prototype.addCondiments = function(){}; // 空方法，应该由子类重写
Beverage.prototype.init = function(){
    this.boilWater();
    this.brew();
    this.pourInCup();
    this.addCondiments();
};

//创建子类：
var Coffee = function(){};
Coffee.prototype = new Beverage();

Coffee.prototype.brew = function(){
    console.log( '用沸水冲泡咖啡' );
};
    Coffee.prototype.pourInCup = function(){
    console.log( '把咖啡倒进杯子' );
}
Coffee.prototype.addCondiments = function(){
    console.log( '加糖和牛奶' );
};
var Coffee = new Coffee();
Coffee.init();

//但是注意，有些人并不喜欢调料，这就是一个特例，所以这里可以定制一个钩子来解决这类特殊的问题，放置钩子是隔离变化的一种方法手段，
Beverage.prototype.customerWantsCondiments = function(){
    return true; // 默认需要调料
};
Beverage.prototype.init = function(){
    this.boilWater();
    this.brew();
    this.pourInCup();
    if ( this.customerWantsCondiments() ){ // 如果挂钩返回true，则需要调料
        this.addCondiments();
    }
};


// 模版方法在框架的应用：
// 定制框架的相关生命周期，如React
// Java的HttpServlet生命周期