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
