<script setup>
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuth } from '@/hooks'

import AuthContainer from './components/auth-container.vue'

const formRef = ref()
const formState = reactive({
	account: 'admin',
	password: '123'
})
const formRules = {
	account: [
		{ required: true, message: '必填', trigger: 'change' },
		{ min: 2, max: 16, message: '用户名长度应在2-16位字符', trigger: 'change' }
	],
	password: [{ required: true, message: '必填', trigger: 'change' }]
}
const state = reactive({
	loginLoading: false
})

const router = useRouter()
const route = useRoute()
const afterLogin = () => {
	const { redirect, ...rest } = route.query
	if (!redirect) {
		return router.replace({ path: '/', query: rest })
	}
	const r = !redirect.startsWith('http') && !redirect.startsWith('/') ? decodeURIComponent(redirect) : redirect
	location.replace(r)
}
const onLogin = async () => {
	const a = await formRef.value.validate().catch(() => null)
	if (!a) return
	state.loginLoading = true
	// await request ....
	useAuth().setToken('TEST')
	afterLogin()
	state.loginLoading = false
}
</script>

<template>
	<AuthContainer>
		<el-form ref="formRef" :model="formState" :rules="formRules">
			<el-form-item prop="account">
				<el-input v-model="formState.account" placeholder="用户名">
					<template #prefix>
						<MyIcon name="ep:user" />
					</template>
				</el-input>
			</el-form-item>
			<el-form-item prop="password">
				<el-input v-model="formState.password" type="password" show-password placeholder="密码" @keyup.enter="onLogin">
					<template #prefix>
						<MyIcon name="ep:lock" />
					</template>
				</el-input>
			</el-form-item>
			<el-form-item>
				<el-button class="w-full" type="primary" :loading="state.loginLoading" @click="onLogin">登 录</el-button>
			</el-form-item>
		</el-form>
	</AuthContainer>
</template>
