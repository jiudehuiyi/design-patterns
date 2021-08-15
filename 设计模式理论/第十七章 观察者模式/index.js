/**
 *  观察者模式: 也被称为发布-订阅者模式或消息机制， 定义了一种依赖关系， 解决了主体对象和观察者之间的耦合
 * 著名的发布订阅模式就是 事件绑定  
*/

// eg：


class Observer {

    _message = {};//数据类型也可以用map

    //注册
    register(type, fn) {
        //如果type类型不存在消息队列中应该创建一个
        if(typeof this._message[type] === "undefined") {
            this._message[type] = fn;
        }else {
            //如果存在则直接推入消息队列中
            this._message[type].push(fn);
        }
    }

    //发布
    fire(type, args){
        //如果没有此消息类型，不执行消息发布
        if(!this._message[type]) {
            return;
        }
        let events = {
            type: type,
            args: args || []
        }
        for(let i=0; i < this._message.length; i++) {
            this._message[type][i].call(this, events);
        }
    }

    //取消订阅
    remove(type, fn) {
        if(this._message[type] instanceof Array ){
            //从最后一个开始遍历进行移除
            let i = this._message[type].length - 1;
            for(; i >= 0; i--) {
                //如果存在该动作，则在消息动作序列中移除相应的动作
                this._message[type][i] === fn && this._message[type].splice(i, 1);
            }
        }
    }



}

