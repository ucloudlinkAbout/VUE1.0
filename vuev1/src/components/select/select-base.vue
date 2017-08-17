<!--
@负责人:chenwenxiao
@创建时间:2016-12-06
@版本:v1.0.0
@描述:基础封装的select控件
@使用方法:
<template>
    <g-select name="status" :_list="select_lantype_edit" mult='true' label="状态:"></g-select>
</template>
<script>
    export default{
        components:{
            gSelect:require('xxx/xxx/select-base.vue')
        },
        data(){
            return{
                select_lantype_edit: {
                    'zh-CN': 'zh-CN',
                    'zh-TW': 'zh-TW',
                    'en-US': 'en-US'
                }
            }
        }
    }
</script>
@参数说明:
//list显示的内容
'_list':Object,
//name的值
'name':String,
//key值
'key':String,
//label的值
'label':String,
//是否多选
'mult':Boolean
-->
<template>
    <div class="ilb">
        <span v-text="label"></span>
        <g-select :_list.sync="_list" :mult="mult" :name="name" :key="key" :continentlist='continentlist'></g-select>
    </div>
</template>
<script>
    export default{
        ready(){

        },
        components: {
            gSelect: require('./Select.vue')
        },
        props:['_list','name','key','label','mult','continentlist'],
    }
</script>