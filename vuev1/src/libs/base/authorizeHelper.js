/**
 * Created by chenwenxiao on 2016/8/19.
 * 描述：授权字段填充的实现
 */
import Store from './store'

class authorizeHelper {
    /**
     * 填充授权字段
     * @param {object} d 需要授权的对象
     * @return {object} 经过授权的字段
     * */
    authorize(d) {
        d = d || {};
        const store = new Store();
        d.loginCustomerId = store.localGet('loginCustomerId');
        var date = new Date();
        d.streamNo = 'web_bss' + date.getTime() + parseInt(Math.random() * 1000000);
        d.partnerCode = window.SystemGlobe.devType.partnerCode;
        return d;
    }

    /**
     * 去除授权相关的字段填充
     * @param {object} d 需要去除授权的对象
     * @return {object} 去除授权的字段
     * */
    deAuthorize(d) {
        delete d.loginCustomerId;
        delete d.streamNo;
        delete d.partnerCode;
        return d;
    }

}

export default authorizeHelper;
