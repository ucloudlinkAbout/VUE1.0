<!--
@负责人:chenwenxiao
@创建时间:2016-12-03
@版本:v1.0.0
@描述:单选框组控件
@使用方法:
<template>
    <g-radio-list name="status" :list="status_lantype" value="val" change="change"></g-radio-list>
</template>
<script>
    export default{
        components:{
            gRadioList:require('xxx/xxx/input-radio-list.vue')
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
//默认选中值，若为空则默认选择第一个
defaultvalue: '',
//是否通过验证
checked: true,
//change事件
change: {
    type: Function,
    default: function (e) {

    }
},
//是否只读
readonly: false,
//传入的list键值对，设置显示与选中的值
list: null
-->
<template>
    <div class="ilb radio-list ">
        <input type="hidden" v-bind:name="name" v-model="value"/>
        <label class="input-radio mr5" v-for="(k,v) in list" v-on:click="e_select">
            <input type="radio" :value="k" v-bind:checked="k === value" v-bind:readonly="readonly"/>
            <span><i></i></span>
            <b v-text="v"></b>
        </label>
    </div>
</template>
<script>
    import form from '../../libs/base/regForm';
    export default {
        data() {
            return {
                ischeck: true
            }
        },
        props: {
            name: '',
            value: '',
            defaultvalue: '',
            checked: true,
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
                    if (oval) {
                        this.change(this.value, this);
                    }
                }
            },
            'list': {
                handler: function (nval, oval) {
                    this.e_initValue();
                }
            }
        },
        methods: {
            setValue(data) {
                if (data) {
                    this.value = data;
                } else {
                    this.value = this.defaultvalue;
                }
            },
            e_select(e){
                if (!this.readonly) {
                    this.value = e.currentTarget.children[0].value;
                    e.preventDefault();
                    form.regForm(this);
                } else {
                    e.preventDefault();
                }
            },
            e_initValue(){
                let firstKey = '';
                if (this.list) {
                    for (let i in this.list) {
                        firstKey = i;
                        break;
                    }
                }
                this.defaultvalue = this.defaultvalue || firstKey;
                this.value = this.defaultvalue;
            }
        },
        ready(){
            this.e_initValue();
            form.regForm(this);
        }
    }
</script>