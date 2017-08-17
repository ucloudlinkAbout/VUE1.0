<!--
@负责人:chenwenxiao
@创建时间:2016-11-05
@版本:v1.0.0
@描述:左下tips控件
@使用方法:
<template>
    <g-loadtips></g-loadtips>
</template>
<script>
    import { util } from 'xxx/lib/base/util.js'
    export default{
        components:{
            gLoadtips:require('xxx/xxx/tips-left.vue')
        },
        ready(){
            //显示
            util.leftTipsShow({
                //可选参数1,2,3
                ico: 1,
                txt: '内容'
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
    <div class="tips" v-bind:class="{
        'tips-hide':!isshow,
        'tips-normal': ico === 1,
        'tips-warn': ico === 2,
        'tips-error': ico === 3
        }">
        <span v-text="msg"></span>
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
            let list = window.SystemGlobe.GlobeOption.leftTipsList;
            setInterval(function () {
                if (list.length > 0) {
                    if (!that.isshow) {
                        let current = list.shift();
                        that.msg = current.txt;
                        that.isshow = true;
                        that.ico = current.ico;
                        setTimeout(function () {
                            that.isshow = false;
                        }, 3000);
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