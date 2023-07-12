<script setup>
import { computed } from 'vue'

const emits = defineEmits(['click'])
const props = defineProps({
	/**
	 * 图标名称或图片链接
	 */
	name: String,
	size: {
		type: [String, Number],
		default: 'inherit'
	},
	// css 属性
	verticalAlign: String,
	/**
	 * 图标颜色：red，渐变：linear-gradient(to right, red, blue)
	 */
	color: {
		type: [String, Number],
		default: 'inherit'
	}
})

const imgIcon = computed(() => props.name?.includes('/'))
const iconName = computed(() => {
	const name = props.name
	if (!name || imgIcon.value) return ''
	return `i-${name.includes(':') ? name.replace(':', '-') : 'my-icons-' + name}`
	// return name.includes(':') ? `i-${name.replace(':', '-')}` : 'my-icons-' + name
})
const theStyle = computed(() => {
	const { name, color, size, verticalAlign } = props
	const reg = /[^0-9.]+/
	const fsize = size === 'inherit' || reg.test(size) ? size : `${size}px`
	let str = ''
	if (verticalAlign) {
		str += `--my-icon-align-v:${verticalAlign};`
	}
	if (imgIcon.value) {
		if (color && color !== 'inherit') {
			str += `-webkit-mask-image:url(${name});mask-image:url(${name});
						-webkit-mask-size:cover;mask-size:cover;
						background:${color};`
		} else {
			str += `background:url(${name}) center / cover no-repeat;`
		}
	} else {
		str += `font-size:${fsize};`
		if (color?.includes('-gradient')) {
			str += `color:transparent;background-image:${color};`
		} else {
			str += `color:${color};`
		}
	}
	return str
})

const onClick = (e) => {
	emits('click', e)
}
</script>

<template>
	<div v-if="imgIcon" :style="theStyle" class="my-icon--img" @click="onClick"></div>
	<div v-else :style="theStyle" :class="['my-icon', iconName]" @click="onClick"></div>
</template>

<style lang="scss">
.my-icon,
.my-icon--img {
	display: inline-block;
	line-height: 1;
	vertical-align: var(--my-icon-align-v);
}
.my-icon {
	text-rendering: auto;
	// 渐变，暂时没有字体图标
	// background-clip: text;
	// -webkit-background-clip: text;
	&::before {
		display: inline-block;
		vertical-align: var(--my-icon-align-v);
	}
}
.my-icon--img {
	mask-repeat: no-repeat;
}
</style>
