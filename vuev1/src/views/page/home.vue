<template>
    <g-fastentry></g-fastentry>
    <g-chartsentry></g-chartsentry>
</template>
<script type="text/javascript">
    'use strict';
    import fastEntry from './../serviceComInstance/fastEntry.vue';
    import chartsEntry from './../serviceComInstance/chartsEntry.vue';

    export default{
        components: {
            gFastentry: fastEntry,
            gChartsentry: chartsEntry
        },
        data() {
            return {}
        },
        methods: {
            inputChagne(e) {
                console.log(e.target.files[0]);
            }
        },
        ready() {
            window.$$routeList.homePage = this;
        }
    }

</script>