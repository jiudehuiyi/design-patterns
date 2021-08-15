/**
 *  访问者模式: 针对对象结构中的元素，定义在不改变对象的前提下访问结构中的新方法，实际上就是在类的基础上进行封装
*/
class DocumentReader{
    constructor(name){
      this.name = name
    }
    access(){
      const documentVisitor = new DocumentVisitor()
      console.log(this.name,' readComplate:',documentVisitor.readComplate(this));
    }
  }
  // 前端开发
class WebDevelopers extends DocumentReader{
    constructor(name){
      super(name);
    }
  }
  // 项目经理
  class Manager extends DocumentReader{
    constructor(name){
      super(name);
    }
  }
  // 测试人员
  class Tester extends DocumentReader{
    constructor(name){
      super(name);
    }
  }

  class DocumentVisitor{
    readComplate(visitor){
      if(visitor.constructor === Manager){
        return {
          beginTime:'2021-01-01',
          endTime:'2022-01-01',
          functions:'用户登录，验证码',
          developmentTime:'2021-01-05~2020-06-30',
          testTime:'2020-07-01~2020-12-01'
        }
      }
      else if(visitor.constructor === WebDevelopers){
        return {
          functions:'用户登录页面开发',
          difficulty:'html + js + css'
        }
      }
      else if(visitor.constructor === Tester){
        return {
          functions:'100 个测试用例'
        }
      }
    }
  }  