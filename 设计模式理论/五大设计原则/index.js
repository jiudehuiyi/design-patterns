//五大设计原则： solid
// 1. S-单一职责原则
    // 它被定义为引起变化的原因，具体体现为 一个对象或者方法只做一件事情,
    //应用： 代理模式，迭代模式，单例模式，装饰器模式
    // 1.1 代理模式: 
    // 负责将图片加载到dom中:
    var myImage = (function(){
        var imgNode = document.createElement( 'img' );
        document.body.appendChild( imgNode );
        return {
        setSrc: function( src ){
            imgNode.src = src;
        }
        }
        })();
    //负责将创建图片
    var proxyImage = (function(){
            var img = new Image;
            img.onload = function(){
            myImage.setSrc( this.src );
            }
            return {
            setSrc: function( src ){
            myImage.setSrc( 'file:// /C:/Users/svenzeng/Desktop/loading.gif' );
            img.src = src;
            }
            }
        })();

    // 它们都有着各自的工作和职责，都有着被修改的动机，当它们各自发生变化的时候，也不会影响另外一个对象
    
    // 1.2 迭代器模式:
        var appendChild = function(data) {
            for(let i=0; i< data.length; i++) {
                let div = document.createElement("div");
                div.innerHTML = data[i];
                document.body.appendChild(div);
            }
        }
        appendChild([1,2,3,4]);
        //这个写法存在缺点是承担着两个职责，第一个为聚合数据，第二个渲染视图, 当如果数组变成对象，那么整个方法都需要修改

        //所以遵循单一职责原则，可以设计为如下:
        // 聚合对象:
            var each = function(obj, callback){
                let value ,
                    i = 0,
                    length = obj.length,
                    isArray = Array.isArray(obj);

                if(isArray){
                    for(; i<length; i++) {
                        callback.call(obj[i], i, obj);
                    }
                }else {
                    for(i in obj) {
                        value = callback.call(obj[i], i, obj);
                    }
                }
                return obj;
            }

            var appendDiv = function( data ){
                each( data, function( i, n ){
                var div = document.createElement( 'div' );
                div.innerHTML = n;
                document.body.appendChild( div );
            });
            };
    //什么时候不需要分离?
        // 1.两个需求总是同时变化的,例如创建xhr和发送xhr总是同时进行的
        // 2.职责的变化轴线仅当它们确定会发生变化时才具有意义，即使两个职责已经被耦
        // 合在一起，但它们还没有发生改变的征兆，那么也许没有必要主动分离它们，在代码需要重构的
        // 时候再进行分离也不迟
    // 优缺点:
    //     优点是降低了单个类或者对象的复杂度，按照职责把对象分解成更小的粒度，
    // 这有助于代码的复用，也有利于进行单元测试。当一个职责需要变更的时候，不会影响到其他
    // 的职责。
    // 缺点，最明显的是会增加编写代码的复杂度。当我们按照职责把对象
    // 分解成更小的粒度之后，实际上也增大了这些对象之间相互联系的难度    


// 2. O-开放封闭原则
        // 定义：类型，函数，模块可以拓展，但是不可以修改
            // 例如：有一个1000行的函数，需要加上别的需求:我们可以通过动态装饰函数来完成(不优雅, 但是比修改源代码是一个更好的方案)
            window.onload = (window.onload || function(){}).after( function(){
                //完成相关业务需求
            } )

        // 其中if/else和switch是违反开放封闭原则最多的方式之一
        // 解决的关键就是:利用多态的思想，把程序相同的部分抽离出来，把可变的封装起来，因此就不用直接去改动程序内部代码，只需要关注每个实例的方法即可:
        //违反开放封闭原则代码：
        var makeSound = function( animal ){
            if ( animal instanceof Duck ){
            console.log( '嘎嘎嘎' );
            }else if ( animal instanceof Chicken ){
            console.log( '咯咯咯' );
            }
            };
            var Duck = function(){};
            var Chicken = function(){};
            makeSound( new Duck() ); // 输出：嘎嘎嘎
            makeSound( new Chicken() );
        //改造后的代码：
        var makeSound = function( animal ){
            if ( animal instanceof Duck ){
            console.log( '嘎嘎嘎' );
            }else if ( animal instanceof Chicken ){
            console.log( '咯咯咯' );
            }else if ( animal instanceof Dog ){ // 增加跟狗叫声相关的代码
            console.log('汪汪汪' );
            }
            };
            var Dog = function(){};
            makeSound( new Dog() );
            
            var makeSound = function( animal ){
                animal.sound();
                };
                var Duck = function(){};
                Duck.prototype.sound = function(){
                console.log( '嘎嘎嘎' );
                };
                var Chicken = function(){};
                Chicken.prototype.sound = function(){
                console.log( '咯咯咯' );
                };
                makeSound( new Duck() ); // 嘎嘎嘎
                makeSound( new Chicken() ); // 咯咯咯
                /********* 增加动物狗，不用改动原有的makeSound 函数 ****************/
                var Dog = function(){};
                Dog.prototype.sound = function(){
                console.log( '汪汪汪' );
                };
                makeSound( new Dog() );           



// 3. L-里氏替换原则
        // 定义: 子类对象可以替换父类对象，而程序的逻辑不变
        // 尽量不要从可实例化的父类继承，而是要使用继续抽象类或者接口继承


// 4. I-接口独立原则: 
    // 指明客户（client）应该不依赖于它不使用的方法。接口隔离原则(ISP)的目的是系统解开耦合，从而容易重构，更改和重新部署。

// 5. D-依赖反转原则:
// 高层次模块不能依赖低层次模块，它们依赖于抽象接口，抽象接口不能依赖具体实现，具体实现依赖抽象接口。总结下来就两个字，解耦。