<!--
@负责人:chenwenxiao
@创建时间:2016-12-06
@版本:v1.0.0
@描述:轮播图控件
@使用方法:
<template>
    <g-swiper :list="img_list"></g-swiper>
</template>
<script>
    export default{
        components:{
            gSwiper:require('xxx/xxx/swiper.vue')
        },
        data(){
            return{
                img_list: [
                    '/dist/images/banner01.jpg',
                    '/dist/images/banner02.jpg',
                    '/dist/images/banner03.jpg',
                    '/dist/images/banner04.jpg'
                ]
            }
        }
    }
</script>
@参数说明:
//图片list内容
list:Array
-->
<template>
    <div class="clear">
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="d in list"><img v-bind:src="d"></div>
            </div>
            <!-- 如果需要分页器 -->
            <div class="swiper-pagination">
                <a href="javascript:" class="active"></a>
                <a href="javascript:"></a>
                <a href="javascript:"></a>
            </div>

            <!-- 如果需要导航按钮 -->
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>

            <!-- 如果需要滚动条 -->
            <div class="swiper-scrollbar"></div>
        </div>
    </div>
</template>
<script>
    import swiper from '../../libs/reference/swiper.min.js'
    import '../assets/css/swiper.min.css'
    export default{
        props:['list'],
        ready(){
            this.$nextTick(function () {
                let mySwiper = new Swiper('.swiper-container', {
                    direction: 'horizontal',
                    loop: true,
                    // 如果需要分页器
                    pagination: '.swiper-pagination',
                    // 如果需要前进后退按钮
                    nextButton: '.swiper-button-next',
                    prevButton: '.swiper-button-prev',
                    // 如果需要滚动条
                    scrollbar: '.swiper-scrollbar',
                });
            });
        }
    }
</script>