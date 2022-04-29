/**
 * iconify 图标加载中心
 * 为了使用动态图标组件，又不想全量引入（按需加载）
 * 使用步骤：
 *   1. 在 https://icon-sets.iconify.design/ 挑选或搜索想要的图标
 *   2. 选中想要的图标，在下方 Selected icon 处看图标名等信息
 *      比如选中了 ep:add-location，即 Element Plus（在iconify中使用缩写ep） 的 AddLocation 图标
 *   3. 在本文件中导出该图标文件：
 *      export * as EpAddLocation from '~icons/ep/add-location'
 *      导出名称为图标库(ep)+图标名(add-location)的大驼峰，引入路径为 ~icons/图标库/图标名
 *   4. 复制当前iconify页面url为该引入图标添加注释
 * 相关文档：
 *   https://element-plus.gitee.io/zh-CN/component/icon.html
 *   https://github.com/antfu/unplugin-icons
 * 相关配置：vue.config.js - plugins - Icons
 */

// https://icon-sets.iconify.design/ant-design/dashboard-outlined/
export * as AntDesignDashboardOutlined from '~icons/ant-design/dashboard-outlined'

// https://icon-sets.iconify.design/ant-design/menu-fold-outlined/
export * as AntDesignMenuFoldOutlined from '~icons/ant-design/menu-fold-outlined'

// https://icon-sets.iconify.design/ant-design/menu-unfold-outlined/
export * as AntDesignMenuUnfoldOutlined from '~icons/ant-design/menu-unfold-outlined'

// https://icon-sets.iconify.design/ant-design/bars-outlined/
export * as AntDesignBarsOutlined from '~icons/ant-design/bars-outlined'
