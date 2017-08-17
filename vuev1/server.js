'use strict';

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
config.entry.unshift('webpack-dev-server/client?http://localhost:3006', "webpack/hot/dev-server");
config.plugins.push(new webpack.HotModuleReplacementPlugin());

var proxy = [
    {
        path: "/oss/",
        target: "http://10.1.2.10:8888",
        host: "localhost"
    },
    {
        path: "/bss/",
        target: "http://10.1.2.10:8888",
        host: "localhost"
    },
    {
        path: "/oms/",
        target: "http://119.145.40.138:10146",
        host: "localhost"
    },
    // {
    //     path: "/api/",
    //     target: "http://120.25.97.219:3342",
    //     host: "localhost"
    // },
    {
        path: "/api/",
        target: "http://120.25.97.219:3342",
        host: "localhost"
    },
    {
        path: "/attachment/",
        target: "http://localhost:80",
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