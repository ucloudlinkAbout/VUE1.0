<!--
@负责人:chenwenxiao
@创建时间:2016-11-05
@版本:v1.0.0
@描述:读取锁屏控件
@使用方法:
<template>
    <g-loadtips></g-loadtips>
</template>
<script>
    import { util } from 'xxx/lib/base/util.js'
    export default{
        components:{
            gLoadtips:require('xxx/xxx/loadTips.vue')
        },
        ready(){
            //显示进度条
            util.loadingShow();
            //隐藏进度条
            util.loadingHide();
        }
    }
</script>
@参数说明:
注意：
    1.使用时一个页面只需要引入一次即可，重复引入会出现两个组件同时运作的问题
    2.使用时必须引入/libs/base/util.js
-->
<template>
    <div class="loadTips wait" v-show="show">
        <img src="../assets/images/loading.gif" />
    </div>
</template>
<script>
    export default {
        data(){
            return {
                option: {},
                show:false
            }
        },
        ready(){
            let that = this;
            setInterval(function () {
                if (window.SystemGlobe.GlobeOption.showLoadingTips > 0) {
                    that.show = true;
                } else {
                    that.show = false;
                }
            }, 100);
        }
    }
</script>