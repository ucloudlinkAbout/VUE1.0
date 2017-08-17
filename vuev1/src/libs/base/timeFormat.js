/**
 * Created by chenwenxiao on 2016/8/23.
 * 描述：处理时区转换功能，后天服务器存储gmt0的时间戳，前端根据实际需要将时间戳转换成需要的
 */

class timeFormat {
    //  获取当前浏览器的时区
    getBrowserGMT() {
        const dates = new Date();
        return -dates.getTimezoneOffset() / 60;
    }

    //  获取当前浏览器时区的修正
    getDateZoneOffset() {
        return new Date().getTimezoneOffset();
    }

    //  转换时间long格式到yyyy-mm-dd hh-MM-ss
    getFormatTime(d, ks) {
        d = parseInt(d);
        d = d + ((ks - this.getBrowserGMT()) * 60 || 0) * 60000;
        let M, h, m, s;
        const date = new Date(d);
        if (!d) {
            return;
        }
        if (parseInt(d) < 86400) {
            return d;
        }
        const Y = date.getFullYear() + '-';
        M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        M = M < 10 ? '0' + M : M;
        const D = (date.getDate() + ' ') < 10 ? '0' + (date.getDate() + ' ') : (date.getDate() + ' ');
        h = date.getHours();
        h = (h < 10 ? '0' + h : h) + ':';
        m = date.getMinutes();
        m = (m < 10 ? '0' + m : m) + ':';
        s = date.getSeconds();
        s = (s < 10 ? '0' + s : s);
        return Y + M + D + h + m + s;
    }

    //  转换时间yyyy-mm-dd hh-MM-ss格式到long
    formatTimeTolong(datetime, ks) {
        ks = ks === undefined ? this.getBrowserGMT() : ks;
        if (!datetime) {
            return;
        }
        let tmpDatetime = datetime.replace(/:/g, '-');
        tmpDatetime = tmpDatetime.replace(/ /g, '-');
        const arr = tmpDatetime.split('-');
        arr[2] = arr[2] || 0;
        arr[3] = arr[3] || 0;
        arr[4] = arr[4] || 0;
        arr[5] = arr[5] || 0;
        const now = new Date(Date.UTC(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], arr[5]));
        const offset = (this.getDateZoneOffset() + (this.getBrowserGMT() - ks) * 60) * 60000;
        return parseInt(now.getTime() + offset);
    }
}
export default timeFormat;
