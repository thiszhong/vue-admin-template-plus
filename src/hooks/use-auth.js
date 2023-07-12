import { getStorage, setStorage, removeStorage } from '@/utils'
import { computed, reactive } from 'vue'

const createInstance = () => {
	const tokenKey = 'adminToken'
	/**
	 * token有效期（ms），默认3天
	 */
	const TOKEN_EXPIRED_TIME = 1000 * 60 * 60 * 24 * 3

	const state = reactive({
		token: ''
	})

	const hasLogin = computed(() => !!state.token)

	const getToken = () => {
		state.token = getStorage(tokenKey) || ''
		return state.token
	}
	getToken()

	const setToken = (token) => {
		state.token = token
		setStorage(tokenKey, token, { expired: TOKEN_EXPIRED_TIME })
	}
	const clearToken = () => {
		state.token = ''
		removeStorage(tokenKey)
	}

	return { state, hasLogin, getToken, setToken, clearToken }
}

let instance

/**
 * 登录状态相关，以单例存在
 * @returns AuthInstance
 */
export const useAuth = () => {
	if (!instance) instance = createInstance()
	return instance
}
