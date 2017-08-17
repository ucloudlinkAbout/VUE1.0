<!--
@负责人:chenwenxiao
@创建时间:2016-12-08
@版本:v1.0.0
@描述:label组件
@使用方法:
<template>
    <g-label name="xxx" value="xxx" classes="col-xs-6" :label="xxx"></g-label>
</template>
<script>
    export default{
        components:{
            gLable:require('xxx/xxx/label-base.vue')
        }
    }
</script>
@参数说明:
//name值
name:'',
//显示value值
value:'',
//整体的样式控制类
classes:'',
//标题
label:''
-->
<template>
    <div class="ilb vm box" v-bind:class="classes">
        <span v-text="label"></span>
        <span v-text="value"></span>
    </div>
</template>
<script>
    export default{
        props: {
            name:'',
            value:'',
            classes:'',
            label:''
        },
        methods:{
            setValue(data) {
                if (data) {
                    this.value = data;
                } else {
                    this.value = '';
                }
            }
        }
    }
</script>
