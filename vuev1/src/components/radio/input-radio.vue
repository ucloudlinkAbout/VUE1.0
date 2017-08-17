<!--
@负责人:chenwenxiao
@创建时间:2016-11-08
@版本:v1.0.0
@描述:单选框控件
@使用方法:
<template>
    <g-input-radio names="check" values="1" :checked="check" onchange="change"></g-input-radio>
    <g-input-radio names="check" values="2" :checked="check" onchange="change">
        <span slot="txt">标题</slot>
    </g-input-radio>
</template>
<script>
    export default{
        components:{
            gInputRadio:require('xxx/xxx/input-radio.vue')
        },
        methods:{
            change(){
                console.log('我是change事件');
            }
        },
        data(){
            return{
                check:false
            }
        }
    }
</script>
@参数说明:
注意：
    这个组件一般不使用，推荐使用input-radio-list替代
//name值
names: '',
//选中的值
values: '',
//是否选中
checked: Boolean,
//change事件
onchange: {
    type: Function,
    default: function () {

    }
}
-->
<template>
    <label class="input-radio">
        <input type="radio" v-bind:name="names" v-bind:value="values" v-bind:checked="checked" v-on:change="change"/>
        <span><i></i></span>
        <slot name="txt"></slot>
    </label>
</template>
<script>
    import form from '../../libs/base/regForm';
    export default {
        data() {
            return {
                value:this.values,
                name:this.names,
                ischeck:this.checked
            }
        },
        props: {
            names: '',
            values:'',
            checked: null,
            onchange: {
                type:Function,
                default: function (e) {

                }
            }
        },
        methods: {
            change: function (e) {
                let that = this;
                that.checked = that.$el.children[0].checked;
                if (that.onchange) {
                    that.onchange(e, that.values);
                }

                form.regForm(this);
            },
            checkValue() {
               form.regForm(this); 
            }
        },
        ready(){

            form.regForm(this);
        }
    }
</script>