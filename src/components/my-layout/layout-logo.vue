<template>
	<el-row align="middle" class="layout-logo">
		<img class="layout-logo__img" src="@/assets/logo.png" alt="" />
		<span>LOGO</span>
	</el-row>
</template>

<style lang="less">
.layout-logo {
	padding: 0 20px;
	color: var(--header-text-color);
	font-size: 20px;
	font-weight: bold;
	min-width: var(--side-menu-width);
	&__img {
		height: calc(var(--header-height) - 21px);
		margin-right: 10px;
	}
}
</style>
