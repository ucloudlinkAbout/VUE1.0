<!--
@负责人:chenwenxiao
@创建时间:2016-11-11
@版本:v1.0.0
@描述:数字选择控件，基于input插件
@使用方法:
<template>
    <g-input name='key' :value="aa"></g-input>
</template>
<script>
    export default{
        components:{
            gInput:require('xxx/xxx/input-select-number.vue')
        },
        data(){
            return{
                aa:''
            }
        }
    }
</script>
@参数说明:
//input的value值
'value':'',
//接口name
'name':false,
注意：
    1.最好与刘刚编写的form表单插件一起使用最佳
-->
<template>
    <div class="ilb input-selectNumber">
        <button class="btn btn-default" v-on:click="e_reduce">-</button>
        <g-input :value="value" :name="name" :change="e_onchange" :ischeck="ischeck" readonly="true"></g-input>
        <button class="btn btn-default" v-on:click="e_add">+</button>
    </div>
</template>
<script>
    export default{
        ready(){
            this.value = this.value || 1;
        },
        props: ['value','name'],
        components: {
            gInput: require('./input-integer.vue')
        },
        methods: {
            e_add () {
                if (this.value === 99) {
                    this.value = 99;
                } else {
                    this.value++;
                }
            },
            e_reduce() {
                if (this.value === 1) {
                    this.value = 1;
                } else {
                    this.value--;
                }
            },
            e_onchange(){
                if(!this.ischeck){
                    this.value = 1;
                }
            }
        },
        data(){
            return {
                ischeck: false
            }
        }
    }
</script>
<style>
    .input-selectNumber .input-text{
        width: 20px;
        text-align: center;
    }
    .input-selectNumber .input-text:read-only{
        background: #fff5f5;
    }
    .input-selectNumber .btn{
        font-size: 24px;
        padding: 0.5px 2px;
        width: 34px;
    }
</style>