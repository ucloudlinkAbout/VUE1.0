/**
 * Created by chenwenxiao on 2016/12/14.
 */
var server;
var loginCustomerId,
    accessToken;
server = require('http');
const setLoginCustomerId = function(d){
    loginCustomerId = d;
};
const setAccessToken = function(d){
    accessToken = d;
};
const getLoginCustomerId = function(){
    return loginCustomerId;
};
const getAccessToken = function(){
    return accessToken;
};
const data = {};

const requestAuth = function(data) {
    data.loginCustomerId = loginCustomerId || '123123';
    data.partnerCode = 'UKWEB';
    data.streamNo = 'web_bss' + new Date().getTime() + parseInt(Math.random()*100000);
    return data;
};

//http 远程调用接口
const httpProise = function(options, op) {
    try {
        options.hostname = '120.25.97.219';
        options.port = '3342';
    } catch (e) {
        console.log('接口url有问题！');
    }
    return new Promise(function (resolve, reject) {
        var userString,
            cookie = '',
            accessToken = options.cookies;
        if (accessToken) {
            cookie = 'access_token=' + accessToken + '; loginCustomerId=' + loginCustomerId;
        }
        if (options.auth) {
            options.data = requestAuth(options.data);
        }
        delete options.auth;
        if (options.json) {
            userString = JSON.stringify(options.data);
            options.headers = {
                'Content-Type': 'application/json',
                'Cookie': cookie
            };
        } else {
            var str = '?';
            for (var d in options.data) {
                str += d + '=' + options.data[d] + '&';
            }
            str = str.substring(0, str.length - 1);
            options.path += str;
            options.headers = {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Cookie': cookie
            };
        }
        var time = new Date().getTime();
        var req = server.request(options, function (res) {
            let body = '';
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                body += chunk;
            });
            res.on('end', function () {
                time = (new Date().getTime() - time);
                resolve(body);
                console.log('调用了：' + options.path.split('?')[0] + '接口，' + '耗时：' + time + 'ms');
            });
            res.on('error', function (err) {
                reject(err);
            });
        }).on('error', function (err) {
            reject(err);
        });
        if (options.json) {
            req.write(userString);
        }
        req.end();
    });
};

//封装的post方法
const post = function(options) {
    options.method = 'post';
    return httpProise(options);
};

//封装的get方法
const get = function(options) {
    options.method = 'get';
    return httpProise(options);
};

//通用请求方法
const request = function(options,op){
    return httpProise(options, op);
};

exports.post = post;
exports.get = get;
exports.requestAuth = requestAuth;
exports.setLoginCustomerId = setLoginCustomerId;
exports.setAccessToken = setAccessToken;
exports.getLoginCustomerId = getLoginCustomerId;
exports.getAccessToken = getAccessToken;
exports.request = request;
exports.data = data;
