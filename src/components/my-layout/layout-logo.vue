<script setup>
import { useGlobalLayout, MenuMode } from '@/hooks'
import { watch, ref } from 'vue'
import { baseConfig } from '~/config'
import { debounce } from '~/utils'

const showTitle = ref(false)
const { state } = useGlobalLayout()
watch(
	() => state.sideMenuCollapse,
	debounce((val) => {
		showTitle.value = !val
	}, 200),
	{ immediate: true }
)
</script>

<template>
	<el-row
		align="middle"
		class="layout-logo"
		:class="{ 'layout-logo--collapse': !showTitle, 'layout-logo--h': state.menuMode === MenuMode.top }"
	>
		<!-- <img class="layout-logo__img" src="@/assets/logo.svg" alt="" /> -->
		<MyIcon name="logos:vuetifyjs" size="calc(var(--header-height) - 21px)" class="layout-logo__img" />
		<span v-if="showTitle" style="white-space: nowrap">{{ baseConfig.title }}</span>
	</el-row>
</template>

<style lang="scss">
.layout-logo {
	flex-wrap: nowrap;
	padding: 0 20px;
	color: var(--header-text-color);
	font-size: 20px;
	font-weight: bold;
	min-width: var(--menu-width);
	height: var(--header-height);
	background-color: var(--menu-bg-color);
	position: relative;

	&--collapse {
		justify-content: center;
		padding: 0;
		width: var(--menu-width-collapse);
		min-width: 0;
		overflow: hidden;
		.layout-logo__img {
			margin: 0;
		}
	}
	&--h {
		justify-content: center;
		background: none;

		&:not(.layout-logo--collapse):after {
			content: '';
			width: 1px;
			position: absolute;
			right: 16px;
			top: 20px;
			bottom: 20px;
			background: var(--color-primary-light);
		}
	}
	&__img {
		flex: none;
		height: calc(var(--header-height) - 21px);
		margin-right: 10px;
	}
}
</style>
