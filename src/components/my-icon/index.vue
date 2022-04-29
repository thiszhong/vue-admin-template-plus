<script setup lang="ts">
import { mixProps } from './props'
import IconifyIcon from './iconify-icon.vue'

const props = defineProps(mixProps)
</script>

<template>
	<IconifyIcon v-bind="props" />
</template>
