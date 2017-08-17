<!--
@负责人:chenwenxiao
@创建时间:2016-11-11
@版本:v1.0.0
@描述:描述类textarea控件，基于input插件
@使用方法:
<template>
    <g-textarea name='key'></g-textarea>
</template>
<script>
    export default{
        components:{
            gTextarea:require('xxx/xxx/textarea-desc.vue')
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
'name':''
注意：
    1.最好与刘刚编写的form表单插件一起使用最佳
-->
<template>
    <g-input :opt.sync="baseOpt" :name='name' :value.sync="value" :ischeck.sync="ischeck" class="mt10 mb10"></g-input>
</template>
<script>
    import lan from '../../libs/base/lanLoader'
    export default{
        components: {
            gInput: require('../input/base/input-text.vue')
        },
        props: ['change', 'value', 'ischeck', 'classes', 'parentclass', 'focus', 'placeholder', 'name'],
        data(){
            return {
                baseOpt: {
                    isTextarea: true,
                    change: this.change,
                    focus: this.focus,
                    classes: this.classes,
                    parentClass: this.parentclass || 'w-100',
                    placeholder: this.placeholder,
                    checkType: ['hasSpace'],
                    minLength: 0,
                    maxLength: 500,
                    name: this.name
                }
            }
        },
        ready(){
            this.ischeck = true;
            let that = this;
            lan.getLan(window.SystemGlobe.component.componentI18n).then(function (lanObj) {
                that.baseOpt.placeholder = lanObj.input.desc;
            });
        }
    }
</script>