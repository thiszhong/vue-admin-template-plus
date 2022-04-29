<script lang="ts">
import { defineComponent } from 'vue'
// ./layout-side-menu 中处理菜单数据时会用到这个 name
export default defineComponent({
	name: 'MyLayout'
})
</script>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, computed } from 'vue'
import LayoutSideMenu from './layout-side-menu.vue'
import LayoutHeader from './layout-header.vue'
import LayoutBreadcrumb from './layout-breadcrumb.vue'

// 当页面有滚动条时，一般弹窗时会阻止页面滚动而隐藏滚动条，
// 会对一些有定位属性的元素造成宽度抖动，比如 header--fixed，这里主要针对 element-plus 的弹窗
const popupHiddenPaddingRight = ref('')
const style = computed(() => `--popup-hidden-padding-right:${popupHiddenPaddingRight.value}`)
let bodyObserver: MutationObserver
const bodyStyleChange = (mutations: MutationRecord[], observer: MutationObserver) => {
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
		<LayoutSideMenu />
		<section class="my-layout__r">
			<LayoutHeader />
			<LayoutBreadcrumb />
			<router-view v-slot="{ Component, route }">
				<!-- <transition name="el-zoom-in-center" mode="out-in"> -->
				<component :is="Component" :key="route.path" />
				<!-- </transition> -->
			</router-view>
		</section>
	</div>
</template>

<style lang="less">
.my-layout {
	--side-menu-width: 208px;
	--side-menu-width-collapse: 64px;
	--side-menu-bg-color: #001529;
	--header-height: 60px;
	--header-text-color: #fff;
	--header-bg-color: #002140;
	--header-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
	--breadcrumb-height: 50px;
	--breadcrumb-bg-color: #fff;
	--breadcrumb-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

	display: flex;
	align-items: flex-start;
	min-height: 100vh;
	background-color: #f0f2f5;

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
