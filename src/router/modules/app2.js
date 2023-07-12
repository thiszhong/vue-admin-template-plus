import { RouteNames } from '../names'
import MyLayout from '@/components/my-layout/index.vue'

// 另一支基于根目录的路由，src/config/theme 设置 menuRoot 为 root 或直接访问路由 可以看到
export const app2Routes = {
	name: RouteNames.app2,
	path: '/app2',
	redirect: '/app2/welcome/home',
	meta: { title: 'App2', icon: 'ic:outline-touch-app', alwaysShow: true },
	component: MyLayout,
	children: [
		{
			name: RouteNames.welcome,
			path: '/app2/welcome/home',
			meta: { title: 'WelcomeHome', icon: 'bx:home' },
			component: () => import('@/pages/app2/welcome/home.vue')
		},
		{
			name: RouteNames.hello,
			path: '/app2/hello',
			meta: { title: 'Hello', icon: 'mdi:human-hello-variant' },
			children: [
				{
					name: RouteNames.helloFriend,
					path: '/app2/hello/friend',
					meta: { title: 'HelloFriend' },
					component: () => import('@/pages/app2/hello/friend.vue')
				},
				{
					name: RouteNames.helloWorld,
					path: '/app2/hello/world',
					meta: { title: 'HelloWorld' },
					component: () => import('@/pages/app2/hello/world.vue')
				}
			]
		}
	]
}
