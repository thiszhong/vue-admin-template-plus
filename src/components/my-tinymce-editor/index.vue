<script>
import { defineComponent, reactive, ref, watch } from 'vue'
import { createUniqueId } from '@/utils'

import Icon from '../my-image-uploader/icon.vue'
import Editor from '@tinymce/tinymce-vue'

export default defineComponent({
	name: 'MyTinymceEditor',
	components: { Icon, Editor },
	emits: ['update:modelValue', 'change'],
	props: {
		modelValue: {
			type: String,
			default: ''
		},
		disabled: {
			type: Boolean,
			default: false
		},
		height: {
			type: [Number, String],
			default: 400
		},
		width: {
			type: [Number, String]
		},
		plugins: {
			type: [String, Array],
			default: 'lists table emoticons code image'
		},
		toolbar: {
			type: [String, Array],
			default:
				'undo redo | styles | bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify | emoticons outdent indent'
		},
		// 同 ImageUploader 的该属性
		upload: {
			type: Function
		}
	},
	setup(props, { emit }) {
		const uniqueId = createUniqueId({ prefix: 'tinymce' })
		let editorInstance

		const state = reactive({
			initialized: false,
			addingImg: []
		})
		const content = ref('')
		watch(
			() => props.modelValue,
			(val) => {
				if (val !== content.value) content.value = val
			},
			{ immediate: true }
		)
		watch(content, (val) => {
			if (val === props.modelValue) return
			emit('update:modelValue', val)
			emit('change', val)
		})

		// 可以换成自己的 cdn
		// const libUri = '//unpkg.com/tinymce@6.5.1'
		const libUri = '/tinymce@6.5.1'
		const init = {
			selector: `#${uniqueId}`,
			language: 'zh-Hans',
			language_url: `${libUri}/langs/zh-Hans.js`, // 语言包
			skin_url: `${libUri}/skins/ui/oxide`,
			height: props.height,
			width: props.width,
			resize: 'both',
			branding: false, // 是否展示 Tinymce 标
			plugins: props.plugins,
			toolbar: props.toolbar,
			// menubar: false,
			menubar: 'edit view insert format',
			image_dimensions: true, // 图片是否展示宽高设置
			paste_webkit_styles: 'all',
			paste_merge_formats: true,
			nonbreaking_force_tab: false,
			paste_auto_cleanup_on_paste: false,
			file_picker_types: 'file',
			content_css: `${libUri}/skins/content/default/content.css` // 以css文件方式自定义可编辑区域的css样式，css文件需自己创建并引入
		}

		const onInit = (_, b) => {
			state.initialized = true
			editorInstance = b
		}
		const handleAddImg = () => {
			if (!state.addingImg?.length) return
			let html = ''
			state.addingImg.forEach((item) => {
				html += `<img style="max-width:100%;" src="${item.url}" />`
			})
			editorInstance.insertContent(html)
			state.addingImg.length = 0
		}

		return { uniqueId, state, content, libUri, init, onInit, handleAddImg }
	}
})
</script>

<template>
	<div class="my-editor">
		<p v-if="!state.initialized" class="my-editor__init">编辑器正在初始化...</p>
		<Editor
			:id="uniqueId"
			v-model="content"
			:init="init"
			:disabled="disabled"
			output-format="html"
			:tinymce-script-src="`${libUri}/tinymce.min.js`"
			@init="onInit"
		/>
		<div v-if="state.initialized" class="my-editor__upimg">
			<ElButton type="primary" plain>
				<template #icon>
					<Icon name="add" style="transform: scale(1.2)" />
				</template>
				添加图片
			</ElButton>
			<MyImageUploader v-model="state.addingImg" full :limit="99999" :upload="upload" @change="handleAddImg" />
		</div>
	</div>
</template>

<style lang="scss">
.my-editor {
	position: relative;

	&__init {
		opacity: 0.7;
	}
	.tox-promotion {
		display: none;
	}
	& > textarea {
		visibility: hidden;
	}
	&__upimg {
		position: absolute;
		z-index: 9;
		right: 12px;
		top: 9px;
		overflow: hidden;
	}
}
</style>
