'use strict';

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
config.entry.unshift('webpack-dev-server/client?http://localhost:3006', "webpack/hot/dev-server");
config.plugins.push(new webpack.HotModuleReplacementPlugin());

var proxy = [
    {
        path: "/oss/",
        target: "http://19.1.2.10:8888",
        host: "localhost"
    },
    {
        path: "/bss/",
        target: "http://19.1.2.10:8888",
        host: "localhost"
    }
];
//启动服务
var app = new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot:true,
    historyApiFallback: true,
    proxy:proxy
});
app.listen(3006);