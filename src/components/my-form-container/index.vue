<template>
	<section class="my-form-c">
		<slot />
	</section>
</template>

<style lang="scss">
.my-form-c {
	padding: var(--space, 16px);
	padding-bottom: 0;
	margin-bottom: 8px;
	background: var(--color-table-header-bg);
	border-radius: var(--el-border-radius-base, 8px);
}
</style>
