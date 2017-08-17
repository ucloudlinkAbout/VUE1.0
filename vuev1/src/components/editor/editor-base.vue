<!--
@负责人:chenwenxiao
@创建时间:2016-12-04
@版本:v1.0.0
@描述:富文本框基础控件
@使用方法:
<template>
    <g-editor defaultdata="<p>title</p></br><p>content......<p>" :getdata="editorData"></g-editor>
    <button v-on:click="e_getdata">获取数据</button>
</template>
<script>
    export default{
        components:{
            gEditor:require('xxx/xxx/editor-base.vue')
        },
        methods:{
            e_getdata(){
                // 获取编辑器区域完整html代码
                var html = this.editorData.html();

                // 获取编辑器纯文本内容
                var text = this.editorData.text();

                // 获取格式化后的纯文本
                var formatText = this.editorData.formatText();
            },
            editorData(){}
        }
    }
</script>
@参数说明:
//默认显示的数据
defaultdata: '',
//返回富文本框的获取数据方法
getdata: {
    type: Function,
    default: function () {

    }
}
-->
<template>
    <div class="editor">
        <p v-text="i18n.placeholder"></p>
    </div>
</template>
<script>
    import '../../libs/reference/wangEditor/css/wangEditor.css'
    import '../../libs/reference/wangEditor/js/wangEditor'
    import lan from '../../libs/base/lanLoader'
    export default{
        ready(){
            let idConfig = 'wangEditId', i = 0, that = this;
            lan.getLan(window.SystemGlobe.component.componentI18n).then(function (com) {
                that.i18n = com.editor;
                while ($('#wangEditId' + i).length > 0) {
                    i++;
                }
                idConfig += i;
                that.$el.id = idConfig;
                $(function () {
                    let editor = new wangEditor(idConfig);
                    editor.config.menus = [
                        'source',
                        '|',
                        'bold',
                        'underline',
                        'italic',
                        'strikethrough',
                        'eraser',
                        'forecolor',
                        'bgcolor',
                        '|',
                        'quote',
                        'fontfamily',
                        'fontsize',
                        'head',
                        'unorderlist',
                        'orderlist',
                        'alignleft',
                        'aligncenter',
                        'alignright',
                        '|',
                        'link',
                        'unlink',
                        'table',
                        'emotion',
                        '|',
                        'img',
                        'video',
                        'insertcode',
                        '|',
                        'undo',
                        'redo',
                        'fullscreen'
                    ];
                    editor.config.lang = that.i18n.lanPackage;
                    editor.create();
                    if (that.defaultdata) {
                        editor.$txt.html(that.defaultdata);
                    }
                    that.editor = editor;
                    if (that.getdata) {
                        that.getdata = editor.$txt;
                    }
                });
                $('#' + idConfig).height('150px');
            });
        },
        methods: {},
        data(){
            return {
                i18n: {},
                editor: ''
            }
        },
        props: {
            defaultdata: '',
            getdata: {
                type: Function,
                default: function () {

                }
            }
        }
    }
</script>
<style>
    .editor {
        width: 100%;
        height: 161px;
    }
</style>