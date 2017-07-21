/*
* @Author: zhangyujie
* @Date:   2017-05-17 21:03:26
* @Last Modified by:   FunctionRun
* @Last Modified time: 2017-05-27 11:26:26
* @Email: zhangyujie3344521@163.com
* @File Path: /Users/zhangyujie/node/gitlab/tueasy/tueasy5/tueasy-api/server/util/queryToFilterAndLimit.js
* @File Name: queryToFilterAndLimit.js
* @Descript: 
*/

'use strict';
export default function queryToFilterAndLimit(query) {

    let filter = '';
    let limit = [];
    for(let key in query) {

        const value = query[key];

        if ((!value && value != '0') || key == 'timestamp') {

            continue;

        }
        switch (key) {

        case 'page': 
            limit[0] = Number(value);
            break;

        case 'number': 
            limit[1] = Number(value);
            break;

        case 'createTime': {

            const [start, end] = value.split(',');

            if(start && end) {
                
                filter += ` AND App.create_time BETWEEN  "${start}" AND "${end}" `;

            } else if (start) {

                filter += ` AND App.create_time > "${start}" `;
            
            } else if (end) {

                filter += ` AND App.create_time < "${end}" `;
            
            }

            break; 
        
        }
           
        case 'keywords': {

            const keywords = value.split(',');

            filter = keywords.reduce((acc, k) => { 

                return acc + ` AND App.name LIKE "%${k}%" or App.pages LIKE "%${k}%" `;
            
            }, filter);
            
            break;
        
        } 

        default: 

            filter += ` AND App.${key} = "${value}" `;

        }
        
    }
    limit = (limit.length === 2 ? [limit[0] * limit[1], limit[1]] : []);


    return {
        filter,
        limit
    };

}