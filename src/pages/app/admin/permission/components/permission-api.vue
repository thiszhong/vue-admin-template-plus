<script setup>
import { reactive, ref } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'

const methodList = [
	{ label: 'GET', value: 'GET' },
	{ label: 'POST', value: 'POST' },
	{ label: 'PUT', value: 'PUT' },
	{ label: 'DELETE', value: 'DELETE' }
]

const formRef = ref()
const formState = reactive({
	name: '',
	group: '',
	api: ''
})
const state = reactive({
	loading: false,
	list: [
		{
			id: 1,
			name: '报表',
			api: '/api/v1/dashboard',
			group: 'app',
			method: 'GET',
			createdAt: '2023-03-01 22:11',
			updatedAt: '2023-03-03 22:11'
		},
		{ id: 2, name: '订单', api: '/api/v1/order', group: 'order', method: 'POST', createdAt: '2023-03-01 22:11' }
	],

	editItem: {},
	editDrawer: false
})

const toggleEditDrawer = () => {
	state.editDrawer = !state.editDrawer
}

const getData = (action) => {}
const onReset = () => {
	formRef.value.resetFields()
}

const onEdit = ({ ...item }, action) => {
	if (action === 'copy') {
		delete item.id
	}
	if (action === 'child') {
		item.parentId = item.id
		delete item.id
	}
	state.editItem = item
	toggleEditDrawer()
}
const onDelete = async (item) => {
	try {
		await ElMessageBox.confirm(`[${item.name}]`, {
			title: '确定要删除该API吗？',
			type: 'warning',
			center: true,
			draggable: true
		})
	} catch (e) {
		return
	}
	ElMessage.success('Yes')
}

const onSubmit = () => {
	const item = { ...state.editItem }
	item.parentId = !item.parentId ? 0 : item.parentId[item.parentId.length - 1]
	console.log('onSubmit:', item)
}
</script>

<template>
	<MyFormContainer>
		<el-form :model="formState" ref="formRef" inline>
			<el-form-item label="名称" prop="name">
				<el-input v-model="formState.name" placeholder="请输入" />
			</el-form-item>
			<el-form-item label="分组" prop="group">
				<el-input v-model="formState.group" placeholder="请输入" />
			</el-form-item>
			<el-form-item label="地址" prop="api">
				<el-input v-model="formState.api" placeholder="请输入" />
			</el-form-item>
			<el-form-item>
				<el-button @click="getData('reset')" type="primary">查询</el-button>
				<el-button @click="onReset">重置</el-button>
			</el-form-item>
		</el-form>
	</MyFormContainer>

	<div class="text-right mb-8">
		<el-button type="primary" plain @click="onEdit({})">新增API</el-button>
	</div>

	<el-table v-loading="state.loading" :data="state.list">
		<el-table-column prop="id" label="ID" width="72" />
		<el-table-column prop="name" label="API名称" min-width="72" />
		<el-table-column prop="group" label="分组" width="90" />
		<el-table-column prop="api" label="API地址" min-width="120" />
		<el-table-column prop="remark" label="请求方式">
			<template #default="{ row }">
				<el-tag :type="row.method === 'POST' ? 'success' : ''" plain>{{ row.method }}</el-tag>
			</template>
		</el-table-column>
		<el-table-column prop="createdAt" label="时间" width="210">
			<template #default="{ row }">
				<p>创建：{{ row.createdAt }}</p>
				<p>更新：{{ row.updatedAt || row.createdAt }}</p>
			</template>
		</el-table-column>

		<el-table-column label="操作" width="150" fixed="right">
			<template #default="{ row }">
				<el-button @click="onEdit(row, 'copy')" type="primary" text link size="small">复制</el-button>
				<el-button @click="onEdit(row)" type="primary" text link size="small">编辑</el-button>
				<el-button @click="onDelete(row)" type="danger" text link size="small">删除</el-button>
			</template>
		</el-table-column>
	</el-table>

	<MyPagination
		v-model:page="formState.page"
		v-model:page-size="formState.pageSize"
		:total="state.total"
		@change="getData('reset')"
	></MyPagination>

	<!-- 编辑 -->
	<el-drawer
		v-model="state.editDrawer"
		:title="state.editItem.id ? '编辑API权限' : '新增API权限'"
		size="500px"
		destroy-on-close
	>
		<el-form :model="state.editItem" label-width="96" class="px-24">
			<el-form-item label="API名称" prop="name" required>
				<el-input v-model="state.editItem.name" placeholder="请输入" />
			</el-form-item>
			<el-form-item label="分组" prop="group" required>
				<el-input v-model="state.editItem.group" placeholder="请输入" />
			</el-form-item>
			<el-form-item label="API地址" prop="api">
				<el-input v-model="state.editItem.api" placeholder="请输入" />
			</el-form-item>
			<el-form-item label="请求方式：" prop="method" required>
				<el-select v-model="state.editItem.method" placeholder="请选择" class="w-full">
					<el-option v-for="item in methodList" :label="item.label" :value="item.value" />
				</el-select>
				<p class="t-12" style="color: #999">新增菜单需要在角色管理内配置该菜单权限才可使用</p>
			</el-form-item>

			<el-form-item>
				<el-button @click="onSubmit" type="primary">{{ state.editItem.id ? '保存' : '新增' }}</el-button>
				<el-button @click="toggleEditDrawer">取消</el-button>
			</el-form-item>
		</el-form>
	</el-drawer>
</template>
