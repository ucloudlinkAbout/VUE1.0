<!--
@负责人:chenwenxiao
@创建时间:2016-11-11
@版本:v1.0.0
@描述:表格查询控件
@使用方法:
<template>
    <g-table-search advance="true">
        <g-form v-ref:dictionary_searchform slot="search-content">
            <g-input name="type" :label="i18n.type"></g-input>
            <g-input name='key' :label="i18n.key"></g-input>
            <g-select name="lanType" :_list="select_lantype" :label="i18n.lanType"></g-select>
            <g-select name="status" :_list="status_lantype" mult='true' :label="i18n.status"></g-select>
            <div class="ilb text-center">
                <button type="button" class="btn btn-secondary" @click.stop='e_search' v-text="i18n.search"></button>
            </div>

            //高级查询部分组件分发
            <div slot="search-advance">
                <g-input name="type" :label="i18n.type"></g-input>
                <g-input name='key' :label="i18n.key"></g-input>
                <g-select name="lanType" :_list="select_lantype" :label="i18n.lanType"></g-select>
                <g-select name="status" :_list="status_lantype" mult='true' :label="i18n.status"></g-select>
                <div class="ilb text-center">
                    <button type="button" class="btn btn-secondary" @click.stop='e_search' v-text="i18n.search"></button>
                </div>
            </slot>
        </g-form>
    </g-table-search>
</template>
<script>
    export default{
        components:{
            gTableSearch:require('xxx/xxx/table-search.vue')
        }
    }
</script>
@参数说明:
    注意：表格查询头只为了后续修改样式方便，主要起到组件分发的作用

//是否开启高级搜索功能
advance:false
-->
<template>
    <div class="clear table-search">
        <div class="mt5 mb10 vm">
            <span class="iconfont icon-sousuo search-fix"></span>
            <span v-text="i18nTable.search"></span>
        </div>
        <div class="clear">
            <div class="col-xs-10">
                <slot name="search-content"></slot>
            </div>
            <div class="text-right col-xs-2" v-show="advance">
                <div class="vm ilb search-advance-fix hand" v-on:click="e_showAdvance" >
                    <span class="iconfont icon-sousuo1 ico-purple"></span>
                    <span v-text="i18nTable.advanceSearch"></span>
                </div>
            </div>
            <div v-show="advanceshow" class="fr">
                <span class="search-up-triangle ilb"></span>
            </div>
        </div>
        <div v-show="advanceshow" class="pd30 search-advance">
            <slot name="search-advance"></slot>
        </div>
    </div>
</template>
<script>
    import lan from '../../libs/base/lanLoader'
    export default{
        data(){
            return {
                i18nTable: {},
                advanceshow: false,
                running: false
            }
        },
        props:['advance'],
        methods: {
            e_showAdvance(e){
                let that = this;
                if (!that.running) {
                    that.running = true;
                    let $target = $(e.currentTarget).parents('.table-search').find('.search-advance');
                    if (!that.advanceshow) {
                        $target.slideDown(function () {
                            that.running = false;
                        });
                        that.advanceshow = !that.advanceshow;
                    } else {
                        $target.slideUp(function () {
                            that.advanceshow = !that.advanceshow;
                            that.running = false;
                        });
                    }
                }
            }
        },
        ready(){
            let that = this;
            lan.getLan(window.SystemGlobe.component.componentI18n).then(function (com) {
                that.i18nTable = com.table;
            });
        }
    }
</script>
<style>
    .search-fix{
        margin-top: 4px;
        display: inline-block;
        font-size: 12px;
    }
    .search-advance-fix{
        font-size: 18px;
    }
    .search-advance-fix .iconfont{
        margin-top: 4px;
        display: inline-block;
    }
    .search-advance{
        background: #fff5f5;
    }
    .search-up-triangle{
        width: 0;
        height: 0;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 15px solid #fff5f5;
        margin-right: 30px;
    }
</style>