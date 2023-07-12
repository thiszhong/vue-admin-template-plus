// 渲染菜单的数据来源
export const MenuRoot = {
	root: 'root', // 从根路由开始，即全部
	layout: 'layout' // 从当前路由栈中匹配到的第一个 MyLayout 开始，router 需搭配 MyLayout 组件使用
}

export const MenuMode = {
	top: 'top', // 侧边菜单布局
	side: 'side' // 顶部菜单布局
}

// 可选主题
export const Themes = {
	dark: 'dark', // 暗黑
	simple: 'simple' // @default 简约
}

/**
 * 主题配置
 */
export const themeConfig = {
	menuRoot: MenuRoot.layout,
	breadcrumb: false,
	menuMode: MenuMode.left,
	theme: Themes.simple
}
