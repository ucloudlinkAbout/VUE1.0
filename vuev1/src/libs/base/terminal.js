/**
 * Created by ligang on 2016/11/14.
 */
'use strict';
export function isPc() {
    if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
        return false;//移动端
    }
    return true;//PC端
}
