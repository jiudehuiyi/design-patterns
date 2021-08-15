/**
 *  适配器模式: 就是一种方法或者框架适配另一种方法或者框架，迁移业务代码
 * 
*/
// 分类:
// 1. 异类框架适配:

// 2. 参数适配（很多插件都用这种方式）
function dosomething(obj) {
    let _adapter = {
        name: "huang",
        age: 20,
        job: "web"
    }
    for(var i in _adapter) {
        _adapter[i] = obj[i] || _adapter[i];
    }

}
// 3.数据适配(服务端数据适配):
// 将不合适的数据转化为合适的数据
