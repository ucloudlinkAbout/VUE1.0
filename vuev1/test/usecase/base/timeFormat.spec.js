/**
 * Created by chenwenxiao on 2016/10/22.
 */
import timeFormat from '../../../src/libs/base/timeFormat.js';

describe('时间转换类库测试用例', function () {
    var tf = new timeFormat();
    it('获取当前浏览器的时区', function () {
        assert.equal(8, tf.getBrowserGMT());
    });
    it('获取当前浏览器时区的修正', function () {
        assert.equal(-480, tf.getDateZoneOffset());
    });
    it('转换时间long格式到yyyy-mm-dd hh-MM-ss', function () {
        assert.equal('2016-10-10 11:01:22', tf.getFormatTime(1476068482969, 8));
        assert.equal('2016-10-09 18:01:22', tf.getFormatTime('1476068482969', -9));
        assert.equal('2016-10-10 15:01:22', tf.getFormatTime('1476068482969', 12));
        assert.equal('2016-10-10 10:59:33', tf.getFormatTime('1476068373137', 8));
        assert.equal('2016-10-10 05:59:33', tf.getFormatTime('1476068373137', 3));
    });
    it('转换时间yyyy-mm-dd hh-MM-ss格式到long', function () {
        assert.equal(1476068482000, tf.formatTimeTolong('2016-10-10 11:01:22'));
        assert.equal(1476068482000, tf.formatTimeTolong('2016-10-10 11:01:22', 8));
        assert.equal(1476068482000, tf.formatTimeTolong('2016-10-10 15:01:22', 12));
        assert.equal(1476068482000, tf.formatTimeTolong('2016-10-10 19:01:22', 16));
        assert.equal(1476068482000, tf.formatTimeTolong('2016-10-09 18:01:22', -9));
        assert.equal(1476068373000, tf.formatTimeTolong('2016-10-10 10:59:33', 8));
        assert.equal(1476068373000, tf.formatTimeTolong('2016-10-10 05:59:33', 3));
    });
});
