<!--负责人:liugang-->
<!--开发日期:2016-11-08-->
<!--版本:v1.0.0-->
<!--功能：快速入口业务组件-->
<!--修改请在下面注明-->
<style type="text/css">
	.dialog .panels{
		overflow: hidden;
	}
	.dialog .panels .panels-tab .ico-purple{
		width:90px;
		height: 90px;
		display: block;
	}
	.dialog .panels .panels-tab{
		width: 100px;
		height: 100px;
		float: left;
		margin:100px 88px 0;
		position: relative;
		border: 0;
	}
	.dialog .panels .panels-tab i{
		position: absolute;
		right: 0;
		top: -8px;
		font-size: 26px;
		z-index: 2;
		opacity: 0.8;
	}
	.dialog .panels .checkk i{
		display: none;
	}
	.dialog .panels .panels-tab .ico{
		margin:5px;
		font-size: 90px;
	}
</style>
<template>
	<g-panel v-ref:panel>
		<g-panelstab v-show='workList.length > 0' slot='content' v-for='_list in workList' :m-list='_list' class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
        </g-panelstab>
        <div slot='content'  v-show='workList.length < 1'>
        	还没有快捷操作面板，点击添加任务面板
        </div>
        
        <div slot='dialog' class='dialog'>
        	<ul class='panels'>
        		<li v-for='_list in dataList' class='panels-tab' @click='selectIt($event.target,_list.id)' :class='{"checkk":!_list.select}'>
        			<i class="iconfont icon-tijiaochenggong"></i>
        			<span class='iconfont ico ico-purple' :class='_list.icon'></span>
        		</li>
        	</ul>
        </div>
        <button slot='dbutton' @click='confirmCallback()' class="btn btn-primary" type="button">确定</button>
    </g-panel>
</template>
<script type="text/javascript">
    import smPanel from './smPanel.vue';
    import panelsTab from './panelsTab.vue';
    import { toggleArray, getArrayByIdKey } from '../../libs/utils/strings';
    import { ajax } from '../../libs/base/ajax';
    import form from '../../components/form/form.vue';
    import input from '../../components/input/input-base.vue';

    export default {
        components: {
            gPanel: smPanel,
            gPanelstab: panelsTab,
            gForm: form,
            gInput: input
        },
        data() {
            return {
                //选中id列表
                checkList: [],
                //显示列表
                workList: [],
                //原始数据储存
                dataList: []
            }
        },
        methods: {
            selectIt(e, id) {
                //添加或者删除选中ID
                toggleArray(id, this.checkList);

                //标记选中符号与清除选中符号
                $(e).closest('li').toggleClass('checkk');
            },
            //确定按钮回调
            confirmCallback() {
                //设置显示list
                this.workList = getArrayByIdKey(this.checkList, this.dataList);
                //关闭弹窗
                this.$refs.panel.$emit('closeDialog')
            },
            //根据原始数据，返回选中对象数组与选中id数组
            getSelect(list) {
                const _list = [], idlist = [];

                for (var i = 0; i < list.length; i++) {
                    if (list[i].select === true || list[i].select === 'true') {
                        _list.push(list[i]);
                        idlist.push(list[i].id);
                    }
                }
                return { _list, idlist };
            }
        },
        ready() {
            ajax({
                url: '/tData/common/fastEntry',
                test: true,
                methods: 'get'
            }).then((data) => {
                this.dataList = data;
                const { _list, idlist } = this.getSelect(this.dataList);
                //设置显示对象
                this.workList = _list;
                //存储选中id列表
                this.checkList = idlist;
            });
        }
    }
</script>