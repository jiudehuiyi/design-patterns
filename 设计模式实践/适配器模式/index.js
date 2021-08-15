/**
 *  适配器模式: 又称包装器,用来解决两个软件实体接口或者数据不兼容问题
*/

// 1. 现实中的适配器: 德国插头转换为适配中国插槽的插口:
class Adaptee {
    specificRequest(){
        return "德国标准插头";
    }
}

class Target {
    constructor() {
        this.adaptee = new Adaptee();
    }
    request() {
        let info = this.adaptee.specificRequest();
        return `${info}-转换为-中国标准插头`;
    }
}

// 2. 方法适配:
//将谷歌地图和百度地图都改成show显示，那么就可以使用适配器
var googleMap = {
    show: function(){
        console.log( '开始渲染谷歌地图' );
    }
};
var baiduMap = {
    display: function(){
        console.log( '开始渲染百度地图' );
    }
};

// baiduMap 修改为：baiduMapAdapter
var baiduMapAdapter = {
    show: function(){
        return baiduMap.display();
    }
}

// 3. 数据适配:

var getGuangdongCity = function(){

    var guangdongCity = [
        {
            name: 'shenzhen',
            id: 11,
        }, {
            name: 'guangzhou',
            id: 12,
        }
    ];

    return guangdongCity;
}


// 适配两种不同的格式:
var guangdongCity = {
    shenzhen: 11,
    guangzhou: 12,
    zhuhai: 13
};

var addressAdapter = function(oldAddressFn){
    let address = {},
        oldAddress = oldAddressFn();
        for ( var i = 0, c; c = oldAddress[ i++ ]; ){
            address[ c.name ] = c.id;
        }
        return function(){
            return address;
        }
}



