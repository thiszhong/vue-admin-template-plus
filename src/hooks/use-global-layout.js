import { reactive, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { MenuRoot, Themes, MenuMode as _MenuMode, themeConfig } from '@/config'
import { usePermission } from './use-permission'
import { setStorage, getStorage } from '@/utils'
import { isDark, toggleDark } from './dark'

export const MenuMode = _MenuMode

const isExternalLink = (url) => url.startsWith('http')

const createInstance = () => {
	const storageKey = 'adminLayout'
	const router = useRouter()
	const route = useRoute()
	const { state: permState, hasPermission } = usePermission()

	const state = reactive({
		// 总的菜单数据
		menuList: [],
		activeMenuPath: '/',

		theme: themeConfig.theme,
		menuMode: themeConfig.menuMode,
		// 左侧菜单栏是否折叠收起
		sideMenuCollapse: false,
		...getStorage(storageKey)
	})

	/**
	 * 设置主题
	 * @param {String} val [Themes]
	 */
	const setTheme = (val) => {
		const v = val || Themes.simple
		if (state.theme === v) return
		const dark = v === Themes.dark
		if (!dark) state.theme = v
		if (dark !== isDark.value) toggleDark(dark)

		setStorage(storageKey, { ...getStorage(storageKey), theme: state.theme })
	}

	// 处理、筛选路由数据到菜单需要的格式
	const resolveMenu = (route, parentPath = '') => {
		const { meta = {}, children, ...rest } = route
		const { hiddenInMenu, alwaysShow, permissions } = meta

		if (hiddenInMenu || !hasPermission(permissions)) return null

		let fullpath = isExternalLink(rest.path) || rest.path.startsWith('/') ? rest.path : `${parentPath}/${rest.path}`
		const newChildren = children?.map((item) => resolveMenu(item, fullpath)).filter((item) => !!item)

		if (newChildren?.length === 1 && !alwaysShow) {
			return newChildren[0]
		}
		return { ...rest, meta: { ...meta }, children: newChildren, fullpath }
	}
	const getMenuList = (currentRoute) => {
		if (themeConfig.menuRoot === MenuRoot.root) {
			return router.options.routes.map((item) => resolveMenu(item)).filter((item) => !!item)
		}
		// 注意与 MyLayout 组件的搭配使用
		const rootRoute = currentRoute.matched.find((matched) => matched.components.default.name === 'MyLayout')
		return rootRoute.children.map((item) => resolveMenu(item, rootRoute.path)).filter((item) => !!item)
	}
	watch(
		[route, () => permState.permissions],
		([newRoute]) => {
			state.activeMenuPath = newRoute.meta.activeMenu || newRoute.path
			state.menuList = getMenuList(newRoute)
		},
		{ immediate: true }
	)

	const toggleSideMenu = (value) => {
		if (typeof value !== 'undefined') state.sideMenuCollapse = value
		else state.sideMenuCollapse = !state.sideMenuCollapse

		setStorage(storageKey, { ...getStorage(storageKey), sideMenuCollapse: state.sideMenuCollapse })
	}

	return { state, toggleSideMenu, isDark, setTheme }
}

let instance

/**
 * 页面整体布局，以单例存在
 * @returns GlobalLayout
 */
export const useGlobalLayout = () => {
	if (!instance) instance = createInstance()
	return instance
}
