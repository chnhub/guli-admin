// export default {
module.exports = {
    proxy: {
        // 配置多个代理(配置一个 proxy: 'http://localhost:4000' // 本地模拟数据服务器)
        // "^/v1": {
        //     target: "https://monitor-api.xxx", //
        //     ws: true,
        //     changeOrigin: true,
        // },
        // "^/(d|api|login|public)/": {
        //     target: "https://monitor-third-pard-api.xxx", //431
        //     ws: true,
        //     changeOrigin: true
        // },
        "^/api": {
            target: "http://localhost:8080/", //
            ws: true,
            changeOrigin: true,
            pathRewrite: {
                "^/api": "/",
            },

        },
    }
}
// }
