<template>
    <div class="modal" v-bind:class="[{'modal-hide':hide},modalsize]">
        <div class="modal-body">
            <div class="modal-header bg-f4 modal-header-text">
                <slot name="title"></slot>
                <span class="close-large iconfont close fr icon-guanbi" v-on:click="close"></span>
            </div>
            <div class="modal-content text-center">
                <slot name="content"></slot>
            </div>
            <p class="text-center mt20 mb20" slot="btn">
                <button class="btn-big btn-default" type="button" v-on:click="close">关闭</button>
            </p>
        </div>
    </div>
</template>
<script>
    export default {
        methods: {
            close: function () {
                this.hide = true;
            }
        },
        data(){
            return {

            }
        },
        props: ['modalsize', 'hide'],
        ready(){
            var that = this;
            that.hide = true;
        }
    }
</script>
<style>
    .modal-middle .modal-content{
        max-height: 400px;
        overflow: auto;
    }
</style>