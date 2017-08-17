<style type="text/less">
	
</style>
<template>
	<div class="panels pd20 mt20">
        <div class="vm border-bottom pb5">
            <span class="title">快速入口</span>
            <span class="iconfont fr upper" @click='createModel()'>&#xe616;</span>
            <span class="fr">+ 创建入口</span>
        </div>
        <div class="clear mt20">
            <slot name='content'>
			    <div class='tc'>还没有快捷操作面板，点击添加任务面板</div>
			</slot>
        </div>
    </div>
    <g-dialog :opt='dialogOpt'  v-ref:dialog>
        <slot name='dialog' slot='content'>
            请设置弹窗内容
        </slot>
        <slot name='dbutton' slot='button'></slot>
    </g-dialog>
</template>
<script type="text/javascript">
    'use strict';
    import dialog from '../../components/dialog/dialog.vue';
    import { isPc } from '../../libs/base/terminal.js';
    import debug from '../../libs/base/debug'
    export default {
        components: {
            gDialog: dialog
        },
        data() {
            return {
                show: false,
                dialogOpt: {
                    size: 2,
                    title: this.dialogTitle || '提示'
                }
            }
        },
        methods: {
            createModel() {
                this.$refs.dialog.$emit('openDialog');
            },
            confirmCallback() {
                this.$refs.dialog.$emit('closeDialog');
            }
        },
        ready() {
            this.$on('closeDialog', () => {
                this.$refs.dialog.$emit('closeDialog');
            });
            debug.clog(isPc());
        }
    }
</script>