<!--负责人:liugang-->
<!--开发日期:2016-11-11-->
<!--版本:v1.0.0-->
<!--功能：用户名校验控件，基于input插件-->
<!--修改请在下面注明-->
<template>
    <div class="col-md-6 col-xs-12">
        <g-input :name="name" :opt.sync="userOpt" :value.sync="value" :ischeck.sync="ischeck">
            <span slot='title' class="col-md-6 col-xs-6">
                <span>{{title}}</span>
            </span>
        </g-input>
    </div>
</template>
<script>
    import lan from '../../libs/base/lanLoader'
    export default {
        components:{
            gInput: require('./base/input-text.vue')
        },
        props: ['value','ischeck','name','classes','parentclass','title'],
        data(){
            return {
                userOpt: {
                    change: this.change,
                    focus: this.focus,
                    classes: this.classes,
                    parentClass: this.parentclass,
                    name: this.name,
                    title: this.title,
                    placeholder: this.title,
                    checkType: ['hasSpace']
                }
            }
        },
        ready(){
            let that = this;
            // lan.getLan(window.SystemGlobe.component.componentI18n).then(function(lanObj){
            //     that.userOpt.placeholder = lanObj.input.user;
            // });
        }
    }
</script>