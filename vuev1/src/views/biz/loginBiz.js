/**
 * Created by chenwenxiao on 2016/8/31.
 * 登录处理逻辑模块
 */

import Ajax from '../../libs/base/ajax'
import Md5 from '../../libs/reference/md5'
import Encryption from '../../libs/base/encryption'
import Store from '../../libs/base/store'
import Session from '../../libs/base/session'
import debug from '../../libs/base/debug'

class login {
    /**
     * 获取本地存储的密码和用户名
     * @param {string} data.loginname 登录用户名
     * @param {string} data.password 密码
     * @return {function} promise对象
     * */
    login(data) {
        return new Promise(function (resolve, reject) {
            const session = new Session();
            const store = new Store();
            // session.saveSession('sfsf', 'sfsf', store.localGet('language'), data.loginname);
            // resolve('aaa');
            // return;
            Ajax.ajax({
                url: window.SystemGlobe.url.loginforoms.login,
                method: 'post',
                json: true,
                data: {
                    streamNo: 'web_bss' + new Date().getTime() + parseInt(Math.random() * 1000000),
                    partnerCode: window.SystemGlobe.devType.partnerCode,
                    loginCustomerId: '',
                    clientId: window.SystemGlobe.devType.clientId,
                    clientSecret: window.SystemGlobe.devType.clientSecret,
                    userCode: data.loginname,
                    password: Md5.faultylabs.MD5(data.password).toLowerCase()
                }
            }).then(function (d) {
                if (d.resultCode === '00000000') {
                    store.localSave('loginCustomerId', d.data.loginCustomerId);
                    session.saveSession(d.data.accessToken, d.data.loginCustomerId, store.localGet('language'), data.loginname);
                    resolve(d);
                } else {
                    reject(d);
                }
            }, function (ed) {
                debug.clog(ed);
            });
        });
    }

    /**
     * 获取本地存储的密码和用户名
     * @return {object} 本地存储的密码和用户名对象
     * */
    getDeCodePwd() {
        const en = new Encryption();
        const store = new Store();
        const pwd = store.localGet('pwd');
        const user = store.localGet('user');
        if (pwd !== '' && pwd !== undefined && pwd !== null && user !== '' && user !== undefined && user !== null) {
            return {
                userName: en.deEncryption(user),
                password: en.deEncryption(pwd)
            };
        }
        return {};
    }

    /**
     * 存储加密的密码和用户名到本地
     * @param {string} pwd 密码
     * @param {string} user 用户名
     * */
    saveCodePwd(pwd, user) {
        const en = new Encryption();
        const store = new Store();
        if (pwd === '') {
            store.localDelete('pwd');
        } else {
            store.localSave('pwd', en.encryption(pwd));
        }
        if (user === '') {
            store.localDelete('user');
        } else {
            store.localSave('user', en.encryption(user));
        }
    }
}
export default login
