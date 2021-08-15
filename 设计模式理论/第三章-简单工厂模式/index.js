/**
 *  简单工厂模式(静态工厂模式):
 * 
*/
// 1.函数实现静态工厂模式(函数): 使用工厂函数进行派发对象基类, 简单来说就是由函数派发类

//前端基类(函数)
let FrontEnd = function(){
    this.info = "This is a good job"
}
FrontEnd.prototype = {
    getGoodDeveloper:function(){},

    getGoodTool: function(){}
}
//前端基类(类)
class FrontEnd {
    constructor() {
        this.info = "This is a good job"
    }
    getGoodDeveloper(){}

    getGoodTool(){}

}

// 后端基类(函数)
let RearEnd = function() {
    this.info = "This is a good job";
}
RearEnd.prototype = {
    getGoodRearEndDeveloper: function(){},
    getGoodRearEnd: function(){}
}
// 后端基类(类)
class RearEnd {
    constructor(){
        this.info = "This is a good job";
    }
    getGoodRearEndDeveloper(){}
    getGoodRearEnd(){}

}

//还可以加入一些公共类
class Common{
    
    getCode(){}

}

//技术工厂
let TechnologyFactory = function(type) {
    switch(type) {
        case "FrontEnd": 
            return new FrontEnd();
        case "RearEnd": 
            return new RearEnd();
        case "Common": 
            return new Common();    
        default :
            return new  FrontEnd();     
    }
}


// 2.静态工厂模式的另外一个实现：
const cerateTechnologyFactory = function(type, text){
    let obj = new Object();
    //公有的属性和方法
    obj.type = type;
    obj.showText = function(){
        console.log("text", text)
    } 
    //私有的(通过type来判断不同类的方法)
    if(type === "FrontEnd") {
        //写入私有内容
    }
    if(type === "RearEnd") {
        //写入私有内容
    }
    if(type === "Common") {
        //写入私有内容
    }

}