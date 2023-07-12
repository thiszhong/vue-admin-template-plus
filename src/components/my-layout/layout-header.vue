<script setup>
import { useGlobalLayout, MenuMode, useAuth } from '@/hooks'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { RouteNames } from '@/router'

import { ElMessageBox } from 'element-plus'
import LayoutLogo from './layout-logo.vue'
import LayoutMenu from './layout-menu.vue'
import { Sunny, Moon } from '@element-plus/icons-vue'

const { state, isDark } = useGlobalLayout()

const topMenu = computed(() => state.menuMode === MenuMode.top)

const router = useRouter()
const handleLogout = async () => {
	try {
		await ElMessageBox.confirm('', { title: '确定要退出登录吗？', type: 'warning', center: true, draggable: true })
	} catch (e) {
		return
	}
	useAuth().clearToken()
	router.replace({ name: RouteNames.login })
}
</script>

<template>
	<div style="height: var(--header-height)"></div>
	<el-row tag="header" align="middle" class="layout-header">
		<LayoutLogo v-if="topMenu || !state.menuList.length" />

		<LayoutMenu v-if="topMenu" mode="horizontal" />

		<div class="layout-header__r" :class="{ 'flex-1': !topMenu }">
			<!-- 从右向左，详见样式 flex-direction -->
			<el-menu mode="horizontal">
				<el-sub-menu index="1" :teleported="true" popper-class="layout-header__menu">
					<template #title>
						<el-row align="middle">
							<el-avatar
								:size="36"
								src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80"
							/>
							<!-- <span style="margin-left: 3px">Name</span> -->
						</el-row>
					</template>
					<el-menu-item index="1-1">Home</el-menu-item>
					<el-menu-item index="1-2">Github</el-menu-item>
					<el-menu-item index="1-3">Docs</el-menu-item>
					<el-menu-item index="1-logout" @click="handleLogout">退出登录</el-menu-item>
				</el-sub-menu>
				<el-menu-item index="2">
					<el-switch
						style="--el-switch-on-color: #444; --el-menu-icon-width: auto"
						v-model="isDark"
						inline-prompt
						:active-icon="Moon"
						:inactive-icon="Sunny"
					/>
				</el-menu-item>
				<el-menu-item index="3">Something</el-menu-item>
			</el-menu>
		</div>
	</el-row>
</template>

<style lang="scss">
.layout-header {
	height: var(--header-height);
	background-color: var(--header-bg-color);
	box-shadow: var(--header-shadow);
	// el-row 会有 position: relative 属性
	position: fixed !important;
	z-index: 99;
	left: 0;
	top: 0;
	width: 100%;
	padding-right: var(--popup-hidden-padding-right);
	box-sizing: border-box;
	flex-wrap: nowrap;

	.layout-header__r {
		min-width: 289px;
		height: 100%;
		overflow: hidden;

		.el-menu {
			--el-menu-active-color: var(--header-text-color);
			--el-menu-text-color: var(--header-text-color);
			--el-menu-hover-text-color: var(--header-hover-text-color, --header-text-color);
			// --el-menu-hover-bg-color: var(--color-primary-light);
			--el-menu-bg-color: transparent;
			--el-menu-item-height: 100%;
			--el-menu-item-font-size: var(--el-font-size-base);
			--el-menu-border-color: transparent;

			height: 100%;
			flex-direction: row-reverse;
			.el-menu-item {
				border: 0 !important;
			}
			.el-sub-menu .el-sub-menu__title {
				border: 0;
				&:hover {
					background-color: var(--el-menu-hover-bg-color);
				}
			}
		}

		&__menu {
			.el-menu {
				--el-menu-active-color: inherit;
				min-width: 100px;
			}
			.el-menu-item {
				justify-content: center;
			}
		}
	}
}
</style>
