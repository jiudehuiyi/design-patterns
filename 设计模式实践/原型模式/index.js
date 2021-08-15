/**
 *  原型模式：
 *      clone自己，生成一个新的对象，避免工厂模式new 生成实例带来额外的开销 
 */

// 1. Object.create就使用到了原型模式

// 2.
// eg: 轮播图的实现, 效果有上下左右滑动，淡入淡出, 等
//让简单操作在构造函数内，复杂函数在原型内(因为它们共享的是同一个原型，以此来优化性能)
let LoopImages = function(imgsArr, container) {
    this.imgsArr = imgsArr;
    this.container = container;
}
LoopImages.prototype = {
    createImage:function() {},

    changeImage: function() {}
}

//上下滑动类型,继承基类
var SlideLoopImage = function(imgsArr, container) {
    LoopImages.call(this, imgsArr, container);
}
SlideLoopImage.prototype = new LoopImages();

//重写改变图片方法
SlideLoopImage.prototype.changeImage = function() {};

//淡入淡出型
var FadeLoopImage = function(imgsArr, container, arrow) {
    LoopImages.call(this, imgsArr, container);
    this.arrow = arrow;
}
FadeLoopImage.prototype = new LoopImages();

FadeLoopImage.changeImage = function(){};