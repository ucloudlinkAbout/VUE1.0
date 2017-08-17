/**
 * Created by chenwenxiao on 2016/11/16.
 * 客户端session控制功能，基于对缓存cookie的处理
 */
import CookieHelper from './cookieHelper'

class session {
    
    /**
     * 登录成功后，会保留cookie的值
     * @param {string} token access_token
     * @param {string} loginCustomerId loginCustomerId
     * @param {string} language language
     * @param {string} username 用户名
     * */
    saveSession(token, loginCustomerId, language, username) {
        const cookie = new CookieHelper();
        cookie.setCookie('access_token', token, window.SystemGlobe.devType.sessionTimeOut, window.SystemGlobe.devType.cookieDomain);
        cookie.setCookie('loginCustomerId', loginCustomerId, window.SystemGlobe.devType.sessionTimeOut, window.SystemGlobe.devType.cookieDomain);
        cookie.setCookie('language', language, window.SystemGlobe.devType.sessionTimeOut, window.SystemGlobe.devType.cookieDomain);
        cookie.setCookie('username', username, window.SystemGlobe.devType.sessionTimeOut, window.SystemGlobe.devType.cookieDomain);
    }
    
    /**
     * 检查是否存在cookie，返回bool值
     * @return {boolean} 返回bool值
     * */
    checkSession() {
        const cookie = new CookieHelper();
        if (cookie.getCookie('access_token')) {
            return true;
        }
        return false;
    }
    
    /**
     * 获取loginCustomerId
     * @return {string} 返回loginCustomerId
     * */
    getLoginCustomerId() {
        const cookie = new CookieHelper();
        return cookie.getCookie('loginCustomerId');
    }
    
    /**
     * 获取access_token
     * @return {string} 返回access_token
     * */
    getAccessToken() {
        const cookie = new CookieHelper();
        return cookie.getCookie('access_token');
    }
}

export default session;
