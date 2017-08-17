/**
 * Created by chenwenxiao on 2016/11/10.
 */
import util from '../../../src/libs/base/util.js';

describe('工具类测试用例', function () {
    var ul = util.util;
    it('数组排序测试', function () {
        var dataList = [{abc: '128', time: '1274851521000'},
            {abc: '125', time: '1274851521002'},
            {abc: '129', time: '1274851521002'}];
        ul.arraySortByTag(dataList, 'abc', false);

        /*非倒序排列dataList，关键值为abc*/
        assert.equal(true, dataList[0].abc == 125);
        assert.equal(true, dataList[1].abc == 128);
        assert.equal(true, dataList[2].abc == 129);

        /*倒序排列dataList，关键值为time*/
        ul.arraySortByTag(dataList, 'time', true);
        assert.equal(true, dataList[0].time == 1274851521002);
        assert.equal(true, dataList[1].time == 1274851521002);
        assert.equal(true, dataList[2].time == 1274851521000);
    });


});