/*
 *  代理模式: ES6的Proxy是一个很好的实践
 *    特点:
 *       使用者无权直接访问目标对象
 *       中间加代理，通过代理授权和控制
 *    场景： 网页事件代理、 jquery中的proxy， Es6的proxy
 *  
*/

// 1. 实现一个简单的代理模式:
class ReadImg {
    constructor(filename) {
        this.filename = filename;
    }

    display(){
        console.log("display...", this.filename);
    }

    loadFromDisk(){
        console.log("loadFromDisk...", this.filename);
    }
}

class ProxyImg {
    constructor(filename){
        this.readImg = new ReadImg(filename);
    }
    display(){
        this.readImg.display();
    }

    loadFromDisk(){
        this.readImg.loadFromDisk();
    }
}

// 2.代理分类: 
// 保护代理 黑白双簧，代理充当黑脸，拦截和处理部分要求
// 虚拟代理（将开销大的运算延迟到需要时执行）
// 缓存代理（为开销大的运算结果提供缓存）
// 防火墙代理（控制网络资源的访问）
// 远程代理（为一个对象在不同的地址控件提供局部代表）
// 智能引用代理（访问对象执行一些附加操作）
// 写时复制代理（延迟对象复制过程，对象需要真正修改时才进行）

// 2.1-保护代理: 
// eg: 代理接听电话，处于黑名单的电话不进行转接
const blackPhoneList = ["xxxx"];

// 本体
const AcceptPhone = function(phone) {
    console.log("接听电话", phone);
}

//代理
const ProxyAcceptPhone = function(phone) {
    if(AcceptPhone.includes(phone)) {
        //屏蔽
        console.log("屏蔽电话为: ", phone)
    }else {
        //转接
        AcceptPhone.call(this, phone);
    }
}

// 2-2-虚拟代理:将开销大的运算延迟到需要时再执行
// 预加载图片:
// 本体：
const myImage = (function(){
    let imgNode = document.createElement("img");
    document.body.appendChild(imgNode);
    return {
        setSrc: function(src) {
            imgNode.src = src;
        }
    }
})();
//代理
const proxyImage = (function(){
    const img = new Image;
    img.onload = function(){
        myImage.setSrc(this.src);
    }
    return {
        setSrc:function(src) {
            myImage.setSrc("./loading.gif");
            img.src = src;
        }
    }
})();

// 2-3-缓存代理: 
// 可以为一些开销大的运算结果提供暂时的存储，在下次运算时，如果传递进来的参
// 数跟之前一致，则可以直接返回前面存储的运算结果
// 2-3-1: 缓存乘积:
const mult = function(){
    let a = 1;
    for(let i=0; i<arguments.length; i++){
        a = a * arguments[i];
    }
    return a;
}
//代理函数
const proxyMult = (function(){
    let cache = {};
    return function(){
        let args = Array.prototype.join.call(arguments, ",");
        if(args in cache) {
            return cache[args];
        }
        return cache[args] = mult.apply(this, arguments);
    }
})();

// 2-3-2: 缓存代理用于ajax异步请求数据:参考民宿宝PC常用语设置分页缓存
// 实现方式跟计算乘积的例子差不多，唯一不同的是，请求数
// 据是个异步的操作，我们无法直接把计算结果放到代理对象的缓存中，而是要通过回调的方式。
// 具体代码不再赘述，读者可以自行实现

// 3. Proxy对象： 参考Es6标准入门