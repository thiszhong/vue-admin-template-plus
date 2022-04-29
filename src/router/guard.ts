import type { NavigationGuardWithThis, NavigationHookAfter } from 'vue-router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false })

export const beforeEachGuard: NavigationGuardWithThis<undefined> = () => {
	NProgress.start()
	// dd
}

export const afterEachGuard: NavigationHookAfter = () => {
	NProgress.done()
	// dd
}
