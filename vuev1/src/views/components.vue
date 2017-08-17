<template>
    <div class="test-components">
        <nav>
            <img src="../components/assets/images/logo_icon.png"/>
            <span class="fr ico-yellow ilb mt5 mr100">组件库动态文档</span>
        </nav>
        <div class="content clear">
            <div class="left">
                <p>历史版本选择</p>
                <p class="pl10 mt5">
                    <label class="select">
                        <select v-model="selectedTime" v-on:change="changeSelect">
                            <option v-for="item in selectTime" v-text="item.createTime" v-bind:value="item.index"></option>
                        </select>
                        <i></i>
                    </label>
                </p>

                <ul id="leftBar">
                    <li v-for="(pk,pv) in treeItem">
                        <p v-text="pk"></p>
                        <ul>
                            <li v-for="(ck,cv) in pv">
                                <p v-text="ck" v-bind:value="cv" v-on:click="selectComponent"></p>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div class="right">
                <div class="clear">
                    <span class="mt15 ilb">当前选择版本：{{currentVersion}}</span>
                    <div class="btt ilb fr">
                        <!--<button class="btn btn-primary" v-on:click="startScan">重新扫描</button>-->
                    </div>
                </div>
                <p class="mb20">注意：请尽可能使用新版本的文档</p>
                <div v-show="isSelect">
                    <p>负责人：{{currentComponent.author|| '尚未完善文档'}}</p>
                    <p>创建时间：{{currentComponent.createTime|| '尚未完善文档'}}</p>
                    <p>版本：{{currentComponent.version|| '尚未完善文档'}}</p>
                    <p>描述：{{currentComponent.desc || '尚未完善文档'}}</p>
                    <div>
                        <p>使用方法：</p>
                        <pre>
                            {{currentComponent.use|| '尚未完善文档'}}
                        </pre>
                    </div>
                    <div>
                        <p>props参数说明：</p>
                        <pre>
                            {{currentComponent.props|| '尚未完善文档'}}
                        </pre>
                    </div>
                </div>
                <div v-show="!isSelect">尚未选择任何组件</div>
            </div>
        </div>
    </div>
</template>
<script>
    import Time from '../libs/base/timeFormat'
    export default{
        watch: {
            'currentComponentId': {
                handler: function (nval, oval) {
                    this.currentComponent = this.allVersion[this.selectedTime][nval];
                }
            }
        },
        methods: {
            selectComponent(e) {
                this.currentComponentId = e.currentTarget.attributes[0].value;
                this.isSelect = true;
            },
            startScan() {
                $.ajax({
                    url: '/api/startScan',
                    type: 'post',
                    success: function (data) {
                        data = JSON.parse(data);
                        if (data.resultCode === '00000000') {
                            alert('扫描成功！');
                            window.location.reload();
                        } else {
                            alert('扫描失败！');
                        }
                    }
                });
            },
            initData() {
                let that = this;
                $.ajax({
                    url: '/api/getScanVersion',
                    success: function (data) {
                        data = JSON.parse(data);
                        let time = new Time();
                        let arr = [];
                        for (var d in data.data) {
                            arr.push({
                                index: d,
                                createTime: time.getFormatTime(data.data[d].createTime) + '扫描版本'
                            });
                        }
                        for (let i = arr.length - 1; i >= 0; i--) {
                            that.selectTime.push(arr[i]);
                        }
                        that.allVersion = data.data;
                        that.currentVersion = time.getFormatTime(data.data[d].createTime) + '扫描版本';
                        that.selectedTime = d;
                        that.changeSelect();
                    }
                });
            },
            initRight() {
                this.currentComponent = {};
                this.isSelect = false;
            },
            changeSelect() {
                let that = this, items = {};
                let currentData = that.allVersion[that.selectedTime];
                for (let d in currentData) {
                    if (d !== 'size' && d !== 'createTime') {
                        let dt = d.split('/');
                        if (items[dt[1]]) {
                            if (items[dt[1]][dt[2]]) {
                                items[dt[1]][dt[2]][dt[3]] = d;
                            } else {
                                items[dt[1]][dt[2]] = {};
                                items[dt[1]][dt[2]][dt[3]] = d;
                            }
                        } else {
                            items[dt[1]] = {};
                            if (items[dt[1]][dt[2]]) {
                                items[dt[1]][dt[2]][dt[3]] = d;
                            } else {
                                items[dt[1]][dt[2]] = {};
                                items[dt[1]][dt[2]][dt[3]] = d;
                            }
                        }
                    }
                }
                that.treeItem = items.components;
                that.initRight();
            }
        },
        data() {
            return {
                selectTime: [],
                selectedTime: '',
                currentVersion: '',
                allVersion: {},
                treeItem: {},
                isSelect: false,
                currentComponent: {},
                currentComponentId: ''
            }
        },
        ready() {
            //左侧点击事件
            $(document).on('click', '#leftBar li p', function () {
                let $this = $(this).siblings('ul');
                if ($this.hasClass('hide')) {
                    $this.removeClass('hide').slideDown();
                } else {
                    $this.slideUp(function () {
                        $(this).addClass('hide');
                    });
                }
            });
            this.initData();
        }
    }
</script>
<style>
    .test-components nav{
        background: #333;
        padding: 10px;
    }
    .test-components nav img{
        width: 150px;
    }
    .test-components .clear {
        zoom:1;
    }
    .test-components .btt{
        text-align: right;
        margin-top: 10px;
        margin-bottom: 10px;
    }
    .test-components .hide{
        display: none;
    }
    .test-components .clear::after,.test-components .clear::before
    {
        content:" ";
        visibility:hidden;
        display:block;
        clear:both;
        height:0;
        font-size:0;
    }
    .test-components .left{
        width: 18%;
        float: left;
        border-right: 1px solid #ddd;
        box-shadow: 2px 2px 2px #666;
        overflow-y: auto;
    }
    .test-components .left .select{
        width: 100%;
    }
    .test-components .left .select select{
        width: calc(100% - 20px);
    }
    .test-components .left ul{
        padding-left: 1rem;
    }
    .test-components .left ul li p{
        cursor: pointer;
    }
    .test-components pre{
        padding: 20px;
        margin: 10px 0;
        border: solid 1px #e7e1cd;
        background-color: #fffdef;
        overflow: auto;
    }
    .test-components .right{
        width: 80%;
        float: right;
        padding: 10px;
    }
</style>