
import Vue from 'vue'
import VueRouter from 'vue-router'
import routerMap from './routers'
import Session from './libs/base/session'
import commonDirective from './libs/directive/directive'
import directive from './views/assets/libs/directive'
import { getLan } from './libs/base/lanLoader'
import debug from './libs/base/debug'
import { userAgent } from './libs/base/userAgent'

Vue.use(VueRouter);
commonDirective.directive(Vue);
directive.directive(Vue);

$.ajaxSettings.crossDomain = true;

//全局事件代理
window.$$vueEvent = new Vue();
//全局路由记录器
window.$$routeList = {};
userAgent.userErrorLogInit();

getLan('page_title').then(function (lanObj) {
    //  实例化Vue-router
    const router = new VueRouter({
        hashbang: false,
        history: true,
        saveScrollPosition: true,
        transitionOnLoad: true
    });
    router.beforeEach((transition) => {
        if (transition.to.auth) {
            const session = new Session();
            if (session.checkSession()) {
                transition.next();
            } else {
                encodeURIComponent(transition.to.path);
                transition.redirect('/login');
            }
        } else {
            transition.next();
        }
        try {
            if (lanObj[transition.to.name]) {
                document.title = lanObj[transition.to.name] + '-' + lanObj.common;
            }
            userAgent.userStayTimeStart(transition.to.path);
        } catch (e) {
            debug.debug({
                title: '多语言标题转换出错',
                from: './src/views/main.js',
                content: e
            });
        }
    });
    const app = Vue.extend({});
    routerMap(router);
    router.start(app, '#app');
}, function (d) {
    debug.clog(d);
});
