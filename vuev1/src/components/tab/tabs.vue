<!--
@负责人:liugang
@创建时间:2016-12-01
@版本:v1.0.0
@描述:tabs组件
@使用方法:
<template>
    <tabs>
        <tab name="t1" title="Tab 1" active=true>
            Hello World
        </tab>
        <tab name="t2" title="Tab 2">
            <xxx></xxx>
        </tab>
        <tab name="t3" title="Tab 3">
            xxxxx
        </tab>
    </tabs>
</template>
<script>
    export default{
        components:{
            tabs:require('xxx/tab/tabs.vue')
        }
    }
</script>
@参数说明:

无参数，功能性父标签



-->
<template>
    <ul class="nav nav-tabs bread">
        <li role="presentation" :class="{'active':tab.active}" v-for="tab in tablist" @click='changeTab(tab.name,$index)'>{{tab.title}}</li>
    </ul>
    <div class="tab-content">
        <slot></slot>
    </div>
</template>
<script>
    'use strict';
    import vmHelper from '../../libs/base/vmHelper';
    export default{
       data () {
          return {
            tablist: []
          }
      },
      methods: {
          changeTab(name,index) {
              //取消所有li选择状态
              this.tablist.forEach((obj,i)=>{
                  this.tablist[i].active = false;
              });

              //设定当前选择状态
              this.tablist[index].active = true;

              //取消所有content选择状态
              vmHelper.emitChild(this,'canelActive');

              //设定当前选择状态
              let activeChild = vmHelper.getChildVmByName(this,name);
              activeChild.active = true;

              
          }
      },
      ready(){
        this.$children.forEach(c=>{
            this.tablist.push({
                    "name": c.name,
                    "title": c.title,
                    "active": c.active
                });
        })
      }
  }
</script>
<style>
  .tab-content .tab-pane{
      display:none;
      overflow:hidden;
  }
  .tab-content .active{
      display:block;
  }
  .nav-tabs {
    background-color: #eeeeee;
    padding-top:5px;
    padding-left:5px;
    border: 1px solid #ddd;
  }
  .tab-content {
    color : #000000;
    background-color: #ffffff;
    padding : 5px 15px;
    margin-top: -1px;
    border: 1px solid #ddd;
  }
</style>