/**
 * Created by chenwenxiao on 2017/1/17.
 */
var fs = require('fs');
var path = require('path');
var request = require('request');
var util = {};
util.getAllFiles = function (dir, callback) {
    var filesArr = [];
    dir = /$/.test(dir) ? dir : dir + '/';
    (function dir(dirpath, fn) {
        var files = fs.readdirSync(dirpath);
        util.async(files, function (item, next) {
            var info = fs.statSync(dirpath + item);
            if (info.isDirectory()) {
                dir(dirpath + item + '/', function () {
                    next();
                });
            } else {
                var file = fs.readFileSync(dirpath + item, 'UTF8');
                try{
                    var author = file.split('\n')[1].split(' ')[4];
                }catch (e){
                    console.log(file);
                }
                filesArr.push({
                    path: dirpath + item,
                    mtime: info.mtime,
                    ctime: info.ctime,
                    author:author
                });
                callback && callback(dirpath + item);
                next();
            }
        }, function (err) {
            !err && fn && fn();
        });
    })(dir);
    return filesArr;
};
util.async = function (arr, callback1, callback2) {
    if (Object.prototype.toString.call(arr) !== '[object Array]') {
        return callback2(new Error('第一个参数必须为数组'));
    }
    if (arr.length === 0)
        return callback2(null);
    (function walk(i) {
        if (i >= arr.length) {
            return callback2(null);
        }
        callback1(arr[i], function () {
            walk(++i);
        });
    })(0);
};
util.getRelatePath = function (relatePath, dirPath) {
    return path.resolve(dirPath || __dirname, relatePath);
};

exports.scan = function() {
    var filePath = util.getRelatePath('../../src/components/', __dirname) + '\\';
    var nboj = {};
    var dataBase = {dataList:{}};
    dataBase.dataList[dataBase.dataList.size + 1] = {
        size: 0,
        createTime: new Date().getTime()
    };
    var pathArr = util.getAllFiles(filePath, function (currentPath) {
    }), pathArrFilter = [];
    for (let k = 0; k < pathArr.length; k++) {
        let ppp = pathArr[k].path;
        if (ppp.substring(ppp.length - 3, ppp.length) === 'vue') {
            pathArrFilter.push(pathArr[k]);
        }
    }
    pathArr = pathArrFilter;
    var current = 0;
    for (var k = 0; k < pathArr.length; k++) {
        let ppp = util.getRelatePath(pathArr[k].path, __dirname);
        let data = fs.readFileSync(ppp, 'UTF8');
        let dataArr = data.split('\r'),
            author, createTime, version, desc, props = [], use = [], useBegin, propsBegin;
        for (let i = 0; i < dataArr.length; i++) {
            //扫描其他信息
            if (dataArr[i].indexOf('@负责人') !== -1) {
                author = dataArr[i].split(':')[1];
            } else if (dataArr[i].indexOf('@创建时间') !== -1) {
                createTime = dataArr[i].split(':')[1];
            } else if (dataArr[i].indexOf('@版本') !== -1) {
                version = dataArr[i].split(':')[1];
            } else if (dataArr[i].indexOf('@描述') !== -1) {
                desc = dataArr[i].split(':')[1];
            }
            //扫描使用方法
            if (dataArr[i].indexOf('@使用方法') !== -1) {
                useBegin = true;
            }
            if (dataArr[i].indexOf('@参数说明') !== -1 && useBegin) {
                useBegin = false;
            }
            if (useBegin) {
                use.push(dataArr[i]);
            }
            //扫描参数说明
            if (dataArr[i].indexOf('@参数说明') !== -1) {
                propsBegin = true;
            }
            if (dataArr[i].indexOf('-->') !== -1 && propsBegin) {
                propsBegin = false;
            }
            if (propsBegin) {
                props.push(dataArr[i]);
            }
        }
        use.shift();
        props.shift();

        ppp = ppp.replace(/\\/g, '/');
        ppp = ppp.substring(ppp.indexOf('src') + 3, ppp.length);
        let obj = {
            author: author,
            createTime: createTime,
            version: version,
            desc: desc,
            use: use.join('\r'),
            props: props.join('\r')
        };
        dataBase.dataList[dataBase.dataList.size + 1][ppp] = obj;
        nboj[ppp] = obj;
        dataBase.dataList[dataBase.dataList.size + 1].size++;
        current++;
    }

    let timer = setInterval(function () {
        if (current === pathArr.length) {
            var reqs = require('./requestHelper');
            let opt = {
                path: '/api/saveScan',
                data: {
                    data: nboj
                },
                json: true,
                method: 'post'
            };
            reqs.request(opt, {}).then(function (d) {
                console.log(d);
            });
            clearInterval(timer);
        }
    }, 5000);
};

exports.scanApi = function () {
    var filePath = util.getRelatePath('../../src/config.js', __dirname) + '\\';
    fs.readFile(filePath, 'UTF8', function (err, data) {
        var dataArr = data.split('\r'), dataArrNew = [], begin = false;
        for (var i = 0; i < dataArr.length; i++) {
            if (dataArr[i].indexOf('//@scanStart') !== -1) {
                begin = true;
            }
            if (dataArr[i].indexOf('//@scanEnd') !== -1) {
                begin = false;
            }
            if (begin) {
                dataArrNew.push(dataArr[i]);
            }
        }
        dataArrNew = dataArrNew.join('\r');
        var SystemGlobe = {};
        eval(dataArrNew);
        console.log(SystemGlobe.url);
    });
};
