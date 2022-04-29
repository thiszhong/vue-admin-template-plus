import { httpRequest } from '@/utils'

export function reqSomething() {
	return httpRequest.get('/api/test')
}
