<!--
@负责人:chenwenxiao
@创建时间:2016-12-03
@版本:v1.0.0
@描述:多选框组控件
@使用方法:
<template>
    <g-checkbox-list name="status" :list="status_lantype" value="val" change="change"></g-checkbox-list>
</template>
<script>
    export default{
        components:{
            gCheckboxList:require('xxx/xxx/input-checkbox-list.vue')
        },
        methods:{
            change(){
                console.log(this.val);
            }
        },
        data(){
            return{
                check:false,
                val:'',
                status_lantype:{
                    'zh-CN': 'zh-CN',
                    'zh-TW': 'zh-TW',
                    'en-US': 'en-US'
                }
            }
        }
    }
</script>
@参数说明:
//name值
name: '',
//选中的值
value: '',
//是否必填（使用表单插件提交参数时必备）
require: false,
//checkbox的样式选择，目前有两种
checkboxtype: 1,
//默认选中值，若为空则不选中
defaultvalue: '',
//是否通过验证
checked: false,
//change事件
change: {
    type: Function,
    default: function (e) {

    }
},
//是否只读
readonly:false,
//传入的list键值对，设置显示与选中的值
list: null
-->
<template>
    <div class="ilb radio-list">
        <input type="hidden" v-bind:name="name" v-model="value"/>
        <label v-bind:class="{
            'input-checkbox': type == 1,
            'input-checkbox-1': type == 2
        }" v-for="(k,v) in list">
            <input type="checkbox" :value="k" v-bind:checked="valueobject[k]" v-on:change="e_change" v-bind:readonly="readonly"/>
            <span><i></i></span>
            <b v-text="v"></b>
        </label>
    </div>
</template>
<script>
    import form from '../../libs/base/regForm'
    import util from '../../libs/base/util'
    import lan from '../../libs/base/lanLoader'
    export default {
        data() {
            return {
                ischeck: false,
                valueobject: {},
                i18n: {},
                type: 2
            }
        },
        props: {
            name: '',
            value: '',
            require: false,
            checkboxtype: 1,
            defaultvalue: '',
            checked: false,
            change: {
                type: Function,
                default: function (e) {

                }
            },
            readonly: false,
            list: null
        },
        watch: {
            'value': {
                handler: function (nval, oval) {
                    if (oval && nval !== '') {
                        this.change(this.value, this);
                    }
                    this.e_arrToObj();
                    form.regForm(this);
                }
            },
            'list': {
                handler: function (nval, oval) {
                    this.e_initValue();
                }
            }
        },
        methods: {
            checkValue(){
                if (this.value.length === 0 && this.require) {
                    util.util.tipsShow({
                        txt: this.i18n.mustSelect,
                        target: this,
                        left: 70
                    });
                    this.ischeck = false;
                } else {
                    this.ischeck = true;
                }
                form.regForm(this);
            },
            e_change(e) {
                if (e.currentTarget.checked) {
                    this.valueobject[e.currentTarget.value] = true;
                } else {
                    this.valueobject[e.currentTarget.value] = false;
                }
                this.e_objToArr();
            },
            e_objToArr(){
                let arr = [];
                for (let d in this.valueobject) {
                    if (this.valueobject[d] === true && d != '') {
                        arr.push(d);
                    }
                }
                this.value = arr;
            },
            e_arrToObj(){
                let obj = {};
                for (let i = 0; i < this.value.length; i++) {
                    obj[this.value[i]] = true;
                }
                this.valueobject = obj;
            },
            e_initValue(){
                this.defaultvalue = this.defaultvalue || '';
                if (this.defaultvalue === '') {
                    this.value = [];
                } else {
                    this.value = this.defaultvalue.split(',');
                }
                this.e_arrToObj();
            }
        },
        ready(){
            if (this.require === 'false' || this.require === false) {
                this.require = false;
            } else {
                this.require = true;
            }
            this.type = this.checkboxtype || this.type;
            this.e_initValue();
            let that = this;
            lan.getLan(window.SystemGlobe.component.componentI18n).then(function (lanObj) {
                that.i18n = lanObj.input;
            });
            form.regForm(this);
        }
    }
</script>