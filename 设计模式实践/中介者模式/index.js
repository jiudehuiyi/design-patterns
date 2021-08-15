/**
 *  中介者模式: 通过中介者对象封装一系列对象之间的交互，使对象之间不再互相引用，降低它们之间的耦合
 *  中介对象只发送消息，不能订阅消息， 活跃对象只能接受消息
 * 
 *  观察者模式由目标对象订阅，发布
 *  中介者模式由中介对象发布，由中介者对象注册(订阅)消息, 这种模式的好处就是抽离具体的业务，只执行相应的函数
*/

//中介者对象:
class Mediator {

    _msg = {}; //消息对象

    //注册消息
    register(type, action){
        if(this._msg[type]) {
            //存在消息队列中
            this._msg[type].push(action);
        }else {
            //不存在，则建立消息容器
            this._msg[type] = [];
            this._msg[type].push(action)
        }
    }

    //发布消息
    send(type) {
        if(!this._msg[type]) {
            return;
        }
        if(this._msg[type]) {
            for(let i=0; i< this._msg[type].length; i++ ){
                this._msg[type][i]?.();
            }
        }
    }

}


// 中介者对象订阅消息:
Mediator.register("type1", function(){
    //执行业务逻辑
})

//中介者对象发布消息:
Mediator.send("type1");