/**
 * Created by cwx on 2016/11/14.
 */
import cookie from '../../../src/libs/base/cookieHelper.js';

describe('cookie处理测试用例', function () {
    var cook = new cookie();
    it('添加cookie测试', function () {
        cook.setCookie('login', 'abcd', 1);
        cook.setCookie('login1', 'abcadd', 1);
        cook.setCookie('login2', 'abcaasdfd', 1);
    });
    it('添加获取cookie测试', function () {
        assert.equal('abcd', cook.getCookie('login'));
        assert.equal('abcadd', cook.getCookie('login1'));
        assert.equal('abcaasdfd', cook.getCookie('login2'));
    });
    it('删除某个cookie测试', function () {
        cook.clearCookie('login2');
        assert.equal('', cook.getCookie('login2'));
    });
    it('清空cookie测试', function () {
        cook.clearAll();
        assert.equal('', cook.getCookie('login'));
        assert.equal('', cook.getCookie('login1'));
        assert.equal('', cook.getCookie('login2'));
    });
});