<!--
@负责人:liuzhijian
@创建时间:2017-2-13
@版本:v1.0.0
@描述:省市县三级联动插件
@使用方法:
<template>
    <g-province-select ></g-province-select>
</template>
<script>
    export default{
        components:{
            gprovinceSelect:require('xxx/xxx/provinceSelect.vue')
        }
    }
</script>

-->
<style>
	.box_province{
		position: relative;
		height: 500px;
	}
	.receiving_address{
		position: absolute;
		top: 0;
		left: 0;
	}
	.text_p{
		width: 306px;
		height: 36px;
		position: absolute;
		left: 80px;
		top: 0px;
		background-color: rgba(255, 255, 255, 1);
		box-sizing: border-box;
		border: 1px solid rgba(194, 194, 194, 1);
		border-radius: 2px;
		color: #999999;
	}
	.select_p{
		width: 36px;
		height: 36px;
		position: absolute;
		left: 269px;
		top: -1px;
		background-color: rgba(255, 255, 255, 1);
		box-sizing: border-box;
		border: 1px solid rgba(204, 204, 204, 1);
		border-radius: 2px;
		cursor: pointer;
	}
	.seclect_photo{
		position: absolute;
		top: 13px;
		left: 10px;
		transform: rotate(180deg);
	}
	.seclect_photo.photo_r{
		transform: rotate(0deg);
	}
	.select_tip{
		font-size: 13px;
		position: absolute;
		top: 8px;
		left: 10px;
		margin: 0;
	}
	.select_address{
		position: relative;
		left: 400px;
		top: 0px;
		width: 534px;
		height: 36px;
		text-indent: 10px;
		background-color: rgba(255, 255, 255, 1);
		box-sizing: border-box;
		border: 1px solid rgba(194, 194, 194, 1);
		border-radius: 2px;
		color: #999999;
	}
	.province_container{
		position: absolute;
		left: 80px;
		top: 50px;
	}
	.province{
		width: 306px;
		overflow: hidden;
		padding-bottom: 15px;
		background-color: rgba(255, 255, 255, 1);
		box-sizing: border-box;
		border: 1px solid rgba(194, 194, 194, 1);
		border-radius: 2px;
		color: #999999;
	}
	.area{
		float: left;
		width: 307px;
	}
	.area li{
		float: left;
		margin-left: -1px;
		width: 103px;
		height: 36px;
		text-align: center;
		background-color: rgba(245, 245, 245, 1);
		box-sizing: border-box;
		border: 1px solid rgba(194, 194, 194, 1);
		border-radius: 2px;
		color: #1E1E1E;
		line-height: 36px;
		border-top: none;
		cursor: pointer;
	}
	.a_g{
		float: left;
		margin-left: 40px;
		margin-top: -22px;
	}
	.a_g li{
		float: left;
		padding: 0 6px;
		height: 26px;
		text-align: center;
		line-height: 26px;
		margin-left: 7px;
		color: #333333;
		cursor: pointer;
	}
	.a_g li:hover{
		color: rgb(175, 21, 125);
	}
	li.active{
		color: #fff !important;
		background: #af157d;
	}
	.province_ag{
		color: #333333;
		float: left;
		margin-left: 10px;
		margin-top: 9px;
	}
	.province_city{
		float: left;
		margin-left: 25px;
		margin-top: 10px;
	}
	.province_city li{
		float: left;
		padding: 0 6px;
		height: 26px;
		margin-left: 6px;
		line-height: 26px;
		color: #333333;
		cursor: pointer;
	}
	.province_city li:hover{
		color: rgb(175, 21, 125);
	}
	.province_country{
		float: left;
		margin-left: 22px;
		margin-top: 10px;
	}
	.province_country li{
		float: left;
		padding: 0 6px;
		height: 26px;
		line-height: 26px;
		margin-left: 6px;
		color: #333333;
		cursor: pointer;
	}
	.province_country li:hover{
		color: rgb(175, 21, 125);
	}
	.area .area_active{
		color: rgb(175, 21, 125);
		background: #fff;
		border-top: none;
		border-right: none;
		border-bottom: none
	}
</style>

<template>
	<div class="box_province">
		<p class="receiving_address">收货地址</p>
		<div type="text" class="text_p" @click.stop="province_show()">
			<p class="select_tip" v-show="ssq_province =='' ">请选择省市区</p>
			<p class="select_tip" v-show="ssq_province != 0">{{ssq_province + ssq_city + ssq_country}}</p>
			<div class="select_p">
				<img src="u1646.png" class="seclect_photo" :class="{photo_r:photo_rotate}">
			</div>
		</div>
		<input class="select_address" placeholder="请输入详细地址">
			<p class="select_tip">{{province}}</p>
		</input>

		<div class="province_container" v-show="Pshow">
			<div class="province" v-show="show_s">
				<ul class="area">
					<li class="area_active">省份</li>
					<li @click.stop="select_cF">城市</li>
					<li @click.stop="select_qF">区县</li>
				</ul>
				<span class="province_ag">A-G</span>
				<ul class="a_g">
					<li @click.stop="confirm_Province($index)" v-for="item in items | limitBy 8" :value="item.id" :class="{active:$index==now}">{{item.localName}}</li>
				</ul>
				<span class="province_ag">H-K</span>
				<ul class="a_g">
					<li @click.stop="confirm_Province($index+8)" v-for="item in items | limitBy 9 8" :value="item.id" :class="{active:$index+8==now}">{{item.localName}}</li>
				</ul>
				<span class="province_ag">L-S</span>
				<ul class="a_g">
					<li @click.stop="confirm_Province($index+17)" v-for="item in items | limitBy 9 17" :value="item.id" :class="{active:$index+17==now}">{{item.localName}}</li>
				</ul>
				<span class="province_ag">T-Z</span>
				<ul class="a_g">
					<li @click.stop="confirm_Province($index+26)" v-for="item in items | limitBy 5 26" :value="item.id" :class="{active:$index+26==now}">{{item.localName}}</li>
				</ul>
			</div>


			<div class="province" v-show="show_c">
				<ul class="area">
					<li @click.stop="select_sF">省份</li>
					<li class="area_active">城市</li>
					<li @click.stop="select_qF">区县</li>
				</ul>
				<ul class="province_city">
					<li @click.stop="confirm_city($index)" v-for="item in items_c" :value="item.id" :class="{active:$index==now_c}">{{item.localName}}</li>
				</ul>
			</div>
			<div class="province" v-show="show_q">
				<ul class="area">
					<li @click.stop="select_sF">省份</li>
					<li @click.stop="select_cF">城市</li>
					<li class="area_active">区县</li>
				</ul>
				<ul class="province_country">
					<li v-for="item in items_q" @click.stop="confirm_country($index)" :value="item.id" :class="{active:$index==now_q}">{{item.localName}}</li>
				</ul>
			</div>
		</div>

	</div>
</template>

	<script>
		import { ajaxAuthor } from "../../../libs/base/ajax.js"

		export default{
			data(){
				return{
					Pshow:false,
					items:[],
					items_c:[],
					items_q:[],
					show_s:true,
					show_c:false,
					show_q:false,
					photo_rotate:false,
					ssq_province:"",
					ssq_city:"",
					ssq_country:"",
					value:"",
					now:-2,
					now_c:-2,
					now_q:-2

				}
			},
			methods:{
				province_show(){
					this.Pshow = !this.Pshow;
					this.photo_rotate = !this.photo_rotate;
				},
				confirm_Province(index){
					let _this = this;
					let provinceId = this.items[index].id;
					this.ssq_province = this.items[index].localName + "/";
					this.now = index;
					this.show_s = false;
					this.show_c = true;
					this.show_q = false;
					ajaxAuthor({
						url:"/oms/area/getAreas",
						method:"post",
						json:true,
						data:{
							"parentId":provinceId
						}
					}).then(function(res){
						_this.now_c=-2;
						_this.items_c = res.data;
						_this.ssq_city = "";
						_this.ssq_country = "";
					},function(){
						console.log(res)
					})

				},
				confirm_city(index){
					this.ssq_city = this.items_c[index].localName + "/";
					let _this = this;
					let provinceId = this.items_c[index].id;
					this.now_c = index;
					this.show_s = false;
					this.show_c = false;
					this.show_q = true;
					ajaxAuthor({
						url:"/oms/area/getAreas",
						method:"post",
						json:true,
						data:{
							"parentId":provinceId
						}
					}).then(function(res){
						_this.now_q=-2;
						_this.items_q = res.data;
						_this.ssq_country = "";
					},function(res){
						console.log(res)
					})
				},
				confirm_country(index){
					this.ssq_country = this.items_q[index].localName;
					this.Pshow = false;
					this.now_q = index;
				},
				select_sF(){
					this.show_c = false;
					this.show_s = true;
					this.show_q = false;
				},
				select_cF(){
					this.show_c = true;
					this.show_s = false;
					this.show_q = false;
				},
				select_qF(){
					this.show_c = false;
					this.show_s = false;
					this.show_q = true;
				}
			},
			ready(){
				let _this = this;
				let sortProvince = [];
				ajaxAuthor({
					url:"/oms/area/getAreas",
					method:"post",
					json:true,
					data:{
						// "parentId": 110000000
					}
				}).then(function(res){
					_this.items = res.data;
						function compareFunction(property){
							return function(a,b){
								let value1 = a[property];
								let value2 = b[property];
								return value1.localeCompare(value2);
							}
						}
						_this.items.sort(compareFunction("localName"));
				},function(res){
					console.log(res);
				});
				document.body.addEventListener('click',()=>{
					this.Pshow = false;
				})
			}
		}
	</script>

