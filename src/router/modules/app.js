import MyLayout from '@/components/my-layout/index.vue'

import { RouteNames } from '../names'
import { appAdminRoutes } from './app/admin'

export const appRoutes = {
	path: '/app',
	redirect: '/app/dashboard',
	meta: { title: 'App', icon: 'ic:outline-touch-app', alwaysShow: true },
	component: MyLayout,
	children: [
		{
			name: RouteNames.dashboard,
			path: '/app/dashboard',
			meta: { title: 'Dashboard', icon: 'tabler:dashboard' },
			component: () => import('@/pages/app/dashboard/index.vue')
		},
		{
			path: '/app/test-menu',
			meta: { title: '多级菜单', icon: 'gg:menu-round' },
			redirect: '/app/test-menu/l1-1',
			children: [
				{
					path: 'l1-1',
					meta: { title: '一级菜单1', icon: 'activity' },
					redirect: '/app/test-menu/l1-1/l2-1',
					children: [
						{
							path: 'l2-1',
							meta: { title: '二级菜单1' },
							redirect: '/app/test-menu/l1-1/l2-1/l3-1',
							children: [
								{
									path: 'l3-1',
									meta: { title: '一些图标' },
									component: () => import('@/pages/app/test-menu/level1-1/level2-1/level3-1.vue')
								},
								{
									meta: { title: '三级菜单2' },
									path: 'l3-2',
									component: () => import('@/pages/app/test-menu/level1-1/level2-1/level3-2.vue')
								}
							]
						},
						{
							path: 'l2-2',
							meta: { title: '二级菜单2' },
							redirect: '/app/test-menu/l1-1/l2-2/l3-3',
							children: [
								{
									path: 'l3-3',
									meta: { title: '三级菜单3' },
									component: () => import('@/pages/app/test-menu/level1-1/level2-2/index.vue')
								}
							]
						}
					]
				},
				{
					path: 'l1-2',
					meta: { title: '一级菜单2', icon: 'fe:app-menu', alwaysShow: true },
					redirect: '/app/test-menu/l1-2/l2-3',
					children: [
						{
							path: 'l2-3',
							meta: { title: '二级菜单3', alwaysShow: true },
							redirect: '/app/test-menu/l1-2/l2-3/l3-4',
							children: [
								{
									path: 'l3-4',
									meta: { title: '三级菜单4' },
									component: () => import('@/pages/app/test-menu/level1-2/level2-3/index.vue')
								}
							]
						}
					]
				}
			]
		},
		{
			name: RouteNames.components,
			path: '/app/components',
			meta: { title: '组件', icon: 'ion:logo-web-component', alwaysShow: true },
			children: [
				{
					name: RouteNames.imageUploader,
					path: '/app/components/imageuploader',
					meta: { title: '图片上传' },
					component: () => import('@/pages/app/components/image-uploader.vue')
				},
				{
					name: RouteNames.tinymce,
					path: '/app/components/tinymce',
					meta: { title: '富文本编辑器' },
					component: () => import('@/pages/app/components/tinymce.vue')
				}
			]
		},
		appAdminRoutes
	]
}
