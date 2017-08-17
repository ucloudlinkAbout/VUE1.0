<template>
    <div class="container">
        <h1 class="text-center pt20 font-very-large">UI示例文档</h1>
        <b>注：UI库仅支持ie9及以上版本，兼容谷歌、火狐等浏览器为开发目标</b>
        <p class="unShow">隐藏</p>
        <h2>1.基础部分（包含位置修正、宽度、居中等）</h2>
        <h3>1.1容器</h3>
        <p class="example">container：容器是一个dom承载的基础，容器的默认大小是1200px</p>
        <h3>1.2文本对齐控制</h3>
        <div>
            <p class="example text-left">text-left：左对齐</p>
            <p class="example text-right">text-right：右对齐</p>
            <p class="example text-center">text-center：居中对齐</p>
        </div>
        <h3>1.3长度控制，浮动控制（百分比）</h3>
        <div>
            <p class="example">w-num：num为10,20,30等整数</p>
            <div class="clear">
                <p class="example w-40 fl">w-40：宽度40%，fl：左浮动，clear：清除浮动</p>
                <p class="example w-60 fl">w-60：宽度60%，fl：左浮动，clear：清除浮动</p>
            </div>
            <div class="clear">
                <p class="example w-40 fr">w-40：宽度40%，fr：右浮动，clear：清除浮动</p>
                <p class="example w-60 fr">w-60：宽度60%，fr：右浮动，clear：清除浮动</p>
            </div>
        </div>
        <h3>1.4内外边距修正</h3>
        <div>
            <p class="example pt10">pt10：顶部内边距10px</p>
            <p class="example pb10">pb10：底部内边距10px</p>
            <p class="example mt20">mt20：顶部外边距20px</p>
        </div>
        <h3 class="mt20">1.5圆角处理</h3>
        <div>
            <div class="example">
                <p class="br-1 ilb bg-primary roundfix">br-1</p>
                <p class="br-2 ilb bg-primary roundfix">br-2</p>
                <p class="br-4 ilb bg-primary roundfix">br-4</p>
                <p class="br-8 ilb bg-primary roundfix">br-5</p>
                <p class="br-round ilb bg-primary roundfix">br-round</p>
            </div>
        </div>
        <h3 class="mt20">1.6边框处理</h3>
        <div>
            <div class="example">
                <p class="ilb pd20 border-bottom">border-bottom</p>
                <p class="ilb pd20 border-top">border-top</p>
                <p class="ilb pd20 border-left">border-left</p>
                <p class="ilb pd20 border-right">border-right</p>
                <p class="ilb pd20 border">border</p>
            </div>
        </div>
        <h3 class="mt20">1.7面包屑</h3>
        <div>
            <ol class="bread">
                <li class="active"><p>订单管理</p><span></span></li>
                <li><p>快递配合管理</p><span></span></li>
                <li><p>退款管理</p><span></span></li>
                <li><p>其他管理</p><span></span></li>
            </ol>
        </div>
        <h3 class="mt20">1.8表格</h3>
        <div>
            <div class="mt10 mb10">
                <button class="btn btn-default" type="button">批量收款</button>
                <button class="btn btn-default" type="button">批量收款</button>
                <button class="btn btn-danger" type="button">批量收款</button>
                <button class="btn btn-warning" type="button">批量收款</button>
                <button class="btn btn-primary" type="button">批量收款</button>
                <button class="btn btn-primary" type="button">批量收款</button>
                <button class="btn btn-primary fr" type="button">
                    <span>+</span>新增
                </button>
            </div>
            <div>
                <table class="table">
                    <thead>
                    <tr>
                        <th>
                            <label class="input-checkbox-1 fl">
                                <input type="checkbox" name="checkbox1" />
                                <span><i></i></span>
                                <b></b>
                            </label>
                        </th>
                        <th>订单编号</th>
                        <th>IMEI</th>
                        <th>订单类型</th>
                        <th>订单进度</th>
                        <th>出国日期</th>
                        <th>回国日期</th>
                        <th>标签</th>
                        <th>操作<span class="iconfont ico-gray fr icon-set hand"></span></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>
                            <label class="input-checkbox-1 fl">
                                <input type="checkbox" name="checkbox1" />
                                <span><i></i></span>
                                <b></b>
                            </label>
                        </td>
                        <td>D2016091200102</td>
                        <td>365154575155577</td>
                        <td>机构代理</td>
                        <td>完成</td>
                        <td>2016-05-07</td>
                        <td>2016-08-09</td>
                        <td><span class="label label-primary">标签</span><span class="label label-default ml5">标签</span></td>
                        <td>
                            <a href="javascript:">编辑</a>
                            <a href="javascript:">归还</a>
                            <a href="javascript:">发货</a>
                            <div class="table-operate">
                                <span class="iconfont icon-gengduo"></span>
                                <div class="table-operate-target">
                                    <a href="javascript:">续租</a>
                                    <a href="javascript:">退订</a>
                                    <a href="javascript:">取消</a>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label class="input-checkbox-1 fl">
                                <input type="checkbox" name="checkbox1" />
                                <span><i></i></span>
                                <b></b>
                            </label>
                        </td>
                        <td>D2016091200102</td>
                        <td>365154575155577</td>
                        <td>机构代理</td>
                        <td>完成</td>
                        <td>2016-05-07</td>
                        <td>2016-08-09</td>
                        <td><span class="label label-primary">标签</span><span class="label label-default ml5">标签</span></td>
                        <td>
                            <a href="javascript:">编辑</a>
                            <a href="javascript:">归还</a>
                            <a href="javascript:">发货</a>
                            <div class="table-operate">
                                <span class="iconfont icon-gengduo"></span>
                                <div class="table-operate-target">
                                    <a href="javascript:">续租</a>
                                    <a href="javascript:">退订</a>
                                    <a href="javascript:">取消</a>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label class="input-checkbox-1 fl">
                                <input type="checkbox" name="checkbox1" />
                                <span><i></i></span>
                                <b></b>
                            </label>
                        </td>
                        <td>D2016091200102</td>
                        <td>365154575155577</td>
                        <td>机构代理</td>
                        <td>完成</td>
                        <td>2016-05-07</td>
                        <td>2016-08-09</td>
                        <td><span class="label label-primary">标签</span><span class="label label-default ml5">标签</span></td>
                        <td>
                            <a href="javascript:">编辑</a>
                            <a href="javascript:">归还</a>
                            <a href="javascript:">发货</a>
                            <div class="table-operate">
                                <span class="iconfont icon-gengduo"></span>
                                <div class="table-operate-target">
                                    <a href="javascript:">续租</a>
                                    <a href="javascript:">退订</a>
                                    <a href="javascript:">取消</a>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label class="input-checkbox-1 fl">
                                <input type="checkbox" name="checkbox1" />
                                <span><i></i></span>
                                <b></b>
                            </label>
                        </td>
                        <td>D2016091200102</td>
                        <td>365154575155577</td>
                        <td>机构代理</td>
                        <td>完成</td>
                        <td>2016-05-07</td>
                        <td>2016-08-09</td>
                        <td><span class="label label-primary">标签</span><span class="label label-default ml5">标签</span></td>
                        <td>
                            <a href="javascript:">编辑</a>
                            <a href="javascript:">归还</a>
                            <a href="javascript:">发货</a>
                            <div class="table-operate">
                                <span class="iconfont icon-gengduo"></span>
                                <div class="table-operate-target">
                                    <a href="javascript:">续租</a>
                                    <a href="javascript:">退订</a>
                                    <a href="javascript:">取消</a>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label class="input-checkbox-1 fl">
                                <input type="checkbox" name="checkbox1" />
                                <span><i></i></span>
                                <b></b>
                            </label>
                        </td>
                        <td>D2016091200102</td>
                        <td>365154575155577</td>
                        <td>机构代理</td>
                        <td>完成</td>
                        <td>2016-05-07</td>
                        <td>2016-08-09</td>
                        <td><span class="label label-primary">标签</span><span class="label label-default ml5">标签</span></td>
                        <td>
                            <a href="javascript:">编辑</a>
                            <a href="javascript:">归还</a>
                            <a href="javascript:">发货</a>
                            <div class="table-operate">
                                <span class="iconfont icon-gengduo"></span>
                                <div class="table-operate-target">
                                    <a href="javascript:">续租</a>
                                    <a href="javascript:">退订</a>
                                    <a href="javascript:">取消</a>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label class="input-checkbox-1 fl">
                                <input type="checkbox" name="checkbox1" />
                                <span><i></i></span>
                                <b></b>
                            </label>
                        </td>
                        <td>D2016091200102</td>
                        <td>365154575155577</td>
                        <td>机构代理</td>
                        <td>完成</td>
                        <td>2016-05-07</td>
                        <td>2016-08-09</td>
                        <td><span class="label label-primary">标签</span><span class="label label-default ml5">标签</span></td>
                        <td>
                            <a href="javascript:">编辑</a>
                            <a href="javascript:">归还</a>
                            <a href="javascript:">发货</a>
                            <div class="table-operate">
                                <span class="iconfont icon-gengduo"></span>
                                <div class="table-operate-target">
                                    <a href="javascript:">续租</a>
                                    <a href="javascript:">退订</a>
                                    <a href="javascript:">取消</a>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label class="input-checkbox-1 fl">
                                <input type="checkbox" name="checkbox1" />
                                <span><i></i></span>
                                <b></b>
                            </label>
                        </td>
                        <td>D2016091200102</td>
                        <td>365154575155577</td>
                        <td>机构代理</td>
                        <td>完成</td>
                        <td>2016-05-07</td>
                        <td>2016-08-09</td>
                        <td><span class="label label-primary">标签</span><span class="label label-default ml5">标签</span></td>
                        <td>
                            <a href="javascript:">编辑</a>
                            <a href="javascript:">归还</a>
                            <a href="javascript:">发货</a>
                            <div class="table-operate">
                                <span class="iconfont icon-gengduo"></span>
                                <div class="table-operate-target">
                                    <a href="javascript:">续租</a>
                                    <a href="javascript:">退订</a>
                                    <a href="javascript:">取消</a>
                                </div>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <table class="table table-out-bordered table-head-bg">
                    <thead>
                    <tr>
                        <th>
                            <label class="input-checkbox-1 fl">
                                <input type="checkbox" name="checkbox1" />
                                <span><i></i></span>
                                <b></b>
                            </label>
                        </th>
                        <th>订单编号</th>
                        <th>IMEI</th>
                        <th>订单类型</th>
                        <th>订单进度</th>
                        <th>出国日期</th>
                        <th>回国日期</th>
                        <th>标签</th>
                        <th>操作<span class="iconfont ico-gray fr icon-set hand"></span></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>
                            <label class="input-checkbox-1 fl">
                                <input type="checkbox" name="checkbox1" />
                                <span><i></i></span>
                                <b></b>
                            </label>
                        </td>
                        <td>D2016091200102</td>
                        <td>365154575155577</td>
                        <td>机构代理</td>
                        <td>完成</td>
                        <td>2016-05-07</td>
                        <td>2016-08-09</td>
                        <td><span class="label label-primary">标签</span><span class="label label-default ml5">标签</span></td>
                        <td>
                            <a href="javascript:">编辑</a>
                            <a href="javascript:">归还</a>
                            <a href="javascript:">发货</a>
                            <div class="table-operate">
                                <span class="iconfont icon-gengduo"></span>
                                <div class="table-operate-target">
                                    <a href="javascript:">续租</a>
                                    <a href="javascript:">退订</a>
                                    <a href="javascript:">取消</a>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label class="input-checkbox-1 fl">
                                <input type="checkbox" name="checkbox1" />
                                <span><i></i></span>
                                <b></b>
                            </label>
                        </td>
                        <td>D2016091200102</td>
                        <td>365154575155577</td>
                        <td>机构代理</td>
                        <td>完成</td>
                        <td>2016-05-07</td>
                        <td>2016-08-09</td>
                        <td><span class="label label-primary">标签</span><span class="label label-default ml5">标签</span></td>
                        <td>
                            <a href="javascript:">编辑</a>
                            <a href="javascript:">归还</a>
                            <a href="javascript:">发货</a>
                            <div class="table-operate">
                                <span class="iconfont icon-gengduo"></span>
                                <div class="table-operate-target">
                                    <a href="javascript:">续租</a>
                                    <a href="javascript:">退订</a>
                                    <a href="javascript:">取消</a>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label class="input-checkbox-1 fl">
                                <input type="checkbox" name="checkbox1" />
                                <span><i></i></span>
                                <b></b>
                            </label>
                        </td>
                        <td>D2016091200102</td>
                        <td>365154575155577</td>
                        <td>机构代理</td>
                        <td>完成</td>
                        <td>2016-05-07</td>
                        <td>2016-08-09</td>
                        <td><span class="label label-primary">标签</span><span class="label label-default ml5">标签</span></td>
                        <td>
                            <a href="javascript:">编辑</a>
                            <a href="javascript:">归还</a>
                            <a href="javascript:">发货</a>
                            <div class="table-operate">
                                <span class="iconfont icon-gengduo"></span>
                                <div class="table-operate-target">
                                    <a href="javascript:">续租</a>
                                    <a href="javascript:">退订</a>
                                    <a href="javascript:">取消</a>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label class="input-checkbox-1 fl">
                                <input type="checkbox" name="checkbox1" />
                                <span><i></i></span>
                                <b></b>
                            </label>
                        </td>
                        <td>D2016091200102</td>
                        <td>365154575155577</td>
                        <td>机构代理</td>
                        <td>完成</td>
                        <td>2016-05-07</td>
                        <td>2016-08-09</td>
                        <td><span class="label label-primary">标签</span><span class="label label-default ml5">标签</span></td>
                        <td>
                            <a href="javascript:">编辑</a>
                            <a href="javascript:">归还</a>
                            <a href="javascript:">发货</a>
                            <div class="table-operate">
                                <span class="iconfont icon-gengduo"></span>
                                <div class="table-operate-target">
                                    <a href="javascript:">续租</a>
                                    <a href="javascript:">退订</a>
                                    <a href="javascript:">取消</a>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label class="input-checkbox-1 fl">
                                <input type="checkbox" name="checkbox1" />
                                <span><i></i></span>
                                <b></b>
                            </label>
                        </td>
                        <td>D2016091200102</td>
                        <td>365154575155577</td>
                        <td>机构代理</td>
                        <td>完成</td>
                        <td>2016-05-07</td>
                        <td>2016-08-09</td>
                        <td><span class="label label-primary">标签</span><span class="label label-default ml5">标签</span></td>
                        <td>
                            <a href="javascript:">编辑</a>
                            <a href="javascript:">归还</a>
                            <a href="javascript:">发货</a>
                            <div class="table-operate">
                                <span class="iconfont icon-gengduo"></span>
                                <div class="table-operate-target">
                                    <a href="javascript:">续租</a>
                                    <a href="javascript:">退订</a>
                                    <a href="javascript:">取消</a>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label class="input-checkbox-1 fl">
                                <input type="checkbox" name="checkbox1" />
                                <span><i></i></span>
                                <b></b>
                            </label>
                        </td>
                        <td>D2016091200102</td>
                        <td>365154575155577</td>
                        <td>机构代理</td>
                        <td>完成</td>
                        <td>2016-05-07</td>
                        <td>2016-08-09</td>
                        <td><span class="label label-primary">标签</span><span class="label label-default ml5">标签</span></td>
                        <td>
                            <a href="javascript:">编辑</a>
                            <a href="javascript:">归还</a>
                            <a href="javascript:">发货</a>
                            <div class="table-operate">
                                <span class="iconfont icon-gengduo"></span>
                                <div class="table-operate-target">
                                    <a href="javascript:">续租</a>
                                    <a href="javascript:">退订</a>
                                    <a href="javascript:">取消</a>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label class="input-checkbox-1 fl">
                                <input type="checkbox" name="checkbox1" />
                                <span><i></i></span>
                                <b></b>
                            </label>
                        </td>
                        <td>D2016091200102</td>
                        <td>365154575155577</td>
                        <td>机构代理</td>
                        <td>完成</td>
                        <td>2016-05-07</td>
                        <td>2016-08-09</td>
                        <td><span class="label label-primary">标签</span><span class="label label-default ml5">标签</span></td>
                        <td>
                            <a href="javascript:">编辑</a>
                            <a href="javascript:">归还</a>
                            <a href="javascript:">发货</a>
                            <div class="table-operate">
                                <span class="iconfont icon-gengduo"></span>
                                <div class="table-operate-target">
                                    <a href="javascript:">续租</a>
                                    <a href="javascript:">退订</a>
                                    <a href="javascript:">取消</a>
                                </div>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <table class="table table-bordered">
                    <thead>
                    <tr>
                        <th>
                            <label class="input-checkbox-1 fl">
                                <input type="checkbox" name="checkbox1" />
                                <span><i></i></span>
                                <b></b>
                            </label>
                        </th>
                        <th>订单编号</th>
                        <th>IMEI</th>
                        <th>订单类型</th>
                        <th>订单进度</th>
                        <th>出国日期</th>
                        <th>回国日期</th>
                        <th>标签</th>
                        <th>操作<span class="iconfont ico-gray fr icon-set hand"></span></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>
                            <label class="input-checkbox-1 fl">
                                <input type="checkbox" name="checkbox1" />
                                <span><i></i></span>
                                <b></b>
                            </label>
                        </td>
                        <td>D2016091200102</td>
                        <td>365154575155577</td>
                        <td>机构代理</td>
                        <td>完成</td>
                        <td>2016-05-07</td>
                        <td>2016-08-09</td>
                        <td><span class="label label-primary">标签</span><span class="label label-default ml5">标签</span></td>
                        <td>
                            <a href="javascript:">编辑</a>
                            <a href="javascript:">归还</a>
                            <a href="javascript:">发货</a>
                            <div class="table-operate">
                                <span class="iconfont icon-gengduo"></span>
                                <div class="table-operate-target">
                                    <a href="javascript:">续租</a>
                                    <a href="javascript:">退订</a>
                                    <a href="javascript:">取消</a>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label class="input-checkbox-1 fl">
                                <input type="checkbox" name="checkbox1" />
                                <span><i></i></span>
                                <b></b>
                            </label>
                        </td>
                        <td>D2016091200102</td>
                        <td>365154575155577</td>
                        <td>机构代理</td>
                        <td>完成</td>
                        <td>2016-05-07</td>
                        <td>2016-08-09</td>
                        <td><span class="label label-primary">标签</span><span class="label label-default ml5">标签</span></td>
                        <td>
                            <a href="javascript:">编辑</a>
                            <a href="javascript:">归还</a>
                            <a href="javascript:">发货</a>
                            <div class="table-operate">
                                <span class="iconfont icon-gengduo"></span>
                                <div class="table-operate-target">
                                    <a href="javascript:">续租</a>
                                    <a href="javascript:">退订</a>
                                    <a href="javascript:">取消</a>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label class="input-checkbox-1 fl">
                                <input type="checkbox" name="checkbox1" />
                                <span><i></i></span>
                                <b></b>
                            </label>
                        </td>
                        <td>D2016091200102</td>
                        <td>365154575155577</td>
                        <td>机构代理</td>
                        <td>完成</td>
                        <td>2016-05-07</td>
                        <td>2016-08-09</td>
                        <td><span class="label label-primary">标签</span><span class="label label-default ml5">标签</span></td>
                        <td>
                            <a href="javascript:">编辑</a>
                            <a href="javascript:">归还</a>
                            <a href="javascript:">发货</a>
                            <div class="table-operate">
                                <span class="iconfont icon-gengduo"></span>
                                <div class="table-operate-target">
                                    <a href="javascript:">续租</a>
                                    <a href="javascript:">退订</a>
                                    <a href="javascript:">取消</a>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label class="input-checkbox-1 fl">
                                <input type="checkbox" name="checkbox1" />
                                <span><i></i></span>
                                <b></b>
                            </label>
                        </td>
                        <td>D2016091200102</td>
                        <td>365154575155577</td>
                        <td>机构代理</td>
                        <td>完成</td>
                        <td>2016-05-07</td>
                        <td>2016-08-09</td>
                        <td><span class="label label-primary">标签</span><span class="label label-default ml5">标签</span></td>
                        <td>
                            <a href="javascript:">编辑</a>
                            <a href="javascript:">归还</a>
                            <a href="javascript:">发货</a>
                            <div class="table-operate">
                                <span class="iconfont icon-gengduo"></span>
                                <div class="table-operate-target">
                                    <a href="javascript:">续租</a>
                                    <a href="javascript:">退订</a>
                                    <a href="javascript:">取消</a>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label class="input-checkbox-1 fl">
                                <input type="checkbox" name="checkbox1" />
                                <span><i></i></span>
                                <b></b>
                            </label>
                        </td>
                        <td>D2016091200102</td>
                        <td>365154575155577</td>
                        <td>机构代理</td>
                        <td>完成</td>
                        <td>2016-05-07</td>
                        <td>2016-08-09</td>
                        <td><span class="label label-primary">标签</span><span class="label label-default ml5">标签</span></td>
                        <td>
                            <a href="javascript:">编辑</a>
                            <a href="javascript:">归还</a>
                            <a href="javascript:">发货</a>
                            <div class="table-operate">
                                <span class="iconfont icon-gengduo"></span>
                                <div class="table-operate-target">
                                    <a href="javascript:">续租</a>
                                    <a href="javascript:">退订</a>
                                    <a href="javascript:">取消</a>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label class="input-checkbox-1 fl">
                                <input type="checkbox" name="checkbox1" />
                                <span><i></i></span>
                                <b></b>
                            </label>
                        </td>
                        <td>D2016091200102</td>
                        <td>365154575155577</td>
                        <td>机构代理</td>
                        <td>完成</td>
                        <td>2016-05-07</td>
                        <td>2016-08-09</td>
                        <td><span class="label label-primary">标签</span><span class="label label-default ml5">标签</span></td>
                        <td>
                            <a href="javascript:">编辑</a>
                            <a href="javascript:">归还</a>
                            <a href="javascript:">发货</a>
                            <div class="table-operate">
                                <span class="iconfont icon-gengduo"></span>
                                <div class="table-operate-target">
                                    <a href="javascript:">续租</a>
                                    <a href="javascript:">退订</a>
                                    <a href="javascript:">取消</a>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label class="input-checkbox-1 fl">
                                <input type="checkbox" name="checkbox1" />
                                <span><i></i></span>
                                <b></b>
                            </label>
                        </td>
                        <td>D2016091200102</td>
                        <td>365154575155577</td>
                        <td>机构代理</td>
                        <td>完成</td>
                        <td>2016-05-07</td>
                        <td>2016-08-09</td>
                        <td><span class="label label-primary">标签</span><span class="label label-default ml5">标签</span></td>
                        <td>
                            <a href="javascript:">编辑</a>
                            <a href="javascript:">归还</a>
                            <a href="javascript:">发货</a>
                            <div class="table-operate">
                                <span class="iconfont icon-gengduo"></span>
                                <div class="table-operate-target">
                                    <a href="javascript:">续租</a>
                                    <a href="javascript:">退订</a>
                                    <a href="javascript:">取消</a>
                                </div>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="text-right mt20">
                <div class="form-inline vm">
                    <span>共63条记录，12页数据</span>
                    <select class="form-control">
                        <option>10</option>
                        <option>20</option>
                        <option>50</option>
                        <option>100</option>
                        <option>200</option>
                    </select>
                    <ul class="pagination">
                        <li><a href="javascript:"><span class="iconfont font-small icon-zuojiantou"></span></a></li>
                        <li class="active"><a href="javascript:">1</a></li>
                        <li><a href="javascript:">2</a></li>
                        <li><a href="javascript:">3</a></li>
                        <li><a href="javascript:">4</a></li>
                        <li><a href="javascript:">5</a></li>
                        <li><a href="javascript:"><span class="iconfont font-small icon-youjiantou"></span></a></li>
                    </ul>
                    <input type="text" class="form-control" style="width: 40px;"/>
                    <button class="btn btn-primary">跳转</button>
                </div>
            </div>
        </div>

        <h3 class="mt20">1.9鼠标用户体验优化</h3>
        <div class="mt10">
            <span class="hand border">hand</span>
            <span class="arrow border">arrow</span>
            <span class="notAllowed border">notAllowed</span>
            <span class="wait border">wait</span>
        </div>

        <h2>2.栅格系统</h2>
        <h3>栅格系统模仿bt3，计数原则类似bt3,通常栅格系统与clear清除浮动一起使用（因为栅格主要使用浮动实现）,lg主要针对大屏幕的有效，小屏幕的按照100%显示。以此类推</h3>
        <div class="bdd">
            <div class="clear">
                <div class="col-lg-6">col-lg-6</div>
                <div class="col-sm-6">col-sm-6</div>
                <div class="col-xs-6">col-xs-6</div>
                <div class="col-xs-6 col-md-6 col-sm-6">col-xs-6 col-md-6 col-sm-6</div>
            </div>
            <div class="clear">
                <div class="col-sm-4">col-sm-4</div>
                <div class="col-sm-4">col-sm-4</div>
                <div class="col-sm-4">col-sm-4</div>
            </div>
            <div class="clear">
                <div class="col-md-3">col-md-3</div>
                <div class="col-md-3">col-md-3</div>
                <div class="col-md-3">col-md-3</div>
                <div class="col-md-3">col-md-3</div>
            </div>
            <div class="clear">
                <div class="col-xs-6 col-sm-4 col-md-3 col-lg-2">col-xs-6 col-sm-4 col-md-3 col-lg-2</div>
                <div class="col-xs-6 col-sm-4 col-md-3 col-lg-2">col-xs-6 col-sm-4 col-md-3 col-lg-2</div>
                <div class="col-xs-6 col-sm-4 col-md-3 col-lg-2">col-xs-6 col-sm-4 col-md-3 col-lg-2</div>
                <div class="col-xs-6 col-sm-4 col-md-3 col-lg-2">col-xs-6 col-sm-4 col-md-3 col-lg-2</div>
                <div class="col-xs-6 col-sm-4 col-md-3 col-lg-2">col-xs-6 col-sm-4 col-md-3 col-lg-2</div>
                <div class="col-xs-6 col-sm-4 col-md-3 col-lg-2">col-xs-6 col-sm-4 col-md-3 col-lg-2</div>
                <div class="col-xs-6 col-sm-4 col-md-3 col-lg-2">col-xs-6 col-sm-4 col-md-3 col-lg-2</div>
                <div class="col-xs-6 col-sm-4 col-md-3 col-lg-2">col-xs-6 col-sm-4 col-md-3 col-lg-2</div>
            </div>
        </div>

        <h2>3.表单元素部分</h2>
        <h3>3.1 文本框</h3>
        <div class="form-inline">
            <p class="example">form-control：<input type="text" class="form-control"/></p>
            <p class="example">form-control：<input type="text" class="form-control"/></p>
            <p class="example">form-control：<input type="text" class="form-control"/></p>
        </div>
        <h3>3.2 按钮</h3>
        <p class="example">btn btn-primary：<button class="btn btn-default" type="button">两字</button></p>
        <p class="example">btn btn-primary：<button class="btn btn-primary" type="button">两字</button></p>
        <p class="example">btn btn-default：<button class="btn btn-primary" type="button">两字</button></p>
        <p class="example">btn btn-normal：<button class="btn btn-default" type="button">两字</button></p>
        <p class="example">btn btn-primary：<button class="btn btn-primary" type="button">两字</button></p>
        <p class="example">btn btn-default：<button class="btn btn-default" type="button">两字</button></p>
        <p class="example">btn btn-primary：<button class="btn btn-warning" type="button">两字</button></p>
        <p class="example">btn btn-normal：<button class="btn btn-warning" type="button">四个字的</button></p>
        <p class="example">btn btn-primary：<button class="btn btn-danger" type="button">大四个的</button></p>
        <p class="example">btn btn-default：<button class="btn btn-default" type="button">大四个的</button></p>
        <p class="example">btn btn-normal：<button class="btn btn-danger" type="button">大四个的</button></p>
        <p class="example">btn btn-primary：<button class="btn btn-primary" type="button">大四个的</button></p>
        <h3>3.3 弹窗</h3>
        <p class="example"><button class="btn btn-default" type="button" id="modal-samll">小弹窗</button></p>
        <div class="modal fade" id="win-modal-samll">
            <div class="fade in modal-backdrop"></div>
            <div class="modal-dialog modal-sm">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close closing" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                        <h4></h4>
                    </div>
                    <div class="modal-body">
                        <p>我是提示信息！！！！！</p>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-primary" type="button">确定</button>
                        <button class="btn btn-default closing" type="button">取消</button>
                    </div>
                </div>
            </div>
        </div>

        <p class="example"><button class="btn btn-primary" type="button" id="modal-normal">中等弹窗</button></p>
        <div class="modal fade" id="win-modal-normal">
            <div class="fade in modal-backdrop"></div>
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close closing" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                        <h4></h4>
                    </div>
                    <div class="modal-body">
                        <p>我是提示信息！！！！！</p>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-primary" type="button">确定</button>
                        <button class="btn btn-default closing" type="button">取消</button>
                    </div>
                </div>
            </div>
        </div>

        <p class="example"><button class="btn btn-primary" type="button" id="modal-large">大弹窗</button></p>
        <div class="modal fade" id="win-modal-large">
            <div class="fade in modal-backdrop"></div>
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close closing" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                        <h4></h4>
                    </div>
                    <div class="modal-body">
                        <p>我是提示信息！！！！！</p>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-primary" type="button">确定</button>
                        <button class="btn btn-default closing" type="button">取消</button>
                    </div>
                </div>
            </div>
        </div>

        <!--2016-11-01新加-->
        <p class="example"><button class="btn btn-primary" type="button" id="modal-1">提示弹窗</button></p>
        <div class="modal fade" id="win-modal-1">
            <div class="fade in modal-backdrop"></div>
            <div class="modal-dialog modal-sm">
                <div class="modal-content">
                    <div class="modal-body">
                        <div class="pd40 text-center">
                            <p><span class="iconfont icon-iconfontjinggao ico-bigRed font-very-large"></span></p>
                            <p>我是提示信息！！！！！</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <p class="example"><button class="btn btn-primary" type="button" id="modal-2">提示弹窗1</button></p>
        <div class="modal fade" id="win-modal-2">
            <div class="fade in modal-backdrop"></div>
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close closing" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                        <h4>提示</h4>
                    </div>
                    <div class="modal-body">
                        <div class="pd40 text-center">
                            <p><span class="ico-yellow iconfont icon-iconfontjinggao ico-bigRed font-very-large"></span></p>
                            <p class="mt10">我是提示信息！！</p>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-primary" type="button">确定</button>
                        <button class="btn btn-default closing" type="button">取消</button>
                    </div>
                </div>
            </div>
        </div>

        <!--2016-11-01新加-->
        <p class="example"><button class="btn btn-primary" type="button" id="modal-3">大型弹出框</button></p>
        <div class="modal fade" id="win-modal-3">
            <div class="fade in modal-backdrop"></div>
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close closing" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                        <h4>编辑</h4>
                    </div>
                    <div class="modal-body">
                        <div class="pd10">
                            <div class="mt5 form-inline clear">
                                <div class="col-xs-4 text-right">
                                    <span class="font-red">*</span>
                                    <span>用户名：</span>
                                </div>
                                <div class="col-xs-4">
                                    <input type="text" class="form-control"/>
                                </div>
                                <div class="col-xs-4">
                                    <span class="iconfont icon-iconfontjinggao ico-bigRed"></span>
                                    <span class="font-red">这个是错误的</span>
                                </div>
                            </div>
                            <div class="mt5 form-inline clear">
                                <div class="col-xs-4 text-right">
                                    <span class="font-red">*</span>
                                    <span>密码：</span>
                                </div>
                                <div class="col-xs-4">
                                    <input type="text" class="form-control"/>
                                </div>
                                <div class="col-xs-4">
                                    <span class="iconfont icon-iconfontjinggao ico-bigRed"></span>
                                    <span class="font-red">这个是错误的</span>
                                </div>
                            </div>
                            <div class="mt5 form-inline clear">
                                <div class="col-xs-4 text-right">
                                    <span class="font-red">*</span>
                                    <span>确认密码：</span>
                                </div>
                                <div class="col-xs-4">
                                    <input type="text" class="form-control"/>
                                </div>
                                <div class="col-xs-4">
                                    <span class="iconfont icon-iconfontjinggao ico-bigRed"></span>
                                    <span class="font-red">这个是错误的</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-primary" type="button">确定</button>
                        <button class="btn btn-default closing" type="button">取消</button>
                    </div>
                </div>
            </div>
        </div>
        <!--2016-11-01新加-->
        <p class="example"><button class="btn btn-primary" type="button" id="modal-4">设置展示列弹窗</button></p>
        <div class="modal fade" id="win-modal-4">
            <div class="fade in modal-backdrop"></div>
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close closing" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                        <h4>设置隐藏列</h4>
                    </div>
                    <div class="modal-body">
                        <div class="pd10 clear">
                            <div class="clear">
                                <div class="col-xs-4">
                                    <label class="input-checkbox-1 fl mt5">
                                        <input type="checkbox" name="checkbox" />
                                        <span><i></i></span>
                                        <b>订单ID</b>
                                    </label>
                                </div>
                                <div class="col-xs-4">
                                    <label class="input-checkbox-1 fl mt5">
                                        <input type="checkbox" name="checkbox" />
                                        <span><i></i></span>
                                        <b>订单流水号</b>
                                    </label>
                                </div>
                                <div class="col-xs-4">
                                    <label class="input-checkbox-1 fl mt5">
                                        <input type="checkbox" name="checkbox" />
                                        <span><i></i></span>
                                        <b>订单内容</b>
                                    </label>
                                </div>
                                <div class="col-xs-4">
                                    <label class="input-checkbox-1 fl mt5">
                                        <input type="checkbox" name="checkbox" />
                                        <span><i></i></span>
                                        <b>客户账号</b>
                                    </label>
                                </div>
                                <div class="col-xs-4">
                                    <label class="input-checkbox-1 fl mt5">
                                        <input type="checkbox" name="checkbox" />
                                        <span><i></i></span>
                                        <b>金额</b>
                                    </label>
                                </div>
                                <div class="col-xs-4">
                                    <label class="input-checkbox-1 fl mt5">
                                        <input type="checkbox" name="checkbox" />
                                        <span><i></i></span>
                                        <b>日期</b>
                                    </label>
                                </div>
                                <div class="col-xs-4">
                                    <label class="input-checkbox-1 fl mt5">
                                        <input type="checkbox" name="checkbox" />
                                        <span><i></i></span>
                                        <b>操作员所属机构</b>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <label class="input-checkbox-1 fl mt5 ml5">
                            <input type="checkbox" name="checkbox" />
                            <span><i></i></span>
                            <b>全选</b>
                        </label>
                        <button class="btn btn-success" type="button">重置所有</button>
                        <button class="btn btn-primary" type="button">确定</button>
                        <button class="btn btn-default closing" type="button">取消</button>
                    </div>
                </div>
            </div>
        </div>

        <h3>3.4 单选</h3>
        <p class="example">
            <label class="input-radio">
                <input type="radio" name="radio" value="A" readonly checked />
                <span><i></i></span>
                <b>A</b>
            </label>
            <label class="input-radio">
                <input type="radio" name="radio" value="B" readonly />
                <span><i></i></span>
                <b>B</b>
            </label>
            <label class="input-radio">
                <input type="radio" name="radio" value="C" />
                <span><i></i></span>
                <b>C</b>
            </label>
        </p>

        <h3>3.5 多选框</h3>
        <p class="example">
            <label class="input-checkbox">
                <input type="checkbox" name="checkbox" readonly checked />
                <span><i></i></span>
                <b>A</b>
            </label>
            <label class="input-checkbox">
                <input type="checkbox" name="checkbox" readonly />
                <span><i></i></span>
                <b>B</b>
            </label>
            <label class="input-checkbox">
                <input type="checkbox" name="checkbox" />
                <span><i></i></span>
                <b>C</b>
            </label>
        </p>
        <p class="example">
            <label class="input-checkbox-1">
                <input type="checkbox" name="checkbox1" readonly checked />
                <span><i></i></span>
                <b>A</b>
            </label>
            <label class="input-checkbox-1">
                <input type="checkbox" name="checkbox1" readonly />
                <span><i></i></span>
                <b>B</b>
            </label>
            <label class="input-checkbox-1">
                <input type="checkbox" name="checkbox1" />
                <span><i></i></span>
                <b>C</b>
            </label>
        </p>

        <h3>3.6 带图标和状态的按钮</h3>
        <div class="example">
            btn-icon：
            <div class="btn-icon">
                <div class="act">
                    <span class="iconfont icon-yixuan"></span>
                </div>
                <span class="iconfont ico icon-zhuzhuangtu"></span>
                <span class="ml5 txt">普通图表</span>
            </div>
        </div>
        <div class="example">
            btn-icon active：
            <div class="btn-icon active">
                <div class="act">
                    <span class="iconfont icon-yixuan"></span>
                </div>
                <span class="iconfont ico icon-ditu"></span>
                <span class="ml5 txt">地图图表</span>
            </div>
        </div>
        <h3>3.7 下拉框</h3>
        <div class="example form-inline">
            <select class="form-control">
                <option>山西</option>
                <option>s1d4f5sdfsd56f4sdfsd5f5sdf5sd4f</option>
            </select>
        </div>
        <div class="example">
            <select class="form-control">
                <option>山西</option>
                <option>s1d4f5sdfsd56f4sdfsd5f5sdf5sd4f</option>
            </select>
        </div>
        <h3>3.8 消息中心提示框</h3>
        <div>
            <p class="example">
                <span>tips tips-warn：</span>
                <button class="btn btn-success tipsTrigger" type="button">提示框</button>
            </p>
            <div class="tips tips-warn tips-hide">
                提示框信息，提示框信息提示框信息提示框信息提示框信息提示框信息！
            </div>
        </div>
        <div>
            <p class="example">
                <span>tips tips-normal：</span>
                <button class="btn btn-primary tipsTrigger" type="button">提示框2</button>
            </p>
            <div class="tips tips-normal tips-hide">
                提示框信息，提示框信息提示框信息提示框信息提示框信息提示框信息！
            </div>
        </div>
        <div>
            <p class="example">
                <span>tips tips-error：</span>
                <button class="btn btn-primary tipsTrigger" type="button">提示框3</button>
            </p>
            <div class="tips tips-error tips-hide">
                提示框信息，提示框信息提示框信息提示框信息提示框信息提示框信息！
            </div>
        </div>



        <h2>4.字体、颜色控制</h2>
        <h3>4.1 字体大小</h3>
        <p class="example font-very-large">font-very-large</p>
        <p class="example font-large">font-large</p>
        <p class="example font-big">font-big</p>
        <p class="example font-normal">font-normal（文档默认）</p>
        <p class="example font-small">font-small</p>
        <h3>4.2 字体颜色控制</h3>
        <p class="example font-color-333">font-color-333</p>
        <p class="example font-color-666">font-color-666</p>
        <p class="example font-color-999">font-color-999</p>
        <h3>4.3 背景颜色控制</h3>
        <p class="example bg-theme">bg-theme</p>
        <p class="example bg-branch">bg-branch</p>
        <p class="example bg-menu">bg-menu</p>
        <p class="example bg-default">bg-default</p>
        <h3>4.4 图标颜色处理（也可用于字体）</h3>
        <p class="example ico-yellow">ico-yellow</p>
        <p class="example ico-yellow iconfont icon-yifukuan"></p>
        <p class="example ico-gray">ico-gray</p>
        <p class="example ico-gray iconfont icon-yifukuan"></p>
        <p class="example ico-green">ico-green</p>
        <p class="example ico-green iconfont icon-yifukuan"></p>
        <p class="example ico-purple">ico-purple</p>
        <p class="example ico-purple iconfont icon-yifukuan"></p>
        <p class="example ico-red">ico-red</p>
        <p class="example ico-red iconfont icon-yifukuan"></p>

        <h2>5.其他</h2>
        <h3>5.1 逃生舱</h3>
        <!--逃生舱效果代码-->
        <div class="up border br-4 hand active" id="up-div">
            <span class="iconfont icon-fanhuijiantou"></span>
        </div>
        <div class="helps">
        <pre>
            &lt;div class=&quot;up border br-4 hand active&quot; id=&quot;up-div&quot;&gt;
                &lt;span class=&quot;iconfont icon-fanhuijiantou&quot;&gt;&lt;/span&gt;
            &lt;/div&gt;
        </pre>
            <p>逃生舱效果需要js支撑</p>
            <pre>
            //底部逃生舱效果代码
            var $upDiv = $('#up-div');
                $upDiv.click(function(){
                $(document).scrollTop(0);
            });
            $(document).scroll(function() {
                var $d = $(document), $w = $(window), radio;
                radio = $d.scrollTop() / ($d.height() - $w.height());
                if(radio>0){
                    $upDiv.removeClass('unactive').addClass('active');
                }else {
                    $upDiv.removeClass('active').addClass('unactive');
                }
            });
        </pre>
        </div>
        <h3>5.2 收缩按钮</h3>
        <div class="example bg-f4 pd30">
            <button type="button" class="iconfont btn btn-left btn-primary icon-youjiantou"></button>
            <button type="button" class="iconfont btn btn-left btn-primary icon-zuojiantou"></button>
        </div>

        <h3>5.3 debug中心</h3>
        <div class="debug" id="debug">
            <div class="debug-icon hand">
                <span class="debug-icon-num">5</span>
                <span class="iconfont icon-iconfontmark font-very-large"></span>
            </div>
            <div class="debug-leftBar">
                <div class="debug-leftBar-header">
                    <span class="iconfont icon-youjiantou debug-leftBar-right"></span>
                </div>
                <div class="debug-leftBar-body">
                    <div class="debug-leftBar-tips">
                        <div class="debug-leftBar-tips-title">
                            我是标题，默认只有一行sdfsfsfs
                        </div>
                        <div class="debug-leftBar-tips-content">
                            我是debug的内容，可能很长很长我是debug的内容，可能很长很长我是debug的内容，可能很长很长我是debug的内容，可能很长很长我是debug的内容，可能很长很长我是debug的内容，可能很长很长我是debug的内容，可能很长很长我是debug的内容，可能很长很长我是debug的内容，可能很长很长我是debug的内容，可能很长很长
                        </div>
                    </div>
                    <div class="debug-leftBar-tips">
                        <div class="debug-leftBar-tips-title">
                            我是标题，默认只有一行sdfsfsfs
                        </div>
                        <div class="debug-leftBar-tips-content">
                            我是debug的内容，可能很长很长我是debug的内容，可能很长很长我是debug的内容，可能很长很长我是debug的内容，可能很长很长我是debug的内容，可能很长很长我是debug的内容，可能很长很长我是debug的内容，可能很长很长我是debug的内容，可能很长很长我是debug的内容，可能很长很长我是debug的内容，可能很长很长
                        </div>
                    </div>
                    <div class="debug-leftBar-tips">
                        <div class="debug-leftBar-tips-title">
                            我是标题，默认只有一行sdfsfsfs
                        </div>
                        <div class="debug-leftBar-tips-content">
                            我是debug的内容，可能很长很长我是debug的内容，可能很长很长我是debug的内容，可能很长很长我是debug的内容，可能很长很长我是debug的内容，可能很长很长我是debug的内容，可能很长很长我是debug的内容，可能很长很长我是debug的内容，可能很长很长我是debug的内容，可能很长很长我是debug的内容，可能很长很长
                        </div>
                    </div>
                    <div class="debug-leftBar-tips">
                        <div class="debug-leftBar-tips-title">
                            我是标题，默认只有一行sdfsfsfs
                        </div>
                        <div class="debug-leftBar-tips-content">
                            我是debug的内容，可能很长很长我是debug的内容，可能很长很长我是debug的内容，可能很长很长我是debug的内容，可能很长很长我是debug的内容，可能很长很长我是debug的内容，可能很长很长我是debug的内容，可能很长很长我是debug的内容，可能很长很长我是debug的内容，可能很长很长我是debug的内容，可能很长很长
                        </div>
                    </div>
                    <div class="debug-leftBar-tips">
                        <div class="debug-leftBar-tips-title">
                            我是标题，默认只有一行sdfsfsfs
                        </div>
                        <div class="debug-leftBar-tips-content">
                            我是debug的内容，可能很长很长我是debug的内容，可能很长很长我是debug的内容，可能很长很长我是debug的内容，可能很长很长我是debug的内容，可能很长很长我是debug的内容，可能很长很长我是debug的内容，可能很长很长我是debug的内容，可能很长很长我是debug的内容，可能很长很长我是debug的内容，可能很长很长
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <h3>5.4 分页</h3>
        <div class="example pd30">
            <div class="btn-group">
                <span>共63条记录，12页数据</span>
                <label class="select ml5 input-short">
                    <select>
                        <option>10</option>
                        <option>20</option>
                        <option>50</option>
                        <option>100</option>
                        <option>200</option>
                    </select>
                    <i></i>
                </label>
                <ul class="btn-group-list">
                    <li class="iconfont font-small icon-zuojiantou"></li>
                    <li class="active">1</li>
                    <li>2</li>
                    <li>3</li>
                    <li>4</li>
                    <li>...</li>
                    <li>8</li>
                    <li>9</li>
                    <li class="iconfont font-small icon-youjiantou"></li>
                </ul>
                <input type="text" class="input-text input-short"/>
                <button class="btn btn-primary">跳转</button>
            </div>
        </div>

        <h3>5.5 图标</h3>
        <div class="helps">
            <p class="pl30">使用方法：</p>
            <pre>
            &lt;i class="iconfont icon-xxxx"&gt;&lt;/i&gt;
        </pre>
        </div>
        <div>
            <p>图标列表</p>

            <ul class="icon_lists clear">

                <li>
                    <i class="icon iconfont icon-guanbi"></i>
                    <div class="name">关闭</div>
                    <div class="fontclass">.icon-guanbi</div>
                </li>

                <li>
                    <i class="icon iconfont icon-iconfontjinggao"></i>
                    <div class="name">告警-</div>
                    <div class="fontclass">.icon-iconfontjinggao</div>
                </li>

                <li>
                    <i class="icon iconfont icon-set"></i>
                    <div class="name">设置</div>
                    <div class="fontclass">.icon-set</div>
                </li>

                <li>
                    <i class="icon iconfont icon-iconfontmark"></i>
                    <div class="name">消息</div>
                    <div class="fontclass">.icon-iconfontmark</div>
                </li>

                <li>
                    <i class="icon iconfont icon-zuixiaohua"></i>
                    <div class="name">最小化</div>
                    <div class="fontclass">.icon-zuixiaohua</div>
                </li>

                <li>
                    <i class="icon iconfont icon-zuidahua"></i>
                    <div class="name">最大化</div>
                    <div class="fontclass">.icon-zuidahua</div>
                </li>

                <li>
                    <i class="icon iconfont icon-zuidahua2"></i>
                    <div class="name">最大化2</div>
                    <div class="fontclass">.icon-zuidahua2</div>
                </li>

                <li>
                    <i class="icon iconfont icon-dingdanguanli"></i>
                    <div class="name">订单管理</div>
                    <div class="fontclass">.icon-dingdanguanli</div>
                </li>

                <li>
                    <i class="icon iconfont icon-sousuo"></i>
                    <div class="name">搜索</div>
                    <div class="fontclass">.icon-sousuo</div>
                </li>

                <li>
                    <i class="icon iconfont icon-fukuandingdanguanli"></i>
                    <div class="name">付款订单管理</div>
                    <div class="fontclass">.icon-fukuandingdanguanli</div>
                </li>

                <li>
                    <i class="icon iconfont icon-zuojiantou"></i>
                    <div class="name">左箭头</div>
                    <div class="fontclass">.icon-zuojiantou</div>
                </li>

                <li>
                    <i class="icon iconfont icon-dingdanguanli1"></i>
                    <div class="name">订单管理</div>
                    <div class="fontclass">.icon-dingdanguanli1</div>
                </li>

                <li>
                    <i class="icon iconfont icon-mima"></i>
                    <div class="name">密码</div>
                    <div class="fontclass">.icon-mima</div>
                </li>

                <li>
                    <i class="icon iconfont icon-yifahuo"></i>
                    <div class="name">已发货</div>
                    <div class="fontclass">.icon-yifahuo</div>
                </li>

                <li>
                    <i class="icon iconfont icon-yifukuan"></i>
                    <div class="name">已付款</div>
                    <div class="fontclass">.icon-yifukuan</div>
                </li>

                <li>
                    <i class="icon iconfont icon-fanhuijiantou"></i>
                    <div class="name">返回箭头</div>
                    <div class="fontclass">.icon-fanhuijiantou</div>
                </li>

                <li>
                    <i class="icon iconfont icon-guanbi1"></i>
                    <div class="name">关闭</div>
                    <div class="fontclass">.icon-guanbi1</div>
                </li>

                <li>
                    <i class="icon iconfont icon-xiajiantou"></i>
                    <div class="name">下箭头</div>
                    <div class="fontclass">.icon-xiajiantou</div>
                </li>

                <li>
                    <i class="icon iconfont icon-wenjianjia"></i>
                    <div class="name">文件夹</div>
                    <div class="fontclass">.icon-wenjianjia</div>
                </li>

                <li>
                    <i class="icon iconfont icon-zhuzhuangtu"></i>
                    <div class="name">柱状图</div>
                    <div class="fontclass">.icon-zhuzhuangtu</div>
                </li>

                <li>
                    <i class="icon iconfont icon-xiajiantou1"></i>
                    <div class="name">下箭头</div>
                    <div class="fontclass">.icon-xiajiantou1</div>
                </li>

                <li>
                    <i class="icon iconfont icon-shangjiantou"></i>
                    <div class="name">上箭头</div>
                    <div class="fontclass">.icon-shangjiantou</div>
                </li>

                <li>
                    <i class="icon iconfont icon-kucunguanli"></i>
                    <div class="name">库存管理</div>
                    <div class="fontclass">.icon-kucunguanli</div>
                </li>

                <li>
                    <i class="icon iconfont icon-zuojiantou1"></i>
                    <div class="name">左箭头</div>
                    <div class="fontclass">.icon-zuojiantou1</div>
                </li>

                <li>
                    <i class="icon iconfont icon-ditu"></i>
                    <div class="name">地图</div>
                    <div class="fontclass">.icon-ditu</div>
                </li>

                <li>
                    <i class="icon iconfont icon-sousuo1"></i>
                    <div class="name">搜索</div>
                    <div class="fontclass">.icon-sousuo1</div>
                </li>

                <li>
                    <i class="icon iconfont icon-yixuan"></i>
                    <div class="name">已选</div>
                    <div class="fontclass">.icon-yixuan</div>
                </li>

                <li>
                    <i class="icon iconfont icon-shezhi"></i>
                    <div class="name">设置</div>
                    <div class="fontclass">.icon-shezhi</div>
                </li>

                <li>
                    <i class="icon iconfont icon-yijiesuan"></i>
                    <div class="name">已结算</div>
                    <div class="fontclass">.icon-yijiesuan</div>
                </li>

                <li>
                    <i class="icon iconfont icon-jiesuandingdanguanli"></i>
                    <div class="name">结算订单管理</div>
                    <div class="fontclass">.icon-jiesuandingdanguanli</div>
                </li>

                <li>
                    <i class="icon iconfont icon-youjiantou"></i>
                    <div class="name">右箭头</div>
                    <div class="fontclass">.icon-youjiantou</div>
                </li>

                <li>
                    <i class="icon iconfont icon-daiguihuan-dingdanguanli"></i>
                    <div class="name">待归还 - 订单管理</div>
                    <div class="fontclass">.icon-daiguihuan-dingdanguanli</div>
                </li>

                <li>
                    <i class="icon iconfont icon-shouhuoguanli-dengdai"></i>
                    <div class="name">收货管理-等待</div>
                    <div class="fontclass">.icon-shouhuoguanli-dengdai</div>
                </li>

                <li>
                    <i class="icon iconfont icon-yonghuming"></i>
                    <div class="name">用户名</div>
                    <div class="fontclass">.icon-yonghuming</div>
                </li>

                <li>
                    <i class="icon iconfont icon-dingdanguanli-dengdaichuli"></i>
                    <div class="name">订单管理-等待处理</div>
                    <div class="fontclass">.icon-dingdanguanli-dengdaichuli</div>
                </li>

                <li>
                    <i class="icon iconfont icon-youjiantou1"></i>
                    <div class="name">右箭头</div>
                    <div class="fontclass">.icon-youjiantou1</div>
                </li>

                <li>
                    <i class="icon iconfont icon-dingdanchaxun"></i>
                    <div class="name">订单查询</div>
                    <div class="fontclass">.icon-dingdanchaxun</div>
                </li>

                <li>
                    <i class="icon iconfont icon-dingdanguanli1"></i>
                    <div class="name">订单管理-</div>
                    <div class="fontclass">.icon-dingdanguanli1</div>
                </li>

                <li>
                    <i class="icon iconfont icon-xinjiandailiren"></i>
                    <div class="name">新建代理人</div>
                    <div class="fontclass">.icon-xinjiandailiren</div>
                </li>

                <li>
                    <i class="icon iconfont icon-xiaoxitixing"></i>
                    <div class="name">消息提醒</div>
                    <div class="fontclass">.icon-xiaoxitixing</div>
                </li>

                <li>
                    <i class="icon iconfont icon-dingdanguanli1"></i>
                    <div class="name">订单管理</div>
                    <div class="fontclass">.icon-dingdanguanli1</div>
                </li>

                <li>
                    <i class="icon iconfont icon-daifukuan"></i>
                    <div class="name">代付款</div>
                    <div class="fontclass">.icon-daifukuan</div>
                </li>

                <li>
                    <i class="icon iconfont icon-daifanhuan"></i>
                    <div class="name">待返还</div>
                    <div class="fontclass">.icon-daifanhuan</div>
                </li>

                <li>
                    <i class="icon iconfont icon-daijiesuan"></i>
                    <div class="name">待结算</div>
                    <div class="fontclass">.icon-daijiesuan</div>
                </li>

                <li>
                    <i class="icon iconfont icon-yifahuo1"></i>
                    <div class="name">已发货</div>
                    <div class="fontclass">.icon-yifahuo1</div>
                </li>

                <li>
                    <i class="icon iconfont icon-taocanguanli"></i>
                    <div class="name">套餐管理</div>
                    <div class="fontclass">.icon-taocanguanli</div>
                </li>

                <li>
                    <i class="icon iconfont icon-taocanyewu"></i>
                    <div class="name">套餐业务-</div>
                    <div class="fontclass">.icon-taocanyewu</div>
                </li>

                <li>
                    <i class="icon iconfont icon-zhanghaoguanli"></i>
                    <div class="name">账号管理</div>
                    <div class="fontclass">.icon-zhanghaoguanli</div>
                </li>

                <li>
                    <i class="icon iconfont icon-guanbixiao"></i>
                    <div class="name">关闭-小</div>
                    <div class="fontclass">.icon-guanbixiao</div>
                </li>

                <li>
                    <i class="icon iconfont icon-tijiaochenggong"></i>
                    <div class="name">提交成功</div>
                    <div class="fontclass">.icon-tijiaochenggong</div>
                </li>

                <li>
                    <i class="icon iconfont icon-xialacaidanxiaosanjiao"></i>
                    <div class="name">下拉菜单小三角</div>
                    <div class="fontclass">.icon-xialacaidanxiaosanjiao</div>
                </li>

                <li>
                    <i class="icon iconfont icon-gengduo"></i>
                    <div class="name">更多</div>
                    <div class="fontclass">.icon-gengduo</div>
                </li>

                <li>
                    <i class="icon iconfont icon-xialacaidanxiaosanjiao1"></i>
                    <div class="name">下拉菜单小三角1</div>
                    <div class="fontclass">.icon-xialacaidanxiaosanjiao1</div>
                </li>

            </ul>
        </div>
    </div>



    <!--<img src="./assets/images/loading.gif" id="loadings" style="display: none;"/>-->
</template>
<script>
    import './assets/css/bundle.css'
    import $ from '../libs/jquery/jquery.2.1.4.min'

    $(function() {
        $('#modal-samll').click(function () {
            $('#win-modal-samll').fadeIn().addClass('in');
        });
        $('#modal-normal').click(function () {
            $('#win-modal-normal').fadeIn().addClass('in');
        });
        $('#modal-large').click(function () {
            $('#win-modal-large').fadeIn().addClass('in');
        });
        $('#modal-1').click(function () {
            $('#win-modal-1').fadeIn().addClass('in');
        });
        $('#modal-2').click(function () {
            $('#win-modal-2').fadeIn().addClass('in');
        });
        $('#modal-3').click(function () {
            $('#win-modal-3').fadeIn().addClass('in');
        });
        $('#modal-4').click(function () {
            $('#win-modal-4').fadeIn().addClass('in');
        });
        $('#modal-pic').click(function () {
            $('#win-modal-pic').fadeIn().addClass('in');
        });
        $('.closing').click(function () {
            $(this).parents('.modal').fadeOut().removeClass('in');
        });
        $('.tipsTrigger').click(function () {
            var $this = $(this);
            $this.parent().siblings('div').removeClass('tips-hide');
            setTimeout(function () {
                $this.parent().siblings('div').addClass('tips-hide');
            }, 3000);
        });
        $('#debug').find('.debug-icon').addClass('debug-icon-show');
        $('#debug .debug-icon').click(function () {
            $(this).siblings('.debug-leftBar').addClass('debug-leftBar-show');
        });
        $('#debug .debug-leftBar-right').click(function () {
            $(this).parents('.debug-leftBar').removeClass('debug-leftBar-show');
        });

        //底部逃生舱效果代码
        var $upDiv = $('#up-div');
        $upDiv.click(function () {
            $(document).scrollTop(0);
        });
        $(document).scroll(function () {
            var $d = $(document), $w = $(window), radio;
            radio = $d.scrollTop() / ($d.height() - $w.height());
            if (radio > 0) {
                $upDiv.removeClass('unactive').addClass('active');
            } else {
                $upDiv.removeClass('active').addClass('unactive');
            }
        });
        /*锁屏控件*/
        var loadTips = function () {
            var $div = $('#loadTips');
            var that = {};
            that.show = function () {
                if ($div.length === 0) {
                    $('body').append('<div id="loadTips" class="loadTips" style="display: none;"><img src="./dist/images/loading.gif" /></div>');
                    $div = $('#loadTips').fadeIn().find('img').attr('src', $('#loadings').attr('src')).end();
                } else {
                    $div.fadeIn();
                }
            };
            that.hide = function () {
                $div.fadeOut();
            };
            return that;
        };
        /*锁屏控件使用示例*/
        //显示锁屏控件
        loadTips().show();
        setTimeout(function () {
            //隐藏锁屏控件
            loadTips().hide();
        }, 300);
    });
</script>
<style>
    .br-round-div{
        width: 80px;
        height: 80px;
    }
    h2{
        margin-top: 20px;
    }
    h3{
        text-indent: 1rem;
    }
    .example{
        margin-top: 1rem;
        margin-left: 2rem;
    }
    .bdd .clear div{
        border: 1px solid;
    }
    .roundfix{
        width: 80px;
        height: 80px;
        text-align: center;
        color: #fff;;
        line-height: 80px;
    }
    .icon_lists li {
        float: left;
        width: 150px;
        height: 180px;
        text-align: center;
    }
    .icon_lists .icon{
        font-size: 42px;
        line-height: 100px;
        margin: 10px 0;
        color: #333;
        -webkit-transition: font-size 0.25s ease-out 0s;
        -moz-transition: font-size 0.25s ease-out 0s;
        transition: font-size 0.25s ease-out 0s;
    }
</style>