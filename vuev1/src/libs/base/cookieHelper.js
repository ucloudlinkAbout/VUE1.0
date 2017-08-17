/**
 * Created by chenwenxiao on 2016/8/19.
 * cookie控制功能
 */

class cookieHelper {

    /**
     * 保存cookie
     * @param {string} cname cookie名称
     * @param {string} cvalue cookie值
     * @param {string} second cookie时效，以秒为单位
     * @param {string} host cookie站点
     * */
    setCookie(cname, cvalue, second, host) {
        host = host || 'localhost';
        var d = new Date();
        d.setTime(d.getTime() + (second * 1000));
        var expires = 'expires=' + d.toUTCString();
        document.cookie = cname + '=' + cvalue + ';' + expires + ';domain=' + host;
    }

    /**
     * 获取存储在客户端的cookie
     * @param {string} cname cookie名称
     * @return {string} 需要获取的cookie
     * */
    getCookie(cname) {
        var name = cname + '=';
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1);
            if (c.indexOf(name) !== -1) return c.substring(name.length, c.length);
        }
        return '';
    }

    /**
     * 删除指定的cookie
     * @param {string} name cookie名称
     * @param {string} host cookie的host
     * */
    clearCookie(name, host) {
        this.setCookie(name, '', -1, host);
    }

    /**
     * 清空所有的cookie
     * */
    clearAll() {
        //修改了一下，不知能否实现删除效果，若不能需要重写
        var keys = document.cookie.match(/[^ =;]+(?==)/g);
        if (keys) {
            for (var i = keys.length; i--;) {
                document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString();
            }
        }
    }
}

export default cookieHelper;
