/*
*    第二章: 面向对象编程风格
*/

// 1. 创建对象的安全模式(支持实例化不用new, 类似Object原生对象)
const Person = function(name, age, job){

    //如果通过new创建的
    if(this instanceof Person) {
        this.name = name;
        this.age = age;
        this.job = job;
    }else {
        //不是通过new调用实例的
        return new Person(name, age, job);
    }

}

