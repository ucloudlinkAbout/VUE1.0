<!--
@负责人:liugang
@创建时间:2016-11-21
@版本:v1.0.0
@描述:左侧菜单树组件
@使用方法:
<template>
    <g-menu></g-menu>
</template>
<script>
    export default{
        components:{
            gMenu:require('xxx/xxx/com-leftMenu.vue')
        }
    }
</script>
@参数说明:

  menudata 菜单数据 
    格式 {"167":{"id":"167","url":"homePage","code":"MENUCODE","parentID":0,"level":"1","type":"Menu","status":"1","description":"菜单","module":"菜单","sortIndex":"1","createUserAccount":"adminstrations","createUserName":"adminstrations","createTime":1480929321000,"updateTime":1481276988000,"langType":"zh_CN","name":"系统管理","children":[{"id":"171","url":"damages","code":"MENUCODE","parentID":167,"level":"2","type":"Menu","status":"1","description":"菜单","module":"菜单","sortIndex":"1","createUserAccount":"adminstrations","createUserName":"adminstrations","createTime":1480931711000,"updateTime":1480931711000,"langType":"zh_CN","name":"赔偿管理"},{"id":"172","url":"notice","code":"MENUCODE","parentID":167,"level":"2","type":"Menu","status":"1","description":"菜单","module":"菜单","sortIndex":"1","createUserAccount":"adminstrations","createUserName":"adminstrations","createTime":1480932506000,"updateTime":1480932506000,"langType":"zh_CN","name":"通知管理"},{"id":"173","url":"systemParamConf","code":"MENUCODE","parentID":167,"level":"2","type":"Menu","status":"1","description":"菜单","module":"菜单","sortIndex":"1","createUserAccount":"adminstrations","createUserName":"adminstrations","createTime":1480932506000,"updateTime":1480932506000,"langType":"zh_CN","name":"参数管理"},{"id":"174","url":"dictionary","code":"MENUCODE","parentID":167,"level":"2","type":"Menu","status":"1","description":"菜单","module":"菜单","sortIndex":"1","createUserAccount":"adminstrations","createUserName":"adminstrations","createTime":1480932506000,"updateTime":1480932506000,"langType":"zh_CN","name":"字典表管理"},{"id":"207","url":"menuManager","code":"MENUCODE","parentID":167,"level":"2","type":"Menu","status":"1","description":"菜单","module":"菜单","sortIndex":"1","createUserAccount":"adminstrations","createUserName":"adminstrations","createTime":1481535862000,"updateTime":1481535862000,"langType":"zh_CN","name":"菜单管理"}]},"208":{"id":"208","url":"onemenu","code":"MENUCODE","parentID":0,"level":"1","type":"Menu","status":"1","description":"菜单","module":"菜单","sortIndex":"1","createUserAccount":"adminstrations","createUserName":"adminstrations","createTime":1481536226000,"updateTime":1481536226000,"langType":"zh_CN","name":"组织架构","children":[{"id":"209","url":"departmentManagement","code":"MENUCODE","parentID":208,"level":"2","type":"Menu","status":"1","description":"菜单","module":"菜单","sortIndex":"1","createUserAccount":"adminstrations","createUserName":"adminstrations","createTime":1481536396000,"updateTime":1481536396000,"langType":"zh_CN","name":"部门管理"}]},"210":{"id":"210","url":"SMS","code":"MENUCODE","parentID":0,"level":"1","type":"Menu","status":"1","description":"菜单","module":"菜单","sortIndex":"1","createUserAccount":"adminstrations","createUserName":"adminstrations","createTime":1481538286000,"updateTime":1481538286000,"langType":"zh_CN","name":"短信管理","children":[{"id":"211","url":"smsTemplate","code":"MENUCODE","parentID":210,"level":"2","type":"Menu","status":"1","description":"菜单","module":"菜单","sortIndex":"1","createUserAccount":"adminstrations","createUserName":"adminstrations","createTime":1481538400000,"updateTime":1481538400000,"langType":"zh_CN","name":"短信模版"},{"id":"212","url":"smssendLog","code":"MENUCODE","parentID":210,"level":"2","type":"Menu","status":"1","description":"菜单","module":"菜单","sortIndex":"1","createUserAccount":"adminstrations","createUserName":"adminstrations","createTime":1481617387000,"updateTime":1481617387000,"langType":"zh_CN","name":"短信日志"}]}}


  上面的是数据格式！真的。
-->
<template>
    <ul class="vm left-menu font-small">
        <li v-for='item in menuList' class="active">
            <div>
                <p>
                    <span class="iconfont icon-kucunguanli"></span><span class="ml5 font-normal">{{item.name}}</span><span class="iconfont ml15 down icon-xiajiantou"></span>
                </p>
            </div>
            <ul>
                <li v-for='_item in item.children' @click.stop='selectmenu(_item)' v-link="{name:_item.url}">{{_item.name}}</li>
            </ul>
        </li>
    </ul>
</template>
<script>
    'use strict';

    import vmHelper from '../../../libs/base/vmHelper';
    import storage from '../../../libs/base/store';
    let _storage = new storage();

    export default{
        data() {
            return {
                menuList:{}
            }
        },
        props:['menudata'],
        watch: {
            'menudata': {
                handler(nval, oval) {
                    const idList =  JSON.parse(_storage.localGet('menuNameId'));
                    this.menuList = [nval[idList[this.$route.name]]]
                }
            }
        },
        methods:{
            selectmenu(item) {
                window.$$vueEvent.$emit('selectmenu',item);
            }
        },
        ready() {

        }

    }
</script>