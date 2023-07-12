/**
 * 加载 js 文件
 * @param {String} url 文件地址
 * @param {Object} props - script标签属性
 */
export const loadJs = (url, props) => {
	return new Promise((resolve, reject) => {
		const el = document.createElement('script')
		if (props) {
			for (let k in props) {
				el.setAttribute(k, props[k])
			}
		}
		el.src = url
		el.onload = resolve
		el.onerror = (e) => {
			document.head.removeChild(el)
			reject(e)
		}
		document.head.appendChild(el)
	})
}

/**
 * 节流函数
 */
export function throttle(fn, wait = 150) {
	let last = 0
	return function (...args) {
		const now = Date.now()
		if (now - last > wait) {
			fn.apply(this, args)
			last = now
		}
	}
}

/**
 * 防抖函数
 */
export function debounce(fn, wait = 200, immediate = false) {
	let timer

	return function (...args) {
		if (timer) clearTimeout(timer)
		if (immediate) {
			timer = null
			return fn.apply(this, args)
		}
		timer = setTimeout(() => fn.apply(this, args), wait)
	}
}

/**
 * 生成一个唯一id
 * @param opt { prefix?: 前缀 }
 */
export const createUniqueId = (opt) => {
	return '' + (opt?.prefix || '') + Math.floor(Math.random() * 10e5).toString(36)
}
