/**
 *  桥接模式: 使抽象部分和实现部分进行抽离，其实质就是封装函数,将共同的部分抽离出来，然后分发到不同的类中进行组合，形成相应的业务
 * 
*/
// eg:实质上mobx集中式数据管理就是采用这种方式
//运动模块
class Speed{
    run(){};
}
//颜色模块
class Color{
    draw(){}
}
//语言模块
class Speak{
    say(){}
}

//创建一个组合，如人类
class Person {
    constructor() {
        this.speed = new Speed();
        this.speck = new Speak()
    }
    
    init(){
        this.speed.run()
        this.speak.say()
    }
}