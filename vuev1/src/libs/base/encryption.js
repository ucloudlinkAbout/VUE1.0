/**
 * Created by cwx on 2016/11/15.
 * 客户端密码简单加密模块
 */

class encryption {
    /**
     * 字符串解密
     * @param {string} str 字符串
     * */
    deEncryption(str) {
        str = str || '';
        const arr = str.split(',');
        let deStr = '';
        for (var i = 0; i < arr.length; i++) {
            deStr += String.fromCharCode(arr[i] / 2 - 10);
        }
        return deStr;
    }
    
    /**
     * 字符串加密
     * @param {string} str 字符串
     * */
    encryption(str) {
        str = str || '';
        let enStr = '';
        for (var i = 0; i < str.length; i++) {
            enStr += ((str[i].charCodeAt(0) + 10) * 2).toString() + ',';
        }
        return enStr.substring(0, enStr.length - 1);
    }
}

export default encryption;
