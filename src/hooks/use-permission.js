import { computed, reactive } from 'vue'

export const PermissionMode = {
	and: 'and',
	or: 'or'
}

// TEST
const reqPermissions = () => {
	return new Promise((resolve) => {
		setTimeout(() => {
			// 后端是以路径设计，返回整个路由配置
			// resolve({
			// 	data: [
			// 		{
			// 			path: '/app/supplier',
			// 			name: 'supplier',
			// 			meta: { icon: 'MyIconsSupplier', title: '供应商', alwaysShow: true },
			// 			redirect: '/app/supplier/list',
			// 			children: [
			// 				{
			// 					path: '/app/supplier/list',
			// 					name: 'supplierList',
			// 					meta: { title: '供应商列表' },
			// 					component: 'app/supplier/supplier-list'
			// 				},
			// 				{
			// 					path: '/app/supplier/edit',
			// 					name: 'supplierEdit',
			// 					meta: { title: '供应商编辑', hiddenInSideMenu: true },
			// 					component: 'app/supplier/supplier-edit'
			// 				}
			// 			]
			// 		}
			// 	]
			// })

			// 后端也是以权限设计菜单
			resolve({ data: ['app.menu.get', 'test.123'] })
		}, 150)
	})
}

const routeToPermission = (data, parentPath) => {
	return data.reduce((d, route) => {
		const { path, children } = route
		if (!path.startsWith('http')) {
			// 这里是以路由全路径、斜杠换成点转成其权限，
			// 各项目可以自定规则：能和 /router/routes - meta 中的 permissions 字段对上就行
			const p = path.startsWith('/') ? path : `${parentPath || ''}/${path}`
			d.push(p.substring(1).replace(/\//g, '.'))
		}
		if (children?.length) {
			routeToPermission(children, path).forEach((e) => d.push(e))
		}
		return d
	}, [])
}

const createInstance = () => {
	const state = reactive({
		permissions: null // null 代表数据还未请求，否则应为数组
	})

	const setPermissions = (data) => {
		state.permissions = data
	}
	const getPermissions = async () => {
		try {
			const { data } = await reqPermissions()
			// 后端是以路径设计，返回整个路由配置，这里统一处理成权限，会舍弃一些配置，比如菜单图标、顺序什么的，若需要改这些的话前端发个版即可
			// setPermissions(routeToPermission(data || []))

			setPermissions(data || [])
		} catch (e) {
			console.error('权限查询失败：', e)
		}
	}
	/**
	 * 判断是否有权限
	 * @param value 权限或权限集合
	 * @param mode 在 value 为集合时生效，or-拥有集合的一项即为true，and-拥有全部集合项才为true
	 * @returns {Boolean}
	 */
	const hasPermission = (value, mode = PermissionMode.or) => {
		if (!value) return true
		if (Array.isArray(value)) {
			if (mode === PermissionMode.and) {
				const ret = value.reduce((prev, cur) => prev && hasPermission(cur), true)
				return ret
			}
			return state.permissions.some((item) => value.includes(item))
		}
		return state.permissions.includes(value)
	}
	/**
	 * 响应版的hasPermission
	 */
	const hasPermissionReactive = (value, mode = PermissionMode.or) => {
		return computed(() => hasPermission(value, mode))
	}

	return { state, getPermissions, setPermissions, hasPermission, hasPermissionReactive }
}

let instance

/**
 * 用户权限，以单例存在
 * @returns Permission
 */
export const usePermission = () => {
	if (!instance) instance = createInstance()
	return instance
}
