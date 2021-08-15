/**
 *  职责链模式:
 *      定义: ：使多个对象都有机会处理请求，从而避免请求的发送者和接收者之间 的耦合关系，将这些对象连成一条链，并沿着这条链传递该请求，直到有一个对象处理它为

*          一步操作可能分为多个职责角色完成
 *          把这些角色都分开，然后用一个链串起来
 *          将发起者和各个处理者进行隔离
 * 
 *      优点：
 *          请求发送者只需要知道链中的第一个节点，从而弱化了发送者和一组接收者之间的强联系
*/
// eg:
    // 请假审批需要组长审批、经理审批、最后总监审批
class Action {
    constructor(name) {
        this.name = name;
        this.nextAction = null;
    }

    setNextAction(action) {
        this.nextAction = action;
    }

    handle(){
        console.log(`${this.name} 审批`);
        if(this.nextAction !== null) {
            this.nextAction.handle();
        }
    }
}

let a1 = new Action("组长");
let a2 = new Action("经理");
let a3 = new Action("总监");

a1.setNextAction(a2);
a2.setNextAction(a3);

a1,handle();


// eg2: 
// 有三笔不同的订单:采用职责链定制

// orderType(订单类型): 1 | 2 | 3 pay(是否预付): true | false  stock(库存): >0 | <0
const order500 = function(orderType, pay, stock){
    if(orderType === 1 && pay === true) {
        console.log("预定成功!!!")
    }else {
        return "nextSuccessor";//这里并不知道下一个职责者是谁，只负责将功能往下传递
    }
}
const order200 = function(orderType, pay, stock) {
    if(orderType === 2 && pay === true) {
        console.log("预定成功!!")
    }else {
        return "nextSuccessor";
    }
}

const orderNormal = function(orderType, pay, stock){
    if(stock > 0) {
        // 购买成功
    }else {
        console.log("库存不足")
    }
}

//接下来需要把函数包装进职责链节点，我们定义一个构造函数Chain，在new Chain 的时候传
// 递的参数即为需要被包装的函数， 同时它还拥有一个实例属性this.successor，表示在链中的下
// 一个节点
const Chain = function(fn) {
    this.fn = fn;
    this.successor = null;
}

//设置下一个职责者
Chain.prototype.setNextSuccessor = function(successor){
    return this.successor = successor;
};
//传递请求给某个节点
Chain.prototype.passRequest = function(){
    let ret = this.fn.apply(this, arguments);
    if(ret === "nextSuccessor") {
        //传递给下一个职责者
        return this.successor && this.successor.passRequest.apply( this.successor, arguments );
    }
    return ret;
}

// 使用
//生成三个节点
let chainOrder500 = new Chain( order500 );
let chainOrder200 = new Chain( order200 );
let chainOrderNormal = new Chain( orderNormal );

//指定职责链的顺序：
chainOrder500.setNextSuccessor( chainOrder200 );
chainOrder200.setNextSuccessor( chainOrderNormal );

// 最后把请求传递给第一个节点：
chainOrder500.passRequest( 1, true, 500 ); // 输出：500 元定金预购，得到100 优惠券
chainOrder500.passRequest( 2, true, 500 ); // 输出：200 元定金预购，得到50 优惠券
chainOrder500.passRequest( 3, true, 500 ); // 输出：普通购买，无优惠券
chainOrder500.passRequest( 1, false, 0 ); // 输出：手机库存不足

//对于上面的实例若要异步使用，必须手动调用next方法
Chain.prototype.next = function(){
    return this.successor && this.successor.passRequest.apply( this.successor, arguments );
}

const fn1 = new Chain(function(){
    console.log("11");
    return "nextSuccessor";
});

const fn2 = new Chain(function(){
    console.log("222");
    let self = this;
    setTimeout( ()=>{
        self.next();
    },500 );
});

const fn3 = new Chain(function(){
    console.log("333")
});
fn1.setNextSuccessor(fn2).setNextSuccessor(fn3);
fn1.passRequest();


// 采用AOP模式改写上面代码:
Function.prototype.after = function(fn){
    let self = this;
    return function(){
        let ret = self.apply(this, arguments);
        if(ret === "nextSuccessor") {
            return fn.apply(this, arguments);
        }
        return ret;
    }
}

let order = order500.after(order200).after(orderNormal);

order( 1, true, 500 ); // 输出：500 元定金预购，得到100 优惠券
order( 2, true, 500 ); // 输出：200 元定金预购，得到50 优惠券
order( 1, false, 500 ); // 输出：普通购买，无优惠券

// tip: 用AOP 来实现职责链既简单又巧妙，但这种把函数叠在一起的方式，同时也叠加了函数的
// 作用域，如果链条太长的话，也会对性能有较大的影响