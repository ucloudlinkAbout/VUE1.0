<style type="text/less">
	
</style>
<template>
	<div>
        <div class="panels-tab br-4">
            <div class="border-bottom vm pd10">
                <span class="iconfont ico ico-purple" :class='mList.icon'></span>
                <span class="numbers hidden">{{mList.number}}</span>
                <span @click='addOne()' class="ml5">{{mList.name}}</span>
            </div>
            <ul class="panels-list pl20 pr20 pb10 font-color-666">
                <li v-for='item in mList.list'>{{item.name}}<span class="fr">+</span></li>
            </ul>
        </div>
    </div>
</template>
<script>
    'use strict';
    import debug from '../../libs/base/debug'
    export default{
        props: ['m-list'],
        methods: {
            addOne(e) {
                debug.clog(e.target.files[0]);
            }
        }
    }
</script>