<script setup>
import { onMounted } from 'vue'
import { loadJs } from '@/utils'
import particlesOpt from './particles.json'
import { isDark } from '@/hooks/dark'

import { Sunny, Moon } from '@element-plus/icons-vue'

// 背景特效，异步加载
// const particlesJsUrl = 'https://unpkg.com/tsparticles@2.10.1/tsparticles.bundle.min.js'
const particlesJsUrl = '/tsparticles@2.10.1/tsparticles.bundle.min.js'
const setParticles = async () => {
	if (!window.tsParticles) {
		await loadJs(particlesJsUrl, { async: 'true', defer: 'true' })
	}
	try {
		await window.tsParticles.load('authContainer', particlesOpt)
	} catch (e) {
		console.info('tsparticles failed:', e)
	}
}

onMounted(() => {
	setParticles()
})
</script>

<template>
	<main id="authContainer" class="flex flex-col items-center justify-center h-screen" :class="$style.a">
		<div>
			<el-switch
				style="--el-switch-on-color: #444"
				v-model="isDark"
				inline-prompt
				:active-icon="Moon"
				:inactive-icon="Sunny"
			/>
		</div>
		<section :class="$style.c" class="relative w-full max-w-500 p-48 t-14">
			<div class="flex items-center justify-center mb-32 t-33 font-semibold">
				<MyIcon name="logos:vuetifyjs" class="w-48 mr-8" />
				<p :class="$style.lt">Admin</p>
			</div>
			<slot />
		</section>
	</main>
</template>

<style module lang="scss">
.a {
	--el-component-size: 50px;
	--el-font-size-base: 16px;

	background-color: var(--color-login-bg);

	:global(.el-button) {
		height: 50px;
	}
}
.c {
	z-index: 1;
	max-height: 75vh;
	margin-bottom: 15vh;
	border-radius: 10px;
	overflow: auto;
	background: var(--color-white);
	box-shadow: 0 3px 12px var(--color-primary-light);
}
.lt {
	color: transparent;
	background-clip: text;
	-webkit-background-clip: text;
	background-image: linear-gradient(to right, var(--color-primary), #3a95ff);
}
</style>
