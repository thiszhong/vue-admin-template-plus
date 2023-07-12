<script setup>
import ToggleMenuBar from './toggle-menu-bar.vue'
import LayoutMenuItem from './layout-menu-item.vue'
import LayoutLogo from './layout-logo.vue'

import { useResizeObserver } from '@vueuse/core'
import { useGlobalLayout } from '@/hooks'
import { useRouter } from 'vue-router'
import { computed } from 'vue'

const props = defineProps({
	mode: {
		type: String,
		default: 'vertical',
		validator: (val) => ['vertical', 'horizontal'].includes(val)
	}
})

const { state, toggleSideMenu } = useGlobalLayout()
const hMode = computed(() => props.mode === 'horizontal')

// 当窗口尺寸变化时，或移动端打开时，自动设置 menuCollapse
const checkMenuCollapse = () => {
	if (window.innerWidth <= 750 && !state.sideMenuCollapse) toggleSideMenu(true)
}

const router = useRouter()
const menuClick = ({ name, fullpath }) => {
	router.push(name ? { name } : { path: fullpath })
	checkMenuCollapse()
}

useResizeObserver(document.body, () => checkMenuCollapse())
</script>

<template>
	<aside
		v-if="!hMode && state.menuList.length"
		class="layout-menu__place"
		:class="{ 'layout-menu--collapse': state.sideMenuCollapse }"
	></aside>
	<aside v-if="state.menuList.length" class="layout-menu" :class="{ 'layout-menu__h': hMode }">
		<LayoutLogo v-if="!hMode" class="mb-5" style="max-width: var(--menu-width)" />

		<el-scrollbar v-if="!hMode" class="layout-menu__wrap">
			<el-menu unique-opened :default-active="state.activeMenuPath" :collapse="state.sideMenuCollapse">
				<LayoutMenuItem v-for="(menu, mIndex) in state.menuList" :key="mIndex" :route="menu" @click="menuClick" />
			</el-menu>
		</el-scrollbar>
		<el-menu v-else mode="horizontal" :default-active="state.activeMenuPath">
			<LayoutMenuItem v-for="(menu, mIndex) in state.menuList" :key="mIndex" :route="menu" @click="menuClick" />
		</el-menu>

		<el-row v-if="!hMode" style="height: 50px" align="middle" justify="end">
			<ToggleMenuBar color="var(--menu-text-color)" />
		</el-row>
	</aside>
</template>

<style lang="scss">
.layout-menu__place {
	width: var(--menu-width);
	// 占位的动效应与 menu 保持一致，直接拿 menu 的动效样式或 className：https://github.com/element-plus/element-plus/blob/master/packages/components/menu/src/menu-collapse-transition.vue
	transition: var(--el-transition-duration) width ease-in-out;
}
.layout-menu--collapse {
	width: var(--menu-width-collapse) !important;
}
.layout-menu {
	height: 100vh;
	// padding: calc(var(--header-height) + 5px) 0 0;
	background-color: var(--menu-bg-color);
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	position: fixed;
	z-index: 100;
	top: 0;
	left: 0;

	&.layout-menu__h {
		--menu-bg-color: none;

		flex: 1;
		height: 100%;
		padding: 0;
		position: static;

		.el-menu {
			--el-menu-bg-color: var(--menu-bg-color);

			width: auto;
		}
	}

	.el-menu {
		width: var(--menu-width);
		height: 100%;
	}
	.el-scrollbar__view > .el-menu > .el-sub-menu.is-active {
		background-color: var(--menu-active-block-color);
	}
	.el-scrollbar__view > .el-menu > .el-sub-menu.is-active,
	.el-sub-menu.is-active .el-sub-menu.is-active {
		& > .el-sub-menu__title {
			color: var(--el-menu-active-color);
		}
	}
	.el-menu--collapse {
		width: var(--menu-width-collapse);
	}
	.el-menu--vertical {
		.el-menu-item.is-active {
			background-color: var(--el-menu-active-bg-color);
			// border-left: 3px solid var(--el-menu-active-color);
			// border-radius: 8px;
			&::before {
				content: '';
				position: absolute;
				left: 0;
				height: 100%;
				border-left: 3px solid var(--el-menu-active-color);
			}
		}
	}
	.el-menu--horizontal > .el-menu-item.is-active,
	.el-menu--horizontal > .el-sub-menu.is-active .el-sub-menu__title {
		border-color: transparent;
	}
	.el-menu-item.is-disabled {
		opacity: 0.45;
	}
	.el-menu-item:hover,
	.el-sub-menu__title:hover {
		color: var(--el-menu-hover-text-color);
	}

	&__wrap {
		flex: 1 1 0%;
		// overflow: hidden auto;
	}
}
</style>
