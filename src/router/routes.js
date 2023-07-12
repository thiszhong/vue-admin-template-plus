import * as a from './modules'
import { RouteNames } from './names'

// declare module 'vue-router' {
// 	// 扩展 meta 字段
// 	interface RouteMeta {
// 		// 菜单栏、面包屑等需要
// 		title?: string
// 		// 左侧菜单栏加载时菜单图标，详见 @/components/my-icon 支持的 name 值
// 		icon?: string
// 		// 权限
// 		permissions?: string[] | string
// 		// 是否总是显示。如果不设置，默认当其 children.length=1 时会被这个 child 替代
// 		alwaysShow?: boolean
// 		// 设置为 true 则不在菜单栏中显示
// 		hiddenInMenu?: boolean
// 		// 设置为 true 则不在面包屑中显示
// 		hiddenInBreadcrumb?: boolean
// 		// todo: if set true, the tag will affix in the tags-view
// 		affix?: boolean
// 		// todo: 设置为 true 则用 <keep-alive /> 缓存该路由的 name
// 		cache?: boolean
// 		// 手动设置左侧菜单栏要选中的菜单路由path，默认是自身
// 		activeMenu?: string
// 	}
// }

export const routes = [
	{
		path: '/',
		meta: { hiddenInMenu: true },
		redirect: '/app'
	},
	...Object.values(a),
	{
		path: '/:pathMatch(.*)*',
		name: RouteNames['404'],
		meta: { hiddenInMenu: true },
		component: () => import('@/pages/result/404.vue')
	}
]
