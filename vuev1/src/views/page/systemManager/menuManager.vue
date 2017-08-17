<template>
    <div class="panel col-md-12 col-xs-12" id="view_add_edit">
        <g-tabs>
            <g-tab name='menu-add' title='菜单添加' active='true'>
                <g-form v-ref:addmenuform class="panel-body ellipse min192">
                    <g-fileupload name='file'></g-fileupload>
                    <g-input name='zh_CN' classes='col-md-6 col-xs-6' parentClass='col-md-12 col-xs-12'
                             title='菜单名称中文'></g-input>
                    <g-input name='zh_TW' classes='col-md-6 col-xs-6' parentClass='col-md-12 col-xs-12'
                             title='菜单名称繁体'></g-input>
                    <g-input name='en_US' classes='col-md-6 col-xs-6' parentClass='col-md-12 col-xs-12'
                             title='菜单名称英文'></g-input>
                    <g-input name='level' classes='col-md-6 col-xs-6' parentClass='col-md-12 col-xs-12'
                             title='层级'></g-input>
                    <g-input name='url' classes='col-md-6 col-xs-6' parentClass='col-md-12 col-xs-12'
                             title='url'></g-input>
                    <g-input name='type' classes='col-md-6 col-xs-6' parentClass='col-md-12 col-xs-12'
                             title='菜单类型'></g-input>
                    <g-input name='code' classes='col-md-6 col-xs-6' parentClass='col-md-12 col-xs-12'
                             title='编码'></g-input>
                    <g-input name='parentID' classes='col-md-6 col-xs-6' parentClass='col-md-12 col-xs-12'
                             title='菜单父节点'></g-input>
                    <g-input name='module' classes='col-md-6 col-xs-6' parentClass='col-md-12 col-xs-12'
                             title='模块'></g-input>
                    <g-input name='sortIndex' classes='col-md-6 col-xs-6' parentClass='col-md-12 col-xs-12'
                             title='排序号'></g-input>
                    <g-input name='createUserAccount' classes='col-md-6 col-xs-6' parentClass='col-md-12 col-xs-12'
                             title='createUserAccount'></g-input>
                    <g-input name='createUserName' classes='col-md-6 col-xs-6' parentClass='col-md-12 col-xs-12'
                             title='createUserName'></g-input>
                    <g-input name='description' classes='col-md-6 col-xs-6' parentClass='col-md-12 col-xs-12'
                             title='description'></g-input>
                    <div class="mt10 col-md-12 text-center">
                        <button type="submit" class="btn btn-primary" @click.stop='submit'>保存</button>
                    </div>
                </g-form>
            </g-tab>


            <g-tab name='menu-edit' title='菜单编辑'>
                <div class='col-md-4 col-xs-4'>
                    <g-tree :item='data' v-on:setmenu="setmenu"></g-tree>
                </div>
                <g-form v-ref:editmenuform class="panel-body ellipse min192 col-md-8 col-xs-8">
                    <g-input-noempty name="id" parentclass="hide"></g-input-noempty>
                    <g-input name='zh_CN' classes='col-md-6 col-xs-6' parentClass='col-md-12 col-xs-12'
                             title='菜单名称中文'></g-input>
                    <g-input name='zh_TW' classes='col-md-6 col-xs-6' parentClass='col-md-12 col-xs-12'
                             title='菜单名称繁体'></g-input>
                    <g-input name='en_US' classes='col-md-6 col-xs-6' parentClass='col-md-12 col-xs-12'
                             title='菜单名称英文'></g-input>
                    <g-input name='level' classes='col-md-6 col-xs-6' parentClass='col-md-12 col-xs-12'
                             title='层级'></g-input>
                    <g-input name='url' classes='col-md-6 col-xs-6' parentClass='col-md-12 col-xs-12'
                             title='url'></g-input>
                    <g-input name='type' classes='col-md-6 col-xs-6' parentClass='col-md-12 col-xs-12'
                             title='菜单类型'></g-input>
                    <g-input name='code' classes='col-md-6 col-xs-6' parentClass='col-md-12 col-xs-12'
                             title='编码'></g-input>
                    <g-input name='parentID' classes='col-md-6 col-xs-6' parentClass='col-md-12 col-xs-12'
                             title='菜单父节点'></g-input>
                    <g-input name='module' classes='col-md-6 col-xs-6' parentClass='col-md-12 col-xs-12'
                             title='模块'></g-input>
                    <g-input name='sortIndex' classes='col-md-6 col-xs-6' parentClass='col-md-12 col-xs-12'
                             title='排序号'></g-input>
                    <g-input name='createUserAccount' classes='col-md-6 col-xs-6' parentClass='col-md-12 col-xs-12'
                             title='createUserAccount'></g-input>
                    <g-input name='createUserName' classes='col-md-6 col-xs-6' parentClass='col-md-12 col-xs-12'
                             title='createUserName'></g-input>
                    <g-input name='description' classes='col-md-6 col-xs-6' parentClass='col-md-12 col-xs-12'
                             title='description'></g-input>
                    <div class="mt10 col-md-12 text-center">
                        <button type="submit" class="btn btn-primary" @click.stop='editMenu'>保存</button>
                        <button type="submit" class="btn btn-primary" @click.stop='delMenu'>删除</button>
                    </div>
                </g-form>
            </g-tab>
        </g-tabs>
    </div>
</template>
<script>
    'use strict';
    import dialog from '../../../components/dialog/dialog.vue';
    import { ajaxAuthor } from '../../../libs/base/ajax';
    import Storage from '../../../libs/base/store';

    var _storage = new Storage();
    export default{
        components: {
            gInput: require('../../../components/input/input-label.vue'),
            gInputNoempty: require('../../../components/input/input-noempty.vue'),
            gFileupload: require('../../../components/file/uploadFile.vue'),
            gForm: require('../../../components/form/form.vue'),
            gTree: require('../../../components/tree/tree.vue'),
            gDialog: dialog,
            gTabs: require('../../../components/tab/tabs.vue'),
            gTab: require('../../../components/tab/tab.vue')
        },
        data() {
            return {
                inputOpt: {},
                selectdata: {
                    '亚洲': {
                        cn: {
                            value: '中国',
                            state: false
                        },
                        jp: {
                            value: '日本',
                            state: false
                        }
                    },
                    '非洲': {
                        mnl: {
                            value: '马尼拉',
                            state: false
                        }
                    }
                },
                data: {}
                // data:[
                //         {"id":"1","text":"商品管理","name":"name1","grade": "0","show":true,
                //             "children":[
                //                 {"id":"11","text":"商品列表","name":"name2","grade": "1"},
                //                 {"id":"12","text":"添加新商品","name":"name3","grade": "1"},
                //                 {"id":"13","text":"商品分类","name":"name4","grade": "1","children":[
                //                     {"id":"131","text":"商品列表1","name":"name11","grade": "2","children":[
                //                         {"id":"1311","text":"商品列表13","name":"name1311","grade": "3"}
                //                     ]}
                //                 ]}
                //             ]
                //         },
                //         {"id":"2","text":"商品管理3","name":"name5","grade": "0",
                //             "children":[
                //                 {"id":"21","text":"商品列表2","name":"name5","grade": "1"},
                //             ]
                //         }
                //     ]
            }
        },
        methods: {
            submit() {
                var _data = this.$refs.addmenuform.getData();

                if (_data.ischeck) {
                    ajaxAuthor({
                        url: '/oms/sysmenuconf/addMenu',
                        data: this.handleData(_data.data),
                        json: true,
                        method: 'post'
                    }).then((data) => {
                        console.log(data)
                    });
                }
            },
            delMenu() {
                var _data = this.$refs.editmenuform.getData();
                if (_data.ischeck) {
                    ajaxAuthor({
                        url: '/oms/sysmenuconf/delMenu',
                        data: {
                            id: _data.data.id
                        },
                        json: true,
                        method: 'post'
                    }).then((data) => {
                        console.log(data)
                    });
                }
            },
            editMenu() {
                var _data = this.$refs.editmenuform.getData();
                if (_data.ischeck) {
                    ajaxAuthor({
                        url: '/oms/sysmenuconf/modifyMenu',
                        data: this.handleData(_data.data),
                        json: true,
                        method: 'post'
                    }).then((data) => {
                        console.log(data)
                    });
                }
            },
            setmenu(item) {
                ajaxAuthor({
                    url: '/oms/sysmenuconf/queryMenuById',
                    data: {
                        id: item.id
                    },
                    json: true,
                    method: 'post'
                }).then((data) => {
                    this.$refs.editmenuform.setData(this.handleMenuData(data.data));
                });
            },
            handleMenuData(data) {
                var sysMenuNameList = data.sysMenuNameList;
                for (let i = 0; i < sysMenuNameList.length; i++) {
                    data[sysMenuNameList[i].langType] = sysMenuNameList[i].name;
                }
                return data;
            },
            handleData(data) {
                data.sysMenuNameList = [];
                data.sysMenuNameList.push({
                    langType: 'zh_CN',
                    name: data.zh_CN
                });
                data.sysMenuNameList.push({
                    langType: 'zh_TW',
                    name: data.zh_TW
                });
                data.sysMenuNameList.push({
                    langType: 'en_US',
                    name: data.en_US
                });

                delete data.zh_CN;
                delete data.zh_TW;
                delete data.en_US;

                return data;
            }
        },
        ready() {
            window.$$routeList.menuManager = this;
            setTimeout(() => {
                const menuData = JSON.parse(_storage.localGet('menuData'));
                var list = [];
                for (var key in menuData) {
                    list.push(menuData[key]);
                }
                this.data = list;
            }, 500);
        }
    }
</script>