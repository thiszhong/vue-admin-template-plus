<script setup lang="ts">
import { mixProps } from './props'
import * as Icons from './iconify-icon-data'

const props = defineProps(mixProps)

const icon = props.name && (Icons as any)[props.name]?.default
</script>

<template>
	<el-icon :color="props.color" :size="props.size">
		<component :is="icon" />
	</el-icon>
</template>
