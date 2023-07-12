<script>
// side-menu 中处理菜单数据时会用到这个 name
export default { name: 'MyLayout' }
</script>

<script setup>
import { onMounted, onUnmounted, ref, computed } from 'vue'
import LayoutMenu from './layout-menu.vue'
import LayoutHeader from './layout-header.vue'
import LayoutBreadcrumb from './layout-breadcrumb.vue'
import { useGlobalLayout, MenuMode } from '@/hooks'
import { themeConfig } from '@/config'

const { state } = useGlobalLayout()
const topMenu = computed(() => state.menuMode === MenuMode.top)

// 当页面有滚动条时，一般弹窗时会阻止页面滚动而隐藏滚动条，
// 会对一些有定位属性的元素造成宽度抖动，比如 header--fixed，这里主要针对 element-plus 的弹窗
const popupHiddenPaddingRight = ref('')
const style = computed(() => {
	return `--popup-hidden-padding-right:${popupHiddenPaddingRight.value};--breadcrumb-height:${
		themeConfig.breadcrumb ? '50px' : '0px'
	};`
})
let bodyObserver
const bodyStyleChange = (mutations, observer) => {
	if (mutations[0].attributeName !== 'class') return
	popupHiddenPaddingRight.value = document.body.style.paddingRight
}
onMounted(() => {
	if (window.MutationObserver) {
		bodyObserver = new MutationObserver(bodyStyleChange)
		bodyObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] })
	}
})
onUnmounted(() => {
	bodyObserver?.disconnect()
})
</script>

<template>
	<div class="my-layout" :style="style">
		<LayoutMenu v-if="!topMenu" />
		<section class="my-layout__r">
			<LayoutHeader />
			<LayoutBreadcrumb v-if="themeConfig.breadcrumb" />
			<router-view v-slot="{ Component, route }">
				<!-- <transition name="el-zoom-in-center" mode="out-in"> -->
				<component :is="Component" :key="route.path" />
				<!-- </transition> -->
			</router-view>
		</section>
	</div>
</template>

<style lang="scss">
.my-layout {
	--menu-width: 224px;
	--menu-width-collapse: 64px;
	--menu-text-color: #333;
	--menu-hover-text-color: var(--color-primary);
	--menu-active-color: var(--color-primary);
	--menu-active-bg-color: var(--color-primary-light);
	// 一级菜单块选中时的背景
	--menu-active-block-bg: none;
	--menu-height: 50px;
	--header-height: 56px;
	--header-text-color: #444;
	--header-hover-text-color: var(--color-primary);
	--header-bg-color: var(--color-white, #fff);
	--header-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
	// --header-shadow: none;
	// --breadcrumb-height: 50px; // style里动态
	--breadcrumb-bg-color: var(--color-white, #fff);
	--breadcrumb-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

	&:not(.el-menu--popup-container, .el-popper) {
		--menu-bg-color: #f6f8f9;

		display: flex;
		align-items: flex-start;
		min-height: 100vh;
	}

	.el-menu {
		--el-menu-active-color: var(--menu-active-color, #fff);
		--el-menu-text-color: var(--menu-text-color, rgba(255, 255, 255, 0.65));
		--el-menu-hover-text-color: var(--menu-hover-text-color, #fff);
		--el-menu-hover-bg-color: none;
		--el-menu-active-bg-color: var(--menu-active-bg-color);
		--el-menu-item-height: var(--menu-height, 50px);
		--el-menu-sub-item-height: calc(var(--el-menu-item-height) - 6px);
		--el-menu-border-color: transparent;
		&:not(.el-menu--horizontal) {
			--el-menu-bg-color: var(--menu-bg-color);
		}

		// font-weight: 500;
		.el-menu {
			background-color: transparent;
		}
		.my-icon {
			vertical-align: middle;
			margin-right: 5px;
			width: var(--el-menu-icon-width);
			text-align: center;
			font-size: 18px;
			flex-shrink: 0;
		}
	}

	&__r {
		min-height: 100vh;
		flex: 1;
		overflow: hidden auto;
		display: flex;
		flex-direction: column;
	}
}

// fade-transform
.fade-transform-leave-active,
.fade-transform-enter-active {
	transition: all 0.5s;
}
.fade-transform-enter {
	opacity: 0;
	transform: translateX(-30px);
}
.fade-transform-leave-to {
	opacity: 0;
	transform: translateX(30px);
}
</style>
