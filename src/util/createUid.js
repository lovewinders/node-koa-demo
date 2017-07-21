/*
* @Author: zhangyujie
* @Date:   2017-03-21 11:12:51
* @Last Modified by:   zhangyujie
* @Last Modified time: 2017-05-24 11:53:02
* @Email: zhangyujie3344521@163.com
* @File Path: E:\item\tueasy5\tueasy5\tueasy-api\server\util\createUid.js
* @File Name: createUid.js
* @Descript: 负责创建widgetId, pageId
*/

'use strict';
import MD5 from './md5';

export function getWidgetUid() {

    return 'w' + MD5('' + (new Date()).getTime() + Math.random() * 10000);

}

export function  getPageUid() {

    return 'p' + MD5('' + (new Date()).getTime() + Math.random() * 10000);

}