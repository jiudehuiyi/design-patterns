/**
 *  状态模式: 当一个对象内部状态改变，会导致其行为的改变
 * 
*/
//if else 和switch的优雅实现方式
class ResultState {

    States = {
        state0: function() {},

        state1: function() {},

        state2: function() {}
    }

    State1 = {
        state0: function() {},

        state1: function() {},

        state2: function() {}
    }

    //暴露一个调用States的方法

    show(_state) {
        return this.States[_state];
    }

    show1(_state) {
        return this.State1(_state);
    }

}