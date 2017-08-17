#基于vue.js编写的基础框架，2017-02-20改进版本

###安装
通过`npm`安装本地服务第三方依赖模块(需要已安装[Node.js](https://nodejs.org/))

使用：
npm install                 安装依赖的库文件
npm run start               启动项目
npm run dist                开发环境打包项目
npm run build               生产环境打包项目
npm run lanBuild            多语言编译
npm run check               启动代码监控，样式库动态监控
npm run plugin              压缩jquery相关插件和配置项
npm run scanComponents      扫描组件库
npm run scanApi             扫描API库
npm run stop                停止项目
npm run reboot              重启项目
npm run server              开启服务器


###目录结构
<pre>
.
├── README.md           
├── dist                                    // 项目构建目录（发布目录）
├── index.html                              // 项目入口文件
├── package.json                            // 项目配置文件
├── i18n       		                       // 语言包集中管理路径
├── test                                    // 自动化测试用例目录
├── doc                                     // 文档库目录
├── src                                     // 开发代码目录
│   ├── components                       // 各种组件
│       ├── assets                       // 组件开发需要的资源文件
│   ├── views                            // 页面views(主要业务开发请在这里面进行)
│       ├── assets                       // 业务开发需要的资源文件
│           ├── css                      // 业务相关样式输出文件夹
│               ├── bundle.css           // 样式库输出文件
│           ├── images                   // 业务相关图片文件夹
│           ├── less                     // 业务开发需要的资源文件
│               ├── config.less          // 业务相关样式库配置文件
│               ├── variables.less       // 样式库配置文件
│           ├── libs                     // 业务开发需要的第三方类库等资源文件
│       ├── biz                          // 业务逻辑js存放，将业务逻辑和vue文件剥离出来
│       ├── page                         // 业务相关页面
│       ├── serviceComInstance           // 业务组件存放位置
│       ├── 404.vue                      // 通用404页面
│       ├── components.vue               // 组件库页面
│       ├── index.vue                    // 首页
│       ├── test.vue                     // 测试页面
│       ├── UI-lib.vue                   // UI库页面
│   ├── libs                             // 核心类库代码
│   ├── config.js                        // 配置项
│   ├── config-url.js                    // URL配置项
│   ├── routers.js                       // vue路由
│   └── main.js                          // Webpack 预编译入口
├── server.js                               // webpack-dev-server服务配置
└── webpack.config.js                       // Webpack 配置文件
└── gulpfile.js  	                       // gulp 配置文件
</pre>

