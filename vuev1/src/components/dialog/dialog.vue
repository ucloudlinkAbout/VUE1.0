<!--
@负责人:liugang
@创建时间:2016-11-11
@版本:v1.0.0
@描述:tree树形下拉组件
@使用方法:
<template>
    <g-dialog v-ref:dictionary_dialog_add size="3">
        //slot='title'  此标签内容被分发到dialog标签名字位置
        <span slot="title"></span>
        //slot='content'  此标签内容被分发到dialog中间内容位置
        <div slot="content"></div>
        //slot='button'  此标签内容被分发到dialog下部按钮位置
        <button type="button" slot="button" class="btn-big btn-secondary" @click.stop='e_addSubmit' v-text="i18n.add"></button>
    </g-dialog>
</template>
<script>
    export default{
        components:{
            gTree:require('xxx/tree/tree.vue')
        }
    }
</script>
@参数说明:
    size  number  弹窗尺寸 默认值 1 对应modal-normal    [0:'modal-small',1:'modal-normal',2:'modal-large',3:'modal-middle'] 

    opt  object   
                    confirmCallback() {
                        //确定按钮回调
                        console.log(22)
                    },
                    closeCallback(){
                        取消，关闭回调
                    },
                    isCanel:true // 是否具有取消按钮 默认 是



    //公开方法       openDialog 打开弹窗     
                    closeDialog 关闭弹窗   

                    
-->
<template>
    <div class="modal fade" :ss='state' :class="[{'modal-active':state}]">
        <div class="fade in modal-backdrop"></div>
        <div class="modal-dialog" :class="[getSize()]">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" @click='close()' data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                    <h4 v-text="title" v-show="title!=''"></h4>
                    <slot name="title"></slot>
                </div>
                <div class="modal-body">
                    <slot name='content'></slot>
                </div>
                <div class="modal-footer">
                    <slot name='button'></slot>
                    <button v-if='isCanel' @click='close()' class="btn btn-primary" type="button">取消</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
	export default{
		data() {
			return {
				state:false,
                isCanel:true,
                title:this.opt.title || '',
                sizeList:['modal-sm','','modal-lg']
			}
		},
		props:{
            opt:{
                default:function() {
                    return {}
                }
            },
            size:''
        },
        methods:{
            close() {
                this.state = false;
                if(typeof this.opt.closeCallback == 'function'){
                    this.opt.closeCallback();
                }
            },
            
            confirm() {
                this.close();
                if(typeof this.opt.confirmCallback == 'function'){
                    this.opt.confirmCallback();
                }
            },
            getSize(){
                if((typeof this.opt.size == 'number' && this.sizeList[this.opt.size]) || ((typeof parseInt(this.size) == 'number') && this.sizeList[this.size])){
                    return this.sizeList[this.opt.size || this.size];
                }else{
                    return '';
                }
                
            }
        },
		ready(){
            if(this.opt.isCanel === false){
                this.isCanel = false; 
            }
            //开放方法
			this.$on('openDialog',()=>{
				this.state = true;
			});
            this.$on('closeDialog',()=>{
                this.close();
            });
		}
	}
</script>