/**
 * Created by chenwenxiao on 2017/1/13.
 */
import Store from './store'
import { ajaxAuthor } from './ajax'

const agent = {
    userStayTimeStart(menu) {
        let store = new Store();
        if (store.sessionGet('userStayTimeStart')) {
            let data = {};
            data.stayTime = new Date().getTime() - store.sessionGet('userStayTimeStart');
            data.menu = menu;
            this.userPerformanceSubmit(data);
        }
        store.sessionSave('userStayTimeStart', new Date().getTime());
        store.sessionSave('userStayMenu', menu);
    },
    userErrorLogInit() {
        window.onerror = function (msg, url, line, col, error) {
            if (window.SystemGlobe.devType.debug) {
                if (msg !== 'Script error.' && !url) {
                    return true;
                }
                setTimeout(function () {
                    var data = {};
                    col = col || (window.event && window.event.errorCharacter) || 0;
                    data.url = url;
                    data.line = line;
                    data.col = col;
                    if (!!error && !!error.stack) {
                        data.msg = error.stack.toString();
                    } else if (!!arguments.callee) {
                        var ext = [];
                        var f = arguments.callee.caller, c = 3;
                        while (f && (--c > 0)) {
                            ext.push(f.toString());
                            if (f === f.caller) {
                            }
                            f = f.caller;
                        }
                        ext = ext.join(',');
                        data.msg = ext;
                    }
                    ajaxAuthor({
                        method: 'post',
                        url: '/api/saveException',
                        json: true,
                        hideLoading: true,
                        data: data
                    });
                }, 0);
                return true;
            }
        };
        setInterval(function () {
            if (window.SystemGlobe.GlobeOption.timingOption.length > 3) {
                ajaxAuthor({
                    method: 'post',
                    url: '/api/apiTiming',
                    json: true,
                    hideLoading: true,
                    data: {
                        data: window.SystemGlobe.GlobeOption.timingOption
                    }
                });
                window.SystemGlobe.GlobeOption.timingOption = [];
            }
        }, window.SystemGlobe.devType.apiDataSubmitTime);
    },
    userPerformanceSubmit(data) {
        data.location = window.location;
        let nav = window.navigator;
        data.navigator = {
            appCodeName: nav.appCodeName,
            appName: nav.appName,
            appVersion: nav.appVersion,
            cookieEnabled: nav.cookieEnabled,
            language: nav.language,
            languages: nav.languages,
            onLine: nav.onLine,
            platform: nav.platform,
            product: nav.product,
            userAgent: nav.userAgent,
            vendor: nav.vendor
        };
        let perform = window.performance;
        data.performance = {
            timing: perform.timing,
            memory: {
                jsHeapSizeLimit: perform.memory.jsHeapSizeLimit,
                totalJSHeapSize: perform.memory.totalJSHeapSize,
                usedJSHeapSize: perform.memory.usedJSHeapSize
            },
            navigation: {
                type: perform.navigation.type,
                redirectCount: perform.navigation.redirectCount
            }
        };
        if (window.SystemGlobe.devType.debug) {
            ajaxAuthor({
                method: 'post',
                url: '/api/savePerformance',
                json: true,
                hideLoading: true,
                data: data
            });
        }
    }
};
exports.userAgent = agent;