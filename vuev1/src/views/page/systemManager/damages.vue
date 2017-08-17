<template>
    <div class="pd20 border-top">
        <g-table :config.sync="tableData" :selectvalue.sync="selectvalue" :searchvalue.sync="searchvalue">
            <div slot="search">
                <!--调用通用查询的头，方便后续修改样式-->
                <g-table-search>
                    <g-form v-ref:dictionary_searchform slot="search-content">
                        <div class="ilb pd5">
                            <g-input name="damagesCode" :label="i18n.damagesCode"></g-input>
                        </div>
                        <div class="ilb pd5">
                            <g-input name="damagesName" :label="i18n.damagesName"></g-input>
                        </div>
                        <div class="ilb pd5">
                            <g-select name="lanType" :_list="select_lanTpye" :label="i18n.language"></g-select>
                        </div>
                        <div class="ilb pd5">
                            <g-select name="dataStatus" :_list="select_statetpye" :label="i18n.state"></g-select>
                        </div>
                        <div class="ilb pd5">
                            <g-select name="damagesType" :_list="select_compensationtpye" :label="i18n.damagesType"></g-select>
                        </div>
                        <div class="ilb pd5">
                            <g-select name="mvnoCode" :_list="select_mvnoCode" :label="i18n.mvno"></g-select>
                        </div>
                        <div class="ilb text-center">
                            <button type="button" class="btn btn-primary" @click.stop='e_search'
                                    v-text="i18n.search"></button>
                        </div>
                    </g-form>
                </g-table-search>
            </div>
            <button class="btn btn-primary" type="button" slot="add" @click="e_openAdd">
                <span>+</span>
                <span v-text="i18n.add"></span>
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
                <g-label name="damagesCode" :label="i18n.damagesCode" classes="col-xs-6"></g-label>
                <g-input-noempty name='damagesName' :label="i18n.damagesName" parentclass="col-xs-6"></g-input-noempty>
                <g-label name="damagesPrice" :label="i18n.damagesPrice" classes="col-xs-6"></g-label>
                <g-label name="createTime" :label="i18n.createTime" classes="col-xs-6"></g-label>
                <g-label name="updateTime" :label="i18n.updateTime" classes="col-xs-6"></g-label>
                <g-label name="mvnoCode" :label="i18n.mvno" classes="col-xs-6"></g-label>
                <div class="col-xs-6 box">
                    <span v-text="i18n.language"></span>
                    <g-radio-list name="langType" :list="select_lantype_edit"></g-radio-list>
                </div>
                <div class="col-xs-6">
                    <g-select name="damagesType" :_list="select_compensationtpye" :label="i18n.damagesType"></g-select>
                </div>
                <div class="col-xs-6">
                    <g-select name="dataStatus" :_list="select_statetpye" :label="i18n.state"></g-select>
                </div>
                <g-textarea name='description' parentclass="col-xs-12"></g-textarea>
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
                <g-input-noempty name="damagesCode" :label="i18n.damagesCode" parentclass="col-xs-6"></g-input-noempty>
                <g-input-noempty name='damagesName' :label="i18n.damagesName" parentclass="col-xs-6"></g-input-noempty>
                <g-input-noempty name='damagesPrice' :label="i18n.damagesPrice"
                                 parentclass="col-xs-6"></g-input-noempty>
                <div class="col-xs-6 box">
                    <span v-text="i18n.language"></span>
                    <g-radio-list name="langType" :list="select_lantype_edit"></g-radio-list>
                </div>
                <div class="col-xs-6">
                    <g-select name="mvnoCode" :_list="select_mvnoCode" :label="i18n.mvno"></g-select>
                </div>
                <div class="col-xs-6 box">
                    <span v-text="i18n.status"></span>
                    <g-radio-list name="status" :list="select_statetpye"></g-radio-list>
                </div>
                <div class="col-xs-6">
                    <g-select name="damagesType" :_list="select_compensationtpye" :label="i18n.damagesType"></g-select>
                </div>
                <g-textarea name='description' parentclass="col-xs-12"></g-textarea>
            </g-form>
        </div>
        <button type="button" slot="button" class="btn btn-primary" @click.stop='e_addSubmit' v-text="i18n.add"></button>
    </g-dialog>
</template>
<script>
    import dialog from '../../../components/dialog/dialog.vue'
    import lan from '../../../libs/base/lanLoader'
    import damagesBiz from '../../biz/oms/systemManager/damagesBiz'
    import { util } from '../../../libs/base/util'
    //    import { timeFormat } from '../../../libs/base/timeFormat'
    export default{
        components: {
            gTable: require('../../../components/table/table-base.vue'),
            gForm: require('../../../components/form/form.vue'),
            gTableSearch: require('../../../components/table/table-search.vue'),
            gSelect: require('../../../components/select/select-base.vue'),
            gInput: require('../../../components/input/input-base.vue'),
            gTableDetail: require('../../../components/table/table-detail.vue'),
            gInputNoempty: require('../../../components/input/input-noempty.vue'),
            gInputReadonly: require('../../../components/input/input-readonly.vue'),
            gRadioList: require('../../../components/radio/input-radio-list.vue'),
            gTextarea: require('../../../components/textarea/textarea-desc.vue'),
            gLabel: require('../../../components/label/label-base.vue'),
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
                this.openDetail++;
            },
            /**
             * Created by xiaodi on 2016/12/08.
             * 打开编辑弹窗 固定套路给value赋值
             */
            e_openEdit() {
                this.$refs.dictionary_dialog_edit.$emit('openDialog');
                var that = this, form = this.$refs.dictionary_editform;
                util.wait(function () {
                    var val = that.selectvalue[0].primaryValue;
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
                    damagesBiz.editDamages(check.data).then(function (d) {
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
                            damagesBiz.delDamages({
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
                    damagesBiz.addDamages(check.data).then(function (d) {
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
                tableData: {
                    ajaxOption: {
                        url: '/oms/damages/queryDamagesByDevOps',
                        method: 'post',
                        pageSize: 5,
                        perPage: 10,
                        currPage: 1,
                        json: true,
                        test: true
                    },
                    parton: ['damagesCode', 'damagesName', 'damagesPrice', 'langType', 'description', 'damagesType', 'dataStatus', 'mvnoCode', 'createTime', 'updateTime'],
                    lanKey: 'v_damages',
                    timeFormat: ['createTime', 'updateTime'],
                    multiSelect: false,
                    customerCol: true,
                    key: [],
                    staticKey: []
                },
                openDetail: 0,
                //国际化双向绑定对象
                i18n: {},
                //查询mvnoCdeo双向绑定
                select_mvnoCode: {},
                //表格选中返回值
                selectvalue: {},
                //表格查询条件传入
                searchvalue: {},
                //赔偿类型处理
                select_compensationtpye: {},
                //语言类型国际化处理
                select_lanTpye: {},
                //状态
                select_statetpye: {},
                //编辑功能选择框选择列表
                select_lantype_edit: {
                    'zh-CN': 'zh-CN',
                    'zh-TW': 'zh-TW',
                    'en-US': 'en-US'
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
                damagesBiz.searchDictionary(data).then(function (d) {
                    var mvnoCode = {};
                    $.each(d.data.dataList, function (k, v) {
                        mvnoCode[v.key] = v.value;
                        that.select_mvnoCode = mvnoCode;
                    })
                })
            }

            lan.getLan('v_damages').then(function (lanObj) {
                that.i18n = lanObj;
                that.select_lanTpye = lanObj.lan_tpye;
                that.select_compensationtpye = lanObj.compensation_tpye;
                that.select_statetpye = lanObj.state_tpye;
                selectMvnoCode();
            });
            window.$$routeList.damages = this;
        }
    }
</script>
