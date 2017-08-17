<!--
@负责人:chenwenxiao
@创建时间:2016-11-11
@版本:v1.0.0
@描述:表格控件
@使用方法:
//代码不完全，可以参考字典表里面如何使用的
<template>
    <g-table :config.sync="tableData" :selectvalue.sync="selectvalue" :searchvalue.sync="searchvalue">
        <div slot="search">
            <g-table-search>
                <g-form v-ref:dictionary_searchform slot="search-content">
                    <g-input name="type" :label="i18n.type"></g-input>
                    <g-input name='key' :label="i18n.key"></g-input>
                    <g-select name="lanType" :_list="select_lantype" :label="i18n.lanType"></g-select>
                    <g-select name="status" :_list="status_lantype" mult='true' :label="i18n.status"></g-select>
                    <div class="ilb text-center">
                        <button type="button" class="btn btn-secondary" @click.stop='e_search' v-text="i18n.search"></button>
                    </div>
                </g-form>
            </g-table-search>
        </div>
        <button class="btn btn-secondary" type="button" slot="add" v-on:click="e_openAdd">
            <span>+</span>
            <span v-text="i18n.add"></span>
        </button>
        <div slot="btnGroup">
            <a href="javascript:" v-on:click="e_openDetail" v-text="i18n.detail"></a>
            <a href="javascript:" v-on:click="e_openEdit" v-text="i18n.edit"></a>
            <a href="javascript:" v-on:click="e_openDel" v-text="i18n.del"></a>
        </div>
    </g-table>
</template>
<script>
    export default{
        components:{
            gInputImei:require('xxx/xxx/input-imei.vue')
        }
    }
</script>
@参数说明:
//配置参数
config:Object,
    //具体的参数如下
    /*以下两个方案，不能同时共存，只能选择其中一个，公用参数部分可以共存*/
            //方案一：需要做ajax请求的部分
            ajaxOption: {
                //接口url
                url: '',
                //接口方法
                method: 'post',
                //显示按钮的个数
                pageSize: 5,
                //每页多少条数据
                perPage: 10,
                //每页多少条数据的选择
                perPageSelect: '10, 20, 50, 100',
                //当前页
                currPage: 1,
                //是否是json格式的数据
                json: true,
                //是否开启测试模式
                test: false,
                //默认查询参数，为空对象或者不写则不传
                defaultParameter: {}
            },
            //方案二：直接赋予列表数据的部分
            dataOption: {
                //若没有url，可以使用dataList为列表提供展示数据，不支持分页
                dataList: []
            },
            /*以下部分为通用参数*/
            //执行过滤之前的处理
            beforeFilter: function (dataList) {
                return dataList;
            },
            //执行过滤之后执行的处理
            afterFilter: function (dataList) {
                return dataList;
            },
            //字段过滤，按顺序展示
            parton: [],
            //字段过滤，按顺序展示
            lanParton: [],
            //多语言文件名称
            lanKey: '',
            //需要进行时间转换处理的字段
            timeFormat: [],
            //是否显示排序功能
            showSort: true,
            //是否显示第一行的选择框
            showSelect: true,
            //是否多选
            multiSelect: false,
            //需要进行流量处理的字段
            flowFormat: [],
            //是否使用自定义列
            customerCol: true,
            //动态字典表翻译
            key: [],
            //动态包裹功能
            swap: [],
            //静态字典表翻译
            staticKey: []

//返回选中的某行的值
selectvalue:Object,
//传入表格查询的值
searchvalue:Object
-->
<template>
    <div class="clear" v-bind:id="tableInstance.defaultOpt.lanKey + 'table'" v-show="showTableData">
        <slot name="search"></slot>
        <!--表格相关的操作-->
        <div class="mt10 mb20">
            <div class="ilb">
                <slot name="batch"></slot>
            </div>
            <div class="fr ilb">
                <slot name="add"></slot>
            </div>
        </div>
        <div class="wrap" v-show="tableDataObject.dataList.length!==0">
            <!--表格主体-->
            <table class="table vm table-out-bordered table-head-bg">
                <thead>
                <tr>
                    <th class="table-select-th" v-show="tableInstance.defaultOpt.showSelect">
                        <g-checkbox v-bind:onchange="checkboxAllClick" v-bind:checked="checkboxAllchecked" v-show="tableInstance.defaultOpt.multiSelect">
                            <b slot="txt" v-text="tableI18n.selectAll"></b>
                        </g-checkbox>
                    </th>
                    <th v-for="data in tableDataObject.parton" v-bind:class="data.parton">
                        <span v-text="data.lanParton"></span>
                        <div class="ilb table-sort" v-show="tableInstance.defaultOpt.showSort">
                            <p><span class="iconfont icon-xialacaidanxiaosanjiao hand font-small" v-bind:sort="data.parton" v-on:click="sortAsc" v-bind:title="tableI18n.ascending"></span></p>
                            <p><span class="iconfont icon-xialacaidanxiaosanjiao1 hand font-small" v-bind:sort="data.parton" v-on:click="sortDesc" v-bind:title="tableI18n.descending"></span></p>
                        </div>
                    </th>
                    <th class="last"><span v-text="tableI18n.operate"></span><span class="iconfont ico-gray fr icon-set hand" v-on:click="openCustomerCol" v-show="tableInstance.defaultOpt.customerCol"></span></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="data in tableDataObject.dataList" v-on:click="radioClick">
                    <td v-show="tableInstance.defaultOpt.showSelect">
                        <g-checkbox v-bind:onchange="checkboxClick" v-show="tableInstance.defaultOpt.multiSelect" :values.sync="data.id" :names.sync="tableInstance.defaultOpt.lanKey"></g-checkbox>
                        <g-radio v-bind:onchange="radioClick" v-show="!tableInstance.defaultOpt.multiSelect" :values.sync="data.id" :names.sync="tableInstance.defaultOpt.lanKey"></g-radio>
                    </td>
                    <td v-html="data[pt.parton]" v-for="pt in tableDataObject.parton"></td>
                    <td>
                        <slot name="btnGroup"></slot>
                    </td>
                </tr>
                </tbody>
            </table>

            <!--分页记录部分-->
            <div class="text-right mt20">
                <div class="form-inline">
                    <span>
                        <b v-text="tableDataObject.pageOption.totalCount"></b>

                        <!--条记录，-->
                        <span v-text="tableI18n.record"></span>
                        <b v-text="tableDataObject.pageOption.totalPageCount"></b>

                        <!--页数据-->
                        <span v-text="tableI18n.page"></span>
                    </span>
                    <select class="form-control jumpPageInput" v-on:change="perPage" v-model="tablePerpage">
                        <option v-for="per in tableInstance.defaultOpt.ajaxOption.perPageSelect" v-text="per"></option>
                    </select>

                    <ul class="pagination">
                        <li><a href="javascript:" v-bind:title="1" v-on:click="selectPage"><span class="iconfont font-small icon-zuojiantou"></span></a></li>
                        <li v-for="page in tableDataObject.pageSize" v-bind:class="{'active': (currPageBtn + 1) == page }"><a href="javascript:" v-bind:title="page" v-on:click="selectPage"><span v-text="page"></span></a></li>
                        <li><a href="javascript:" v-bind:title="tableDataObject.pageOption.totalPageCount" v-on:click="selectPage"><span class="iconfont font-small icon-youjiantou"></span></a></li>
                    </ul>

                    <input type="text" v-bind:placeholder="tableI18n.pages" class="form-control jumpPageInput" v-model="jumpPageData" v-on:change="jumpPageChange" v-on:keyup="jumpPageChange"/>

                    <!--跳转按钮-->
                    <button class="btn btn-primary" v-text="tableI18n.jump" v-on:click="jumpPage"></button>
                </div>
            </div>
        </div>
        <div class="text-center" v-show="tableDataObject.dataList.length===0">
            暂无数据
        </div>

        <!--自定义列弹窗-->
        <g-dialog v-ref:dialog size="1">
            <span v-text="setCol" slot="title"></span>
            <div class="clear" slot="content">
                <ul class="clear text-left" slot="customerCol" id="table-colum">
                    <li class="col-xs-4" v-for="data in tableDataObject.partonBack">
                        <g-checkbox :names="config.lanKey + 'Colum'" :values="data.parton" :checked="true" v-bind:onchange="selectColum">
                            <b slot="txt" v-text="data.lanParton"></b>
                        </g-checkbox>
                    </li>
                </ul>
            </div>
            <div class="fl ml5 ilb" slot="button">
                <g-checkbox v-bind:onchange="selectAllcolum" :checked.sync="colcheckboxAllchecked">
                    <b slot="txt" v-text="tableI18n.selectAll"></b>
                </g-checkbox>
                <button class="btn btn-primary" type="button" v-on:click="columOk" v-text="tableI18n.ok"></button>
                <button class="btn btn-primary" type="button" v-on:click="columReset" v-text="tableI18n.reset"></button>
            </div>
        </g-dialog>
    </div>

    <g-loading-canvas :status.sync="tableLoadStaus" :finishcallback="loadFinishCallBack"></g-loading-canvas>
    <div class="text-center" v-show="isStopLoading">数据加载失败，请查看网络状况！</div>

</template>
<script>
    import Table from '../../libs/base/table'
    import lan from '../../libs/base/lanLoader'

    export default {
        data (){
            return {
                //展示表格数据对象
                showTableData: false,
                isStopLoading: false,
                setCol:'',
                tableLoadStaus: 'start',
                //表格数据对象
                tableDataObject: {
                    pageOption: {},
                    dataList:[]
                },
                //表格多语言
                tableI18n: {},
                openCustomer: false,
                //表格实例对象
                tableInstance: {
                    defaultOpt: {
                        ajaxOption: {}
                    }
                },
                //表格每页数量双向绑定值
                tablePerpage: 10,
                //当前选中的按钮组索引
                currPageBtn: 0,
                jumpPageData: '',
                //列表默认选中状态
                checkboxAllchecked: false,
                //自定义列默认全选
                colcheckboxAllchecked: true,
                //自定义弹出框参数
                columdialogOpt: {
                    confirmCallback() {
                        console.log('ds');
                    },
                    size: 1
                }
            }
        },
        components: {
            gCheckbox: require('../checkbox/input-checkbox.vue'),
            gRadio: require('../radio/input-radio.vue'),
            gDialog: require('../dialog/dialog.vue'),
            gLoadingCanvas: require('../loadTips/loadingCanvas.vue')
        },
        watch: {
            'config': {
                handler: function (nval, oval) {
                },
                deep: true
            },
            'searchvalue': {
                handler: function (nval, oval) {
                    let postObj = {};
                    for(let d in nval) {
                        if (nval[d]) {
                            if (nval[d].length !== 0) {
                                postObj[d] = nval[d]
                            }
                        }
                    }
                    this.reflash(postObj);
                },
                deep: true
            }
        },
        props: ['config', 'selectvalue','searchvalue'],
        ready(){
            var that = this;
            lan.getLan(window.SystemGlobe.component.componentI18n).then(function (com) {
                that.setCol = com.table.setCol;
                that.tableI18n = com.table;
            });
            lan.getLan(that.config.lanKey).then(function (lanObj) {
                that.config.lanObj = lanObj;
                let tb = new Table(that.config);
                that.tableInstance = tb;
                that.tablePerpage = tb.defaultOpt.ajaxOption.perPage;
                tb.init().then(function (d) {
                    that.tableDataObject = d;

                    //初始化自定义列拖拽功能
                    $("#" + tb.defaultOpt.lanKey + 'table #table-colum').dragsort({
                        dragSelector: 'li',
                        dragEnd: function () {

                        },
                        dragBetween: false,
                        placeHolderTemplate: '<li class="col-xs-4 border"></li>'
                    });
                    that.tableLoadStaus = 'finish';
                }, function (d) {
                    that.isStopLoading = true;
                    that.tableLoadStaus = 'stop';
                });
            });
        },
        methods: {
            reflash:function (data) {
                let that = this;
                that.isStopLoading = false;
                that.showTableData = false;
                that.tableLoadStaus = 'start';
                that.tableInstance.currentQuery = data || {};
                that.tableInstance.query(data || {}).then(function (d) {
                    that.tableDataObject = d;
                    that.tableLoadStaus = 'finish';
                }, function (d) {
                    that.isStopLoading = true;
                    that.tableLoadStaus = 'stop';
                });
            },
            loadFinishCallBack:function () {
                this.showTableData = true;
            },

            //打开自定义列弹窗
            openCustomerCol: function (e) {
                this.$refs.dialog.$emit('openDialog');
                let $obj = $(e.currentTarget).parents('#' + this.tableInstance.defaultOpt.lanKey + 'table').find('#table-colum'), that = this;
                if (that.tableDataObject.parton.length === that.tableDataObject.partonBack.length) {
                    that.colcheckboxAllchecked = true;
                } else {
                    that.colcheckboxAllchecked = false;
                    $obj.find('input').prop('checked', false);
                    for (let i = 0; i < that.tableDataObject.parton.length; i++) {
                        $obj.find('input[value=' + that.tableDataObject.parton[i].parton + ']').prop('checked', true);
                    }
                }
            },
            //自定义列重置
            columReset: function () {
                this.tableDataObject.parton = this.tableInstance.partonTranslate(this.tableInstance.defaultOpt.parton);
                this.tableDataObject.parton.$set(0, this.tableDataObject.parton[0]);
                this.tableDataObject.partonBack = this.tableInstance.partonTranslate(this.tableInstance.defaultOpt.parton);
                this.tableDataObject.partonBack.$set(0, this.tableDataObject.partonBack[0]);
                this.colcheckboxAllchecked = true;
                this.reflashData();
                this.$refs.dialog.$emit('closeDialog');
                let arr = [];
                for (let i = 0; i < this.tableDataObject.parton.length; i++) {
                    arr.push(this.tableDataObject.parton[i].parton);
                }
                this.tableInstance.savePartonToLocal(this.tableDataObject.parton, arr);
            },
            //自定义列确定
            columOk: function (e) {
                let arr = [], arrOld = [];
                $(e.currentTarget).parents('.modal').find('li input[type=checkbox]').each(function () {
                    if ($(this).prop('checked')) {
                        arr.push($(this).val());
                    }
                    arrOld.push($(this).val());
                });
                this.tableDataObject.parton = this.tableInstance.partonTranslate(arr);
                this.tableDataObject.parton.$set(0, this.tableDataObject.parton[0]);
                this.reflashData();
                this.$refs.dialog.$emit('closeDialog');
                this.tableInstance.savePartonToLocal(this.tableDataObject.parton ,arrOld);
            },
            //自定义列单选按钮
            selectColum: function (e) {
                let that = this;
                let len = $(e.currentTarget).parents('ul').find('li input[type=checkbox]:checked').length;
                if ($(e.currentTarget).parents('ul').find('li').length === len) {
                    that.colcheckboxAllchecked = true;
                } else {
                    that.colcheckboxAllchecked = false;
                }
            },
            //自定义列全选按钮
            selectAllcolum: function (e) {
                let that = this;
                if ($(e.currentTarget).prop('checked')) {
                    $(e.currentTarget).parents('.modal').find('li input[type=checkbox]').prop('checked', true);
                    that.colcheckboxAllchecked = true;
                } else {
                    $(e.currentTarget).parents('.modal').find('li input[type=checkbox]').prop('checked', false);
                    that.colcheckboxAllchecked = false;
                }
            },
            //表格全选按钮，目前不支持跨页全选
            checkboxAllClick: function (e) {
                let that = this;
                that.selectvalue = that.selectvalue || [];
                if ($(e.currentTarget).prop('checked')) {
                    that.selectvalue = [];
                    for (let i = 0; i < that.tableDataObject.dataList.length; i++) {
                        that.selectvalue.push(that.tableDataObject.dataList[i]);
                    }
                    $(e.currentTarget).parents('table').find('tbody input[type=checkbox]').prop('checked', true);
                    that.checkboxAllchecked = true;
                } else {
                    that.selectvalue = [];
                    $(e.currentTarget).parents('table').find('tbody input[type=checkbox]').prop('checked', false);
                    that.checkboxAllchecked = false;
                }
            },
            //checkbox点击时value的改变
            checkboxClick: function (e) {
                let that = this;
                that.selectvalue = that.selectvalue || [];
                if ($(e.currentTarget).prop('checked')) {
                    that.selectvalue.push({
                        id: e.currentTarget.value,
                        primaryValue: that.tableInstance.getDataById(this.tableDataObject.oldList, e.currentTarget.value),
                        filteredValue: that.tableInstance.getDataById(this.tableDataObject.dataList, e.currentTarget.value)
                    });
                } else {
                    for (let i = 0; i < that.selectvalue.length; i++) {
                        if (that.selectvalue[i].id === e.currentTarget.value) {
                            if (i < that.selectvalue.length) {
                                that.selectvalue[i] = that.selectvalue[i + 1];
                                that.selectvalue.length--;
                            } else {
                                that.selectvalue.length--;
                            }
                        }
                    }
                }
                if (that.selectvalue.length === that.tableDataObject.pageOption.perPageCount) {
                    that.checkboxAllchecked = true;
                } else {
                    that.checkboxAllchecked = false;
                }
            },
            //radio点击时value的改变
            radioClick: function (e) {
                let that = this;
                if (e.currentTarget.value) {
                    that.selectvalue = [{
                        id: e.currentTarget.value,
                        primaryValue: that.tableInstance.getDataById(this.tableDataObject.oldList, e.currentTarget.value),
                        parton:that.tableDataObject.parton,
                        filteredValue: that.tableInstance.getDataById(this.tableDataObject.dataList, e.currentTarget.value)
                    }];
                } else {
                    let val = $(e.currentTarget).find('input[type=radio]').val();
                    that.selectvalue = [{
                        id: val,
                        primaryValue: that.tableInstance.getDataById(this.tableDataObject.oldList, val),
                        parton:that.tableDataObject.parton,
                        filteredValue: that.tableInstance.getDataById(this.tableDataObject.dataList, val)
                    }];
                }
            },
            jumpPageChange: function () {
                let that = this;
                that.jumpPageData = that.jumpPageData.replace(/^[^1-9]|[^0-9]/g, '');
            },
            /**************翻页功能***********/
            //页面跳转通用方法
            pageQuery: function (page) {
                let that = this;
                that.tableInstance.flip(page, that.tableInstance.currentQuery).then(function (d) {
                    that.tableDataObject = d;
                    that.currPageBtn = d.pageOption.currentPage - 1;
                });
            },
            //选择当前页跳转
            selectPage: function (e) {
                this.pageQuery(e.currentTarget.attributes.title.value);
            },
            //每页显示多少条记录
            perPage: function (e) {
                let that = this;
                that.tableInstance.defaultOpt.ajaxOption.perPage = e.currentTarget.value;
                that.tableInstance.query(that.tableInstance.currentQuery).then(function (d) {
                    that.tableDataObject = d;
                });
            },
            //跳页功能
            jumpPage: function (e) {
                let that = this;
                if (that.jumpPageData > that.tableDataObject.pageOption.totalPageCount || that.jumpPageData === '') {
                    return;
                }
                that.pageQuery(that.jumpPageData);
                that.jumpPageData = '';
            },
            reflashData: function () {
                //vue 由于js原生数组的限制，无法自动检测刷新，因此需要手动刷新
                this.tableDataObject.dataList.$set(0, this.tableDataObject.dataList[0]);
            },
            //降序排序
            sortDesc: function (e) {
                let that = this;
                that.tableDataObject.dataList = that.tableInstance.sort(that.tableDataObject.dataList, e.currentTarget.attributes.sort.value, true);
                $(e.currentTarget).parents('thead').find('.ico-yellow').removeClass('ico-yellow').end().end().addClass('ico-yellow');
                that.reflashData();
            },
            //升序排序
            sortAsc: function (e) {
                let that = this;
                that.tableDataObject.dataList = that.tableInstance.sort(that.tableDataObject.dataList, e.currentTarget.attributes.sort.value, false);
                $(e.currentTarget).parents('thead').find('.ico-yellow').removeClass('ico-yellow').end().end().addClass('ico-yellow');
                that.reflashData();
            }
        }
    }
</script>
<style>
    .table-sort p,.table-sort span{
        height: 14px;
    }
    .table thead th{
        padding: 6px 4px;
        min-width: 90px;
    }
    .table thead th.table-select-th{
        width: 30px;
        min-width: 30px;
    }
    .wrap{
        overflow: auto;
    }
    .last{
        /*position:absolute;*/

    }
</style>