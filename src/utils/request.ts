import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { useRouter, useAuth } from '@/hooks'

const { navigateTo } = useRouter()
const { clearToken } = useAuth()

export type RequestErrorHint = boolean | 'Message' | 'MessageBox' | 'Notification'
declare module 'axios' {
	interface AxiosRequestConfig {
		// 是否把错误信息提示出来，提示方式：Message-轻提示 MessageBox-弹窗 Notification-通知
		// 默认 Notification，设置为 false 则不作提示
		errorHint?: RequestErrorHint
		// 设置为 false 则不处理非约定成功状态的code（比如 response.data.code），否则处理成错误
		rejectErrorCode?: boolean
	}
}

export const httpRequest = axios.create({
	baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
	// withCredentials: true, // send cookies when cross-domain requests
	timeout: 20000 // request timeout
})

const resolveError = (error: any, errorHint?: RequestErrorHint) => {
	const hint: RequestErrorHint = errorHint || error?.config?.errorHint

	let errTitle = '提示'
	let errMsg = error.message
	let errCode = ''
	if (error.response) {
		const { status, data } = error.response
		errTitle = '服务忙，请稍后重试'
		errCode = status
		// message 字段取决于自己服务端接口的返回结构
		if (data && typeof data === 'object' && data.message) {
			errMsg = data.message
		}
	} else if (error.request) {
		errTitle = '网络异常'
	}
	if (errCode) errTitle = `[${errCode}]${errTitle}`

	const errorIns = new Error(`${errTitle}（${errMsg}）`)
	if (hint === false) {
		return Promise.reject(errorIns)
	} else if (hint === 'Message') {
		ElMessage({ message: `${errTitle}（${errMsg}）`, type: 'error', duration: 2500 })
	} else if (hint === 'MessageBox') {
		ElMessageBox({ title: errTitle, message: errMsg, type: 'error', confirmButtonText: '知道了', center: true })
	} else {
		ElNotification({ title: errTitle, message: errMsg, type: 'error' })
	}
	return Promise.reject(errorIns)
}

// request interceptor
const requestInterceptor = (
	config: AxiosRequestConfig<any>
): AxiosRequestConfig<any> | Promise<AxiosRequestConfig<any>> => {
	return config
}
httpRequest.interceptors.request.use(requestInterceptor, resolveError)

// response interceptor
const responseInterceptor = (
	response: AxiosResponse<any, any>
): AxiosResponse<any, any> | Promise<AxiosResponse<any, any>> => {
	const { config, data } = response
	if (!data || typeof data !== 'object') return response

	const { errorHint, rejectErrorCode } = config
	// 后端约定的成功状态的code值
	if (data.code !== 0 && rejectErrorCode !== false) {
		// 20303: Token 非法; 20301: Token 不合法;
		if (data.code === 20303 || data.code === 20301) {
			clearToken()
			const e = new Error('请重新登录')
			navigateTo({ name: 'login', query: { redirect: location.href } })
			if (errorHint !== false) return resolveError(e, errorHint)
			return Promise.reject(e)
		}
		const e = new Error(data.message || '系统开小差了')
		if (errorHint !== false) return resolveError(e, errorHint)
		return Promise.reject(e)
	}
	return response
}
httpRequest.interceptors.response.use(responseInterceptor, resolveError)
