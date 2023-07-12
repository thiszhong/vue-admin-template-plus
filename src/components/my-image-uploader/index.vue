<script setup>
import { computed, nextTick, reactive, ref, watch, inject } from 'vue'
import Icon from './icon.vue'
import { ElLoading } from 'element-plus'

import { debounce, getStorage, setStorage } from '@/utils'

const props = defineProps({
	// [{ url, name?, ...rest }]
	modelValue: {
		type: Array,
		default: () => []
	},
	// 是否开启素材面板
	material: {
		type: Boolean,
		default: true
	},
	// 提示说明文字
	tip: String,
	limit: {
		type: Number,
		default: 1
	},
	// 上传处理函数 (uploadFile: UploadFile) => Promise<Object>
	// Object: { url: '必填', name: '选填', ...其他自定义参数 }
	upload: {
		type: Function
	},
	// TODO: 上传是否压缩
	compress: {
		type: Boolean,
		default: true
	},
	accept: {
		type: String,
		default: 'image/*'
	},
	// 是否以绝对定位撑满父盒子，此时opacity为0，适用于自定义上传元素及展示
	full: {
		type: Boolean,
		default: false
	}
})
const emits = defineEmits(['update:modelValue', 'change'])

const ImgTabs = {
	recent: 'recent'
}
// 单次最多3张
const MaxCountOnce = 3
// 本地最多缓存数据量
const MaxCountLocal = 200
const KeyRecent = 'myImgRecent'

const popUploaderRef = ref()
const state = reactive({
	fileList: [],
	// urls
	checkedList: [],
	urlInput: '',
	urlErr: '',

	pop: false,
	activeTab: ImgTabs.recent,
	uploading: false
})
const materialState = reactive({
	// [{ name: '', url: '' }]
	[ImgTabs.recent]: getStorage(KeyRecent) || []
})
const currentLength = computed(() => state.fileList?.length || 0)
watch(
	() => props.modelValue,
	(val) => {
		if (JSON.stringify(val) === JSON.stringify(state.fileList)) return
		state.fileList = val
	},
	{ immediate: true }
)
watch(
	() => state.fileList,
	(val) => {
		if (val.some((item) => item.url?.startsWith('blob:'))) return
		if (JSON.stringify(val) === JSON.stringify(props.modelValue)) return
		emits('update:modelValue', val)
		emits('change', val)
	}
)
// 选中态不跨 Tab？
watch(
	() => state.activeTab,
	(val, oldVal) => {
		if (val === oldVal) return
		// state.checkedList = []
	}
)

const clickAdd = () => {
	state.pop = true
}

// 素材去重
const deWeight = (url) => {
	const listLen = materialState[state.activeTab].length
	for (let i = 0; i < listLen; i++) {
		if (materialState[state.activeTab][i].url === url) {
			materialState[state.activeTab].splice(i, 1)
			// 每次都做去重，这里才可以 break
			break
		}
	}
}
// 添加图片到本地素材库
const addMaterial = (data, opt) => {
	if (!data) return
	let arr
	if (Array.isArray(data)) arr = data
	else if (typeof data === 'string') arr = [{ url: data }]
	else arr = [{ ...data }]
	if (opt?.deWeight) {
		arr.forEach((item) => deWeight(item.url))
	}
	materialState[state.activeTab] = arr.concat(materialState[state.activeTab])
	if (materialState[state.activeTab].length > MaxCountLocal) {
		materialState[state.activeTab].length = MaxCountLocal
	}
	setStorage(KeyRecent, materialState[state.activeTab])
}
// 待上传列表
let uploadList
const uploadFnInjected = inject('MyImageUpload', null)
const handleUpload = debounce(async () => {
	const len = uploadList?.length
	if (state.uploading || !len) return
	state.uploading = ElLoading.service({ target: popUploaderRef.value })
	const uploadFn = props.upload || uploadFnInjected
	const arr = []
	for (let i = 0; i < len; i++) {
		// TODO: 压缩，是在这儿不
		arr.push(uploadFn(uploadList[i]))
	}
	try {
		const res = await Promise.all(arr)
		const imgFiles = res.map((item, index) => {
			deWeight(item.url) // 副作用
			const originItem = uploadList[index]
			return { name: originItem.name, size: originItem.size, ...item }
		})
		addMaterial(imgFiles)
		if (!props.material) {
			const diff = imgFiles.length - (props.limit - currentLength.value)
			if (diff > 0) arr.splice(0, diff)
			state.fileList = state.fileList.concat(imgFiles)
		}
	} catch (e) {
		// eslint-disable-next-line
		console.info('MyImageUploader.upload:', e)
	}
	state.uploading.close()
	state.uploading = null
}, 100)
const fileChanged = (file) => {
	if (!props.material) {
		// hack: fix ElUpload 的默认塞数据行为
		nextTick(() => {
			state.fileList = state.fileList.filter((item) => !item.url || !item.url.startsWith('blob:'))
		})
	}
	if (state.uploading) return
	const uploadFn = props.upload || uploadFnInjected
	if (typeof uploadFn !== 'function') {
		// eslint-disable-next-line
		return console.info('MyImageUploader:', '请正确设置 upload 参数（Promise函数）')
	}
	if (!uploadList) uploadList = []
	if (uploadList.length >= MaxCountOnce) {
		// eslint-disable-next-line
		console.info('MyImageUploader:', `单次最多上传${MaxCountOnce}张`)
	} else {
		uploadList.push(file)
		handleUpload()
	}
}

const handleRemove = (e) => {
	// 触发watch
	state.fileList = state.fileList.slice()
}
const handlePreview = (e) => {
	window.open(e.url)
}
const checkImg = (item) => {
	const i = state.checkedList.findIndex((e) => e === item.url)
	if (i !== -1) {
		state.checkedList.splice(i, 1)
	} else {
		if (state.checkedList.length >= props.limit) state.checkedList.shift()
		state.checkedList.push(item.url)
	}
}

const onConfirm = () => {
	state.pop = false
	if (!state.checkedList.length) return
	const arr = state.checkedList.map((url) => {
		const len = materialState[state.activeTab].length
		for (let i = 0; i < len; i++) {
			if (url === materialState[state.activeTab][i].url) {
				return materialState[state.activeTab][i]
			}
		}
	})
	const diff = arr.length - (props.limit - currentLength.value)
	if (diff > 0) arr.splice(0, diff)
	state.fileList = state.fileList.concat(arr)
	state.checkedList.length = 0
}
const confirmInput = () => {
	const val = state.urlInput.trim()
	if (!val.startsWith('http') || val.length < 14) {
		state.urlErr = '链接不合法'
		return
	}
	state.urlErr = ''
	addMaterial(val, { deWeight: true })
	state.urlInput = ''
}
</script>

<template>
	<div class="my-img-loader" :class="{ full: full }">
		<div class="my-img-loader__place" :class="{ overlimit: currentLength >= limit }">
			<ElUpload
				v-model:file-list="state.fileList"
				list-type="picture-card"
				:accept="accept"
				:multiple="material || limit > 1"
				:limit="limit"
				:on-remove="handleRemove"
				:on-preview="handlePreview"
				:disabled="!!state.uploading"
				:auto-upload="false"
				:on-change="fileChanged"
			>
				<div class="my-img-loader__in">
					<Icon style="width: 3em; height: 3em; margin-bottom: 4px" />
					<p>添加图片</p>
					<div v-if="material" class="my-img-loader__pmask" @click.stop="clickAdd"></div>
				</div>
				<template v-if="tip" #tip>
					<div class="el-upload__tip">{{ tip }}</div>
				</template>
			</ElUpload>
		</div>

		<!-- 素材面板 -->
		<ElDialog v-model="state.pop" title="添加图片" :append-to-body="true" modal-class="my-img-loader__pop">
			<ElTabs v-model="state.activeTab" type="card">
				<ElTabPane label="最近上传" :name="ImgTabs.recent" lazy>
					<ElScrollbar max-height="60vh">
						<!-- 添加链接 -->
						<div style="width: 100%; margin-bottom: 11px">
							<ElInput
								style="max-width: calc(var(--gallery-img-size) * 2 + var(--gallery-img-space))"
								v-model="state.urlInput"
								placeholder="输入图片链接后按回车键直接添加"
								clearable
								@keyup.enter="confirmInput"
							/>
							<span v-if="state.urlErr" style="color: var(--el-color-danger); padding: 0 5px">{{ state.urlErr }}</span>
						</div>
						<!-- 上传 -->
						<ElUpload
							class="my-img-loader__ploader"
							:accept="accept"
							drag
							list-type="picture"
							:show-file-list="false"
							multiple
							:disabled="!!state.uploading"
							:auto-upload="false"
							:on-change="fileChanged"
						>
							<div class="my-img-loader__in" ref="popUploaderRef">
								<Icon name="upload" style="width: 3em; height: 3em; margin-bottom: 4px" />
								<p>拖拽图片至此或点击上传</p>
								<div class="el-upload__tip">单次最多{{ MaxCountOnce }}张</div>
								<div v-if="tip" class="el-upload__tip">{{ tip }}</div>
							</div>
						</ElUpload>
						<div
							v-for="item in materialState[state.activeTab]"
							:key="item.url"
							class="my-img-loader__gallery-img"
							:class="{ checked: state.checkedList.includes(item.url) }"
							@click="checkImg(item)"
						>
							<ElImage :src="item.url" loading="lazy" fit="cover" preview-teleported />
							<div class="my-img-loader__img-info">
								<p>尺寸：--x--</p>
								<p v-if="item.name">{{ item.name }}</p>
							</div>
							<div class="my-img-loader--checked">
								<Icon name="checked" style="width: 32px; height: 32px" />
							</div>
						</div>
					</ElScrollbar>
				</ElTabPane>
				<ElTabPane label="官方素材" name="second" lazy>
					<el-empty description="敬请期待～" />
				</ElTabPane>
			</ElTabs>

			<template #footer>
				<small>已选（{{ state.checkedList.length }}）</small>
				<ElButton type="primary" @click="onConfirm">确定</ElButton>
			</template>
		</ElDialog>
	</div>
</template>

<style lang="scss">
.my-img-loader {
	--img-width: 148px;
	--img-height: 148px;
	--my-gallery-img-size: 148px;
	&.full {
		position: absolute;
		z-index: 1;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		opacity: 0;
		.el-upload-list__item {
			display: none;
		}
	}

	&__place {
		position: relative;
		&.overlimit {
			.el-upload {
				display: none;
			}
		}
	}
	&__pmask {
		position: absolute;
		z-index: 9;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
	}
	.el-upload-list--picture-card {
		--el-upload-list-picture-card-size: var(--img-width, 148px);
		.el-upload-list__item {
			width: var(--img-width);
			height: var(--img-height);
		}
	}
	.el-upload--picture-card {
		--el-upload-picture-card-size: var(--img-width, 148px);
		width: var(--img-width);
		height: var(--img-height);
	}

	&__in {
		position: relative;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	&__pop {
		--gallery-img-space: 10px;
		--gallery-img-size: var(--my-gallery-img-size, 148px);

		.el-dialog {
			--el-dialog-width: 80%;

			max-width: 1400px;
		}
		.el-dialog__title {
			font-weight: bold;
		}
		.el-dialog__body {
			padding-top: 11px;
			padding-bottom: 11px;
			min-height: 440px;
		}
		.el-scrollbar__view {
			display: flex;
			flex-wrap: wrap;
		}
	}
	&__ploader {
		display: inline-block;
		width: calc(var(--gallery-img-size) * 2 + var(--gallery-img-space));
		height: var(--gallery-img-size);
		margin: 0 var(--gallery-img-space) var(--gallery-img-space) 0;

		.el-upload-dragger {
			padding: 0;
			background: var(--el-bg-color-page);
			&:hover {
				color: var(--el-color-primary);
			}
		}
		.el-upload,
		.el-upload-dragger {
			height: 100%;
		}
	}
	&__gallery-img {
		width: var(--gallery-img-size);
		height: var(--gallery-img-size);
		margin: 0 var(--gallery-img-space) var(--gallery-img-space) 0;
		border-radius: 6px;
		overflow: hidden;
		position: relative;
		cursor: pointer;
		box-sizing: border-box;
		&.checked {
			border: 2px solid var(--el-color-primary);
			.my-img-loader--checked {
				display: flex;
			}
			.my-img-loader__img-info {
				background-color: var(--el-color-primary);
			}
		}
		& > .el-image {
			width: 100%;
			height: 100%;
		}
	}
	&__img-info {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		padding: 4px;
		font-size: 12px;
		color: var(--el-color-white);
		background: rgba(0, 0, 0, 0.4);
		p {
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}
	&--checked {
		display: none;
		justify-content: center;
		align-items: center;
		color: var(--el-color-primary);
		position: absolute;
		top: 0;
		right: 0;
		width: 32px;
		height: 32px;
		background: rgba(255, 255, 255, 0.2);
		border-radius: 50%;
	}
}
</style>
