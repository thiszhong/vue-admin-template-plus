<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
	// @ts-ignore
	...RouterLink.props,
	target: {
		type: String,
		default: '_blank'
	}
})
const isExternalLink = computed(() => typeof props.to === 'string' && props.to.startsWith('http'))
</script>

<template>
	<a v-if="isExternalLink" v-bind="$attrs" :href="props.to" :target="props.target">
		<slot />
	</a>
	<router-link v-else v-bind="$props">
		<slot />
	</router-link>
</template>
