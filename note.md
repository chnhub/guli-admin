# 1.功能模块
# 2.问题记录
## 2.1 大坑devServer代理的时候，接口路径代理对的，但一直超时。一定要关掉mock
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