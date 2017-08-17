/**
 * Created by chenwenxiao on 2016/10/25.
 */
import TimeFormat from './timeFormat'

const debug = {
    /**
     * 常规错误类型输出出口（已不推荐使用）
     * @param {string} d 内容
     * @param {string} title 标题
     * */
    log: function (d, title) {
        if (typeof d === 'object') {
            d = JSON.stringify(d);
        }
        window.SystemGlobe.GlobeOption.debugLogList.unshift({
            title: title || '控制台输出',
            content: d
        });
    },
    /**
     * 控制台输出
     * */
    clog(d) {
        console.log(d);
    },
    /**
     * 控制台输出
     * */
    cwarn(d) {
        console.warn(d);
    },
    /**
     * 常规错误类型输出出口
     * @param {string} opt.title 错误题目
     * @param {string} opt.from 错误来源，开发时记得写入在哪个js出错
     * @param {string} opt.content 错误的具体描述
     * */
    debug: function (opt) {
        const tf = new TimeFormat();
        if (typeof opt.content === 'object') {
            opt.content = JSON.stringify(opt.content).substring(0, 2000) + '...';
        }
        window.SystemGlobe.GlobeOption.debugLogList.unshift({
            title: opt.title || '控制台输出',
            time: tf.getFormatTime(new Date().getTime()),
            from: opt.from,
            content: opt.content
        });
    },
    /**
     * 获取debug列表
     * @return {object} debug列表
     * */
    getDebug: function () {
        return window.SystemGlobe.GlobeOption.debugLogList;
    }
};

export default debug;
