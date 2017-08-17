<template>
    <div class="pd20 border-top">
        <g-table :config.sync="tableData" :selectvalue.sync="selectvalue" :searchvalue.sync="searchvalue">
            <!--分发查询条件-->
            <div slot="search">
                <!--调用通用查询的头，方便后续修改样式-->
                <g-table-search>
                    <g-form v-ref:dictionary_searchform slot="search-content">
                        <g-input name="type" :label="i18n.type"></g-input>
                        <g-input name='key' :label="i18n.key"></g-input>
                        <g-select name="lanType" :_list="select_lantype" :label="i18n.lanType"></g-select>
                        <g-select name="status" :_list="status_lantype" :label="i18n.status"></g-select>
                        <div class="ilb text-center">
                            <button type="button" class="btn btn-primary" @click.stop='e_search' v-text="i18n.search"></button>
                        </div>
                    </g-form>
                </g-table-search>
            </div>
            <button class="btn btn-primary" type="button" slot="add" v-on:click="e_openAdd">
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
    <!--调用表格新增操作组件-->
    <g-dialog v-ref:dictionary_dialog_add size="3">
        <span slot="title" v-text="i18n.add"></span>
        <div class="clear" slot="content">
            <g-form v-ref:dictionary_addform>
                <g-input-noempty name="type" :label="i18n.type" parentclass="col-xs-6"></g-input-noempty>
                <g-input-noempty name='key' :label="i18n.key" parentclass="col-xs-6"></g-input-noempty>

                <div class="col-xs-6 box">
                    <span v-text="i18n.lanType"></span>
                    <g-radio-list name="langType" :list="select_lantype_edit" defaultvalue="zh-CN"></g-radio-list>
                </div>
                <div class="col-xs-6 box">
                    <span v-text="i18n.status"></span>
                    <g-radio-list name="status" :list="status_lantype" defaultvalue="0"></g-radio-list>
                </div>

                <g-input-noempty name='value' :label="i18n.value " parentclass="col-xs-6"></g-input-noempty>
                <g-textarea name='description' parentclass="col-xs-12"></g-textarea>
            </g-form>
        </div>
        <button type="button" slot="button" class="btn btn-primary" @click.stop='e_addSubmit' v-text="i18n.add"></button>
    </g-dialog>

    <!--调用表格编辑操作组件-->
    <g-dialog v-ref:dictionary_dialog_edit size="3">
        <span slot="title" v-text="i18n.edit"></span>
        <div class="clear" slot="content">
            <g-form v-ref:dictionary_editform>
                <g-input-noempty name="id" parentclass="hide"></g-input-noempty>
                <g-input-readonly name="type" :label="i18n.type" parentclass="col-xs-6"></g-input-readonly>
                <g-input-readonly name='key' :label="i18n.key" parentclass="col-xs-6"></g-input-readonly>
                <div class="col-xs-6 box">
                    <span v-text="i18n.lanType"></span>
                    <g-radio-list readonly="true" name="langType" :list="select_lantype_edit"></g-radio-list>
                </div>
                <div class="col-xs-6 box">
                    <span v-text="i18n.status"></span>
                    <g-radio-list name="status" :list="status_lantype"></g-radio-list>
                </div>
                <g-input-noempty name='value' :label="i18n.value " parentclass="col-xs-6"></g-input-noempty>
                <g-textarea name='description' parentclass="col-xs-12"></g-textarea>
            </g-form>
        </div>
        <button type="button" slot="button" class="btn btn-primary" @click.stop='e_editSubmit' v-text="i18n.edit"></button>
    </g-dialog>
</template>
<script>
    import lan from '../../../libs/base/lanLoader'
    import { util } from '../../../libs/base/util'
    import dictionaryBiz from '../../biz/oms/systemManager/dictionaryBiz'
    export default{
        components: {
            gTable: require('../../../components/table/table-base.vue'),
            gTableDetail: require('../../../components/table/table-detail.vue'),
            gTableSearch: require('../../../components/table/table-search.vue'),
            gRadioList: require('../../../components/radio/input-radio-list.vue'),
            gInput: require('../../../components/input/input-base.vue'),
            gInputNoempty: require('../../../components/input/input-noempty.vue'),
            gInputReadonly: require('../../../components/input/input-readonly.vue'),
            gTextarea: require('../../../components/textarea/textarea-desc.vue'),
            gForm: require('../../../components/form/form.vue'),
            gSelect: require('../../../components/select/select-base.vue'),
            gDialog: require('../../../components/dialog/dialog.vue')
        },
        methods: {
            /**
             * Created by chenwenxiao on 2016/12/06.
             * 查询字典表——表格更新查询问题
             */
            e_search() {
                var check = this.$refs.dictionary_searchform.getData();
                if (check.ischeck) {
                    this.searchvalue = check.data;
                }
            },
            /**
             * Created by chenwenxiao on 2016/12/06.
             * 新增字典表——提交新增功能
             */
            e_addSubmit() {
                var form = this.$refs.dictionary_addform, that = this;
                var check = form.getData();
                if (check.ischeck) {
                    dictionaryBiz.addDictionary(check.data).then(function (d) {
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
            },
            /**
             * Created by chenwenxiao on 2016/12/06.
             * 编辑字典表——提交编辑功能
             */
            e_editSubmit() {
                var form = this.$refs.dictionary_editform, that = this;
                var check = form.getData();
                if (check.ischeck) {
                    dictionaryBiz.editDictionary(check.data).then(function (d) {
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
             * Created by chenwenxiao on 2016/12/06.
             * 打开详情弹窗
             */
            e_openDetail() {
                this.openDetail++;
            },
            /**
             * Created by chenwenxiao on 2016/12/06.
             * 打开删除弹窗并处理删除操作
             */
            e_openDel() {
                var that = this;
                util.wait(function () {
                    var id = that.selectvalue[0].primaryValue.id;
                    util.dialogTipsShow({
                        txt: that.i18n.delConfirm,
                        callBack: function () {
                            dictionaryBiz.delDictionary({
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
             * Created by chenwenxiao on 2016/12/06.
             * 打开新增弹窗
             */
            e_openAdd() {
                this.$refs.dictionary_dialog_add.$emit('openDialog');
            },
            /**
             * Created by chenwenxiao on 2016/12/06.
             * 打开编辑弹窗
             */
            e_openEdit() {
                this.$refs.dictionary_dialog_edit.$emit('openDialog');
                var that = this, form = this.$refs.dictionary_editform;
                util.wait(function () {
                    let val = that.selectvalue[0].primaryValue;
                    val.status = val.status.toString();
                    val = util.resetFormValue({}, val);
                    form.setData(val);
                });
            }
        },
        data () {
            return {
                //表格参数
                tableData: {
                    ajaxOption: {
                        url: window.SystemGlobe.url.dictionary.queryDictionaryByDevOps,
                        method: 'post',
                        json: true
                    },
                    //字段过滤，按顺序展示
                    parton: ['type', 'key', 'langType', 'value', 'status', 'description', 'createTime'],
                    lanKey: 'v_dictionary',
                    timeFormat: ['createTime'],
                    showSort: false,
                    showSelect: false,
                    multiSelect: false,
                    customerCol: true,
                    staticKey: [{
                        relate: 'status',
                        type: {
                            '0': 'invalid',
                            '1': 'effective'
                        }
                    }]
                },
                //编辑功能选择框选择列表
                select_lantype_edit: {
                    'zh-CN': 'zh-CN',
                    'zh-TW': 'zh-TW',
                    'en-US': 'en-US'
                },
                //国际化双向绑定对象
                i18n: {},
                //开启详情的控制功能
                openDetail: 0,
                //表格选中返回值
                selectvalue: {},
                //表格查询条件传入
                searchvalue: {},
                //语言类型国际化处理
                select_lantype: {},
                //字典表状态国际化处理
                status_lantype: {},
                //编辑新增等部分的默认值，真的radio和checkbox等，统一使用default开头
                defaultOption: {
                    default_status: '0',
                    default_lanType: 'zh-CN'
                }
            }
        },
        ready() {
            var that = this;
            //加载多语言文件
            lan.getLan('v_dictionary').then(function (lanObj) {
                that.i18n = lanObj;
                that.select_lantype = lanObj.lan_type;
                that.status_lantype = lanObj.status_type;
            });
            //注册路由，每个页面的注册路由必须唯一
            window.$$routeList.dictionary = this;
        }
    }
</script>