<!--
@负责人:liugang
@创建时间:2016-11-24
@版本:v1.0.0
@描述:from表单组件
@使用方法:
<template>
    <g-form v-ref:editmenuform class="panel-body ellipse min192 col-md-8 col-xs-8">
        //各种表单内容
        <g-input-noempty name="id" parentclass="hide"></g-input-noempty>
        <g-input name='zh_CN' classes='col-md-6 col-xs-6' parentClass='col-md-12 col-xs-12' title='菜单名称中文'></g-input>
        <g-input name='zh_TW' classes='col-md-6 col-xs-6' parentClass='col-md-12 col-xs-12' title='菜单名称繁体'></g-input>
        <g-input name='en_US' classes='col-md-6 col-xs-6' parentClass='col-md-12 col-xs-12' title='菜单名称英文'></g-input>
        <g-input name='level' classes='col-md-6 col-xs-6' parentClass='col-md-12 col-xs-12' title='层级'></g-input>
        <g-input name='url' classes='col-md-6 col-xs-6' parentClass='col-md-12 col-xs-12' title='url'></g-input>
        <g-input name='type' classes='col-md-6 col-xs-6' parentClass='col-md-12 col-xs-12' title='菜单类型'></g-input>
        <g-input name='code' classes='col-md-6 col-xs-6' parentClass='col-md-12 col-xs-12' title='编码'></g-input>
        <g-input name='parentID' classes='col-md-6 col-xs-6' parentClass='col-md-12 col-xs-12' title='菜单父节点'></g-input>
        <g-input name='module' classes='col-md-6 col-xs-6' parentClass='col-md-12 col-xs-12' title='模块'></g-input>
        <g-input name='sortIndex' classes='col-md-6 col-xs-6' parentClass='col-md-12 col-xs-12' title='排序号'></g-input>
        <g-input name='createUserAccount' classes='col-md-6 col-xs-6' parentClass='col-md-12 col-xs-12' title='createUserAccount'></g-input>
        <g-input name='createUserName' classes='col-md-6 col-xs-6' parentClass='col-md-12 col-xs-12' title='createUserName'></g-input>
        <g-input name='description' classes='col-md-6 col-xs-6' parentClass='col-md-12 col-xs-12' title='description'></g-input>
        <div class="mt10 col-md-12 text-center">
            <button type="submit" class="btn btn-primary" @click.stop='editMenu'>保存</button>
            <button type="submit" class="btn btn-primary" @click.stop='delMenu'>删除</button>
        </div>
    </g-form>
</template>
<script>
    export default{
        components:{
            gForm:require('xxx/form/form.vue')
        }
    }
</script>
@参数说明:
  //表单内部元素实现注意事项


       与from表单配套的表单元素  需要有三要素  具有 value,name,ischeck 属性 必须具有,并且有setValue为名的  验证方法


  //提供的方法


        getData()     return object   获取表单数据    {name:value,name1:value1}
        
                                                     let data = this.$refs.editmenuform.getData();

        setData()     @pram object    设置表单数据 参数格式{zh_CN:'zh_CN',zh_TW:'zh_TW',level:1}
                                                        let data = {zh_CN:'zh_CN',zh_TW:'zh_TW',level:1};
                                                        this.$refs.editmenuform.setData(data);

        $emitChild()  pram string      触发表单元素方法     form.$emitChild('xxx');触发所有子表单元素的xxx方法  

        emitChild()   触发方法并传递参数  form.emitChild(this.$refs.form,'checkvalue',{name:value,name1:value1})
-->
<template>
    <div>
        <slot></slot>
    </div>
</template>
<script>
//this.$refs.form.emitChild(this.$refs.form,'checkvalue');
//第一个参数是form对象，第二个参数是要调用的方法
    export default{
        data(){
            return {
                formData: {},
                __type: "form",
                ischeck: false
            }
        },
        watch: {
            //根据数据formData的变化，来变更整体验证属性ischeck
            'formData': {
                handler (nval, oval){
                    this.changeCheck(oval);
                }
            }
        },
        methods: {
            getData() {
                if (this.$children != undefined) {
                    this.emitChild(this, 'checkValue');
                }
                this.changeCheck(this.formData);
                return {ischeck: this.ischeck, data: this.formDatafuc(this.formData)}
            },
            setData(data) {
                if(typeof data != 'object') return;
                this.emitChild(this, 'setValue', data);
            },
            //格式化数据
            formDatafuc(_data) {
                var _d = {};
                for (var key in _data) {
                    _d[key] = _data[key].value
                }

                return _d;
            },
            changeCheck(oval) {
                let ischeck = true;
                for (var key in oval) {
                    if (oval[key].ischeck == false || oval[key].ischeck == undefined) {
                        ischeck = false;
                    }
                }
                if (ischeck) {
                    this.ischeck = true;
                } else {
                    this.ischeck = false;
                }
            },
            $emitChild(methods) {
                this.emitChild(this,methods);
            },
            /**
            @pram
                @_vm     vue    一般为表单form vue实例       *必填
                @methods string 需要调用form内部元素的方法    *必填
                @data    object 需要赋值给表单内部元素的数据   非必填
                                格式为{name:value,name1:vaule2}
            **/
            emitChild(_vm, methods,data) {
                let childList = _vm.$children;
                if (childList === undefined) return;
                //遍历子元素
                childList.forEach((vm)=> {
                    //判断是否存在要调用的方法
                    if (typeof vm[methods] == 'function') {
                        //判断是否有数据要传输
                        if(data && data[vm.name]){
                            vm[methods](data[vm.name]);
                        }else{
                            vm[methods]()
                        }
                    } else {
                        //没有方法，并有子元素，则继续递归
                        if (vm.$children != undefined) {
                            this.emitChild(vm, methods,data);
                        }
                    }
                });
            }
        },
        ready() {
        }
    }
</script>