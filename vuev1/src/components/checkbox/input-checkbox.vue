<!--
@负责人:chenwenxiao
@创建时间:2016-11-08
@版本:v1.0.0
@描述:多选框控件
@使用方法:
<template>
    <g-input-checkbox names="check" values="1" :checked="check" onchange="change"></g-input-checkbox>
    <g-input-checkbox names="check" values="2" :checked="check" onchange="change">
        <span slot="txt">标题</slot>
    </g-input-checkbox>
</template>
<script>
    export default{
        components:{
            gInputCheckbox:require('xxx/xxx/input-checkbox.vue')
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
    这个组件一般不使用，推荐使用input-checkbox-list替代
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
    <label v-bind:class="type?'input-checkbox':'input-checkbox-1'">
        <input type="checkbox" v-bind:name="name" v-bind:value="value" v-bind:checked="checked" v-on:change="change"/>
        <span><i></i></span>
        <slot name="txt"></slot>
    </label>
</template>
<script>

    import form from '../../libs/base/regForm';

    export default {
        data() {
           return {
                ischeckBox:true,
                name:this.names,
                value:this.values,
                ischeck:true
           }
        },
        props: {
            names: '',
            values: '',
            checked: "",
            onchange: {
                type: Function,
                default: function () {

                }
            }
        },
        methods: {
            change: function (e) {
                let that = this;
                that.checked = that.$el.children[0].checked;
                if(!that.value){
                   that.value = this.values;
                }
                if (that.onchange) {
                    console.log(77777777777)
                    that.onchange(e, that.value , that.checked);
                }

                form.regForm(this);
            }
        },
        ready() {
            form.regForm(this);
        }
    }
</script>