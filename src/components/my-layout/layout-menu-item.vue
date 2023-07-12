<script setup>
import MyIcon from '../my-icon/index.vue'

import { computed } from 'vue'

const props = defineProps({
	route: Object
})
const emits = defineEmits(['click'])

const meta = computed(() => {
	return { ...props.route.meta }
})
</script>

<template>
	<el-sub-menu v-if="route.children" :index="route.fullpath" popper-class="my-layout">
		<template #title>
			<MyIcon v-if="meta.icon" :name="meta.icon" size="none" />
			<span>{{ meta.title }}</span>
		</template>
		<LayoutMenuItem
			v-for="(menu, mIndex) in route.children"
			:key="mIndex"
			:route="menu"
			@click="emits('click', $event)"
		/>
	</el-sub-menu>
	<el-menu-item v-else :index="route.fullpath" @click="emits('click', route)">
		<MyIcon v-if="meta.icon" :name="meta.icon" size="none" />
		<span>{{ meta.title }}</span>
	</el-menu-item>
</template>
