<!--
@负责人:chenwenxiao
@创建时间:2016-11-05
@版本:v1.0.0
@描述:顶部搜索栏控件
@使用方法:
<template>
    <g-search></g-search>
</template>
<script>
    export default{
        components:{
            gSearch:require('xxx/xxx/com-searchBar.vue')
        }
    }
</script>
@参数说明:
无
-->
<template>
    <div class="searchBar text-right pt30 pb20">
        <div class="ilb bar">
            <span class="iconfont font-color-999">&#xe61c;</span>
            <input type="text" class="input-text"/>
            <button type="button" class="btn-search btn btn-default">搜索</button>
        </div>
        <ul class="ilb menu font-color-999 mr10">
            <li>订单搜索</li>
            <li>库存搜索</li>
            <li>订单搜索</li>
            <li>订单搜索</li>
        </ul>
    </div>
</template>
<script type="text/ecmascript-6">

    export default {
        data (){
            return {

            }
        },
        components:{

        },
        methods:{

        },
        ready(){

        }
    }
</script>