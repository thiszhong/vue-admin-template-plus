<script setup lang="ts">
import LayoutLogo from './layout-logo.vue'

const handleLogout = () => {
	alert('123木头人')
}
</script>

<template>
	<div style="height: var(--header-height)"></div>
	<el-row tag="header" align="middle" class="layout-header">
		<LayoutLogo />
		<div class="layout-header__r">
			<!-- 从右向左，详见样式 flex-direction -->
			<el-menu mode="horizontal">
				<el-sub-menu index="1" popper-class="layout-header__menu">
					<template #title>
						<el-row align="middle">
							<el-avatar
								:size="36"
								src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80"
							/>
							<!-- <span style="margin-left: 3px">Name</span> -->
						</el-row>
					</template>
					<el-menu-item index="1-1">Home</el-menu-item>
					<el-menu-item index="1-2">Github</el-menu-item>
					<el-menu-item index="1-3">Docs</el-menu-item>
					<el-menu-item index="1-logout" @click="handleLogout">Logout</el-menu-item>
				</el-sub-menu>
				<el-menu-item index="2">Something</el-menu-item>
			</el-menu>
		</div>
	</el-row>
</template>

<style lang="less">
.layout-header {
	height: var(--header-height);
	background-color: var(--header-bg-color);
	box-shadow: var(--header-shadow);
	// el-row 会有 position: relative 属性
	position: fixed !important;
	z-index: 99;
	left: 0;
	top: 0;
	width: 100%;
	padding-right: var(--popup-hidden-padding-right);
	box-sizing: border-box;

	.el-menu {
		--el-menu-active-color: var(--header-text-color);
		--el-menu-text-color: var(--header-text-color);
		--el-menu-hover-text-color: var(--header-text-color);
		--el-menu-hover-bg-color: rgba(24, 144, 255, 0.1);
		--el-menu-bg-color: transparent;
		--el-menu-item-height: 100%;
		--el-menu-item-font-size: var(--el-font-size-base);
		--el-menu-border-color: transparent;

		height: 100%;
		flex-direction: row-reverse;
		.el-menu-item {
			border: 0 !important;
		}
		.el-sub-menu .el-sub-menu__title {
			border: 0;
			&:hover {
				background-color: var(--el-menu-hover-bg-color);
			}
		}
	}

	&__menu {
		.el-menu {
			--el-menu-active-color: inherit;
			min-width: 100px;
		}
		.el-menu-item {
			justify-content: center;
		}
	}
	&__r {
		height: 100%;
		flex: 1;
		overflow: hidden;
	}
}
</style>
