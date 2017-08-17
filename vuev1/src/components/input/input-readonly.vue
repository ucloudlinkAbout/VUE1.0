<!--
@负责人:chenwenxiao
@创建时间:2016-11-11
@版本:v1.0.0
@描述:只读控件，只做空格校验，基于input插件
@使用方法:
<template>
    <g-input name='key' :label="i18n.key"></g-input>
</template>
<script>
    export default{
        components:{
            gInput:require('xxx/xxx/input-readonly.vue')
        }
    }
</script>
@参数说明:
//change事件
'change':function(){

},
//input的value值
'value':'',
//是否通过校验
'ischeck':false,
//所属的class
'classes':'',
//父div的class
'parentclass':'',
//focus事件
'focus':function(){

},
//placeholoder事件
'placeholder':'',
//name值
'name':'',
//前面label的
'label':'',
//是否只读
'readonly':false
注意：
    1.最好与刘刚编写的form表单插件一起使用最佳
-->
<template>
    <g-input :opt.sync="baseOpt" :name.sync='name' :value.sync="value" :ischeck.sync="ischeck">
        <span slot="title" v-text="label"></span>
    </g-input>
</template>
<script>
    import lan from '../../libs/base/lanLoader'
    export default {
        components: {
            gInput: require('./base/input-text.vue')
        },
        props: ['change', 'value', 'ischeck', 'classes', 'parentclass', 'focus', 'placeholder', 'name', 'label'],
        data(){
            return {
                baseOpt: {
                    change: this.change,
                    focus: this.focus,
                    classes: this.classes,
                    parentClass: this.parentclass,
                    placeholder: this.placeholder,
                    checkType: ['hasSpace'],
                    minLength: 0,
                    readonly: true,
                    maxLength: 2000,
                    name: this.name
                }
            }
        },
        ready(){
            this.ischeck = true;
        }
    }
</script>