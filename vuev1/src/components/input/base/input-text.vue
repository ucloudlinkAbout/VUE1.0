<!--负责人:chenwenxiao-->
<!--开发日期:2016-11-08-->
<!--版本:v1.0.0-->
<!--功能：文本框控件-->
<!--修改请在下面注明-->
<template>
    <div class="ilb vm" v-bind:class="opt.parentClass">
        <slot name="title"></slot>
        <input
            v-if="!opt.isTextarea"
            v-bind:type="opt.type || 'text'"
            v-bind:class="opt.classes" class="form-control"
            v-on:change="change"
            v-on:focus="focus"
            v-bind:readonly="opt.readonly"
            v-bind:placeholder="opt.placeholder"
            v-bind:readonly="opt.readonly"
            v-bind:maxlength="opt.maxLength"
            v-bind:minlength="opt.minLength"
            v-model="value" 
            v-bind:name="opt.name"
        />
        <textarea
            v-if="opt.isTextarea"
            v-bind:class="opt.classes" class="textarea form-control"
            v-on:change="change"
            v-on:focus="focus"
            v-bind:placeholder="opt.placeholder"
            v-bind:maxlength="opt.maxLength"
            v-bind:minlength="opt.minLength"
            v-model="value"
            v-bind:name="opt.name"
        ></textarea>
    </div>
</template>
<script>
    import lan from '../../../libs/base/lanLoader'
    import baseCheck from '../../../libs/base/baseCheck'
    import form from '../../../libs/base/regForm';
    import util from '../../../libs/base/util'
    let bc = new baseCheck();
    export default {
        data(){
            return {
                inputI18n: {},
                type:'formObj',//表单子组件标识
                tipsMsg: '',
                isInit:false
            }
        },
        watch: {
            'value': {
                handler: function (nval, oval) {
                    let check = this.checkValue();
                    if (oval === undefined || nval === undefined) {
                        return;
                    }
                    //处理重置的时候重复出现调用的情况
                    if (nval === '' && oval.length > 0) {
                        return;
                    }
                    if (check === false) {
                        this.showTips();
                    } else if (check === true) {
                        this.hideTips();
                    } else {
                        this.hideTips();
                    }
                }
            }
        },
        methods: {
            change: function () {
                let that = this;
                if (that.opt.change) {
                    that.opt.change(that.value);
                }
            },
            focus: function () {
                if (this.opt.focus) {
                    this.opt.focus(this.value);
                }
            },
            hideTips:function () {
                util.util.tipsHide({
                    target: this
                });
            },
            showTips: function () {
                let that = this;
                util.util.tipsShow({
                    txt: that.tipsMsg,
                    target: this
                });
            },
            setValue(data) {
                if (data === undefined) {
                    this.value = '';
                } else {
                    this.value = data;
                }
                this.isInit = false;
            },
            initValue() {

            },
            checkValue: function () {
                let that = this, checked = true;
                if (that.value === undefined) {
                    that.value = '';
                }
                if (that.opt.minLength && that.opt.maxLength) {
                    if (that.opt.maxLength === that.opt.minLength && that.value.length !== that.opt.minLength) {
                        that.tipsMsg = that.inputI18n.msPoint + that.opt.minLength + that.inputI18n.point;
                        checked = false;
                    }
                    if (that.value.length < that.opt.minLength) {
                        that.tipsMsg = that.inputI18n.betweenLength + that.opt.minLength + '-' + that.opt.maxLength + that.inputI18n.between;
                        checked = false;
                    }
                } else {
                    if (that.value.length < that.opt.minLength) {
                        that.tipsMsg = that.inputI18n.minLength + that.opt.minLength + that.inputI18n.point;
                        checked = false;
                    }
                }
                let checkResult = bc.checkLt(that.opt.checkType, that.value);
                that.ischeck = checkResult.check;
                if (!checkResult.check) {
                    that.tipsMsg = that.inputI18n[checkResult.type];
                    checked = false;
                }
                if (!checked && that.isInit) {
                    if (that.isInit) {
                        that.showTips();
                    }
                }
                that.ischeck = checked;
                form.regForm(this);
                that.isInit = true;
                return checked;
            }
        },
        props: {
            opt:'Object',
            value:'',
            ischeck:'Boolean',
            name:''
        },
        ready(){
            let that = this;
            lan.getLan(window.SystemGlobe.component.componentI18n).then(function (lanObj) {
                that.inputI18n = lanObj.input;
            });

            //注册入form
            form.regForm(this);
        }
    }
</script>