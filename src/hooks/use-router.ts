import type { RouteLocationRaw, LocationAsRelativeRaw, Router } from 'vue-router'

let appRouter: Router | undefined

export const setAppRouter = (router: Router) => {
	appRouter = router
}

export const getAppRouter = () => appRouter

export const useRouter = () => {
	const navigateTo = (options: RouteLocationRaw) => {
		if ((options as LocationAsRelativeRaw).name === 'goBack') {
			return appRouter?.go(-1)
		}
		return appRouter?.push(options)
	}

	return { navigateTo }
}
