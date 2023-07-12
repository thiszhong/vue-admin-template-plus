<script>
import { defineComponent, computed, useSlots } from 'vue'

export default defineComponent({
	name: 'MainContainer',
	props: {
		title: String,
		oneScreen: {
			type: Boolean,
			default: false
		},
		padding: {
			type: [Boolean, String, Number],
			default: true
		}
	},
	setup(props) {
		const slots = useSlots()
		const showDefaultHeader = computed(() => !!(props.title || slots['header-action']))

		const contentPadding = computed(() => {
			const pad = props.padding
			if (pad === false) return '0'
			if (typeof pad === 'number') return `${pad}px`
			if (typeof pad === 'string' && !isNaN(parseInt(pad))) return pad
			return 'var(--space)'
		})

		return { showDefaultHeader, contentPadding }
	}
})
</script>

<template>
	<main v-if="!oneScreen" class="m-container">
		<el-row v-if="showDefaultHeader" align="middle" class="m-container__header">
			<MyIcon v-if="title" name="ep:caret-right" size="20" color="var(--color-primary)" />
			<h3 class="m-container__title">{{ title }}</h3>
			<slot name="header-action" />
		</el-row>
		<slot name="header" />
		<div class="m-container__wrap" :style="{ padding: contentPadding }">
			<slot />
		</div>
		<slot name="footer" />
	</main>
	<!-- 整体一屏效果，header、footer固定（有的话），主体内容可局部再滚动 -->
	<main v-else class="m-container m-container--screen">
		<div class="m-container__screener">
			<el-row v-if="showDefaultHeader" align="middle" class="m-container__header">
				<MyIcon v-if="title" name="ep:caret-right" size="20" color="var(--color-primary)" />
				<h3 class="m-container__title">{{ title }}</h3>
				<slot name="header-action" />
			</el-row>
			<slot name="header" />
			<el-scrollbar>
				<div class="m-container__wrap" :style="{ padding: contentPadding }">
					<slot />
				</div>
			</el-scrollbar>
			<slot name="footer" />
		</div>
	</main>
</template>

<style lang="scss">
.m-container {
	// margin: 20px;
	background-color: var(--color-white, #fff);
	border-radius: 2px;
	position: relative;

	&--screen {
		flex: auto;
		position: relative;
	}
	&__screener {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		display: flex;
		flex-direction: column;
	}
	&__header {
		padding: 0 15px;
		min-height: 50px;
		// border-bottom: 1px solid #e9e9e9;
		background-color: var(--color-table-header-bg);
	}
	&__title {
		flex: 1;
		overflow: hidden;
		margin: 0;
		font-size: 16px;
		color: var(--color-text-3);
	}
}
</style>
