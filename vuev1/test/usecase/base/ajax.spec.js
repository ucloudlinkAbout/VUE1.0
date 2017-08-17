/**
 * Created by chenwenxiao on 2016/10/22.
 */
import ajax from '../../../src/libs/base/ajax.js';
import lanLoader from '../../../src/libs/base/lanLoader.js';

describe('ajax和多语言的测试用例', function () {
    var gl = lanLoader.getLan;
    it('ajax调用语言文件测试', function () {
        var arr1 = [];
        var arr2 = [];
        gl('c_input').then(function (d) {
            arr1.push('d');
            arr2.push({
                "nulls": "长度不符合要求！",
                "email": "请填写正确的邮箱格式！",
                "imei": "请填写正确的IMEI格式，24位数字！",
                "atless": "至少",
                "w": "位"
            });
            assert.sameDeepMembers(arr1, arr2, 'ajax和多语言的测试用例');
        });
    });
});