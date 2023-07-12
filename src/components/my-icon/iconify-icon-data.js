/**
 * iconify 图标加载中心
 * 为了使用动态图标组件，又不想全量引入图标库（按需加载）
 * 使用步骤：
 *   1. 在 https://icon-sets.iconify.design/ 挑选或搜索想要的图标
 *   2. 选中想要的图标，在下方图标信息中复制图标名称
 *      比如选中了 ep:add-location（Element Plus在iconify中使用缩写ep）
 *   3. 在本文件，下方 icons 集合中添加图标名称 ep:add-location，
 *      然后就可以使用了：<my-icon name="ep:add-location" />
 *
 *   自定义 svg图标可以放在 src/assets/icons 下，其文件名即图标名称，不需要在这里添加
 *
 * 相关文档：
 *   https://unocss.dev/presets/icons
 *   https://element-plus.gitee.io/zh-CN/component/icon.html
 * 相关配置：vue.config.js - plugins - Unocss/presetIcons
 */

export const icons = new Set([
	'logos:vuetifyjs',
	'ep:add-location',
	'ri:alarm-warning-fill',
	'ri:alipay-line',
	'ri:anchor-fill',
	'line-md:menu-fold-left',
	'fe:app-menu',
	'ic:outline-touch-app',
	'bx:home',
	'mdi:human-hello-variant',
	'tabler:dashboard',
	'gg:menu-round',
	'ep:lock',
	'ep:user',
	'eos-icons:admin-outlined',
	'ion:logo-web-component',
	'ep:caret-right'
])
