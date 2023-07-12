<script setup>
import { ref } from 'vue'
import MyIcon from '@/components/my-icon/index.vue'

import s from '@/assets/icons/activity.svg'

const hh = ref('ri:alipay-line')
</script>

<template>
	<MainContainer>
		<h2>Menu Level3-1</h2>
		<div class="i-ep-add-location"></div>
		<my-icon :name="hh" color="linear-gradient(to right, red, blue)" size="48px" />
		<my-icon name="activity" color="linear-gradient(to right, red, blue)" size="48px" />
		<img :src="s" alt="" />
	</MainContainer>
</template>
