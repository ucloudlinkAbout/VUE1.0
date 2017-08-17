/**
 * Created by chenwenxiao on 2016/8/19.
 *
 *  路由参考例子说明
 * '/flowhistory':{     -----------url跳转后显示的内容
    name:'flowhistory',     -----------路由跳转关键字，这里作强制要求，必须与url跳转内容一致
        component: function(resolve){
        require(['./views/glocalme-flowhistory.vue'],resolve);      -----------模块所在位置
    },
    auth: true      -----------模块是否需要路由验证
},
 *
 *
 */
'use strict';

export default function(router) {
    router.map({
        /**
         * 首页
         * 时间：2016-11-17
         * 负责人：chenwenxiao
         * */
        '/': {
            name: 'index',
            component: function (resolve) {
                require(['./views/index.vue'], resolve);
            }
        },

        /**
         * 404页面
         * 时间：2016-11-17
         * 负责人：chenwenxiao
         * */
        '*': {
            name: '404',
            component: function (resolve) {
                require(['./views/404.vue'], resolve);
            }
        },

        /**
         * 组件文档页面
         * 时间：2016-12-09
         * 负责人：chenwenxiao
         * */
        '/components': {
            name: 'components',
            component: function (resolve) {
                require(['./views/components.vue'], resolve);
            }
        },

        /**
         * 登录页面
         * 时间：2016-11-17
         * 负责人：chenwenxiao
         * */
        '/login': {
            name: 'login',
            component: function (resolve) {
                require(['./views/login.vue'], resolve);
            }
        },

        /**
         * 测试页面
         * 时间：2016-11-17
         * 负责人：chenwenxiao
         * */
        '/test': {
            name: 'test',
            component: function (resolve) {
                require(['./views/test.vue'], resolve);
            },
            auth: true
        },

        /**
         * UI库
         * 时间：2016-11-17
         * 负责人：chenwenxiao
         * */
        '/ui': {
            name: 'ui',
            component: function (resolve) {
                require(['./views/UI-lib.vue'], resolve);
            }
        },

        /**
         * 主页
         * 时间：2016-11-17
         * 负责人：chenwenxiao
         * */
        '/home': {
            name: 'home',
            component: function (resolve) {
                require(['./views/index.vue'], resolve);
            },
            auth: true,
            subRoutes: {
                /**
                 * 首页
                 * 时间：2016-11-17
                 * 负责人：chenwenxiao
                 * */
                '/homePage': {
                    name: 'homePage',
                    component: function (resolve) {
                        require(['./views/page/home.vue'], resolve);
                    },
                    auth: true
                },
        
                /******************************系统管理部分路由******************************/
                /**
                 * 字典表 管理
                 * 时间：2016-11-17
                 * 负责人：chenwenxiao
                 * */
                '/dictionary': {
                    name: 'dictionary',
                    component: function (resolve) {
                        require(['./views/page/systemManager/dictionary.vue'], resolve);
                    },
                    auth: true
                },
                /**
                 * 系统参数 管理
                 * 时间：2016-11-17
                 * 负责人：chenwenxiao
                 * */
                '/systemParamConf': {
                    name: 'systemParamConf',
                    component: function (resolve) {
                        require(['./views/page/systemManager/systemParamConf.vue'], resolve);
                    },
                    auth: true
                },
                /**
                 * 系统参数 管理
                 * 时间：2016-11-17
                 * 负责人：chenwenxiao
                 * */
                '/damages': {
                    name: 'damages',
                    component: function (resolve) {
                        require(['./views/page/systemManager/damages.vue'], resolve);
                    },
                    auth: true
                },
                /**
                 * 通知 管理
                 * 时间：2016-11-17
                 * 负责人：chenwenxiao
                 * */
                '/notice': {
                    name: 'notice',
                    component: function (resolve) {
                        require(['./views/page/systemManager/notice.vue'], resolve);
                    },
                    auth: true
                },
                /**
                 *menu 管理
                 * 时间：2016-11-21
                 * 负责人：liugang
                 * */
                '/menuManager': {
                    name: 'menuManager',
                    component: function (resolve) {
                        require(['./views/page/systemManager/menuManager.vue'], resolve);
                    },
                    auth: true
                },
                /**
                 *menu 管理
                 * 时间：2016-11-21
                 * 负责人：liugang
                 * */
                '/departmentManagement': {
                    name: 'departmentManagement',
                    component: function (resolve) {
                        require(['./views/page/organizationalStructure/departmentManagement.vue'], resolve);
                    },
                    auth: true
                },
                /**
                 *系统管理 组织架构 自营店铺
                 * 时间：2017-02-12
                 * 负责人：yankang
                 * */
                '/selfOperated': {
                    name: 'selfOperated',
                    component: function (resolve) {
                        require(['./views/page/organizationalStructure/selfOperated.vue'], resolve);
                    },
                    auth: true
                },
                /**
                 *menu 管理
                 * 时间：2016-11-21
                 * 负责人：liugang
                 * */
                '/management': {
                    name: 'management',
                    component: function (resolve) {
                        require(['./views/page/organizationalStructure/management.vue'], resolve);
                    },
                    auth: true
                },
                /**
                 *menu 管理
                 * 时间：2016-11-21
                 * 负责人：liugang
                 * */
                '/smsTemplate': {
                    name: 'smsTemplate',
                    component: function (resolve) {
                        require(['./views/page/smsManagement/smsTemplate.vue'], resolve);
                    },
                    auth: true
                },
                /**
                 *menu 管理
                 * 时间：2016-11-21
                 * 负责人：liugang
                 * */
                '/smssendLog': {
                    name: 'smssendLog',
                    component: function (resolve) {
                        require(['./views/page/smsManagement/smssendLog.vue'], resolve);
                    },
                    auth: true
                },
                /**
                 *menu 管理
                 * 时间：2017-2-12
                 * 负责人：liuzhijian
                 * */
                '/agencyAgency': {
                    name: 'agencyAgency',
                    component: function (resolve) {
                        require(['./views/page/organizationalStructure/agencyAgency.vue'], resolve);
                    },
                    auth: true
                }
            }
        }
    })
}
