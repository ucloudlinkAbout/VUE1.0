<!--负责人:liugang-->
<!--开发日期:2016-11-22-->
<!--版本:v1.0.0-->
<!--功能：带标签的select-->
<!--修改请在下面注明-->
<template>
    <div class="col-md-6 col-xs-12">
        <p class="col-md-4 col-xs-12 mt6">{{title}}</p>
        <p class="col-md-8 col-xs-12">
            <g-select :mult="mult" :name='name1' :_list='list' :key.sync='value1'></g-select>
        </p>
    </div>
</template>
<script>
    import lan from '../../libs/base/lanLoader'
    export default {
        components:{
            gSelect:require('./Select.vue')
        },
        data(){
            return {
                name1:this.name,
                list:this._list,
                value1:this.key
            }
        },
        props:['_list','name','title','key','mult'],
        ready(){
            let that = this;
            lan.getLan(window.SystemGlobe.component.componentI18n).then(function(lanObj){
                //that.userOpt.placeholder = lanObj.input.user;
            });
        }
    }
</script>