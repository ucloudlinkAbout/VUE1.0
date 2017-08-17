<!--
@负责人:chenwenxiao
@创建时间:2016-11-08
@版本:v1.0.0
@描述:弹窗tips控件
@使用方法:
<template>
    <g-loadtips></g-loadtips>
</template>
<script>
    import { util } from 'xxx/lib/base/util.js'
    export default{
        components:{
            gLoadtips:require('xxx/xxx/tips-dialog.vue')
        },
        ready(){
            //显示
            util.dialogTipsShow({
                txt: '标题',
                title: '内容',
                closeCallBack: function(){
                    console.log('关闭的回调');
                },
                callBack:  function(){
                    console.log('确定的回调');
                }
            });
        }
    }
</script>
@参数说明:
注意：
    1.使用时一个页面只需要引入一次即可，重复引入会出现两个组件同时运作的问题
    2.使用时必须引入/libs/base/util.js
-->
<template>
    <g-dialog v-ref:dialog :opt.sync="dialogOpt" size="0">
        <span slot="title" v-text="title"></span>
        <div class="clear text-center" slot="content">
            <span v-text="txt"></span>
        </div>
        <button slot="button" class="btn btn-primary" v-on:click="submit" v-text="i18n.ok"></button>
        <button slot="button" class="btn btn-default ml10" v-on:click="close" v-text="i18n.close"></button>
    </g-dialog>
</template>
<script>
    import dialog from '../dialog/dialog.vue'
    import lan from '../../libs/base/lanLoader'

    export default{
        components: {
            gDialog: dialog
        },
        data(){
            return {
                i18n: {},
                isshow: false,
                dialogOpt: {
                    size: 0,
                    isCanel: false
                },
                closeCallBack(){

                },
                submitCallBack(){

                },
                txt: '',
                title: ''
            }
        },
        methods: {
            submit(){
                this.$refs.dialog.$emit('closeDialog');
                this.isshow = false;
                this.submitCallBack();
            },
            close(){
                this.$refs.dialog.$emit('closeDialog');
                this.isshow = false;
                this.closeCallBack();
            }
        },
        ready(){

            let that = this;
            let list = window.SystemGlobe.GlobeOption.dialogTipsList;
            lan.getLan(window.SystemGlobe.component.componentI18n).then(function (com) {
                that.i18n = com.tips;
            });
            that.dialogOpt.closeCallBack = that.closeCallBack;
            setInterval(function () {
                if (list.length > 0) {
                    if (!that.isshow) {
                        let current = list.shift();
                        that.isshow = true;
                        that.txt = current.txt;
                        that.title = current.title || that.i18n.title;
                        that.closeCallBack = current.closeCallBack || that.closeCallBack;
                        that.submitCallBack = current.callBack || that.submitCallBack;
                        that.$refs.dialog.$emit('openDialog');
                    }
                }
            }, 300);
        }
    }
</script>
<style>
    .tips-modal .modal-body{
        z-index: 100000000;
    }
</style>