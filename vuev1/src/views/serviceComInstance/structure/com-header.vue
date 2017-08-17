<!--
@负责人:chenwenxiao
@创建时间:2016-11-05
@版本:v1.0.0
@描述:页面头部header
@使用方法:
<template>
    <g-header></g-header>
</template>
<script>
    export default{
        components:{
            gHeader:require('xxx/xxx/com-header.vue')
        }
    }
</script>
@参数说明:
无
-->
<template>
    <div class="header-content">
        <div class="header">
            <div class="ilb logo text-center">
                <img src="../../assets/images/oms/logo-w.png" />
            </div>
            <div class="vt ilb ml20">
                <div class="navbar-bl">
                    <span>首页</span>
                    <span class="iconfont ml10 icon-xialacaidanxiaosanjiao1"></span>
                    <ul class="navbar-box">
                        <li class="active">首页</li>
                        <li>管理</li>
                        <li>安排</li>
                        <li>oms</li>
                    </ul>
                </div>
            </div>
            <div class="vt ilb ml20">
                <div v-for='item in tipsObject' class="btn btn-secondary btn-headerTab mr10 ilb" type="div" v-link="{name:item.url}">
                    <p><span @click.stop='closeTips(item)' class="fr iconfont icon-guanbixiao"></span></p>
                    <p v-text="item.name"></p>
                </div>
            </div>
            <div class="fr ilb ml10 mr80 pl10">
                <div class="navbar-bl">
                    <span v-text="languageList[i18Lan]"></span>
                    <span class="iconfont ml10 icon-xialacaidanxiaosanjiao1"></span>
                    <ul class="navbar-box">
                        <li v-on:click="selectLanguage" data-val="zh-CN" v-bind:class="{'active': i18Lan == 'zh-CN'}" v-text="languageList['zh-CN']"></li>
                        <li v-on:click="selectLanguage" data-val="zh-TW" v-bind:class="{'active': i18Lan == 'zh-TW'}" v-text="languageList['zh-TW']"></li>
                        <li v-on:click="selectLanguage" data-val="zh-HK" v-bind:class="{'active': i18Lan == 'zh-HK'}" v-text="languageList['zh-HK']"></li>
                        <!--<li v-on:click="selectLanguage" data-val="en-US" v-bind:class="{'active': i18Lan == 'en-US'}" v-text="languageList['en-US']"></li>-->
                    </ul>
                </div>
            </div>
            <div class="fr ilb mr10">
                <div class="navbar-bl">
                    <img src="../../assets/images/oms/touxiang.jpg" class="headPortrait br-round vm">
                    <span class="iconfont vm ml10 icon-xialacaidanxiaosanjiao1"></span>
                    <ul class="navbar-box">
                        <li v-text="i18n.editPwd"></li>
                        <li v-on:click="loginOut" v-text="i18n.loginOut"></li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="text-center h-0">
            <button class="btn btn-default topHide" v-on:click="up($event)">
                <span class="iconfont icon-shangjiantou"></span>
            </button>
        </div>
    </div>

    <g-loadtips></g-loadtips>
    <g-debug></g-debug>
    <g-tips-m></g-tips-m>
    <g-tips-left></g-tips-left>
    <g-tips-dialog></g-tips-dialog>
</template>
<script>
    import Cookie from '../../../libs/base/cookieHelper'
    import lan from '../../../libs/base/lanLoader'
    import Store from '../../../libs/base/store'

    export default {
        data (){
            return {
                showLoadTops: false,
                tipsObject: {},
                i18n: {},
                i18Lan: 'zh-CN',
                languageList: {
                    'zh-CN': '简体中文',
                    'zh-TW': '繁體中文（臺灣）',
                    'zh-HK': '繁體中文（香港）',
                    'en-US': 'English'
                }
            }
        },
        components:{
            gLoadtips:require('../../../components/loadTips/loadTips.vue'),
            gTipsM:require('../../../components/tips/tips-m.vue'),
            gTipsLeft:require('../../../components/tips/tips-left.vue'),
            gTipsDialog:require('../../../components/tips/tips-dialog.vue'),
            gDebug:require('../../../components/debug/debug.vue')
        },
        watch: {
            'menudata': {
                handler(nval, oval) {
                    
                }
            }
        },
        props:['menudata'],
        methods: {
            selectLanguage: function (e) {
                const store = new Store();
                const cookie = new Cookie();
                let language = e.currentTarget.attributes[0].value;
                cookie.setCookie('language', language, window.SystemGlobe.devType.sessionTimeOut, 'localhost');
                store.localSave('language', language);
                window.location.reload();
            },
            loginOut: function () {
                const cookie = new Cookie();
                const store = new Store();
                store.localDelete('loginCustomerId');
                cookie.clearAll();
                this.$route.router.go('/login');
            },
            up: function (e) {
                var $header = $(e.currentTarget).parents('.header-content');
                if ($header.hasClass('header-hide')) {
                    $header.removeClass('header-hide');
                } else {
                    $header.addClass('header-hide');
                }
            },
            closeTips(item) {
                let name = item.uri.name;
                window.$$routeList[name].$remove();
                delete window.$$routeList[name];
                delete this.tipsObject[item.id];
                this.tipsObject = Object.assign({}, this.tipsObject);
                let list = Object.keys(window.$$routeList);
                this.$route.router.go(list[0]);

                //alert('请在这里提供一个跳转路由方法，跳到list[0],在header.vue')
                //window.location.href = list[0];
            }
        },
        ready(){
            var that = this;
            const store = new Store();
            that.i18Lan = store.localGet('language');
            window.$$vueEvent.$on('selectmenu',(item)=>{
                this.tipsObject[item.id] = item;
                this.tipsObject = Object.assign({}, this.tipsObject);
            });

            lan.getLan(window.SystemGlobe.component.componentI18n).then(function (lanObj) {
                that.i18n = lanObj.header;
            });

            //对表格高度进行重置
            const resizHeight = function () {
                const wHeight = $(window).height();
                const header = $('.header-content').height();
                $('.left-menu,.content-right').height(wHeight - header - 1);
            };
            resizHeight();
            $(window).resize(resizHeight);
        }
    }
</script>
