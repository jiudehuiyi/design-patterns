/**
 *  备忘录模式: 在不破坏对象的封装性前提下，在对象之外捕获并保存该对象的内部状态,以便日后对象的使用或者对象恢复到以前的某个状态
 *  类似缓存分页数据,减少请求,具体可看民宿宝web
 *  如撤销功能
*/

const cachePage = function(){
    let cache = {};

    return function(page, fn){
        if(cache[page]) {
            //存在缓存
            //执行相应的函数逻辑
            fn?.();
        }else {
            //不存在缓存
            //执行相应的数据请求

        }
    }
}();


// eg:编辑器

//状态备忘
class Memento {
    constructor(content) {
        this.content = content;
    }
    getContent(){
        return this.content;
    }
}

//备忘列表
class CareTaker {
    constructor(){
        this.list = [];
    }
    add(memento) {
        this.list.push(memento);
    }
    get(index){
        return this.list[index];
    }
}
//编辑器
class Editor {
    constructor() {
        this.content = null;
    }
    setContent(content) {
        this.content = content;
    }
    getContent(){
        return this.content;
    }
    saveContentToMemento(){
        return new Memento(this.content);
    }
    getContentFromMemento(memento){
        this.content = memento.getContent();
    }
}

//使用
let editor = new Editor();
let careTaker = new CareTaker();

editor.setContent("111");
editor.setContent("222");
careTaker.add(editor.saveContentToMemento()); //储存备忘录
editor.setContent("333");
careTaker.add(editor.saveContentToMemento());

editor.getContentFromMemento(careTaker.get(1));//撤销

