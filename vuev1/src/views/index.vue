<template>
    <!-- 全局header -->
    <g-header :menudata.sync='menudata'></g-header>
    <div class="bg-f4 vm" v-cloak>
        <div class="clear main">
            <div class="content-left">
                <button type="button" class="iconfont btn btn-left btn-default border" v-on:click="hideMenu($event);">
                    <span class="iconfont">&#xe609;</span>
                </button>
                <g-leftmenu :menudata='menudata'></g-leftmenu>
            </div>
            <div class="content-right">
                <router-view keep-alive></router-view>
            </div>
        </div>
    </div>
</template>
<script>
    import './assets/css/bundle.css';
    import './assets/less/oms.less';
    import { ajaxAuthor } from '../libs/base/ajax';
    import Storage from '../libs/base/store';
    var _storage = new Storage();
    export default {
        components: {
            'gHeader': require('./serviceComInstance/structure/com-header.vue'),
            'gSearchbar': require('./serviceComInstance/structure/com-searchBar.vue'),
            'gLeftmenu': require('./serviceComInstance/structure/com-leftMenu.vue')
        },
        data() {
            return {
                lan: {},
                reds: {},
                menudata: []
            }
        },
        methods: {
            hideMenu: function (e) {
                var $btn = $(e.currentTarget);
                var $con = $btn.parents('.main');
                if ($con.hasClass('menu-hide')) {
                    $con.removeClass('menu-hide');
                } else {
                    $con.addClass('menu-hide');
                }
            },
            handleData(data) {
                var level0 = {};
                var menuNameId = {};
//                var rootMenu = {};
                for (var i = 0; i < data.length; i++) {
                    if (data[i].level == 1) {
                        level0[data[i].id] = data[i];
                        level0[data[i].id].children = [];
                    }
                }

                for (let i = 0; i < data.length; i++) {
                    if (data[i].level == 2) {
                        if (level0[data[i].parentID]) {
                            menuNameId[data[i].url] = data[i].parentID;
                            level0[data[i].parentID].children.push(data[i])
                        }
                    }
                }
                this.menudata = level0;
                _storage.localSave('menuNameId', menuNameId);
                _storage.localSave('menuData', level0);
            }
        },
        ready() {
            ajaxAuthor({
                // url:'/tData/common/menuData',
                url: '/oms/sysmenuconf/queryMenuByDevOps',
                // test:true,
                data: {},
                json: true,
                method: 'POST'
            }).then((data) => {
                this.handleData(data.data)
            });
        }
    }

</script>

