/**
 *    等待者模式: 对多个异步进程进行监听，来触发未来的动作 类似Promise.all模式就是等待者模式的最佳实践
*/

// eg:实现一个简单的等待者模式:

//等待对象
let Waiter =function() {
    //注册了等待对象容器
    let dfd = [],
    //成功回调方法容器
        doneArr = [],
    //失败回调方法容器
        failArr = [],
    //缓存Array方法slice
        slice = Array.prototype.slice,
     //保存当前对象
        that = this;
        
    //监控对象类方法
    let Primise = function(){
        //监控对象是否解决成功状态
        this.resolved = false;
        //监控对象是否解决失败状态
        this.rejected = false;
    }    
    //监控对象的原型方法
    Primise.prototype = {
        //解决成功
        resolve: function(){
            //设置监控对象解决成功
            this.resolved = true;
            //如果没有监控对象则取消执行
            if(!dfd.length) {
                return;
            }
            //遍历所有注册了的监控对象
            for(let i=dfd.length; i>=0; i--) {
                //如果有任意一个监控对象没有被解决或者解决失败则返回
                if(dfd[i] && !dfd[i].resolve || dfd[i].rejected) {
                    return;
                }
                //清除监控对象
                dfd.splice(i, 1);
            }
            //执行解决成功的回调
            _exec(doneArr);
        },
        //解决失败
        reject: function(){
            //设置当前监控对象解决失败
            this.rejected = true;
            //如果没有监控对象则取消执行
            if(!dfd.length) return;
            //清除所有监控对象
            dfd.splice(0);
            //执行解决成功的回调方法
            _exec(failArr);
        }
    }
    //创建监控对象
    that.Deferred = function() {
        return new Primise();
    }

    //回调执行方法
    function _exec(arr) {
        //遍历执行成功或者失败的回调函数容器，一次执行内部方法
        for(let i=0; i< arr.length; i++) {
            try {
                arr[i]?.();
            } catch (error) {
                
            }
        }
    };

    //监控异步方法，参数：监控对象
    that.when = function() {
        //这个方法是要监测已经注册过的监控对象的异步逻辑(ajax, setTimeout),所以when方法就是要将监测对象放到监测容器里面，
        //其中还需要判断监测对象是否存在，是否解决，是否是监控类对象的实例，最后还要返回该对象便于链式调用
        
        //设置监控对象
        dfd = slice.call(arguments);
        //监控对象的数组长度
        let i = dfd.length;
        //向前遍历监控对象
        for(--i; i<=0; i--) {
            ///如果不存在监控对象，或者监控对象已经解决，或者不是监控对象
            if(!dfd[i] || dfd[i].resolve || dfd[i].rejected || !dfd[i] instanceof Primise) {
                //清理内存，清除当前监控对象
                dfd.splice(i, 1);
            }
        }
        //返回等待者对象
        return that;
    };

    //解决成功回调函数添加的方法
    that.done = function() {
        //只需要向对象的回调函数容器中添加相应的回调函数即可，并将等待者对象返回
        doneArr = doneArr.concat(slice.call(arguments));
        return that;
    };

    //解决失败回调函数的添加方法
    that.fail = function(){
        //
        failArr = failArr.concat(slice.call(arguments));
        return that;
    };

}

// example:
//创建一个等待者实例:
let waiter = new Waiter();

//第一个task
let task = function(){
    //创建监听对象
    let dtd = waiter.Deferred();
    setTimeout(() => {
        console.log("first task");
        //发布解决对象的消息
        dtd.resolved();
    }, 500);
    return dtd;
}()

//第二个task
let task2 = function(){
    let dtd = waiter.Deferred();
    setTimeout(() => {
        console.log("second task");
        dtd.resolved();
    }, 500);
    return dtd;
}();

//监听两个两个task
waiter
    .when(task, task2)
    //添加成功的回调函数
    .done( function(){}, function(){} )
    //添加失败的回调函数
    .fail(function(){})

