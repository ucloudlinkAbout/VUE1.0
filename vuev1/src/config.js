/**
 * Created by chenwenxiao on 2016/11/17.
 */
/**
 * 定义接口对象列表，接口统一管理，便于后期维护
 * */
var SystemGlobe = window.SystemGlobe || {};

SystemGlobe.devType = {
    //开启debug模式，将不做多语言等缓存，测试数据也只有debug模式下才能开启
    debug: true,
    //是否开启按钮控制
    btnControll: true,
    //是否开启自定义列本地存储
    columLocalSave: true,
    //cookie过期时间，当前设置为8小时，单位（秒）
    sessionTimeOut: 3600 * 8,
    //cookie过期时间，当前设置为8小时，单位（秒）
    cookieDomain: '.roman.com',
    //localStorage过期时间，当前设置为24小时，单位（毫秒）
    localStorageTimeOut: 3600000 * 24,
    //接口访问时间统计提交频率，默认1分钟一次
    apiDataSubmitTime: 1000 * 60,
    //登录相关配置参数
    clientId: 'php160',
    clientSecret: 'php160',
    partnerCode: 'UKWEB'
};
SystemGlobe.GlobeOption = {
    showLoadingTips: 0,
    middleTipsList: [],
    leftTipsList: [],
    dialogTipsList: [],
    timingOption: [],
    debugLogList: []
};

//通用组件路径处理
SystemGlobe.component = {
    componentI18n: 'component'
};