<script setup lang="ts">
import { useGlobalLayout } from '@/hooks'
import MyIcon from '../my-icon/index.vue'

const props = defineProps<{
	size?: string | number
	color?: string
}>()

const { state, toggleSideMenu } = useGlobalLayout()
const onClick = () => toggleSideMenu()
</script>

<template>
	<div style="line-height: 0; padding: 10px 20px; cursor: pointer" @click="onClick">
		<MyIcon
			:class="{ rotate180: state.sideMenuCollapse }"
			name="AntDesignMenuFoldOutlined"
			:size="props.size || 22"
			:color="props.color"
		/>
	</div>
</template>

<style>
.rotate180 {
	transform: rotate(180deg);
}
</style>
