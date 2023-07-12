<script setup>
import { reactive, computed, ref } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'

const parentElRef = ref()
const state = reactive({
	loading: false,
	list: [
		{
			id: 1,
			parentId: 0,
			name: '应用',
			path: '/app',
			permissions: 'app',
			createdAt: '2023-03-01 22:11',
			updatedAt: '2023-03-03 22:11',
			children: [
				{
					id: 11,
					parentId: 1,
					name: '报表',
					path: '/app/dashboard',
					permissions: 'dashboard',
					createdAt: '2023-03-01 22:11'
				}
			]
		},
		{ id: 2, parentId: 0, name: '订单', path: '/app/order', permissions: 'order', createdAt: '2023-03-01 22:11' }
	],

	editItem: {},
	editDrawer: false
})
const parentOpt = computed(() => {
	return [{ id: 0, name: '根目录', children: state.list }]
})

const toggleEditDrawer = () => {
	state.editDrawer = !state.editDrawer
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
			title: '确定要删除该菜单吗？',
			type: 'warning',
			center: true,
			draggable: true
		})
	} catch (e) {
		return
	}
	ElMessage.success('Yes')
}

const editParentChange = () => {
	console.log(55, state.editItem.parentId)
	parentElRef.value.togglePopperVisible()
}
const onSubmit = () => {
	const item = { ...state.editItem }
	item.parentId = !item.parentId ? 0 : item.parentId[item.parentId.length - 1]
	console.log('onSubmit:', item)
}
</script>

<template>
	<div class="text-right mb-8">
		<el-button type="primary" plain @click="onEdit({})">新增菜单</el-button>
	</div>
	<el-table v-loading="state.loading" :data="state.list" row-key="id">
		<el-table-column prop="name" label="菜单名称" />
		<el-table-column prop="path" label="路由(绝对路径)" />
		<el-table-column prop="permissions" label="权限名称" />
		<el-table-column prop="createdAt" label="时间" width="200">
			<template #default="{ row }">
				<p>创建：{{ row.createdAt }}</p>
				<p>更新：{{ row.updatedAt || row.createdAt }}</p>
			</template>
		</el-table-column>
		<el-table-column prop="remark" label="备注">
			<template #default="{ row }">{{ row.remark || '--' }}</template>
		</el-table-column>

		<el-table-column label="操作" width="200" fixed="right">
			<template #default="{ row }">
				<el-button @click="onEdit(row, 'child')" type="primary" text link size="small">子菜单</el-button>
				<el-button @click="onEdit(row, 'copy')" type="primary" text link size="small">复制</el-button>
				<el-button @click="onEdit(row)" type="primary" text link size="small">编辑</el-button>
				<el-button @click="onDelete(row)" type="danger" text link size="small">删除</el-button>
			</template>
		</el-table-column>
	</el-table>
	<!-- 编辑 -->
	<el-drawer
		v-model="state.editDrawer"
		:title="state.editItem.id ? '编辑菜单权限' : '新增菜单权限'"
		size="500px"
		destroy-on-close
	>
		<el-form :model="state.editItem" label-width="80" class="px-24">
			<el-form-item label="上级菜单" prop="parentId" required>
				<el-cascader
					ref="parentElRef"
					v-model="state.editItem.parentId"
					class="w-full"
					:options="parentOpt"
					:props="{ checkStrictly: true, label: 'name', value: 'id' }"
					clearable
					@change="editParentChange"
				/>
			</el-form-item>
			<el-form-item label="菜单名称" prop="name" required>
				<el-input v-model="state.editItem.name" placeholder="请输入" />
			</el-form-item>
			<el-form-item label="路由" prop="path" required>
				<el-input v-model="state.editItem.path" placeholder="请输入" />
			</el-form-item>
			<el-form-item label="权限名称" prop="permissions">
				<el-input v-model="state.editItem.permissions" placeholder="请输入" />
			</el-form-item>
			<el-form-item label="备注" prop="remark">
				<el-input type="textarea" :rows="3" v-model="state.editItem.remark" placeholder="请输入" />
				<p style="font-size: 12px; color: #999999">新增菜单需要在角色管理内配置该菜单权限才可使用</p>
			</el-form-item>
			<el-form-item>
				<el-button @click="onSubmit" type="primary">{{ state.editItem.id ? '保存' : '新增' }}</el-button>
				<el-button @click="toggleEditDrawer">取消</el-button>
			</el-form-item>
		</el-form>
	</el-drawer>
</template>
