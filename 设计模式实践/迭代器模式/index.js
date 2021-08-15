/**
 *  迭代模式: 
 *      顺序访问一个集合
 *      使用者无需知道集合的内部结构
 *      应用: ES6Iterator迭代器，jquery的each
 */

//迭代器的简单实现: 

class Iterator {
    constructor(container){
        this.list = container.list;
        this.index = 0;
    }

    next(){
        if(this.hasNext()) {
            return this.list[this.index++];
        }
        return null;
    }

    hasNext(){
        if(this.index >= this.list.length){
            return false;
        }
        return true;
    }
}

class Container {
    constructor(list){
        this.list = list;
    }

    getIterator(){
        return new Iterator(this);
    }
}




//内部迭代器：
    // 内部定义好规则，完全接受整个迭代过程，外部只需要一次初始调用
    // eg:
    //实现一个each迭代器
const each = function(ary, callback){
    for(let i=0; i<ary.length; i++) {
        callback.call(ary[i], i, ary[i]);
    }
}

each( [1,2,3], function(i, n){
    alert(i, n);
} )

//外部迭代器:
    // 外部迭代器必须显式请求迭代下一个元素:
// 实现一个Iterator:
const Iterator = function(obj){
    let current = 0;
    
    const next = function(){
        current++;
    }
    const isDone = function(){
        return current >= obj.length
    }
    const getCurrentItem = function(){
        return obj[current];
    }
    return {
        next,
        isDone,
        getCurrentItem
    }
}    

//jq each的实现:
$.each = function( obj, callback ) {
    var value,
    i = 0,
    length = obj.length,
    isArray = isArraylike( obj );
    if ( isArray ) { // 迭代类数组
    for ( ; i < length; i++ ) {
    value = callback.call( obj[ i ], i, obj[ i ] );
    if ( value === false ) {
    break;
    }
    }
    } else {
    for ( i in obj ) { // 迭代object 对象
    value = callback.call( obj[ i ], i, obj[ i ] );
    if ( value === false ) {
    break;
    }
    }
    }
    return obj;
};

//倒叙迭代器: 
const reverseEach = function( ary, callback ){
    for ( var l = ary.length - 1; l >= 0; l-- ){
       callback( l, ary[ l ] );
    }
}

//中止迭代器:
const each = function( ary, callback ){
    for ( var i = 0, l = ary.length; i < l; i++ ){
    if ( callback( i, ary[ i ] ) === false ){ // callback 的执行结果返回false，提前终止迭代
    break;
    }
    }
};

each( [ 1, 2, 3, 4, 5 ], function( i, n ){
    if ( n > 3 ){ // n 大于3 的时候终止循环
    return false;
    }
    console.log( n ); // 分别输出：1, 2, 3
});
