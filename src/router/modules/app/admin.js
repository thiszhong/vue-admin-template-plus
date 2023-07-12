import { RouteNames } from '../../names'

export const appAdminRoutes = {
	name: RouteNames.admin,
	path: '/app/admin',
	redirect: '/app/admin/permission',
	meta: { title: '管理员', icon: 'eos-icons:admin-outlined', alwaysShow: true },
	children: [
		{
			name: RouteNames.adminPermission,
			path: '/app/admin/permission',
			meta: { title: '权限管理' },
			component: () => import('@/pages/app/admin/permission/index.vue')
		},
		{
			name: RouteNames.adminRole,
			path: '/app/admin/role',
			meta: { title: '角色管理' },
			component: () => import('@/pages/app/admin/role/index.vue')
		},
		{
			name: RouteNames.adminAccount,
			path: '/app/admin/account',
			meta: { title: '账号管理' },
			component: () => import('@/pages/app/admin/account/index.vue')
		}
	]
}
