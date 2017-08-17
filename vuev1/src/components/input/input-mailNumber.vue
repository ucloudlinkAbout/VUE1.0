<!--
@负责人:chenwenxiao
@创建时间:2016-11-11
@版本:v1.0.0
@描述:邮编控件，基于input插件
@使用方法:
<template>
    <g-input-mail name='key' :label="i18n.key"></g-input-mail>
</template>
<script>
    export default{
        components:{
            gInputInt:require('xxx/xxx/input-mailNumber.vue')
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
    <g-input :opt.sync="mailNumberOpt" :value.sync="value" :ischeck.sync="ischeck">
        <span slot="title" v-text="label"></span>
    </g-input>
</template>
<script>
    import lan from '../../libs/base/lanLoader'
    export default {
        components:{
            gInput: require('./base/input-text.vue')
        },
        props: ['change', 'value', 'ischeck', 'classes', 'parentclass', 'focus', 'name', 'label','readonly'],
        data(){
            return {
                mailNumberOpt: {
                    change: this.change,
                    focus: this.focus,
                    classes: this.classes,
                    readonly: this.readonly,
                    parentClass: this.parentclass,
                    placeholder: '',
                    checkType: ['isLegitimateStr', 'hasSpace', 'isMailNumber'],
                    minLength: 6,
                    maxLength: 6,
                    name:this.name
                }
            }
        },
        ready(){
            let that = this;
            lan.getLan(window.SystemGlobe.component.componentI18n).then(function(lanObj){
                that.mailNumberOpt.placeholder = lanObj.input.mailNumber;
            });
        }
    }
</script>