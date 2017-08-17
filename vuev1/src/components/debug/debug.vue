<!--
@负责人:chenwenxiao
@创建时间:2016-11-07
@版本:v1.0.0
@描述:调试用消息框控件
@使用方法:
<template>
    <g-debug></g-debug>
</template>
<script>
    import { debug } from 'xxx/lib/base/debug.js'
    export default{
        components:{
            gDebug:require('xxx/xxx/debug.vue')
        },
        ready(){
            //将内容写入debug模块
            debug.debug({
                title: '标题',
                from: '问题来源',
                content: '内容'
            });
        }
    }
</script>
@参数说明:
注意：
    1.使用时一个页面只需要引入一次即可，重复引入会出现两个组件同时运作的问题
    2.使用时必须引入/libs/base/debug.js
-->
<template>
    <div class="debug">
        <div class="debug-icon hand" v-on:click="showDebug" v-bind:class="{'debug-icon-show':debugBtnShow}">
            <span class="debug-icon-num" v-text="debugList.length || 0"></span>
            <span class="iconfont icon-iconfontjinggao font-very-large"></span>
        </div>
        <div class="debug-leftBar" v-bind:class="{'debug-leftBar-show':debugBarShow}">
            <div class="debug-leftBar-header">
                <span class="iconfont icon-youjiantou debug-leftBar-right" v-on:click="hideDebug"></span>
            </div>
            <div class="debug-leftBar-body">
                <div class="debug-leftBar-tips" v-on:click="showDetail" v-for="data in debugList">
                    <div class="debug-leftBar-tips-title" v-text="data.title"></div>
                    <div class="debug-leftBar-tips-content" v-text="data.content"></div>
                </div>
            </div>
        </div>
    </div>

    <g-dialog :modalsize.sync="modalSize" :hide.sync="modalShow">
        <span v-text="modalTitle" slot="title"></span>
        <div class="pd20 text-left" slot="content">
            <p class="mt10">
                <b>产生时间：</b>
                <span v-text="modalTime || '无记录'"></span>
            </p>
            <p class="mt10">
                <b>产生来源：</b>
                <span v-text="modalFrom || '粗心的程序猿忘记记录了，提醒他'"></span>
            </p>
            <p class="mt10">
                <b>具体内容：</b>
                <span v-text="modalTxt || '无记录'"></span>
            </p>
        </div>
    </g-dialog>
</template>
<script>
    import Debug from '../../libs/base/debug'
    export default {
        methods: {
            showDebug: function () {
                this.debugBarShow = true;
            },
            hideDebug: function () {
                this.debugBarShow = false;
            },
            showDetail: function (e) {
                let message = this.debugList[$(e.currentTarget).index()];
                this.modalShow = false;
                this.modalTitle = message.title;
                this.modalTxt = message.content;
                this.modalTime = message.time;
                this.modalFrom = message.from;
            }
        },
        watch: {
            'debugList': {
                handler: function (nval, oval) {
                    var that = this;
                    if (nval.length > 0) {
                        that.debugBtnShow = true;
                    }
                },
                deep: true
            }
        },
        components: {
            gDialog: require('../dialog/dialog-base.vue')
        },
        data(){
            return {
                modalSize: 'modal-middle',
                modalTitle: '',
                modalTxt: '',
                modalFrom: '',
                modalTime: '',
                modalShow: false,
                debugList: [],
                debugBtnShow: false,
                debugBarShow: false
            }
        },
        ready(){
            var that = this;
            that.debugList = Debug.getDebug();
        }
    }
</script>