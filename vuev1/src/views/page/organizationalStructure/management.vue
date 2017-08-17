<template>
    <div class="pd20 border-top">
        <g-table :config.sync="tableData" :selectvalue.sync="selectvalue" :searchvalue.sync="searchvalue">
            <div slot="search">
                <!--调用通用查询的头，方便后续修改样式-->
                <g-table-search>
                    <g-form v-ref:dictionary_searchform slot="search-content">
                        <div class="ilb pd5">
                            <g-input-noempty name="username" :label="i18n.username"></g-input-noempty>
                        </div>
                        <div class="ilb pd5">
                            <g-select name="mvnoCode" :_list.sync="select_mvnoCode" :label="i18n.mvnoCode"></g-select>
                        </div>
                        <div class="ilb pd5">
                            <g-select name="userType" :_list.sync="select_usertype" :label="i18n.userType"></g-select>
                        </div>
                        <div class="ilb pd5">
                            <g-select name="status" :_list.sync="select_statustype" :label="i18n.status"></g-select>
                        </div>
                        <!--<div class="ilb pd5">-->
                        <!--<g-select name="mvnoCode" :_list="select_mvnoCode" :label="i18n.mvno"></g-select>-->
                        <!--</div>-->
                        <div class="ilb text-center">
                            <button type="button" class="btn btn-secondary" @click.stop='e_search'
                                    v-text="i18n.search"></button>
                        </div>
                    </g-form>
                </g-table-search>
            </div>
            <button class="btn btn-secondary" type="button" slot="add" @click="e_openAdd">
                <span>+</span>
                <span v-text="i18n.add"></span>
            </button>
            <div slot="btnGroup">

                <div class="a-hover">
                    <span class="iconfont icon-gengduo"></span>
                    <div class="a-hover-target">
                        <a href="javascript:" v-on:click="e_openDetail" v-text="i18n.detail"></a>
                        <a href="javascript:" v-on:click="e_openEdit" v-text="i18n.edit"></a>
                        <a href="javascript:" v-on:click="e_openDel" v-text="i18n.del"></a>
                    </div>
                </div>
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
                <g-input-noempty name='usercode' :label="i18n.usercode" parentclass="col-xs-6"></g-input-noempty>
                <g-input-noempty name='username' :label="i18n.username" parentclass="col-xs-6"></g-input-noempty>
                <g-input-noempty name='deptName' :label="i18n.deptName" parentclass="col-xs-6"></g-input-noempty>
                <div class="col-xs-6 box">
                    <span v-text="i18n.status"></span>
                    <g-radio-list name="status" :list.sync="select_statustype"></g-radio-list>
                </div>
                <div class="ilb pd5">
                    <g-select name="user" :_list="" :label="i18n.user"></g-select>
                </div>
                <g-label name="functionalAuthority" :label="i18n.functionalAuthority" classes="col-xs-6"></g-label>

            </g-form>
        </div>
        <button type="button" slot="button" class="btn-big btn-secondary" @click.stop='e_editSubmit'
                v-text="i18n.edit"></button>
    </g-dialog>
    <!--调用表格新增操作组件-->
    <g-dialog v-ref:dictionary_dialog_add size="3">
        <span slot="title" v-text="i18n.add"></span>
        <div class="clear" slot="content">
            <g-form v-ref:dictionary_addform>
                <div style="border-bottom: 1px solid #ddd; height: 40px">
                    <div class="col-xs-12 box">
                    <span v-text="i18n.status"></span>
                    <div class="ilb radio-list ">
                        <label class="input-radio" >
                            <input type="radio" checked="true"/>
                            <span><i></i></span>
                            <b v-text="i18n.departmentUser"></b>
                        </label>
                    </div>
                    <div class="ilb radio-list ">
                        <label class="input-radio">
                            <input type="radio" />
                            <span><i></i></span>
                            <b v-text="i18n.agentUser"></b>
                        </label>
                    </div>
                </div>
                </div>

                <div class="adminType">
                    <div class="departmentUser">
                        <g-form v-ref:management_departmentUserform>
                            <g-input-noempty name='usercode' :label="i18n.usercode" parentclass="col-xs-6"></g-input-noempty>

                        </g-form>
                    </div>
                    <div class="agentUser">
                        <g-form v-ref:management_agentUserform>


                        </g-form>
                    </div>
                </div>
            </g-form>
        </div>
        <button type="button" slot="button" class="btn-big btn-secondary" @click.stop='e_addSubmit'
                v-text="i18n.add"></button>
    </g-dialog>

    <!--分配角色-->
    <g-dialog v-ref:management_dialog_distributionuser size="3">
        <span slot="title" v-text="i18n.add"></span>
        <div class="clear" slot="content">
            <g-form v-ref:management_distributionUserform>


            </g-form>
        </div>
        <button type="button" slot="button" class="btn-big btn-secondary" @click.stop='e_addSubmit'
                v-text="i18n.add"></button>
    </g-dialog>

    <!--分配角色-->
    <g-dialog v-ref:management_dialog_distributionUser size="3">
        <span slot="title" v-text="i18n.add"></span>
        <div class="clear" slot="content">
            <g-form v-ref:management_distributionUserform>
                <div >

                </div>
            </g-form>
        </div>
        <button type="button" slot="button" class="btn-big btn-secondary" @click.stop='e_addSubmit'
                v-text="i18n.add"></button>
    </g-dialog>
</template>
<style>
    .adminType{
        clear: both;
        padding:15px
    }
</style>
<script>
    import dialog from '../../../components/dialog/dialog.vue'
    import lan from '../../../libs/base/lanLoader'
    import managementBiz from '../../biz/oms/organizationalStructure/managementBiz'
    import { util } from '../../../libs/base/util'
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
            /*
            * 功能权限：oms/role/queryResourceByUserIDAndType  传的参数用户id和type，type=’ResourceType@Menu’是字典值,*/
            e_openEdit() {
              var id = that.selectvalue[0].primaryValue.id;
                this.$refs.dictionary_dialog_edit.$emit('openDialog');
                var that = this, form = this.$refs.dictionary_editform;
                util.wait(function () {
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
                    managementBiz.editDepartment(check.data).then(function (d) {
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
                            managementBiz.delDepartment({
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

             * 打开分配角色
             */
            e_openDistributionUser() {
                this.$refs.management_dialog_distributionuser.$emit('openDialog');
            },

            /**
             * Created by xiaodi on 2016/12/08.

             * 打开分配角色
             */
            e_openDistributionUser() {
                console.log(0);
                console.log(this.$refs.management_dialog_distributionUser)
                this.$refs.management_dialog_distributionUser.$emit('openDialog');
            },

            /**
             * Created by xiaodi on 2016/12/08.
             * 新增字典表——提交新增功能
             */
            e_addSubmit() {
                var form = this.$refs.dictionary_addform, that = this;
                var check = form.getData();
                if (check.ischeck) {
                    managementBiz.addDepartment(check.data).then(function (d) {
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
                        url: '/oms/user/queryUserByDevOps',
                        method: 'post',
                        pageSize: 5,
                        perPage: 10,
                        currPage: 1,
                        json: true,
                        test: true,
                    },
                    parton: ['usercode', 'loginname', 'username', 'usertype', 'deptName', 'mobile', 'status', 'createUserName', 'createTime', 'updateTime', 'user', 'adminTyoe', 'email', 'identifyAttachment', 'identifyNum', 'createUserAccount', 'mvnoCode'],
                    lanKey: 'v_management',
                    timeFormat: ['createTime', 'updateTime'],
                    showSort: false,
                    showSelect: false,
                    multiSelect: false,
                    customerCol: true,
                    beforeFilterReplaceOldList: true,
                    key: [],
                    staticKey: [],
                    beforeFilter: function (da) {
                        var data = [];
                        for (var i = 0; i < da.length; i++) {
                            data.push(da[i].userListData)
                            var roleList = [];
                            if (da[i].roleList && da[i].roleList.length > 0) {
                                for (var r = 0; r < da[i].roleList.length; r++) {
                                    roleList.push(da[i].roleList[r].name)
                                }
                                data[i].user = roleList
                            }
                        }
                        return data
                    }
                },
                selectvalue: {},
                searchvalue: {},
                openDetail: 0,
                //国际化双向绑定对象
                i18n: {},
                //查询mvnoCdeo双向绑定
                select_mvnoCode: {},
                select_usertype: {},
                select_mechanism: {},
                select_lantype_edit: {
                    'zh-CN': 'zh-CN',
                    'zh-TW': 'zh-TW',
                    'en-US': 'en-US'
                },
                //字典表状态国际化处理
                select_statustype: {
                    'Common@valid': '无效',
                    'Common@invalid': '有效'
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
                managementBiz.searchDictionary(data).then(function (d) {
                    var mvnoCode = {};
                    $.each(d.data.dataList, function (k, v) {
                        mvnoCode[v.key] = v.value;
                        that.select_mvnoCode = mvnoCode;
                    })
                })
            }

//            function selectMechanism() {
//                managementBiz.searchAllDepartment().then(function (d) {
//                    var mechanism = {};
//                    $.each(d.data.dataList, function (k, v) {
//                        mechanism[v.key] = v.value;
//                        that.select_mechanism = mechanism;
//                    })
//                })
//            }
            lan.getLan('v_management').then(function (lanObj) {
                that.i18n = lanObj;
                that.select_statustype = lanObj.status_type;
                that.select_usertype = lanObj.user_type;
                selectMvnoCode();
//                selectMechanism();
            });
            window.$$routeList.managementBiz = this;
        }
    }
</script>