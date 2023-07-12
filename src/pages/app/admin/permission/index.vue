<script setup>
import { reactive, ref, onMounted } from 'vue'

import PermissionMenu from './components/permission-menu.vue'
import PermissionApi from './components/permission-api.vue'

const TabNames = { api: 'api', menu: 'menu' }

const state = reactive({
	tab: TabNames.menu
})

const searchForm = ref()
const infoVisible = ref(false)
const menuDrawer = ref(false)
const apiDrawer = ref(false)
const authType = ref(1)

const searchParams = reactive({
	name: '',
	page: 1,
	pageSize: 10
})
const menuForm = reactive({
	id: 0,
	name: '',
	path: '',
	method: 0,
	type: 0
})

const methodList = [
	{ label: 'GET', value: 1 },
	{ label: 'POST', value: 2 },
	{ label: 'PUT', value: 3 },
	{ label: 'DELETE', value: 4 }
]
const onSubmit = () => {
	// searchParams.page = 1
	getApisList(searchParams)
}

const onReset = () => {
	searchForm.value?.resetFields()
	getApisList(searchParams)
}

const onMenuEdit = (row) => {
	if (row?.id) Object.assign(menuForm, row)
	menuDrawer.value = true
}

const onApiEdit = (row) => {
	if (row?.id) Object.assign(menuForm, row)
	apiDrawer.value = true
}

const onDelete = (row) => {
	ElMessageBox.confirm('确定删除该品牌吗？', '提示', {
		type: 'warning'
	}).then(() => {})
}

onMounted(() => {})
</script>

<template>
	<MainContainer padding="24px var(--space)">
		<!-- <div class="absolute" style="z-index: 9; right: var(--space); top: 24px">
			<el-button v-if="authType === 1" type="primary" plain @click="onMenuEdit">新增菜单</el-button>
			<el-button v-else @click="onApiEdit" type="primary">新增API</el-button>
		</div> -->

		<el-tabs v-model="state.tab" type="card">
			<el-tab-pane label="菜单权限" :name="TabNames.menu">
				<PermissionMenu />
			</el-tab-pane>
			<el-tab-pane label="API权限" :name="TabNames.api">
				<PermissionApi />
			</el-tab-pane>
		</el-tabs>

		<!-- 菜单权限编辑 -->
		<el-drawer v-model="menuDrawer" :title="menuForm.id ? '编辑菜单' : '新增菜单'" size="35%">
			<el-form :model="menuForm" label-width="100">
				<el-form-item label="名称：" prop="name">
					<el-select v-model="menuForm.name" placeholder="请选择" style="width: 100%">
						<el-option label="Zone one" value="shanghai" />
						<el-option label="Zone two" value="beijing" />
					</el-select>
				</el-form-item>
				<el-form-item label="权限名称：" prop="name">
					<el-input v-model="menuForm.name" placeholder="请输入" />
				</el-form-item>
				<el-form-item label="备注：" prop="name">
					<el-input type="textarea" :rows="3" v-model="menuForm.name" placeholder="请输入" />
					<p style="font-size: 12px; color: #999999">新增菜单需要在角色管理内配置该菜单权限才可使用</p>
				</el-form-item>
				<el-form-item>
					<el-button @click="onSubmit" type="primary">{{ menuForm.id ? '保存' : '新增' }}</el-button>
					<el-button @click="onReset">取消</el-button>
				</el-form-item>
			</el-form>
		</el-drawer>
		<!-- API权限编辑 -->
		<el-drawer v-model="apiDrawer" :title="menuForm.id ? '编辑API' : '新增API'" size="35%">
			<el-form :model="menuForm" label-width="100">
				<el-form-item label="API名称：" prop="name">
					<el-input v-model="menuForm.name" placeholder="请输入" />
				</el-form-item>
				<el-form-item label="API地址：" prop="path">
					<el-input v-model="menuForm.path" placeholder="请输入" />
				</el-form-item>
				<el-form-item label="请求方式：" prop="method">
					<el-select v-model="menuForm.method" placeholder="请选择" style="width: 100%">
						<el-option v-for="item in methodList" :label="item.label" :value="item.value" />
					</el-select>
				</el-form-item>
				<el-form-item label="API分组：" prop="type">
					<el-input v-model="menuForm.type" placeholder="请输入" />
					<p style="font-size: 12px; color: #999999">新增菜单需要在角色管理内配置API权限才可使用</p>
				</el-form-item>

				<el-form-item>
					<el-button @click="onSubmit" type="primary">{{ menuForm.id ? '保存' : '新增' }}</el-button>
					<el-button @click="onReset">取消</el-button>
				</el-form-item>
			</el-form>
		</el-drawer>
	</MainContainer>
</template>

<style lang="scss"></style>
