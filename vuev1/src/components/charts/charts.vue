<!--负责人:liugang-->
<!--开发日期:2016-11-17-->
<!--版本:v1.0.0-->
<!--功能：图表基础组件-->
<!--修改请在下面注明-->
<template>
    <!-- <g-select></g-select> -->
    <!-- <select @change='changeType($event.target.value)'>
        <option v-for='value in types'>{{value}}</option>
    </select> -->
    <g-children v-ref:chartdom>ss</g-children>
</template>
<script type="text/javascript">
    import highcharts from '../../libs/Highcharts/js/highcharts';
    import children from './children.vue';
    import select from '../select/Select.vue'

    /*****
        接收正确的图表设置数据，不做任何操作，只管理渲染


    **/

    export default {

        data(){
            return {
                types:['bar','line','pie'],
                type:'line'
            }      
        },
        components:{
            "gChildren":children,
            // 'gSelect':select
        },
        props:['options'],
        methods:{
            //渲染charts
            renderChart(options) {
                options.chart = {
                    type: this.type
                }
                $(this.$refs.chartdom.$el).highcharts(options);
                $("text[text-anchor='end']").remove();
            },
            changeType(type) {
                this.type = type;

                this.renderChart(this.options);
            }
        },
        ready() {
            this.renderChart(this.options);
        }
    }

</script>
