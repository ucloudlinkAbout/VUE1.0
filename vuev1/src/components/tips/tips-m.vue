<!--
@负责人:chenwenxiao
@创建时间:2016-11-05
@版本:v1.0.0
@描述:通用tips控件
@使用方法:
<template>
    <g-loadtips></g-loadtips>
</template>
<script>
    import { util } from 'xxx/lib/base/util.js'
    export default{
        components:{
            gLoadtips:require('xxx/xxx/tips-m.vue')
        },
        ready(){
            //显示
            util.middleTipsShow({
                //可选参数1,2,3
                ico: 1,
                txt: '内容'，
                closeCallBack: function(){
                    console.log('自动关闭的回调!');
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
    <div class="modal fade" v-bind:class="[{'modal-active':isshow}]">
        <div class="fade in modal-backdrop"></div>
        <div class="modal-dialog modal-xs">
            <div class="modal-content">
                <div class="modal-body text-center">
                    <div class="pd10">
                        <p><span class="iconfont icon-iconfontjinggao ico-bigRed font-very-large" v-bind:class="{
                        'icon-iconfontjinggao ico-bigRed':ico === 1,
                        'icon-tijiaochenggong ico-green':ico === 2
                    }"></span></p>
                        <p v-text="msg"></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                isshow: false,
                msg: '',
                ico: 1
            }
        },
        methods: {},
        ready(){
            let that = this;
            let list = window.SystemGlobe.GlobeOption.middleTipsList;
            setInterval(function () {
                if (list.length > 0) {
                    if (!that.isshow) {
                        let current = list.shift();
                        that.msg = current.txt;
                        that.isshow = true;
                        that.ico = current.ico;
                        setTimeout(function () {
                            that.isshow = false;
                            if (current.closeCallBack) {
                                current.closeCallBack();
                            }
                        }, 2000);
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