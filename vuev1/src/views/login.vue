<template>
    <div class="loginBody">
        <div class="pt15 pl30 pb15">
            <img src="./assets/images/oms/logo.png" class="ilb logo vm" />
            <span class="font-color-666 font-large vm mt10 ilb" v-text="i18n.title"></span>
        </div>
        <div class="login">
            <div class="login-bg fl"></div>
            <div class="login-box box-shadow-line pd20">
                <h5 class="font-color-999 mb20 bold" v-text="i18n.userBox"></h5>
                <div class="border-top">
                    <g-form v-ref:loginform>
                        <p class="mt40">
                            <span class="iconfont font-color-999 icon-yonghuming"></span>
                            <g-input-user parentclass="w-100" classes="w-100" name="loginname" :value="userValue"></g-input-user>
                        </p>
                        <p class="mt20">
                            <span class="iconfont font-color-999 icon-mima"></span>
                            <g-input-password parentclass="w-100" classes="w-100" name="password" :value="passwordValue"></g-input-password>
                        </p>
                    </g-form>
                    <p class="mt20">
                        <g-checkbox :checked.sync="rememberPwd">
                            <b slot="txt" v-text="i18n.rememberPwd"></b>
                        </g-checkbox>
                    </p>
                    <p class="mt20 mb40">
                        <button class="btn btn-primary w-100" type="submit" v-on:click="loginEvent" v-text="i18n.loginBtn"></button>
                    </p>
                </div>
            </div>
        </div>
        <div class="text-center font-color-999 pd5 oms-footer" v-text="i18n.copyright + '   ' + i18n.icp "></div>
        <g-loadtips></g-loadtips>
    </div>
</template>
<script>
    import LoginBiz from './biz/loginBiz'
    import lan from '../libs/base/lanLoader'
    import Language from '../libs/base/language'
    export default {
        components: {
            'gInputUser': require('../components/input/input-user.vue'),
            'gInputPassword': require('../components/input/input-password.vue'),
            'gLoadtips': require('../components/loadTips/loadTips.vue'),
            'gForm': require('../components/form/form.vue'),
            'gCheckbox': require('../components/checkbox/input-checkbox.vue')
        },
        data() {
            return {
                i18n: {},
                passwordValue: '',
                userValue: '',
                rememberPwd: false,
                pwdInClient: '',
                showLoadTips: false
            }
        },
        methods: {
            loginEvent: function () {
                const that = this;
                const biz = new LoginBiz();
                const check = this.$refs.loginform.getData();
                if (check.ischeck) {
                    biz.login({
                        loginname: check.data.loginname,
                        password: check.data.password
                    }).then(function (data) {
                        if (that.rememberPwd) {
                            biz.saveCodePwd(check.data.password, check.data.loginname);
                        } else {
                            biz.saveCodePwd('', '');
                        }
                        that.$route.router.go('home/homePage');
                    });
                }
            }
        },
        ready() {
            var that = this;
            const biz = new LoginBiz();
            const value = biz.getDeCodePwd();
            if (value.password || value.userName) {
                if (value.password !== '' && value.password !== undefined) {
                    that.rememberPwd = true;
                } else {
                    that.rememberPwd = false;
                }
                that.passwordValue = value.password;
                that.userValue = value.userName;
            }
            lan.getLan('v_login').then(function (d) {
                that.i18n = d;
            });
            const lang = new Language();
            lang.setDefaultLanguage();
        }
    }
</script>
