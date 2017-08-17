<!--
@负责人:liugang
@创建时间:2016-12-01
@版本:v1.0.0
@描述:tabs 选择子组件 tab
@使用方法:
<template>
    <tabs>
        <tab name="t1" title="Tab 1" active=true>
            Hello World
        </tab>
        <tab name="t2" title="Tab 2">
            <xxx></xxx>
        </tab>
        <tab name="t3" title="Tab 3">
            xxxxx
        </tab>
    </tabs>
</template>
<script>
    export default{
        components:{
            tab:require('xxx/tab/tab.vue')
        }
    }
</script>
@参数说明:

name  string  标签id 不能重复

title string  标签名字 显示在标签上的名字

active Boolean true 默认显示页



-->
<style>

</style>
<template>
    <div role="tabpanel" class="tab-pane" :class="{'active':active}">
        <slot></slot>
    </div>
</template>
<script>
    export default{
        data() {
            return {
            }
        },
        props: {
            title:{type:String,required: true},
            active:{type:[Boolean,String],default:false},
            name:{type:String,required: true}
        },
        methods: {
            canelActive() {
                this.active = false;
            }
        }
    }
</script>