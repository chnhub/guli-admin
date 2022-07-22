# 1.功能模块

## 1.1 VUE 项目引入 tinymce

```
VUE项目引入tinymce
1、tinymce安装以及下载
如果你用是vue2.0版本的话不要安装这个，vue2中不能使用@tinymce/tinymce-vue为4以上版本；
npm install @tinymce/tinymce-vue -save
npm install tinymce -save
```

# 2.问题记录

## 2.1 大坑 devServer 代理的时候，接口路径代理对的，但一直超时。一定要关掉 mock

```
 devServer: {
    port: port,
    // open: true,
    overlay: {
      warnings: true,
      errors: true
    },
    // before: require('./mock/mock-server.js'),
    ...proxyConfig,
  },
proxy: {
        "/api": {
            target: "http://192.168.1.107:8080", //
            // target: "http://localhost:8888", //
            // ws: true,
            changeOrigin: true,
            pathRewrite: {
                "^/api": "/api",
            },
            hot: true,
            logLevel:'debug'
        },
```

# 3.其他

## 3.1 git“放弃所有更改”之后恢复文件，尝试多个软件

```
vscode中点击git“放弃所有更改”之后恢复文件，尝试多个软件
手贱点了viscode中git“放弃所有更改”
软件一：360文件恢复（检索不到自己删掉的那个盘，其他的倒是正常，所以没法用）
软件二：Recuva文件恢复（ccleaner下面的一个软件）好用
软件三：Windows File Recovery
软件四： File Recovery之类的
软件五： Disk Drill（最终使用软件）

原文链接：https://blog.csdn.net/dangga/article/details/120828531
```
