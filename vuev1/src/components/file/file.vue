<!--
@负责人:liugang
@创建时间:2016-12-15
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
	@import url(input.less);
	.nosee{
		opacity:0;
		position:absolute;
		left:-1000px;
		top:-1000px;
	}
</style>
<template>
	<div @change='inputChange' class='btn btn-secondary' @click='clickInput'>
		上传
		<input type="file" class='nosee'>
		<!--<file-child v-ref:filechild class='nosee'></file-child>-->
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
			}
		},
		// components: {
		// 	fileChild:fileChild
		// },
		props:['callbackFun','url','name','auto','selectfile'],
		methods:{
			clickInput() {
				this.$el.firstElementChild.click();
			},
			inputChange(e){
				this.formData = this.getformData(e.target.files);
				
				if(typeof this.selectfile == 'function'){
					this.selectfile(e.target.files[0]);
				}
				this.xhr = this.getXHR();
				if(this.auto){
					this.upladFile();
				}
				this.resetInput(e);
			},
			//重置input选择状态
			resetInput(e) {
				let file = e.target;
				if (file.outerHTML) {
					file.outerHTML = file.outerHTML;
					file.value = "";
				} else {
					file.value = "";
				}
			},
			getformData(files) {
				let formData = new FormData();
				for (let i = 0, file; file = files[i]; ++i)
				{
					formData.append('imgFile', file);
				}

				return formData;
			},
			setValue(data) {
				if(data == undefined){
					return ;
				}

				this.value = data;
				this.ischeck = true;
				form.regForm(this);
			},
			getXHR(formData) {
				let that = this;

				if(that.url == undefined){
					alert('请填写url');
					return;
				}
				let xhr = new XMLHttpRequest();
				//let url = '/attachment/index/uploadImg?fname=imgFile';

				//设置xhr请求的超时时间
				xhr.timeout = 3000;
				//设置响应返回的数据格式
				xhr.responseType = "json";



				//设置发送header头方法预留
				//xhr.setRequestHeader('xx','xx');


				xhr.open('POST', that.url, true);

				xhr.onload = (e) => { 
					if(xhr.status == 200){
						if(xhr.response != undefined){
							if(xhr.response.result == 0){
								// if(){

								// }
								console.log('上传成功');
								this.value = xhr.response.data;
								this.ischeck = true;
								form.regForm(this);
							}
						}
					}else{
						console.log(xhr.status);
					}
				};

				//开始上传
				xhr.onloadstart = (e)=>{
					console.log('onloadstart');
				}

				//上传超时
				xhr.ontimeout = (e)=>{
					console.log('ontimeout');
				}
				//上传错误
				xhr.onerror = (e)=>{
					console.log('onerror');
				}

				//上传进度
				xhr.upload.onprogress = (e)=>{
					console.log('onprogress');
				}

				//请求结束(无论成功与失败都会调用)
				xhr.onloadend = (e)=>{
					console.log('onloadend');
				}

				//取消上传回调
				xhr.onabort = (e)=>{
					console.log('onabort');
				}

				//各状态监控
				xhr.onreadystatechange = ()=>{
					console.log(xhr.readyState);
				}
				return xhr;
			},
			chanelUpload() {
				this.xhr.abort();
			},
			upladFile() {
				this.xhr.send(this.formData);
			}

		},
		ready() {

			this.$on('upload',()=>{
				this.upladFile();
			});

			this.$on('chanelUpload',()=>{
				this.chanelUpload();
			});

		}
	}

</script>