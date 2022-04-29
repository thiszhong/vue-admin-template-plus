import { getStorage, setStorage, removeStorage } from '@/utils/storage'
import { computed, reactive } from 'vue'

const createAuthInstance = () => {
	const tokenKey = 'token'
	/**
	 * token有效期，默认3天
	 */
	const TOKEN_EXPIRED_TIME = (1000 * 60) & (60 * 24 * 3)

	const state = reactive({
		token: ''
	})

	const hasLogin = computed(() => !!state.token)

	const getToken = () => {
		state.token = getStorage(tokenKey) || ''
		return state.token
	}
	const setToken = (token: string) => {
		state.token = token
		setStorage(tokenKey, token, { expired: TOKEN_EXPIRED_TIME })
	}
	const clearToken = () => {
		state.token = ''
		removeStorage(tokenKey)
	}

	getToken()

	return { state, hasLogin, TOKEN_EXPIRED_TIME, getToken, setToken, clearToken }
}

let authInstance: ReturnType<typeof createAuthInstance>

/**
 * 页面整体布局，以单例存在
 * @returns AuthInstance
 */
export const useAuth = () => {
	if (!authInstance) authInstance = createAuthInstance()
	return authInstance
}
