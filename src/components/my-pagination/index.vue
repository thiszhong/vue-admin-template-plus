<script>
import { defineComponent } from 'vue'
export default defineComponent({
	name: 'MyPagination'
})
</script>
<script setup>
const props = defineProps({
	page: {
		type: Number,
		default: 1
	},
	pageSize: {
		type: Number,
		default: 20
	},
	total: {
		type: Number,
		default: 0
	},
	hideOnSinglePage: {
		type: Boolean,
		default: false
	},
	layout: {
		type: String,
		default: 'total,prev, pager, next, sizes'
	},
	background: {
		type: Boolean,
		default: true
	}
})
const emits = defineEmits(['update:page', 'update:page-size', 'change'])
const sizeChange = (n) => {
	emits('update:page-size', n)
	emits('change', { page: props.page, pageSize: n })
}
const pageChange = (page) => {
	emits('update:page', page)
	emits('change', { page, pageSize: props.pageSize })
}
</script>
<template>
	<div class="flex justify-end mt-16">
		<el-pagination
			class="my-pagination"
			:background="background"
			:hide-on-single-page="hideOnSinglePage"
			:current-page="page"
			:page-size="pageSize"
			:page-sizes="[5, 10, 20, 40, 100]"
			:total="total"
			:pager-count="5"
			:layout="layout"
			@current-change="pageChange"
			@size-change="sizeChange"
		/>
	</div>
</template>
