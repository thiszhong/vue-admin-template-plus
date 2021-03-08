# vue-admin-template-plus

> 这是一个极简的 vue admin 管理后台。它只包含了 Vue 3.0 & Element Plus & axios & iconfont & permission control & lint，这些搭建后台必要的东西。

[线上地址](https://thiszhong.github.io/vue-admin-template-plus)

[国内访问](https://thiszhong.gitee.io/vue-admin-template-plus)

目前版本基于 `vue-cli + Vue 3.0 + Element Plus ` 进行构建，参考 [vue-admin-template](https://github.com/PanJiaChen/vue-admin-template) 做了简单的升级适配 `Vue 3.0` 和 `Element Plus`，所以绝大部分还是 [vue-element-admin](https://github.com/PanJiaChen/vue-element-admin) 的味道。

## 相关文档

[Element Plus](https://element-plus.gitee.io/#/zh-CN/component/installation) 

[Vue 3.0](https://v3.cn.vuejs.org/)

## Build Setup

```bash
# 克隆项目
git clone https://github.com/thiszhong/vue-admin-template-plus.git
# 进入项目目录
cd vue-admin-template-plus
# 安装依赖
npm install
# 建议不要直接使用 cnpm 安装以来，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org
# 启动服务
npm run dev
```

浏览器访问 [http://localhost:9528](http://localhost:9528)

## 发布

```bash
# 构建测试环境
npm run build:stage
# 构建生产环境
npm run build:prod
```

## 其它

```bash
# 预览发布环境效果
npm run preview
# 预览发布环境效果 + 静态资源分析
npm run preview -- --report
# 代码格式检查
npm run lint
# 代码格式检查并自动修复
npm run lint -- --fix
```

更多信息请参考 [使用文档](https://panjiachen.github.io/vue-element-admin-site/zh/)

## Browsers support

Modern browsers and Internet Explorer 10+.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| --------- | --------- | --------- | --------- |
| IE10, IE11, Edge| last 2 versions| last 2 versions| last 2 versions

## License

[MIT](https://github.com/thiszhong/vue-admin-template-plus/blob/master/LICENSE) license.
