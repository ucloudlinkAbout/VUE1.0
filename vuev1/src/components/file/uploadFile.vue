<!--
@负责人:liugang
@创建时间:2017-2-13
@版本:v1.0.0
@描述:上传组件 form 表单元素
@使用方法:
<template>
    <g-file :callbackFun='callbackFun'></g-file>
</template>
<script>
    export default{
        components:{
            gFile:require('xxx/file/file.vue')
        }
    }
</script>
@参数说明:
//methods 回调函数对象，里面放各种回调函数


name ： name名字

'callbackFun':{
	onload : function(e) { 
		
	},

	//开始上传
	onloadstart : (e)=>{
		console.log('onloadstart');
	},

	//上传超时
	ontimeout : (e)=>{
		console.log('ontimeout');
	},
	//上传错误
	onerror : (e)=>{
		console.log('onerror');
	},


	//请求结束(无论成功与失败都会调用)
	onloadend : (e)=>{
		console.log('onloadend');
	},

	//取消上传回调
	onabort = (e)=>{
		console.log('onabort');
	}
}
-->
<style>

</style>
<template>
	<div>
        <g-input :readonly='readonlyinput' :value='filename'></g-input>
		<g-file v-ref:file :name='name' :selectfile='selectfile' :url='url'></g-file>
	</div>
</template>
<script>
	'use sttict';

	//import fileChild from './input-file.vue';
	import form from '../../libs/base/regForm';

	export default{
		data(){
			return{
				value:undefined,
				ischeck:false,
				type:'formObj',//表单子组件标识
                readonlyinput:true,
				filename:''
			}
		},
        components:{
            gInput: require('../input/input-base.vue'),
            gFile: require('./file.vue')
        },
		props:['url','name'],
		methods:{
			selectfile(file){
				this.filename = file.name;
			}
		},
		ready() {

			this.$on('upload',()=>{
				this.$refs.file.$emit('upladFile');
			});

			this.$on('chanelUpload',()=>{
				this.$refs.file.$emit('chanelUpload');
			});
		}
	}

</script>