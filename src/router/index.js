import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import { routes } from './routes'
import { beforeEachGuard, afterEachGuard } from './guard'

export * from './names'
export * from './routes'

export const router = createRouter({
	// history: createWebHistory(import.meta.env.BASE_URL),
	history: createWebHashHistory(import.meta.env.BASE_URL),
	routes
})

router.beforeEach(beforeEachGuard)
router.afterEach(afterEachGuard)
