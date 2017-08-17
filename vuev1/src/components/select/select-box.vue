<!--
@负责人:liugang
@创建时间:2016-11-16
@版本:v1.0.0
@描述:下拉选择组件
@使用方法:
<template>
    <g-selectbox></g-selectbox>
</template>
<script>
    export default{
        components:{
            gSelectbox:require('xxx/select/select-box.vue')
        }
    }
</script>
@参数说明:


 onChange function       值改变时触发事，回传参数 string or number

 value    string         显示默认值(需存在于数据中的)

 name     string         name关键字段 会成为form数据的key

 _list     object   select显示数据  
 				{
					'亚洲':{
						cn:{
							value:'中国',
							state:false
							},
						jp:{
							value:'日本',
							state:false
							}
					},
					'非洲':{
						mnl:{
							value:'马尼拉',
							state:false
							}
					}
				}



-->
<style type="text/css">
	@import url(select.css);
	@import url(form-control.css);
</style>
<template>
<div class="ilb">
	<span v-text="label"></span>
	<div  @click.stop='clickHandle' class="rct-grid rct-grid-1 rct-grid-md-25-000  rct-form-control rct-select single" v-bind:class='state'>
		<span class="_select-result" v-for='(index, item) in namea'  @click.stop='toggleSelectValue(value[index],item)'>
		 	<span>{{item}}</span>
			<span class="_select-remove">×</span>
		</span>
	    <div class="rct-select-options-wrap">
	        <hr>
	        <div class="rct-select-options" v-bind:class='state' v-bind:style='{display:states}'>
				<ul>
					<li v-for='(key,continent) in boxData' :class='getOptionState()' class='nbg' @click.stop>
						<ul>
							<span>
								<g-checkbox names='xx'  :values='key' :onchange='selectContinent'>
									<b slot='txt'>
										{{key}}
									</b>
								</g-checkbox>
							</span>
							<div></div>
							<li v-for='(code,item) in continent' :class='getOptionState()'  class='nbg selectbox'>
								<g-checkbox names='xx' :checked.sync='item.state' :code='code' :values='item.value' :onchange='toggleSelectValue'>
									<b slot='txt'>
										{{item.value}}
									</b>
								</g-checkbox>
							</li>
						</ul>
					</li>
				</ul>

	        </div>
	    </div>
	</div>
</div>


</template>
<script>
/**
<code>
	<Select></Select>
</code>
<Select
  data={array|object}   // 数据 ["中国", "美国", "俄罗斯", "德国", "日本", "法国", "英格兰"] or { jiangsu: '江苏', shanghai: '上海', beijing: '北京', guangdong: '广东', zhejiang: '浙江' }
  search={bool}     // 是否显示筛选，默认为 false
  readOnly={bool}       // 是否只读。默认为 false
  placeholder={string}  // 占位提示文字
  mult={bool}           // 是否多选，默认为 false
  onChange={function}   // 值改变时触发事，参数为 value
  value={string}        // 初始值
  name={string}         //name 字段名字
/>

*/
	import {toArray,toggleArray} from '../../libs/utils/strings';

	import {isPc} from '../../libs/base/terminal';

	import form from '../../libs/base/regForm';

	import { util } from '../../libs/base/util';

	
	export default {
		 components: {
            gCheckbox: require('../checkbox/input-checkbox.vue')
        },
		data(){
			return {
				list:this._list,
				state:'',
				states:'none',//直接写style显示，可以有动画效果
				namea:[],//值
				value:[],//key
				filter:'',
				search:false,
				ischeck:true,
				opening:false,
				label:'',
				type:'formObj',//表单子组件标识
				ispc:isPc(),
				opt:{
					name:this.name
				},
				boxData:this._list
				

			}
		},

		props:['_list','name','key','mult','readOnly','continentlist'],

		watch: {
			'_list': {
				handler(nval, oval) {
					this.list = nval;
					this.setDefault();
				}
			}
		},
		
		methods:{
			clickHandle(){
				this.changeState();
			},
			changeState(){
				if(this.state == "active"){
					this.hideOptions();
				}else{
					this.showOptions();
				}
			},

			filterData(event){
				this.filter = event.target.value;
			},
			setValue(data) {
				if(data == undefined){
					this.setDefault();
					return ;
				}
				this._setValue({
					key:data,
					value:this.list[data]
				})
			},
			_setValue(vv){
				this.value = vv.key;
				this.namea = vv.value;
			},
			hideOptions(){
				this.opening = false;
				this.state = "";
				this.states = 'none';
			},
			showOptions(){
				this.opening = true;
				this.state = "active";
				this.states = 'block';
			},
			getOptionState(name){
				return (this.filter ? name.indexOf(this.filter) >= 0 : true) ? "show":" ";
			},
			setDefault() {
				//不给默认值
			},
			selectContinent(e,item) {
				// debugger;
				if(e.target.checked){
					for(var key in this.boxData[item]){
						this.boxData[item][key].state = true;
					}
				}else{
					for(var key in this.boxData[item]){
						this.boxData[item][key].state = false;
					}
				}
				this.handlerSelectData();
			},
			selectContry() {
				util.wait(()=>{
					this.handlerSelectData();
				});
			},
			toggleSelectValue(e,value,check) {
				let key = e.target ? e.target.code : e;
				this.value = toggleArray(key,this.value);
				this.namea = toggleArray(value,this.namea);
				for(var k in this.boxData){
					let _data = this.boxData[k];
					for(var _k in _data){
						if(_k == key){
							this.boxData[k][_k].state = !this.boxData[k][_k].state;
						}
					}
				}
			},
			handlerSelectData() {
				let that = this,data = that.boxData,keylist = [],namelist = [];

				for(let key in data){
					if(data[key]){
						let _data = data[key];
						for(let k in _data){
							if(_data[k].state){
								keylist.push(k);
								namelist.push(_data[k].value);
							}
						}
					}
				}

				that._setValue({
					key:keylist,
					value:namelist
				});

			}

		},
		
		ready(){

			util.wait(()=>{
				this.setDefault();
			});

			document.body.addEventListener('click',()=>{
				this.hideOptions();
			})
			
		}

	}
</script>