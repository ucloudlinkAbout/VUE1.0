/**
 * Created by chenwenxiao on 2016/10/22.
 */
import authorizeHelper from '../../../src/libs/base/authorizeHelper.js';

describe('授权字段填充的实现', function () {
    var ah = new authorizeHelper();
    //使用对比方法是第一个参数一定要比第二个参数的对象参数多才行
    var objLike = function (obj1, obj2) {
        for (var d in obj1) {
            try {
                if (obj2[d] === undefined) {
                    return false;
                }
            } catch (e) {
                return false;
            }
        }
        return true;
    };
    it('填充授权字段用例', function () {
        localStorage.loginCustomerId = '56a71be2f5b95a6ed2ce9902';
        assert.equal(true, objLike({
            name: 'abccc',
            curstomerId: '57fb048226cf6706011bbd22',
            loginCustomerId: '56a71be2f5b95a6ed2ce9902',
            streamNo: 'web_bss147712988212644074',
            partnerCode: 'UKWEB'
        }, ah.authorize({name: 'abccc', curstomerId: '57fb048226cf6706011bbd22'})));
        
        assert.equal(true, objLike({
            name: 'abccc',
            curstomerId: '57fb048226cf6706011bbd22',
            age: 20,
            loginCustomerId: '56a71be2f5b95a6ed2ce9902',
            streamNo: 'web_bss147712988212644074',
            partnerCode: 'UKWEB'
        }, ah.authorize({name: 'abccc', age: 20, curstomerId: '57fb048226cf6706011bbd22'})));
        
        assert.equal(false, objLike(ah.authorize({name: 'abccc', age: 20, curstomerId: '57fb048226cf6706011bbd22'}), {
            name: 'abccc',
            curstomerId: '57fb048226cf6706011bbd22',
            loginCustomerId: '56a71be2f5b95a6ed2ce9902',
            streamNo: 'web_bss147712988212644074',
            partnerCode: 'UKWEB'
        }));
    });
    
    it('去除授权相关的字段填充', function () {
        var obj = {
            name: 'abccc',
            curstomerId: '57fb048226cf6706011bbd22',
            age: 20,
            loginCustomerId: '56a71be2f5b95a6ed2ce9902',
            streamNo: 'web_bss147712988212644074',
            partnerCode: 'UKWEB'
        };
        assert.equal(true, objLike(obj, ah.deAuthorize(obj)));
    });
});