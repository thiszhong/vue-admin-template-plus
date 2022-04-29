import { reactive } from 'vue'

const createGlobalLayoutInstance = () => {
	const state = reactive({
		// 左侧菜单栏是否折叠收起
		sideMenuCollapse: false
	})

	const toggleSideMenu = (value?: boolean) => {
		if (typeof value !== 'undefined') state.sideMenuCollapse = value
		else state.sideMenuCollapse = !state.sideMenuCollapse
	}

	return { state, toggleSideMenu }
}

let globalLayout: ReturnType<typeof createGlobalLayoutInstance>

/**
 * 页面整体布局，以单例存在
 * @returns GlobalLayout
 */
export const useGlobalLayout = () => {
	if (!globalLayout) globalLayout = createGlobalLayoutInstance()
	return globalLayout
}
