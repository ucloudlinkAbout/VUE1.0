/**
 * Created by chenwenxiao on 2016/8/19.
 */
import baseCheck from '../../../src/libs/base/baseCheck.js';

describe('基础校验库的测试用例', function () {
    var bc = new baseCheck();
    it('数字校验', function () {
        assert.equal(true, bc.isNumber(123));
        assert.equal(true, bc.isNumber('123'));
        assert.equal(false, bc.isNumber('12345a'));
        assert.equal(false, bc.isNumber({}));
        assert.equal(false, bc.isNumber(['afdsf', '1245']));
        assert.equal(false, bc.isNumber(function () {
        }));
    });
    it('是否是function校验', function () {
        assert.equal(true, bc.isFunction(function () {
        }));
        assert.equal(false, bc.isFunction('123'));
        assert.equal(false, bc.isFunction('12345a'));
        assert.equal(false, bc.isFunction(['afdsf', '1245']));
        assert.equal(false, bc.isFunction({}));
    });
    it('是否是对象校验', function () {
        assert.equal(false, bc.isObject(123));
        assert.equal(false, bc.isObject('123'));
        assert.equal(false, bc.isObject('12345a'));
        assert.equal(true, bc.isObject({}));
        assert.equal(true, bc.isObject(['afdsf', '1245']));
        assert.equal(false, bc.isObject(function () {
        }));
    });
    it('是否是字符串校验', function () {
        assert.equal(false, bc.isString(123));
        assert.equal(true, bc.isString('123'));
        assert.equal(true, bc.isString('12345a'));
        assert.equal(false, bc.isString({}));
        assert.equal(false, bc.isString(['afdsf', '1245']));
        assert.equal(false, bc.isString(function () {
        }));
    });
    it('是否是数组校验', function () {
        assert.equal(false, bc.isArr(123));
        assert.equal(false, bc.isArr('123'));
        assert.equal(false, bc.isArr('12345a'));
        assert.equal(false, bc.isArr({}));
        assert.equal(true, bc.isArr(['afdsf', '1245']));
        assert.equal(false, bc.isArr(function () {
        }));
    });
    it('邮箱验证', function () {
        assert.equal(false, bc.isMail(123));
        assert.equal(false, bc.isMail('123'));
        assert.equal(false, bc.isMail('12345a@'));
        assert.equal(true, bc.isMail('1234@qq.com'));
        assert.equal(true, bc.isMail('cshew@foxmail.com'));
        assert.equal(false, bc.isMail('124154545@qq'));
    });
    it('电话验证', function () {
        assert.equal(false, bc.isPhone(123));
        assert.equal(false, bc.isPhone('123'));
        assert.equal(true, bc.isPhone(13480655488));
        assert.equal(true, bc.isPhone('07552020645'));
        assert.equal(true, bc.isPhone('0755-20721544'));
        assert.equal(true, bc.isPhone('075-20205645'));
    });
    it('身份证验证', function () {
        assert.equal(false, bc.isPort(123));
        assert.equal(false, bc.isPort('512566888212526578x'));
        assert.equal(true, bc.isPort('512566888212526578'));
        assert.equal(true, bc.isPort('51256688821252657x'));
        assert.equal(true, bc.isPort('157847854768548'));
        assert.equal(false, bc.isPort('0755-20721544'));
        assert.equal(false, bc.isPort('075-20205645'));
    });
    it('qq号验证', function () {
        assert.equal(false, bc.isQQ(123));
        assert.equal(false, bc.isQQ('002451'));
        assert.equal(false, bc.isQQ('1542451544545487'));
        assert.equal(true, bc.isQQ('154245487'));
        assert.equal(true, bc.isQQ('1547785'));
    });
    it('邮编验证', function () {
        assert.equal(false, bc.isMailNumber(123));
        assert.equal(true, bc.isMailNumber('531520'));
        assert.equal(false, bc.isMailNumber('015487'));
        assert.equal(false, bc.isMailNumber('15487a'));
        assert.equal(false, bc.isMailNumber('154245487'));
        assert.equal(false, bc.isMailNumber('1547785'));
    });
    it('IMEI号验证', function () {
        assert.equal(false, bc.isIMEI(123));
        assert.equal(false, bc.isIMEI('002451'));
        assert.equal(true, bc.isIMEI('157868478564571684974256'));
        assert.equal(false, bc.isIMEI('5786847856457168497425654'));
        assert.equal(false, bc.isIMEI('057868478564571684974256'));
        assert.equal(false, bc.isIMEI('15786847856457168497425a'));
    });
    it('IP验证', function () {
        assert.equal(false, bc.isIP(123));
        assert.equal(false, bc.isIP('002451'));
        assert.equal(true, bc.isIP('127.0.0.1'));
        assert.equal(true, bc.isIP('255.34.56.1'));
        assert.equal(false, bc.isIP('5786847856457168497425654'));
        assert.equal(false, bc.isIP('1545.54.45.45'));
        assert.equal(false, bc.isIP('145.4884.455.15'));
    });
    
    it('正浮点数验证', function () {
        assert.equal(false, bc.isPositvePoint(123));
        assert.equal(true, bc.isPositvePoint(123.45));
        assert.equal(false, bc.isPositvePoint('0.'));
        assert.equal(false, bc.isPositvePoint('0.adf'));
        assert.equal(true, bc.isPositvePoint('3.1415926'));
        assert.equal(true, bc.isPositvePoint('1545.56'));
        assert.equal(true, bc.isPositvePoint('0.24578'));
        assert.equal(false, bc.isPositvePoint('-0.58774'));
    });
    it('负浮点数验证', function () {
        assert.equal(false, bc.isNegativePoint(123));
        assert.equal(true, bc.isNegativePoint(-123.45));
        assert.equal(false, bc.isNegativePoint('0.'));
        assert.equal(false, bc.isNegativePoint('0.adf'));
        assert.equal(true, bc.isNegativePoint('-3.1415926'));
        assert.equal(false, bc.isNegativePoint('1545.56'));
        assert.equal(false, bc.isNegativePoint('0.24578'));
        assert.equal(true, bc.isNegativePoint('-0.58774'));
    });
    it('是否含有空格', function () {
        assert.equal(true, bc.hasSpace(123));
        assert.equal(true, bc.hasSpace(-123.45));
        assert.equal(false, bc.hasSpace('0. '));
        assert.equal(false, bc.hasSpace('0.adf  '));
        assert.equal(false, bc.hasSpace('-3.141592sfsfsdf  6'));
        assert.equal(false, bc.hasSpace(' 1545.56'));
        assert.equal(false, bc.hasSpace('0.24sdf 578 '));
        assert.equal(false, bc.hasSpace('  -0.58774'));
    });
    it('是否是合法的字符串校验（有字母合适数字还有下划线组成）', function () {
        assert.equal(false, bc.isLegitimateStr('sdfsafaff dfsd5f4 5s'));
        assert.equal(true, bc.isLegitimateStr('jaghakhfj_djgjdf'));
        assert.equal(true, bc.isLegitimateStr('jasd@aa.ccc'));
        assert.equal(true, bc.isLegitimateStr('0.adf@'));
        assert.equal(false, bc.isLegitimateStr('0.adf @  '));
        assert.equal(false, bc.isLegitimateStr('0. #%#^%$#'));
        assert.equal(false, bc.isLegitimateStr('-3.141592sfsfsd;f  6'));
        assert.equal(false, bc.isLegitimateStr(' 1545.56"'));
        assert.equal(false, bc.isLegitimateStr('0.24sdf 578[$]'));
        assert.equal(false, bc.isLegitimateStr("  -0.58774'"));
    });
    it('综合校验功能的测试', function () {
        assert.equal(false, bc.checkLt(['isMail', 'hasSpace'], '   cwxfdds@foxmail.com').check);
        assert.equal(true, bc.checkLt(['isMail', 'hasSpace'], 'cwxfdds@foxmail.com').check);
        assert.equal(false, bc.checkLt(['isMail', 'hasSpace'], 'cwxfdds.foxmail.com').check);

        assert.equal(false, bc.checkLt(['isQQ', 'hasSpace', 'isNumber'], 'cwxfdds.foxmail.com').check);
        assert.equal(true, bc.checkLt(['isQQ', 'hasSpace', 'isNumber'], '394679822').check);
        assert.equal(false, bc.checkLt(['isQQ', 'hasSpace', 'isNumber'], '123').check);
        assert.equal(false, bc.checkLt(['isQQ', 'hasSpace', 'isNumber'], '394679822 ').check);

        assert.equal(true, bc.checkLt(['isPositvePoint', 'hasSpace'], '0.2445').check);
        assert.equal(false, bc.checkLt(['isPositvePoint', 'hasSpace'], '  0.2445').check);
        assert.equal(false, bc.checkLt(['isPositvePoint', 'hasSpace'], 'c0.2445').check);
    });
});
