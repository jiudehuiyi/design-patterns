/**
 *      建造者模式： 将构建和视图分离，实际上就是将一个对象拆解成多个对象，
*/

// eg:
//tip: 将公共的东西纳入Human，将特别的抽离出来(这个可以在封装公共组件中使用)
// 创建一个人类:
//第一个对象
let Human = function(skill) {
    this.skill = skill;
}
Human.prototype = {
    getSkill: function() {
        return this.skill;
    }
} 
//第二个对象
// 人的姓名:
let Name = function(name) {
    this.name = name;
}

//第三个对象
// 人的工作
let Job = function(job) {
    this.job = job;
}

//这个是真正返回出去的可使用的类
const Person = function(name, job) {

    let _person = new Human();

    _person.name = new Name(name);

    _person.job = new Job(job);
}