/*
* @Author: zhangyujie
* @Date:   2016-12-09 18:40:33
* @Last Modified by:   zhangyujie
* @Last Modified time: 2017-05-24 11:53:19
* @Email: zhangyujie3344521@163.com
* @File Path: E:\item\tueasy5\tueasy5-api\server\util\jsExtends.js
* @File Name: jsExtends.js
* @Descript:
*/

'use strict';
Date.prototype.format = function (fmt) {

 //author: meizz
    var o = {
        'M+': this.getMonth() + 1, //月份
        'd+': this.getDate(), //日
        'h+': this.getHours(), //小时
        'm+': this.getMinutes(), //分
        's+': this.getSeconds(), //秒
        'q+': Math.floor((this.getMonth() + 3) / 3), //季度
        'S': this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
    return fmt;

};