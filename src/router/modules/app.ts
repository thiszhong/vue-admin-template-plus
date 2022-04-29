import { RouteRecordRaw, RouterView } from 'vue-router'

const appListRoutes: RouteRecordRaw[] = [
	{
		path: 'table',
		name: 'appListTable',
		meta: { title: 'Demo Table', hiddenInSideMenu: false },
		component: () => import('@/pages/app/list/table.vue')
	},
	{
		path: 'tree',
		name: 'appListTree',
		meta: { title: 'Demo Tree' },
		component: () => import('@/pages/app/list/tree.vue')
	}
]

export const appRoutes: RouteRecordRaw[] = [
	{
		path: 'dashboard',
		name: 'appDashboard',
		meta: { title: 'Dashboard', icon: 'AntDesignDashboardOutlined' },
		component: () => import('@/pages/app/dashboard/index.vue')
	},
	{
		path: 'list',
		meta: { title: 'Demo List', icon: 'AntDesignBarsOutlined', alwaysShow: true },
		redirect: '/app/list/table',
		component: RouterView,
		children: appListRoutes
	}
]
