<script setup lang="ts">
import MainContainer from '@/components/main-container/index.vue'
import { ref } from 'vue'

let tableData = [
	{
		date: '2016-05-03',
		name: 'Tom',
		address: 'No. 189, Grove St, Los Angeles'
	},
	{
		date: '2016-05-02',
		name: 'Tom',
		address: 'No. 189, Grove St, Los Angeles'
	},
	{
		date: '2016-05-04',
		name: 'Tom',
		address: 'No. 189, Grove St, Los Angeles'
	},
	{
		date: '2016-05-01',
		name: 'Tom',
		address: 'No. 189, Grove St, Los Angeles'
	}
]
while (tableData.length < 60) {
	tableData = tableData.concat(tableData)
}

const oneScreen = ref(true)
</script>

<template>
	<MainContainer title="一个表格" :one-screen="oneScreen">
		<template #header-action>
			<el-button :type="oneScreen ? 'default' : 'primary'" @click="oneScreen = false">铺开用浏览器滚动</el-button>
			<el-button :type="!oneScreen ? 'default' : 'primary'" @click="oneScreen = true">一屏显示，局部滚动</el-button>
		</template>
		<el-table :data="tableData" stripe style="width: 100%">
			<el-table-column prop="date" label="Date" width="180" />
			<el-table-column prop="name" label="Name" width="180" />
			<el-table-column prop="address" label="Address" />
		</el-table>
		<template #footer>
			<el-row align="middle" justify="center" style="height: 50px">
				<el-button type="primary" plain>Footer</el-button>
			</el-row>
		</template>
	</MainContainer>
</template>
