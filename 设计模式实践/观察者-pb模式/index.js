/**
 *  观察者模式和发布订阅模式: 前端事件和node事件是最著名的实践
 * 
*/

// 1. 观察者模式: 指的是一个对象(Subject)维持一系列依赖它的对象(Observer),当有关状态发生变更Subject对象则通知一系列的Observer进行更新
// 在观察者模式中，Subject对象拥有添加、删除、和通知等一系列Observer的方法等等，在 Subject 对象添加了一系列 Observer 对象之后，Subject 对象则维持着这一系列 Observer 对象，当有关状态发生变更时 Subject 对象则会通知这一系列 Observer 对象进行更新
// 基本实现: 更贴近java实现, 在JavaScript 中，我们用注册回调函数的形式来代替传统的发布—订阅模式，显得更加优雅和简单(请看自定义事件发布订阅例子，这个是一个经典的例子)
// 优点：
    // 时间上的解耦和对象的解耦
//缺点: 
    // 创建订阅者本身要消耗一定的时间和内    
    // bug不容易跟踪
class Subject {
    constructor(){
        this.observers = []; //观察者们
    }

    //添加观察者
    add(observer){
        this.observers.push(observer);
    }

    //通知
    notify(){
        const observers = this.observers;

        for(let i=0; i<observers.length; i++){
            observers[i].update();
        }
    }

    //移除观察者
    remove(observer) {
        const observers = this.observers;
        for(let i=0; i<observers.length; i++){
            if(observers[i] === observer){
                observers.splice(i, 1);
            }
        }
    }
}

class Observer {
    constructor(name){
        this.name = name;
    }

    update(){
        //执行更新
        console.log("my name is ", this.name);
    }
}
var sub = new Subject();
var obs1 = new Observer('ttsy1');
var obs2 = new Observer('ttsy2');
sub.add(obs1);
sub.add(obs2);
sub.notify();  //my name is ttsy1、my name is ttsy2

// 2.发布订阅模式（Publisher && Subscriber）
// 它指的是希望接受通知的对象Subscriber基于一个主题通过自定义事件订阅主题，发布事件对象Publisher通过发布主题事件通知各个订阅改主题的Subscriber对象
// 基本实现：
const pubSub = {
    list: {},

    //订阅
    subscribe(key, fn) {
        if(!this.list[key]) {
            this.list[key] = [];
        }
        this.list[key].push(fn);
    },
    //取消订阅
    unSubscribe(key){
        delete this.list[key]
    },

    //发布
    publish(){
        const args = arguments;
        const key = Array.prototype.shift.call(arg);
        const fns = this.list[key];
        if(!fns || fns.length < 0) return false;

        for(let i=0; i<fns.length; i++) {
            fns[i].apply(this, arg);
        }

    }
};
// 进行订阅
pubSub.subscribe('name', (name) => {
    console.log('your name is ' + name);
  });
  pubSub.subscribe('sex', (sex) => {
    console.log('your sex is ' + sex);
  });
  // 进行发布
  pubSub.publish('name', 'ttsy1');  // your name is ttsy1
  pubSub.publish('sex', 'male'); 
  
//   观察者模式 VS 发布订阅模式:
// 观察者模式与发布订阅模式都是定义了一个一对多的依赖关系，当有关状态发生变更时则执行相应的更新。
// 不同的是，在观察者模式中依赖于 Subject 对象的一系列 Observer 对象在被通知之后只能执行同一个特定的更新方法，而在发布订阅模式中则可以基于不同的主题去执行不同的自定义事件。相对而言，发布订阅模式比观察者模式要更加灵活多变。
// 观察者模式和发布订阅模式本质上的思想是一样的，而发布订阅模式可以被看作是观察者模式的一个进阶版。

// egs：

//自定义事件发布订阅
let event = {
    clientList: [],

    listen: function( key, fn ){
        if ( !this.clientList[ key ] ){
        this.clientList[ key ] = [];
        }
        this.clientList[ key ].push( fn ); // 订阅的消息添加进缓存列表
        },
    trigger: function(){
        let key = Array.prototype.shift.call( arguments ), // (1);
        fns = this.clientList[ key ];
        if ( !fns || fns.length === 0 ){ // 如果没有绑定对应的消息
        return false;
        }
        for( let i = 0, fn; fn = fns[ i++ ]; ){
        fn.apply( this, arguments ); // (2) // arguments 是trigger 时带上的参数
        }
    },
    remove : function( key, fn ){
        let fns = this.clientList[ key ];
        if ( !fns ){ // 如果key 对应的消息没有被人订阅，则直接返回
        return false;
        }
        if ( !fn ){ // 如果没有传入具体的回调函数，表示需要取消key 对应消息的所有订阅
        fns && ( fns.length = 0 );
        }else{
        for ( let l = fns.length - 1; l >=0; l-- ){ // 反向遍历订阅的回调函数列表
        let _fn = fns[ l ];
        if ( _fn === fn ){
        fns.splice( l, 1 ); // 删除订阅者的回调函数
        }
        }
        }
    }
    
}
// installEvent 函数，这个函数可以给所有的对象都动态安装发布—订阅功能：
let installEvent = function( obj ){
    for ( var i in event ){
    obj[ i ] = event[ i ];
    }
}


//网站登录成功: 
// 当后端通过登录验证，发布验证通过消息
fetch("http:xxx").then( () => {
    //发布登录成功的消息
    login.trigger("loginSucc", data);
} )

//各个模块监听登录成功的消息:
const module1 = (function(){
    login.listen("loginSucc", function(data){
        console.log("data", data)
    })
})();


//实现一个全局发布-订阅对象
let Event = (function(){
    let clientList = {},
        listen,
        trigger,
    listen = function( key, fn ){
    if ( !clientList[ key ] ){
    clientList[ key ] = [];
    }
    clientList[ key ].push( fn );
    };

    trigger = function(){
        var key = Array.prototype.shift.call( arguments ),
        fns = clientList[ key ];
        if ( !fns || fns.length === 0 ){
        return false;
        }
        for( var i = 0, fn; fn = fns[ i++ ]; ){
        fn.apply( this, arguments );
        }
    };

    remove = function( key, fn ){
        var fns = clientList[ key ];
        if ( !fns ){
        return false;
        }
        if ( !fn ){
            fns && ( fns.length = 0 );
            }else{
            for ( var l = fns.length - 1; l >=0; l-- ){
            var _fn = fns[ l ];
            if ( _fn === fn ){
            fns.splice( l, 1 );
            }
            }
            }
        };
        return {
            listen: listen,
            trigger: trigger,
            remove: remove
        }
})();

Event.listen( 'squareMeter88', function( price ){ // 小红订阅消息
    console.log( '价格= ' + price ); // 输出：'价格=2000000'
});
Event.trigger( 'squareMeter88', 2000000 );


// 先发布再进行订阅：同时解决全局冲突，创建命名空间 (这种方式可以使用到实践项目中)


var Event = (function() {
    var Event;
    var _default = 'default';
  
    Event = function() {
      var _listen;
      var _trigger;
      var _remove;
  
      var _shift = Array.prototype.shift;
      var _unshift = Array.prototype.unshift;
  
      var namespaceCache = {};
  
      var _create;
      var each;
  
      // @ary 传入的一个数组对象 array
      // @fn 传入回调函数
      each = function(ary, fn) {
        var ret;
        for (var i = 0, l = ary.length; i < l; i++) {
          var n = ary[i];
          ret = fn.call(n, i, n);
        }
        return ret;
      };
  
      // @key => eventName
      // @fn => 回调函数
      // @cache => 存储所有的 Event 的对象
      _listen = function(key, fn, cache) {
        if (!cache[key]) {
          cache[key] = [];
        }
        cache[key].push(fn);
      };
  
      // @key => 同上
      // @cache => 同上
      // @fn => 同上
      _remove = function(key, cache, fn) {
        if (cache[key]) {
          if (fn) {
            for (var i = cache[key].length; i >= 0; i--) {
              if (cache[key] === fn) {
                cache[key].splice(i, 1);
              }
            }
          } else {
            cache[key] = [];
          }
        }
      };
  
      _trigger = function() {
        // _create() 方法暴露的 _trigger() 方法，
        // 接受的参数第一个是 cache 对象，
        // 即保存所有 events 对象，利用 Array.prototype.shift() 进行弹出，
        // 保存到当前 scope 的变量里
        var cache = _shift.call(arguments);
  
        // key 即是需要触发的 eventName
        var key = _shift.call(arguments);
  
        // 在将保存 event 信息的对象，和作为 key 的 eventName 的参数弹出后， 
        // 传入函数的具体参数，数组对象
        var args = arguments;
  
        // 保存一个指向 Event 对象的 ref
        var _self = this;
  
        // 取出 key 对应保存下来的所有回调函数
        stack = cache[key];
  
        // 当前 key 没有任何对应需要触发的方法时，终止当前函数继续执行
        if (!stack || !stack.length) {
          return;
        }
  
        // 调用 each() 方法，将 key 所对应的函数以此执行
        return each(stack, function() {
          // 这里的 this 指向传入的 callback 函数
          return this.apply(_self, args);
        });
      };
  
      _create = function(namespace) {
  
        // 保存命名空间的对象，_default => 'default'
        var namespace = namespace || _default;
  
        // 保存所有 eventName，fn 键值对的对象
        var cache = {};
  
        // 离线事件
        var offlineStack = [];
  
        ret = {
          // 调用 _listen() 方法，监听 key 所对应的事件
          listen: function(key, fn, last) {
  
            _listen(key, fn, cache);
  
            // 如果没有离线列队，终止继续执行；
            // 如果有离线列队，则取出来以此调用执行。
            if (offlineStack === null) {
              return;
            }
  
            // 判断 listen() 方法传入的参数有没有 'last'，
            // 见之后的 one() 方法；
            // 如果有，将当前离线列队中的最后一个回调函数弹出并且执行
            // 如果没有，调用 each() 方法，依次执行回调函数
            if (last === 'last') {
              offlineStack.length && offlineStack.pop()();
            } else {
              each(offlineStack, function() {
                this();
              });
            }
  
            // 清空离线缓存列表
            offlineStack = null;
          },
  
          // one() 方法，去除 cache 列队中的所有已存的回调函函数 cache = [];
          // 如果当前离线列队中有没有触发的事件回调，
          // 则取出列队中的最后一个执行，并且清空离线列队。
          one: function(key, fn, last) {
            _remove(key, cache);
            this.listen(key, fn, last);
          },
  
          // 调用 _remove() 方法，取消已经订阅的事件方法
          remove: function(key, fn) {
            _remove(key, cache, fn);
          },
  
          trigger: function() {
            var fn;
            var args;
            var _self = this;
  
            // 见 _trigger() 方法，
            // 这里将 cache （保存下来的所有 event）
            // 和 trigger() 方法接收到的所有参数 arguments 数组对象，
            // 打成一个新的数组，作为参数传给 _trigger() 函数并且执行。
            _unshift.call(arguments, cache);
            args = arguments;
  
            fn = function() {
              return _trigger.apply(_self, args);
            };
  
            // 如果当前 namespace 下在调用 trigger() 前没有调用 listen() ，
            // 那么离线列队 offliceStack = []，为一个空的数组，
            // 就把当前 eventName 打进离线列队，
            // 等到有了 listen() 的对象之后，再触发。 
            if (offlineStack) {
              return offlineStack.push(fn);
            }
  
            return fn();
          }
        };
  
        // 判断 namespace 是否已经存在，
        // 从而选择返回已经已经存在的对象，还是新的对象
        return namespace ? 
          (namespaceCache[namespace] ? 
            namespaceCache[namespace] : namespaceCache[namespace] = ret) : ret;
  
      };
  
      return {
        create: _create,
        one: function(key, fn, last) {
          var event = this.create();
          event.one(key, fn, last);
        },
  
        remove: function(key, fn) {
          var event = this.create();
          event.remove(key, fn);
        },
  
        listen: function(key, fn, last) {
          var event = this.create();
          event.listen(key, fn, last);
        },
  
        trigger: function() {
          var event = this.create();
          event.trigger.apply(this, arguments);
        }
      };
    }();
  
    return Event;
  })();


//使用:
/************** 先发布后订阅 ********************/
Event.trigger( 'click', 1 );
Event.listen( 'click', function( a ){
console.log( a ); // 输出：1
});

/************** 使用命名空间 ********************/
Event.create( 'namespace1' ).listen( 'click', function( a ){
    console.log( a ); // 输出：1
    });
Event.create( 'namespace1' ).trigger( 'click', 1 );
Event.create( 'namespace2' ).listen( 'click', function( a ){
    console.log( a ); // 输出：2
});
Event.create( 'namespace2' ).trigger( 'click', 2 );


