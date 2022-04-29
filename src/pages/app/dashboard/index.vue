<script setup lang="ts">
import { reqSomething } from '@/api'
import { onMounted } from 'vue'

onMounted(() => {
	reqSomething()
})
</script>

<template>
	<MainContainer one-screen>
		<h4>hello dashboard</h4>
		<p>测试一个接口请求全局错误处理</p>
	</MainContainer>
	<footer style="height: 40px">
		<el-row justify="center">©2022</el-row>
	</footer>
</template>
