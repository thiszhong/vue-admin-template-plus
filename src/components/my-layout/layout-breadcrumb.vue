<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import ToggleMenuBar from './toggle-menu-bar.vue'

const route = useRoute()
const list = computed(() => {
	return route.matched.filter((item) => item.meta?.title && !item.meta.hiddenInBreadcrumb)
})
</script>

<template>
	<el-row tag="nav" align="middle" class="layout-breadcrumb">
		<ToggleMenuBar />
		<el-breadcrumb separator="/">
			<transition-group name="breadcrumb">
				<el-breadcrumb-item
					v-for="(item, index) in list"
					:key="item.path"
					:to="index === list.length - 1 ? undefined : item"
				>
					{{ item.meta.title }}
				</el-breadcrumb-item>
			</transition-group>
		</el-breadcrumb>
	</el-row>
</template>

<style lang="less">
.layout-breadcrumb {
	height: var(--breadcrumb-height);
	background-color: var(--breadcrumb-bg-color);
	box-shadow: var(--breadcrumb-shadow);
}
// breadcrumb transition
.breadcrumb-enter-active,
.breadcrumb-leave-active {
	transition: all 0.5s;
}
.breadcrumb-enter,
.breadcrumb-leave-active {
	opacity: 0;
	transform: translateX(20px);
}
.breadcrumb-move {
	transition: all 0.5s;
}
.breadcrumb-leave-active {
	position: absolute;
}
</style>
