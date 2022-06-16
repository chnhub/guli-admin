import { defineConfig } from "umi";
import { routes } from "./routes";
import px2viewport from "postcss-px2viewport";
export default defineConfig({
  nodeModulesTransform: {
    type: "none",
  },
  routes,
  title: "your app name",
  base: "/",
  mfsu: {},
  dynamicImport: {
    loading: "@/components/PageLoading/index",
  },
  proxy: {
    "/mhapi": {
      //新的省接口
      target: "https://dgov-integrate-all.zj.gov.cn/",
      changeOrigin: true,
    },
    "/api": {
      // target: "http://172.18.43.225:9091/",
      target: "http://172.18.94.196:9091/",
      changeOrigin: true,
      pathRewrite: {
        "^/api": "",
      },
    },
  },
  // scripts: ["https://cdn.jsdelivr.net/npm/js-base64@3.6.0/base64.min.js"],
  /**
   * 覆盖antd样式变量
   * 并且此处配置的主题色变量可全局使用，不用在各文件单独引入
   */
  theme: {
    "@primary-color": "#1890ff",
    "@disabled-color": "rgba(0, 0, 0, .25)",
    "@text-color-secondary": "rgba(0, 0, 0, 0.45)",
    "@heading-color": "rgba(0, 0, 0, 0.85)",
    "@font-size-base": "14px",
    "@border-radius-base": "2px",
    "@card-shadow": "0px 2px 4px 0px rgba(0,0,0,0.05);",
    "@shadow-2":
      "0px 3px 6px -4px rgba(0,0,0,0.12), 0px 1px 4px 0px rgba(0,0,0,0.08), 0px 4px 20px 8px rgba(0,0,0,0.05); ",
    "@pop-shadow":
      "0px 0px 4px -4px rgba(0,0,0,0.12), 0px 1px 2px 0px rgba(0,0,0,0.08), 0px 0px 7px 0px rgba(0,0,0,0.05)",
    "@menu-dark-item-active-bg": "#fff",
    // 选中的不包含子菜单的根菜单颜色
    "@menu-dark-selected-item-icon-color": "@primary-color",
    "@menu-dark-selected-item-text-color": "@primary-color",
    "@menu-dark-bg": "transparent",
    // 选中的当前菜单颜色，包括父级子菜单
    // '@menu-dark-highlight-color': '#fff',
    "@menu-dark-inline-submenu-bg": "transparent",
    // antd 代码bug，此变量复制给了background，所以不生效
    // '@menu-dark-arrow-color': 'red',
    "@menu-item-active-border-width": "0",
    "@ant-prefix": "auth",
  },
  // extraPostCSSPlugins: [px2viewport({ viewportWidth: 2040 })],
});
