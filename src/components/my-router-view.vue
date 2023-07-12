<script setup>
// import { watch } from 'vue'
// import { useRoute } from 'vue-router'

// const cacheList = []
// const route = useRoute()
// watch(
// 	route,
// 	(val) => {
// 		const name = route.matched[route.matched.length - 1].components.default.name
// 		if (val.meta?.keepAlive && name && !cacheList.includes(name)) {
// 			cacheList.push(name)
// 		}
// 	},
// 	{ immediate: true }
// )
</script>

<template>
	<router-view> </router-view>
</template>
