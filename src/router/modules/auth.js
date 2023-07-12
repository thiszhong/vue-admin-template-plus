/**
 * 登录、注册、授权相关
 */

import { RouteNames } from '../names'

export const authRoutes = {
	path: '/auth',
	redirect: '/auth/login',
	meta: { hiddenInMenu: true },
	children: [
		{
			name: RouteNames.login,
			path: '/auth/login',
			component: () => import('@/pages/auth/login.vue')
		}
	]
}
