<template>
    <div class="pd20 border-top">
        <g-table :config.sync="tableData" :selectvalue.sync="selectvalue" :searchvalue.sync="searchvalue">
            <!--分发查询条件-->
            <div slot="search">
                <!--调用通用查询的头，方便后续修改样式-->
                <g-table-search>
                    <g-form v-ref:dictionary_searchform slot="search-content">
                        <div class="ilb pd5">
                            <g-input name='receiver' :label="i18n.receiver"></g-input>
                        </div>
                        <div class="ilb pd5">
                            <g-input name='senderId' :label="i18n.senderId"></g-input>
                        </div>
                        <div class="ilb pd5">
                            <g-select name="mvnoCode" :_list="select_mvnoCode" :label="i18n.mvno"></g-select>
                        </div>
                        <div class="ilb pd5">
                            <g-select name="status" :_list="status_lantype" :label="i18n.status"></g-select>
                        </div>
                        <!--下拉内容还没确定-->
                        <!--<g-select name="orgCode" :_list="status_lantype" :label="i18n.status"></g-select>-->
                        <div class="ilb pd5">
                            <g-select name="templateCode" :_list="select_smsTemplate" :label="i18n.templateCode"></g-select>
                        </div>
                        <div class="ilb pd5">
                            <g-input name='createTime' :label="i18n.createTime"></g-input>
                        </div>
                        <div class="ilb pd5">
                            <g-input name='updateTime' :label="i18n.updateTime"></g-input>
                        </div>
                        <div class="ilb text-center">
                            <button type="button" class="btn btn-primary" @click.stop='e_search'
                                    v-text="i18n.search"></button>
                        </div>
                    </g-form>
                </g-table-search>
            </div>
            <div slot="btnGroup">
                <a href="javascript:" v-on:click="e_openDetail" v-text="i18n.detail"></a>
                <a href="javascript:" v-on:click="e_sendAgain" v-text="i18n.sendAgain"></a>
            </div>
        </g-table>
    </div>

    <!--调用表格详情组件，将详情展示出来-->
    <g-table-detail :data.sync="selectvalue" :open.sync="openDetail"></g-table-detail>
</template>
<script>
    import dialog from '../../../components/dialog/dialog.vue'
    import lan from '../../../libs/base/lanLoader'
    import smssendLogBiz from '../../biz/oms/smsManagement/smssendLogBiz'
    import { util } from '../../../libs/base/util'
    export default{
        components: {
            gTable: require('../../../components/table/table-base.vue'),
            gTableDetail: require('../../../components/table/table-detail.vue'),
            gTableSearch: require('../../../components/table/table-search.vue'),
            gRadio: require('../../../components/radio/input-radio.vue'),
            gRadioList: require('../../../components/radio/input-radio-list.vue'),
            gInput: require('../../../components/input/input-base.vue'),
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
             * 短信重发
             */
            e_sendAgain() {
                var  that = this;
                util.wait(function () {
                    var id = that.selectvalue[0].primaryValue.id;
                    var receiver = that.selectvalue[0].primaryValue.receiver;
                    var content = that.selectvalue[0].primaryValue.content;
                    util.dialogTipsShow({
                        ico: 1,
                        txt: that.i18n.isOk,
                        callBack: function () {
                            console.log("asdas")
                            smssendLogBiz.sendAgain({
                                id: id,
                                receiver: receiver,
                                content: content
                            }).then(function () {
                                //成功以后显示提示信息
                                util.middleTipsShow({
                                    ico: 2,
                                    txt: that.i18n.sendSuccess
                                });
                            }, function () {
                                //失败以后显示提示信息
                                util.middleTipsShow({
                                    ico: 1,
                                    txt: that.i18n.sendFailed
                                });
                            });
                        }
                    })
                })
            }
        },
        data () {
            return {
                vvv: '',
                tableData: {
                    ajaxOption: {
                        url: '/oms/smssendlog/querySMSRecordByDevOps',
                        method: 'post',
                        //test: true,
                        currPage: 1,
                        json: true
                    },
                    parton: ['receiver', 'senderId', 'content', 'templateCode', 'orgCode', 'serialNumber', 'status', 'mvnoCode', 'createTime', 'updateTime'],
                    lanKey: 'v_smssendLog',
                    timeFormat: ['createTime', 'updateTime'],
                    multiSelect: false,
                    customerCol: true,
                    key: [],
                    staticKey: []
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
                select_smsTemplate: {},
                //字典表状态国际化处理
                status_lantype: {
                    '0': '成功',
                    '1': '失败'
                }
            }
        },
        ready() {
            var that = this;
            function selectMvnoCode() {
                var data = {
                    'type': 'mvnoCode',
                    'langType': 'zh-CN'
                };
                smssendLogBiz.searchDictionary(data).then(function (d) {
                    var mvnoCode = {};
                    $.each(d.data.dataList, function (k, v) {
                        mvnoCode[v.key] = v.value;
                        that.select_mvnoCode = mvnoCode;
                    })
                })
            }
            lan.getLan('v_smssendLog').then(function (lanObj) {
                that.i18n = lanObj;
                that.status_lantype = lanObj.status_type;
                that.select_smsTemplate = lanObj.templateCode_type;
                selectMvnoCode();
            });
            window.$$routeList.smssendLog = this;
        }
    }
</script>