<template>
    <div class="pd20 border-top">
        <g-table :config.sync="tableData" :selectvalue.sync="selectvalue" :searchvalue.sync="searchvalue">
            <!--分发查询条件-->
            <div slot="search">
                <!--调用通用查询的头，方便后续修改样式-->
                <g-table-search>
                    <g-form v-ref:dictionary_searchform slot="search-content">
                        <div class="ilb pd5">
                            <g-input name="code" :label="i18n.code"></g-input>
                        </div>
                        <div class="ilb pd5">
                            <g-input name='name' :label="i18n.name"></g-input>
                        </div>
                        <div class="ilb pd5">
                            <g-select name="mvnoCode" :_list="select_mvnoCode" :label="i18n.mvnoCode"></g-select>
                        </div>
                        <div class="ilb pd5">
                            <g-select name="status" :_list="status_lantype" :label="i18n.status"></g-select>
                        </div>
                        <div class="ilb text-center">
                            <button type="button" class="btn btn-primary" @click.stop='e_search'
                                    v-text="i18n.search"></button>
                        </div>
                    </g-form>
                </g-table-search>
            </div>
            <button class="btn btn-primary" type="button" slot="add" v-on:click="e_openAdd">
                <span>+</span>
                {{i18n.add}}
            </button>
            <div slot="btnGroup">
                <a href="javascript:" v-on:click="e_openDetail" v-text="i18n.detail"></a>
                <a href="javascript:" v-on:click="e_openEdit" v-text="i18n.edit"></a>
                <a href="javascript:" v-on:click="e_openDel" v-text="i18n.del"></a>
            </div>
        </g-table>
    </div>

    <!--调用表格详情组件，将详情展示出来-->
    <g-table-detail :data.sync="selectvalue" :open.sync="openDetail"></g-table-detail>
    <!--调用表格编辑操作组件-->
    <g-dialog v-ref:dictionary_dialog_edit size="3">
        <span slot="title" v-text="i18n.edit"></span>
        <div class="clear" slot="content">
            <g-form v-ref:dictionary_editform>
                <g-input-noempty name="id" parentclass="hide"></g-input-noempty>
                <g-label name="code" :label="i18n.code" classes="col-xs-6"></g-label>
                <g-input-noempty name='name' :label="i18n.name" parentclass="col-xs-6"></g-input-noempty>
                <g-input-noempty name='data' :label="i18n.data" parentclass="col-xs-6"></g-input-noempty>
                <div class="col-xs-6 box">
                    <span v-text="i18n.status"></span>
                    <g-radio-list name="status" :list="status_lantype"></g-radio-list>
                </div>
                <g-label name="mvnoCode" :label="i18n.mvnoCode" classes="col-xs-6"></g-label>
                <g-label name="createTime" :label="i18n.createTime" classes="col-xs-6"></g-label>
                <g-label name="updateTime" :label="i18n.updateTime" classes="col-xs-6"></g-label>
                <g-textarea name='remark' parentclass="col-xs-12"></g-textarea>

            </g-form>
        </div>
        <button type="button" slot="button" class="btn btn-primary" @click.stop='e_editSubmit'
                v-text="i18n.edit"></button>
    </g-dialog>
    <!--调用表格新增操作组件-->
    <g-dialog v-ref:dictionary_dialog_add size="3">
        <span slot="title" v-text="i18n.add"></span>
        <div class="clear" slot="content">
            <g-form v-ref:dictionary_addform>
                <g-input-noempty name='code' :label="i18n.code" parentclass="col-xs-6"></g-input-noempty>
                <g-input-noempty name='name' :label="i18n.name" parentclass="col-xs-6"></g-input-noempty>
                <g-input-noempty name='data' :label="i18n.data" parentclass="col-xs-6"></g-input-noempty>
                <div class="col-xs-6">
                    <g-select name="mvnoCode" :_list="select_mvnoCode" :label="i18n.mvnoCode" parentclass="col-xs-6"></g-select>
                </div>
                <div class="col-xs-6 box">
                    <span v-text="i18n.status"></span>
                    <g-radio-list name="status" :list="status_lantype"></g-radio-list>
                </div>
                <g-textarea name='remark' parentclass="col-xs-12"></g-textarea>
            </g-form>
        </div>
        <button type="button" slot="button" class="btn btn-primary" @click.stop='e_addSubmit'
                v-text="i18n.add"></button>
    </g-dialog>
</template>
<script>
    import dialog from '../../../components/dialog/dialog.vue'
    import lan from '../../../libs/base/lanLoader'
    import sysparamconfBiz from '../../biz/oms/systemManager/sysparamconfBiz'
    import { util } from '../../../libs/base/util'
    export default{
        components: {
            gTable: require('../../../components/table/table-base.vue'),
            gTableDetail: require('../../../components/table/table-detail.vue'),
            gTableSearch: require('../../../components/table/table-search.vue'),
            gRadio: require('../../../components/radio/input-radio.vue'),
            gRadioList: require('../../../components/radio/input-radio-list.vue'),
            gInput: require('../../../components/input/input-base.vue'),
            gInputNoempty: require('../../../components/input/input-noempty.vue'),
            gTextarea: require('../../../components/textarea/textarea-desc.vue'),
            gForm: require('../../../components/form/form.vue'),
            gLabel: require('../../../components/label/label-base.vue'),
            gSelect: require('../../../components/select/select-base.vue'),
            gDialog: dialog
        },
        methods: {
            /**
             * Created by xiaodi on 2016/12/08.
             * 查询赔偿管理——表格更新查询问题 固定套路
             */
            e_search() {
                var check = this.$refs.dictionary_searchform.getData();
                if (check.ischeck) {
                    this.searchvalue = check.data;
                }
            },
            /**
             * Created by xiaodi on 2016/12/08.
             * 打开详情弹窗 固定套路
             */
            e_openDetail() {
                this.openDetail++
            },
            /**
             * Created by xiaodi on 2016/12/08.
             * 打开编辑弹窗 固定套路给value赋值
             */
            e_openEdit() {
                this.$refs.dictionary_dialog_edit.$emit('openDialog');
                var that = this, form = this.$refs.dictionary_editform;
                util.wait(function () {
                    debugger
                    let val = that.selectvalue[0].primaryValue;
                    val = util.resetFormValue({}, val);
                    form.setData(val);
                });
            },
            /**
             * Created by chenwenxiao on 2016/12/06.
             * 编辑字典表——提交编辑功能
             */
            e_editSubmit() {
                var form = this.$refs.dictionary_editform, that = this;
                var check = form.getData();
                if (check.ischeck) {
                    sysparamconfBiz.editSysparamconf(check.data).then(function (d) {
                        that.$refs.dictionary_dialog_edit.$emit('closeDialog');
                        //重置默认参数
                        var resetData = util.resetFormValue(check.data, {});
                        form.setData(resetData);
                        //编辑完成以后显示提示信息
                        util.middleTipsShow({
                            ico: 2,
                            txt: that.i18n.editSuccess
                        });
                    }, function (d) {
                        that.$refs.dictionary_dialog_edit.$emit('closeDialog');
                        //编辑失败以后显示提示信息
                        util.middleTipsShow({
                            ico: 1,
                            txt: that.i18n.editFailed,
                            //编辑失败以后显示提示信息后重新弹出弹出框
                            closeCallBack: function () {
                                that.$refs.dictionary_dialog_edit.$emit('openDialog');
                            }
                        });
                    });
                }
            },
            /**
             * Created by xiaodi on 2016/12/08.
             * 打开删除弹窗并处理删除操作
             */
            e_openDel() {
                var that = this;
                util.wait(function () {
                    var id = that.selectvalue[0].primaryValue.id;
                    util.dialogTipsShow({
                        txt: that.i18n.delConfirm,
                        callBack: function () {
                            sysparamconfBiz.delSysparamconf({
                                id: id
                            }).then(function () {
                                //删除成功以后显示提示信息
                                util.middleTipsShow({
                                    ico: 2,
                                    txt: that.i18n.delSuccess
                                });
                            }, function () {
                                //删除失败以后显示提示信息
                                util.middleTipsShow({
                                    ico: 1,
                                    txt: that.i18n.delFailed
                                });
                            });
                        }
                    })
                });
            },
            /**
             * Created by xiaodi on 2016/12/08.
             * 打开新增弹窗
             */
            e_openAdd() {
                this.$refs.dictionary_dialog_add.$emit('openDialog');
            },
            /**
             * Created by xiaodi on 2016/12/08.
             * 新增字典表——提交新增功能
             */
            e_addSubmit() {
                var form = this.$refs.dictionary_addform, that = this;
                var check = form.getData();
                if (check.ischeck) {
                    sysparamconfBiz.addSysparamconf(check.data).then(function (d) {
                        that.$refs.dictionary_dialog_add.$emit('closeDialog');
                        //重置默认参数
                        var resetData = util.resetFormValue(check.data, {});
                        form.setData(resetData);
                        //新增完成以后显示提示信息
                        util.middleTipsShow({
                            ico: 2,
                            txt: that.i18n.addSuccess
                        });
                    }, function (d) {
                        that.$refs.dictionary_dialog_add.$emit('closeDialog');
                        //新增失败以后显示提示信息
                        util.middleTipsShow({
                            ico: 1,
                            txt: that.i18n.addFailed,
                            //新增失败以后显示提示信息后重新弹出弹出框
                            closeCallBack: function () {
                                that.$refs.dictionary_dialog_add.$emit('openDialog');
                            }
                        });
                    });
                }
            }
        },
        data () {
            return {
                vvv: '',
                tableData: {
                    ajaxOption: {
                        url: '/oms/sysparamconf/querySystemParamConf',
                        method: 'post',
                        //test: true,
                        currPage: 1,
                        json: true
                    },
                    parton: ['code', 'createTime', 'data', 'id', 'mvnoCode', 'remark', 'status', 'updateTime'],
                    lanKey: 'v_systemParamConf',
                    timeFormat: ['createTime', 'updateTime'],
                    multiSelect: false,
                    showSort: false,
                    showSelect: false,
                    customerCol: true,
                    key: [],
                    //需要包裹的内容的字段
                    swap: [{
                        relate: 'data',
                        swap: 'a',
                        value: {
                            href: '#',
                            title: 'self'
                        }
                    }],
                    //静态字典翻译
                    staticKey: [{
                        relate: 'status',
                        type: {
                            '0': 'invalid',
                            '1': 'effective'
                        }
                    }]
                },
                openDetail: 0,
                openSingle: 0,
                openAdd: 0,
                i18n: {},
                //表格选中返回值
                selectvalue: '',
                //表格查询条件传入
                searchvalue: {},
                select_mvnoCode: {},
                //语言类型国际化处理
                select_lantype: {
                    'zh-CN': '0',
                    'zh-HK': '0',
                    'en-US': '0'
                },
                ttt: {
                    'zh-CN1': 'zh-CN',
                    'zh-TW1': 'zh-TW',
                    'en-US1': 'en-US'
                },
                //字典表状态国际化处理
                status_lantype: {
                    'Common@valid': '无效',
                    'Common@invalid': '有效'
                },
                addOpt: {
                    url: window.SystemGlobe.url.dictionary.addDictionary,
                    type: 'post'
                }
            }
        },
        ready() {
            var that = this;
            function selectMvnoCode() {
                var data = {
                    'type': 'MvnoCode',
                    'langType': 'zh-CN'
                };
                sysparamconfBiz.searchDictionary(data).then(function (d) {
                    var mvnoCode = {};
                    $.each(d.data.dataList, function (k, v) {
                        mvnoCode[v.key] = v.value;
                        that.select_mvnoCode = mvnoCode;
                    })
                })
            }
            lan.getLan('v_systemParamConf').then(function (lanObj) {
                that.i18n = lanObj;
                that.status_lantype = lanObj.status_type;
                selectMvnoCode();
            });
            window.$$routeList.systemParamConf = this;
        }
    }
</script>