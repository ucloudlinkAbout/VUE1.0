<!--负责人:liugang-->
<!--开发日期:2016-11-16-->
<!--版本:v1.0.0-->
<!--功能：图表入口业务组件-->
<!--修改请在下面注明-->
<style type="text/css">
    
</style>
<template>
    <g-panel v-ref:panel>
        <g-charts :options='chartsData' slot='content'></g-charts>
<!--         <div slot='content'>
            还没有快捷操作面板，点击添加任务面板
        </div> -->
    </g-panel>
</template>
<script type="text/javascript">
    'use strict';
    import smPanel from './smPanel.vue';
    import charts from '../../components/charts/charts.vue';

    export default{
        components: {
            gPanel: smPanel,
            gCharts: charts
        },
        data() {
            return {
                chartsData: this.getChartsData()
            }
        },
        methods: {
            getChartsData() {
                return {
                    xAxis: {
                        categories: ['Africa', 'America', 'Asia', 'Europe', 'Oceania'],
                        title: {
                            text: null
                        }
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: 'Population (millions)',
                            align: 'high'
                        },
                        labels: {
                            overflow: 'justify'
                        }
                    },
                    series: [{
                        name: 'Year 1800',
                        data: [854, 321, 542, 12, 12]
                    }, {
                        name: 'Year 1900',
                        data: [85, 156, 125, 852, 61]
                    }, {
                        name: 'Year 2012',
                        data: [557, 58, 587, 740, 38]
                    }]
                }
            }
        }
    }
</script>