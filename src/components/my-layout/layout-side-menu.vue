<script setup lang="ts">
import { ref, watch } from 'vue'
import ToggleMenuBar from './toggle-menu-bar.vue'
import LayoutSideMenuItem from './layout-side-menu-item.vue'

import { useResizeObserver } from '@vueuse/core'
import { useGlobalLayout, useRouter, usePermission } from '@/hooks'
import { RouteLocationMatched, RouteRecordRaw, useRoute } from 'vue-router'
import type { MenuRouteRecordRaw } from './types'

const { state, toggleSideMenu } = useGlobalLayout()

// 当窗口尺寸变化时，或移动端打开时，自动设置 menuCollapse
const checkMenuCollapse = () => {
	if (window.innerWidth <= 750 && !state.sideMenuCollapse) toggleSideMenu(true)
}

const isExternalLink = (url: string) => url.startsWith('http')

const { state: permissionState, hasPermission } = usePermission()
// 处理、筛选路由数据到菜单需要的格式
const resolveRoutePath = (route: RouteRecordRaw, parentPath = ''): MenuRouteRecordRaw | null => {
	const { meta = {}, children, ...rest } = route
	const { hiddenInSideMenu, alwaysShow, permissions } = meta

	if (hiddenInSideMenu || !hasPermission(permissions, 'or')) return null

	let fullpath = isExternalLink(rest.path) ? rest.path : (parentPath + '/' + rest.path).replace(/\/{2,}/g, '/')
	const newChildren = children?.map((item) => resolveRoutePath(item, fullpath)).filter((item) => !!item) as
		| MenuRouteRecordRaw[]
		| undefined

	if (newChildren?.length === 1 && !alwaysShow) {
		return newChildren[0]
	}
	return { ...rest, meta: { ...meta }, children: newChildren, fullpath }
}
const route = useRoute()
// 缓存菜单，当有多套菜单的时候
const routeCollections: Map<string, MenuRouteRecordRaw[]> = new Map()
const routes = ref<MenuRouteRecordRaw[]>([])
const activeMenu = ref('')
watch(
	[route, () => permissionState.permissions],
	([newRoute, permissions]) => {
		activeMenu.value = newRoute.meta.activeMenu || newRoute.path

		// 理论上这里一定能匹配到，因为当前文件被加载了
		const rootRoute = newRoute.matched.find(
			(matched) => matched.components.default.name === 'MyLayout'
		) as RouteLocationMatched
		const path = rootRoute.path
		const collectionKey = `${path}${permissions.length}`
		if (!routeCollections.has(collectionKey)) {
			const data = rootRoute.children
				.map((item) => resolveRoutePath(item, rootRoute!.path))
				.filter((item) => !!item) as MenuRouteRecordRaw[]
			routeCollections.set(collectionKey, data)
		}
		routes.value = routeCollections.get(collectionKey) as MenuRouteRecordRaw[]
	},
	{ immediate: true }
)

const { navigateTo } = useRouter()
const menuClick = ({ name, fullpath }: MenuRouteRecordRaw) => {
	navigateTo(name ? { name } : { path: fullpath })
	checkMenuCollapse()
}

useResizeObserver(document.body, () => checkMenuCollapse())
</script>

<template>
	<aside
		v-if="routes.length"
		class="layout-side-menu__place"
		:class="{ 'layout-side-menu--collapse': state.sideMenuCollapse }"
	></aside>
	<aside v-if="routes.length" class="layout-side-menu">
		<el-scrollbar class="layout-side-menu__wrap">
			<el-menu :default-active="activeMenu" :collapse="state.sideMenuCollapse">
				<LayoutSideMenuItem v-for="(menu, mIndex) in routes" :key="mIndex" :route="menu" @click="menuClick" />
			</el-menu>
		</el-scrollbar>
		<el-row style="height: 50px" align="middle" justify="end">
			<ToggleMenuBar color="rgba(255,255,255,.65)" />
		</el-row>
	</aside>
</template>

<style lang="less">
.layout-side-menu__place {
	width: var(--side-menu-width);
	// 占位的动效应与 menu 保持一致，直接拿 menu 的动效样式或 className：https://github.com/element-plus/element-plus/blob/master/packages/components/menu/src/menu-collapse-transition.vue
	transition: var(--el-transition-duration) width ease-in-out;
}
.layout-side-menu--collapse {
	width: var(--side-menu-width-collapse) !important;
}
.layout-side-menu {
	height: 100vh;
	padding: calc(var(--header-height) + 5px) 0 0;
	background-color: var(--side-menu-bg-color);
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	position: fixed;
	top: 0;
	left: 0;

	.el-menu {
		--el-menu-active-color: #fff;
		--el-menu-text-color: rgba(255, 255, 255, 0.65);
		--el-menu-hover-text-color: #fff;
		--el-menu-bg-color: var(--side-menu-bg-color);
		--el-menu-hover-bg-color: var(--side-menu-bg-color);
		--el-menu-active-bg-color: var(--primary-color);
		--el-menu-item-height: 50px;
		--el-menu-border-color: transparent;

		width: var(--side-menu-width);
		height: 100%;
		.el-menu {
			background-color: transparent;
		}
	}
	.el-menu--collapse {
		width: var(--side-menu-width-collapse);
	}
	.el-menu-item.is-active {
		background-color: var(--el-menu-active-bg-color);
	}
	.el-menu-item.is-disabled {
		opacity: 0.45;
	}
	.el-menu-item:hover,
	.el-sub-menu__title:hover {
		color: var(--el-menu-hover-text-color);
	}
	.el-sub-menu.is-active {
		background-color: rgba(24, 144, 255, 0.1);
		& > .el-sub-menu__title {
			color: var(--el-menu-hover-text-color);
		}
	}

	&__wrap {
		flex: 1 1 0%;
		// overflow: hidden auto;
	}
}
</style>
