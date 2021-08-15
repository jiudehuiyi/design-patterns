/**
 *    策略模式: 将定义一组算法封装起来，使它们可以互相之间替换(封装算法具有一定独立性，不会随着客户端变化而变化)
 *    它是不依赖某个内部状态，是将实现细节隐藏，通过内部算法对象进行维持，他和状态模式及其相似。
 *    状态模式是维护变量对象，而策略模式则是维护实现方法
*/

// eg:
class Price {

    priceState = {
        return30: function(_price) {
            return _price * 0.3;
        },

        return50: function(_price) {
            return _price * 50
        }
    }

    finnaly(type, price){
        return this.priceState[type](price)
    }
}

