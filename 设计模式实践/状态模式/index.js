/**
 *  状态模式：
 *      一个对象有状态变化
 *      每次状态变化都会触发一个逻辑
 *      不能总是用if/else switch控制
 *      当判断很多的时候便利便体现出来
 *      缺点带来较多的代码量
*/
// 定义：
    // 将状态封装成独立的类, 并将请求委托给当前状态对象，当对象内部状态改变，会带来不同的行为变化
    // 


// 其中Promise是一个很好的实践;

// 基本实现:

//状态
class State {
    constructor(color) {
        this.color = color;
    }

    handle(context) {
        context.setState(this);
    }
}

//主体
class Context {
    constructor(){
        this.state = null;
    }

    getState(){
        return this.state;
    }

    setState(state){
        this.state = state;
    }
}

//使用:
let context = new Context();
let red = new State("red");
let green = new State("green");
let yellow = new State("yellow");

green.handle(context);

//if else 和switch的优雅实现方式
class ResultState {

    States = {
        state0: function() {},

        state1: function() {},

        state2: function() {}
    }

    State1 = {
        state0: function() {},

        state1: function() {},

        state2: function() {}
    }

    //暴露一个调用States的方法

    show(_state) {
        return this.States[_state];
    }

    show1(_state) {
        return this.State1(_state);
    }
}

//状态机模式:
class StateMac{
    

    init = "收藏";

    transition = [
        {
            name: "doStore",
            from: "收藏",
            to: "取消收藏"
        },
        {
            name: "deleteStore",
            from: "取消收藏",
            to: "收藏"
        }
    ];

    methods = {
        onDoStore: function(){
            //执行收藏相关逻辑
        },

        onDeleteStore: function(){
            //执行取消收藏相关逻辑
        }
    }



}




//关灯、强光、弱光的例子
// OffLightState：
var OffLightState = function( light ){
    this.light = light;
};
OffLightState.prototype.buttonWasPressed = function(){
    console.log( '弱光' ); // offLightState 对应的行为
    this.light.setState( this.light.weakLightState ); // 切换状态到weakLightState
};

// WeakLightState：
var WeakLightState = function( light ){
    this.light = light;
};
WeakLightState.prototype.buttonWasPressed = function(){
    console.log( '强光' ); // weakLightState 对应的行为
    this.light.setState( this.light.strongLightState ); // 切换状态到strongLightState
};

// StrongLightState：
var StrongLightState = function( light ){
    this.light = light;
};
StrongLightState.prototype.buttonWasPressed = function(){
    console.log( '关灯' ); // strongLightState 对应的行为
    this.light.setState( this.light.offLightState ); // 切换状态到offLightState
};

var Light = function(){
    this.offLightState = new OffLightState( this );
    this.weakLightState = new WeakLightState( this );
    this.strongLightState = new StrongLightState( this );
    this.button = null;
};

Light.prototype.init = function(){
    var button = document.createElement( 'button' ),
    self = this;
    this.button = document.body.appendChild( button );
    this.button.innerHTML = '开关';
    this.currState = this.offLightState; // 设置当前状态
    this.button.onclick = function(){
    self.currState.buttonWasPressed();
    }
};
Light.prototype.setState = function( newState ){
    this.currState = newState;
};

var light = new Light();
light.init();


//实际项目的状态机模式：
// 1. 一个下拉菜单在hover 动作下有显示、悬浮、隐藏等状态；
// 2. 一次TCP 请求有建立连接、监听、关闭等状态
// 3. 一个格斗游戏中人物有攻击、防御、跳跃、跌倒等状态
// eg: 
let FSM = {
    walk: {
    attack: function(){
    console.log( '攻击' );
    },
    defense: function(){
    console.log( '防御' );
    },
    jump: function(){
    console.log( '跳跃' );
    }
    },
    attack: {
    walk: function(){
    console.log( '攻击的时候不能行走' );
    },
    defense: function(){
    console.log( '攻击的时候不能防御' );
    },
    jump: function(){
    console.log( '攻击的时候不能跳跃' );
    }
    }
}

