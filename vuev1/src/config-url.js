/**
 * Created by chenwenxiao on 2017/2/15.
 */

var SystemGlobe = window.SystemGlobe || {};
//扫描开始标记
//@scanStart
SystemGlobe.url = {
    //登录相关
    loginforoms: {
        afterLoginBssSuccess: '/oms/loginforoms/afterLoginBssSuccess',
        login: '/oms/loginforoms/login',
        logout: '/oms/loginforoms/logout'
    },
    //字典表管理
    dictionary: {
        queryDictionaryByDevOps: '/oms/dictionary/queryDictionaryByDevOps',
        addDictionary: '/oms/dictionary/addDictionary',
        modifyDictionary: '/oms/dictionary/modifyDictionary',
        delDictionary: '/oms/dictionary/delDictionary',
        queryDictionary: '/oms/dictionary/queryDictionary'
    },
    //系统参数
    sysparamconf: {
        querySystemParamConf: '/oms/sysparamconf/querySystemParamConf',
        addSystemParamConf: '/oms/sysparamconf/addSystemParamConf',
        modifySystemParamConf: '/oms/sysparamconf/modifySystemParamConf',
        delSystemParamConf: '/oms/sysparamconf/delSystemParamConf',
        querySystemConfById: '/oms/sysparamconf/querySystemConfById'
    },
    //赔偿管理
    damages: {
        addDamages: '/oms/damages/addDamages',
        delDamages: '/oms/damages/delDamages',
        modifyDamages: '/oms/damages/modifyDamages',
        queryDamage: '/oms/damages/queryDamage',
        queryDamagesByDevOps: '/oms/damages/queryDamagesByDevOps'
    },
    //消息管理
    notice: {
        addNotice: '/oms/notice/addNotice',
        delNotice: '/oms/notice/delNotice',
        modifyNotice: '/oms/notice/modifyNotice',
        offlineNotice: '/oms/notice/offlineNotice',
        queryNotice: '/oms/notice/queryNotice',
        queryNoticeByDevOps: '/oms/notice/queryNoticeByDevOps',
        readNotice: '/oms/notice/readNotice',
        releaseNotice: '/oms/notice/releaseNotice'
    },
    //部门管理
    department : {
        editDepartment :'/oms/department/modifyDepartment',
        delDepartment :'/oms/department/delDepartment',
        addDepartment :'/oms/department/addDepartment',
    },
    //自营店铺
    selfOperated:{
        querySelfOperated:'/oms/department/queryDepartmentByDevOps',
        addSelfOperated:'/oms/department/addDepartment',
        editSelfOperated:'/oms/department/modifyDepartment',
        delSelfOperated:'/oms/department/delDepartment'

    },
    //员工管理
    management : {
        editManagement :'/oms/user/modifyUser',
        delManagement :'/oms/department/delDepartment',
        addManagement :'/oms/user/addUser',
        stopManagement :'/oms/user/stopUser',
        resetPwdManagement :'/oms/user/resetUserPWD',
        roleListManagement :'/oms/user/queryUserRoleList', //已分配角色
        allRoleListManagement :'/oms/user/queryUserAllRoleList', //全部分配角色
        updateUserOrgManagement :'/oms/user/updateUserOrg', //分配机构
    },
    //短信模版
    smsTemplate : {
        editSmsTemplate :'/oms/smsTemplate/modifySMSTemplate',
        delSmsTemplate :'/oms/smsTemplate/delDepartment',
        addSmsTemplate :'/oms/smsTemplate/addSMSTemplate',
    },
    //短信日志
    smssendlog : {
        querySMSRecordById :'/oms/smssendlog/querySMSRecordById',
    },
    //机构代理
    agency : {
        editAgency :'/oms/agent/modifyAgent',
        delAgency :'/oms/agent/delAgent',
        addAgency :'/oms/agent/addAgent',
    }
};
//@scanEnd
//扫描结束标记