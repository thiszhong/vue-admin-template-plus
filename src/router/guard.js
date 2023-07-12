import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'
import { baseConfig } from '@/config'
import { useAuth, usePermission } from '@/hooks'
import qs from 'qs'
import { RouteNames } from './names'
import { ElMessage } from 'element-plus'

NProgress.configure({ showSpinner: true })

const { hasLogin, setToken } = useAuth()
const { state: userPermissionState, getPermissions, hasPermission } = usePermission()

const authRoutes = [RouteNames.login, RouteNames.register]

export const beforeEachGuard = async (to, from) => {
	NProgress.start()

	const toQuery = { ...to.query }

	if (toQuery.token) {
		setToken(toQuery.token)
		delete toQuery.token
		// return { path: to.path, query: toQuery, replace: true } // 一些环境token刷不掉？导致带token的链接分享出去
		window.location.replace(window.location.origin + window.location.pathname + '?' + qs.stringify(toQuery))
		return false
	}

	// 登录状态
	if (!hasLogin.value && !authRoutes.includes(to.name)) {
		return { name: RouteNames.login, query: { redirect: window.location.href } }
	}

	// 权限
	if (!userPermissionState.permissions) {
		await getPermissions()
	}
	if (!hasPermission(to.meta.permissions)) {
		ElMessage.warning('暂无访问权限！')
		return { name: RouteNames['404'] }
	}
}

export const afterEachGuard = (to) => {
	NProgress.done()
	document.title = `${to.meta?.title ? to.meta.title + ' ｜ ' : ''}${baseConfig.title}`
}
