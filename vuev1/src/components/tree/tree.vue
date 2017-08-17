<!--
@负责人:liugang
@创建时间:2016-11-28
@版本:v1.0.0
@描述:tree树形下拉组件
@使用方法:
<template>
    <g-tree :item='data' v-on:setmenu="setmenu"></g-tree>
</template>
<script>
    export default{
        components:{
            gTree:require('xxx/tree/tree.vue')
        }
    }
</script>
@参数说明:
item数据格式
data:[
    {"id":"1","text":"商品管理","name":"name1","grade": "0","show":true,
        "children":[
            {"id":"11","text":"商品列表","name":"name2","grade": "1"},
            {"id":"12","text":"添加新商品","name":"name3","grade": "1"},
            {"id":"13","text":"商品分类","name":"name4","grade": "1","children":[
                {"id":"131","text":"商品列表1","name":"name11","grade": "2","children":[
                    {"id":"1311","text":"商品列表13","name":"name1311","grade": "3"}
                ]}
            ]}
        ]
    },
    {"id":"2","text":"商品管理3","name":"name5","grade": "0",
    "children":[
        {"id":"21","text":"商品列表2","name":"name5","grade": "1"},
        ]
    }
]  

setmenu  fucntion 点击菜单触发方法 
setmenu(item)=>{
    item节点数据  格式如下
        [
        {"id":"21","text":"商品列表2","name":"name5","grade": "1"},
        ]
}                   
-->
<style>
    .tree-grid li {
        padding: 5px 0;
    } 
    .tree-grid .actImg {
        margin: 5px -1px;
        position: absolute
    }
    .tree-grid .level-0 .indented{
        position: relative;
        margin-left: 0;
    }
    .tree-grid .level-1 .indented {
        position : relative;
        margin-left: 10px;
    }
    .tree-grid .level-2 .indented {
        position : relative;
        margin-left: 20px;
    }
    .tree-grid .level-3 .indented {
        position : relative;
        margin-left: 30px;
    }
    .tree-grid .level-4 .indented {
        position : relative;
        margin-left: 40px;
    }
    .tree-grid .level-5 .indented {
        position : relative;
        margin-left: 5px;
    }
    .tree-grid .level-6 .indented {
        position : relative;
        margin-left: 6px;
    }
    .tree-grid .indented {
        cursor: pointer;
    }
    .tree-grid span.act {
        color: red;
    }
</style>
<template>
        <ul class="tree-grid">
            <li v-for="(index,item) in items" v-show="show(item)" :class="'level-' + (item.level - 1)" @click="toggle(index,item,$event)">

                <i v-if="item.children" class="indented glyphicon" :class="{'glyphicon-plus':!item.expanded,'glyphicon-minus':item.expanded }"></i>
                <i v-else class="indented fa fa-files-o"></i>

                <input type="checkbox" v-if='!item.children'>
                <img v-if='item.children && !item.expanded' src="images/u186.png" width="14" height="14"/>
                <img v-if='item.children && item.expanded' src="images/u198.png" width="14" height="14"/>

                <img v-if='item.children && item.expanded' src="images/u273.png" class='actImg' width="14" height="14"/>
                <img v-if='item.children' src="images/u180.png" width="14" height="14"/>
                <img v-else src="images/u267.png" width="14" height="14"/>

                <span class="indented" :class="{'act':item.expanded}" style="display:inline-block;">{{item.name}}</span>
            </li>
        </ul>
</template>
<script>
    import Vue from 'vue';
    export default {
        name: 'tree',
        props: ['item','editmenu'],
        data(){
            return {
                items:this.item
            }
        },
        watch: {
            'item': {
                handler(nval, oval) {
                    let me = this;
                    let initItems = [];
                    if(nval){
                        initData(nval,1,null);
                        me.items = initItems;
                    }
                    function initData(items,level,parent){
                        let spaceHtml = "";
                        for(var i=1;i<level;i++){
                            spaceHtml+="";
                        }

                        for(var key in items){
                            let item = items[key];
                            item = Object.assign({},item,{"parent":parent,"level":level,"spaceHtml":spaceHtml,grade:level-1});
                            if((typeof item.expanded)=="undefined"){
                                item = Object.assign({},item,{"expanded":false});
                            }
                            if((typeof item.show) == "undefined"){
                                item = Object.assign({},item,{"isShow":false});
                            }
                            item = Object.assign({},item,{"load":(item.expanded?true:false)});
                            initItems.push(item);
                            if(item.children && item.expanded){
                                initData(item.children,level+1,item);
                            }
                        }
                    }    
                }
            }
        },
        ready() {
            
        },
        computed:{
        },
        methods:{
            editMenu(index,item) {
                console.log(index);
                console.log(item);
            },
            show:function(item){
                return ((item.level==1) || (item.parent && item.parent.expanded && item.isShow));
            },
            toggle:function(index,item,event){
                let me = this;
                let level = item.level+1;
                let spaceHtml = "";
                for(var i=1;i<level;i++){
                    spaceHtml+="<i class='fa fa-files-o'></i>";
                }
                if(item.children){
                    if(item.expanded){
                        item.expanded = !item.expanded;
                        me.close(index,item);
                    }else {
                        item.expanded = !item.expanded;
                        if(item.load){
                            me.open(index,item);
                        }else {
                            item.load = true;
                            [].forEach.call(item.children,function(child,childIndex){
                                me.items.splice((index+childIndex+1),0,child);
                                Vue.set(me.items[index+childIndex+1],'parent',item);
                                //Vue.set(me.items[index+childIndex+1],'level',level);
                                Vue.set(me.items[index+childIndex+1],'spaceHtml',spaceHtml);
                                Vue.set(me.items[index+childIndex+1],'isShow',true);
                                Vue.set(me.items[index+childIndex+1],'expanded',false);
                            });
                        }
                    }
                }
                this.activeLi(event);
                this.$emit('setmenu',item);
            },
            //为LI做选中标记
            activeLi(event){
                let me = this;

                let thisLi = event.target.tagName == 'LI' ? event.target :  event.target.parentElement;

                let childNode = this.$el.children;
                
                [].forEach.call(childNode,function(child,childIndex){
                    me.removeClass(child,'act')

                });

                me.addClass(thisLi,'act')
                
            },
            open:function(index,item){
                let me = this;
                if(item.children){
                    open(index,item.children);
                }
                function open(index,items){
                    [].forEach.call(items,function(child,childIndex){
                        child.isShow = true;
                        if(child.children){
                            open(index+childIndex+1,child.children);
                        }
                    });
                }
            },
            close:function(index,item){
                let me = this;
                //debugger;
                if(item.children){
                    close(index,item.children);
                }
                function close(index,items){
                    [].forEach.call(items,function(child,childIndex){
                        child.isShow = false;
                        if(child.children){
                            close(index+childIndex+1,child.children);
                        }
                    });
                }
            },
            hasClass : function ( elements,cName ){    
                return !!elements.className.match( new RegExp( "(\\s|^)" + cName + "(\\s|$)") );   
            },    
            addClass : function ( elements,cName ){    
                if( !hasClass( elements,cName ) ){    
                    elements.className += " " + cName;    
                };    
            },    
            removeClass : function ( elements,cName ){    
                if( hasClass( elements,cName ) ){    
                    elements.className = elements.className.replace( new RegExp( "(\\s|^)" + cName + "(\\s|$)" ), " " );  
                };    
            }  
        }
    }
</script>