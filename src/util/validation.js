/*
* @Author: huanghongqiang
* @Date:   2016-07-15 14:35:28
* @Last Modified by:   zhangyujie
* @Last Modified time: 2017-05-24 11:54:33
* @Email: st8817@163.com
* @File Path: E:\item\tueasy5\tueasy5-api\server\util\validation.js
* @File Name: validation.js
* @Descript: 参数验证的工具类
*/

class Validation{
	//用户名
    static userReg(){
        return '[a-zA-Z0-9@._-]{4,60}';
    }

    //密码
    static passwordReg(){
        return '[a-zA-Z0-9@._-]{4,60}';
    }

    //英文字母
    static letterReg(){
        return '[a-zA-Z0-9]*';
    }

    //数值
    static numberReg(){
        return '[0-9]*';
    }

    static dateReg(){
        return /^(?:19|20)[0-9][0-9]-(?:(?:0[1-9])|(?:1[0-2]))-(?:(?:[0-2][1-9])|(?:[1-3][0-1]))$/;
    }

	//验证用户名是否合法
    static validateUsername(username){
        return !!username && username.match(Validation.userReg()) ;
    }

    //验证用户密码是否合法
    static validatePassword(password){
        return !!password && password.match(Validation.passwordReg());
    }

    static isDate(date){
        return !!date && date.length == 10 && date.match(Validation.dateReg());
    }

    /**
    * 是否英文字母
    * @param src 需要验证的字符
    * @param len 数组 [min,max] 或 [len] 不传则不做限制
    */
    static isLetter(src,len){
        if(src && src.match(Validation.letterReg())){
            const srcLen = src.length;
            if(len && len.length ===1){
                return srcLen == len[0];
            }else if(len && len.length === 2 ){
                return srcLen >=len[0] && srcLen <= len[1];
            }else if(!len){
                return true;
            }
        }
        return false;
    }

    /**
    * 是否为数值
    * @param src 需要验证的字符
    * @param range 数组 [min,max] 或 [len] 不传则不做限制
    */
    static isNumber(src,range){
        if(src && src.match(Validation.numberReg())){
            if(range && range.length ===1){
                return src == range[0];
            }else if(range && range.length === 2 ){
                return src >=range[0] && src <= range[1];
            }else if(!range){
                return true;
            }
        }
        return false ;
    }

}
export default Validation;
