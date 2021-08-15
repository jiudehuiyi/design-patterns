// 观察者和发布-订阅模式 库的真正应用:

// 观察者的真正应用，他不能细粒度的管控
// $.callback()的拓展体

const rnothtmlwhite = /[^\x20\t\r\n\f]+/g;

function createOptions(options) {
    let object = {};
    ( options.match(rnothtmlwhite) || []).forEach( (flag) => {
        object[flag] = true;
    } );
    return object;
}
function inArray(value, array) {
    if(Array.prototype.indexOf) {
        return array.indexOf(value);
    }else {
        for(let i=0; i<array.length; i++) {
            if(array[i] === value) return i;
        }
    }
    return -1;
}
 

//options参数
// once: 确保这个回调列表只执行（ .fire() ）一次(像一个递延 Deferred).
// memory: 保持以前的值，将添加到这个列表的后面的最新的值立即执行调用任何回调 (像一个递延 Deferred).
// unique: 确保一次只能添加一个回调(所以在列表中没有重复的回调).
// stopOnFalse: 当一个回调返回false 时中断调用

// 方法:
// callbacks.add()        回调列表中添加一个回调或回调的集合。
// callbacks.disable()    禁用回调列表中的回调
// callbacks.disabled()   确定回调列表是否已被禁用。 
// callbacks.empty()      从列表中删除所有的回调.
// callbacks.fire()       用给定的参数调用所有的回调
// callbacks.fired()      访问给定的上下文和参数列表中的所有回调。 
// callbacks.fireWith()   访问给定的上下文和参数列表中的所有回调。
// callbacks.has()        确定列表中是否提供一个回调
// callbacks.lock()       锁定当前状态的回调列表。
// callbacks.locked()     确定回调列表是否已被锁定。
// callbacks.remove()     从回调列表中的删除一个回调或回调集合。

const callbacks = function(options) {

    let 
        //标记列表是否正在触发
        firing,

        //缓存
        memory,

        //标记列表已经触发
        fired,

        //阻止触发的标记
        locked,

        //实际的回调
        list = [],

        //可重复执行列表数据的队列
        queue = [],

        //当前触发的回调引索，add和remove方法需要
        firingIndex = -1,

        options = typeof options === "string" ? 
                    createOptions(options) : 
                    Object.assign({}, options);


        //触发回调callbacks
        fire = function(){
            //强制执行一次
            locked = locked || options.once;
            
            fired = firing = true;

            for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}
            // Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

            if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
        },

        self = {

            //添加回调函数到列表
            add: function(){
                if(list) {
                    // 如果存在缓存，应该触发完毕完毕后在添加
                    if(memory && !firing) {
                        firingIndex = list.length - 1;
                        queue.push( memory );
                    }
                    let _args = Array.prototype.slice.call(arguments);
                    (function(args){

                        args.forEach( (arg) => {
                            if(typeof arg === "string") {
                                if(!options.unique || !self.has(arg)) {
                                    list.push(arg);
                                }
                            }else if(arg && arg.length && typeof arg !== "string") {
                                add(arg);
                            }
                        } );

                    })(_args);
                    if(memory && !firing) {
                        fired();
                    }
                }
                return this;
            },

            //检查给定的回调中是否存在列表中
            has: function(fn){
                return fn ? inArray(fn, list) > -1 : list.length > 0;
            },

            empty: function(){
                if(list) {
                    list = [];
                }
                return this;
            },

            remove: function(){
                let args = Array.prototype.slice.call(arguments);
                _args.forEach( (arg) => {
                    let index ;
                    while( (index = inArray(arg, list)) > -1 ) {
                        list.splice(index, 1);
                        // Handle firing indexes
                        if(index <= firingIndex) {
                            firingIndex--;
                        }
                    }
                } );

                return this;
            },

            disable: function(){
                locked = queue = [];
                list = memory = "";
                return this;
            },
            disabled: function(){
                return !list
            },
            lock: function() {
				locked = queue = [];
				if ( !memory && !firing ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},
            // Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}

           
        }
        return self;
}


React的生命周期

vue的双向绑定