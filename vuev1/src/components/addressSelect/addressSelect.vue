<!--
@负责人:chenwenxiao
@创建时间:2016-12-03
@版本:v1.0.0
@描述:省市县三级联动插件
@使用方法:
<template>
    <g-address-select defaultvalue="140000,140200,140211"></g-address-select>
</template>
<script>
    export default{
        components:{
            gAddressSelect:require('xxx/xxx/addressSelect.vue')
        }
    }
</script>
@参数说明:
//校验是否通过
ischeck: false,
//选中的值
value: '',
//默认值
defaultvalue: ''
-->
<template>
    <div class="ilb">
        <label class="select">
            <select v-on:change="setCity" v-model="currentProvince">
                <option v-for="item in provinceCode" v-bind:value="item.code" v-text="item.txt"></option>
            </select>
            <i></i>
        </label>
        <label class="select">
            <select v-on:change="setCountry" v-model="currentCity">
                <option v-for="item in cityCode" v-bind:value="item.code" v-text="item.txt"></option>
            </select>
            <i></i>
        </label>
        <label class="select">
            <select v-on:change="setCheck" v-model="currentCountry">
                <option v-for="item in countryCode" v-bind:value="item.code" v-text="item.txt"></option>
            </select>
            <i></i>
        </label>
    </div>
</template>
<script>
    import lan from '../../libs/base/lanLoader'
    import form from '../../libs/base/regForm';
    export default{
        components: {
            gSelect: require('../select/Select.vue'),
        },
        props: {
            ischeck: false,
            value: '',
            defaultvalue: ''
        },
        methods: {
            setDefault(){
                if (this.defaultvalue) {
                    let codes = this.defaultvalue.split(',');
                    this.currentProvince = codes[0];
                    this.setCity({currentTarget: {value: codes[0]}});
                    this.setCountry({currentTarget: {value: codes[1]}});
                    this.currentCity = codes[1];
                    this.currentCountry = codes[2];
                }
            },
            setProvince(){
                let that = this;
                that.provinceCode = [{
                    txt: this.i18n.selectProvince,
                    code: ''
                }];
                that.initCity();
                that.initCountry();
                for (let i = 0; i < that.areaArr.length; i++) {
                    let currentData = that.areaArr[i].split('|');
                    if (currentData[0] % 10000 === 0) {
                        that.provinceCode.push({
                            code: currentData[0],
                            txt: currentData[1]
                        });
                    }
                }
                that.setDefault();
                that.setCheck();
            },
            setCity(e){
                let code = e.currentTarget.value / 10000, that = this;
                that.initCity();
                that.initCountry();
                for (let i = 1; i <= that.areaArr.length; i++) {
                    let currentData = that.areaArr[i - 1];
                    if (currentData.substring(0, 2) == code && currentData.substring(2, 6) != '0000' && currentData.substring(4, 6) == '00') {
                        that.cityCode.push({
                            code: currentData.substring(0, 6),
                            txt: currentData.substring(7, currentData.length)
                        });
                    }
                }
                that.setCheck();
            },
            setCountry(e){
                let code = e.currentTarget.value / 100, that = this;
                that.initCountry();
                for (let i = 1; i <= that.areaArr.length; i++) {
                    let currentData = that.areaArr[i - 1];
                    if (currentData.substring(0, 4) == code && currentData.substring(4, 6) != '00') {
                        that.countryCode.push({
                            txt: currentData.substring(7, currentData.length),
                            code: currentData.substring(0, 6)
                        });
                    }
                }
                that.setCheck();
            },
            setCheck(){
                if (this.currentCountry !== '' && this.currentCity !== '' && this.currentProvince !== '') {
                    this.selectValue = this.currentProvince + ',' + this.currentCity + ',' + this.currentCountry;
                    this.value = this.selectValue;
                    this.ischeck = true;
                } else {
                    this.selectValue = '';
                    this.value = this.selectValue;
                    this.ischeck = false;
                }
                form.regForm(this);
            },
            initCity(){
                this.cityCode = [{
                    txt: this.i18n.selectCity,
                    code: ''
                }];
                this.currentCity = '';
            },
            initCountry(){
                this.countryCode = [{
                    txt: this.i18n.selectCountry,
                    code: ''
                }];
                this.currentCountry = '';
            }
        },
        data(){
            return {
                status_lantype: {
                    'zh-CN': 'cn',
                    'zh-HK': 'hk',
                    'en-US': 'us'
                },
                i18n: {},
                areaData: '',
                areaArr: [],
                provinceCode: [],
                cityCode: [],
                countryCode: [],
                currentProvince: '',
                currentCity: '',
                currentCountry: '',
                selectValue: ''
            }
        },
        ready(){
            let that = this;
            lan.getLan('component_area').then(function (data) {
                that.i18n = data;
                that.areaData = that.i18n.areaData;
                that.areaArr = that.areaData.split(',');
                that.setProvince();
            });
            form.regForm(this);
        }
    }
</script>