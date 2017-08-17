<!--
@负责人:chenwenxiao
@创建时间:2016-11-05
@版本:v1.0.0
@描述:canvas锁屏控件
@使用方法:
<template>
    <g-canvas :status="st" :finishcallback="cb"></g-canvas>
</template>
<script>
    export default{
        components:{
            gCanvas:require('xxx/xxx/loadingCanvas.vue')
        },
        methods:{
            finishcallback(){
                console.log('回调');
            }
        },
        ready(){
            //启动
            this.st = 'start';
            let that = this;
            setTimeout(function(){
                //完成
                that.st = 'finish';
            },3000);
        },
        data(){
            return{
                st:''
            };
        }
    }
</script>
@参数说明:
//控制canvas的显示状态，状态值为start、stop、finish，若不为finish，进度会一直卡在某个点不会到达100%
status:'',
//读取完成的回调函数
finishcallback:function(){

}
-->
<template>
    <div class="text-center" v-show="showCanvas">
        <canvas id="canvas" width="500" height="300" class="can"></canvas>
    </div>
</template>
<script>
    export default {
        watch: {
            'status': {
                handler: function (nval, oval) {
                    if (nval === 'start') {
                        this.speed = 0.3;
                        this.start();
                    }else if(nval === 'stop'){
                        this.speed = 0;
                    }else if(nval === 'finish'){
                        this.speed = 8;
                    }
                }
            }
        },
        ready(){
            this.start();
        },
        props: ['status','finishcallback'],
        methods: {
            start: function () {
                var canvas = this.$el.children[0],
                    ctx = canvas.getContext('2d'),
                    canvasX = canvas.width / 2,
                    canvasY = canvas.height / 2,
                    radio = Math.PI * 2 / 100,
                    that = this;
                this.showCanvas = true;
                var drawInner = function () {
                    ctx.save();
                    ctx.strokeStyle = "#ddd";
                    ctx.beginPath();
                    ctx.arc(canvasX, canvasY, 100, 0, Math.PI * 2, false);
                    ctx.stroke();
                    ctx.closePath();
                    ctx.restore();
                };
                var drawOuter = function (start, end) {
                    ctx.save();
                    ctx.strokeStyle = "#af157d";
                    ctx.beginPath();
                    ctx.lineWidth = 6;
                    ctx.arc(canvasX, canvasY, 100, start, end, false);
                    ctx.stroke();
                    ctx.restore();
                };
                var drawTxt = function (val) {
                    ctx.save();
                    ctx.strokeStyle = "#af157d";
                    ctx.font = '40px Arial';
                    ctx.strokeText(val.toFixed(0) + "%", canvasX - 25, canvasY + 10);
                    ctx.stroke();
                    ctx.restore();
                };
                var v = 0, t = 1;
                var timer = setInterval(function () {
                    if (v > t * 10 && that.status !== 'finish') {
                        t++;
                        that.speed = that.speed / 2;
                    }
                    if (that.status === 'stop' || v > 100) {
                        clearInterval(timer);
                        if (that.status === 'finish') {
                            if (that.finishcallback) {
                                that.finishcallback();
                            }
                        }
                        that.showCanvas = false;
                        v = 0;
                    }
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    drawInner();
                    drawOuter(Math.PI * -0.5, Math.PI * -0.5 + radio * v);
                    drawTxt(v);
                    v = v + that.speed;
                }, 30);
            }
        },
        data(){
            return {
                speed: 0.3,
                showCanvas: true
            }
        }
    }
</script>