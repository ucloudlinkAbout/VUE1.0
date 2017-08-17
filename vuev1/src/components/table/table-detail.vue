<!--
@负责人:chenwenxiao
@创建时间:2016-11-11
@版本:v1.0.0
@描述:表格查看功能插件
@使用方法:
<template>
    <g-table-detail data='dat' :open="op"></g-table-detail>
    <button v-on:click="e_open">打开详情</button>
</template>
<script>
    export default{
        components:{
            gTableDetail:require('xxx/xxx/table-detail.vue')
        },
        method:{
            e_open(){
                this.op++;
            }
        },
        data(){
            return{
                dat:{},
                op:0
            }
        }
    }
</script>
@参数说明:
    注意：使用时必须传入的数据是表格返回的才行
//显示的数据
data:Object,
//打开的触发器
open:Number
-->
<template>
    <g-dialog v-ref:dialog :opt="columdialogOpt">
        <span v-text="title" slot="title"></span>
        <div class="clear" slot="content">
            <div class="clearfix mt10 vm pl50 pr50 text-left">
                <div class="mt5 clear" v-for="data in dataShow.parton">
                    <label class="col-xs-3" v-text="data.lanParton + '：'"></label>
                    <span class="col-xs-9" v-html="dataShow.filteredValue[data.parton] === undefined ? i18n.nulls : dataShow.filteredValue[data.parton]"></span>
                </div>
            </div>
        </div>
    </g-dialog>
</template>
<script>
    import dialog from '../dialog/dialog.vue'
    import lan from '../../libs/base/lanLoader'

    export default{
        components: {
            gDialog: dialog
        },
        props: ['data', 'open'],
        data(){
            return {
                i18n: {},
                columdialogOpt: {
                    size: 3,
                    title: ''
                },
                title: '',
                dataShow: {}
            }
        },
        watch: {
            'open': {
                handler: function (nval, oval) {
                    this.$refs.dialog.$emit('openDialog');
                }
            },
            'data': {
                handler: function (nval, oval) {
                    if (nval) {
                        this.dataShow = nval[0];
                    }
                },
                deep: true
            }
        },
        ready(){
            let that = this;
            lan.getLan(window.SystemGlobe.component.componentI18n).then(function (com) {
                that.i18n = com.table;
                that.title = that.i18n.detail;
            });
        }
    }
</script>