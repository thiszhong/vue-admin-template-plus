const path = require('path')
const { defineConfig } = require('@vue/cli-service')
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
// https://github.com/antfu/unplugin-icons
const Icons = require('unplugin-icons/webpack')
const IconsResolver = require('unplugin-icons/resolver')

module.exports = defineConfig({
	transpileDependencies: true,
	configureWebpack: {
		plugins: [
			AutoImport({
				// Generate corresponding .eslintrc-auto-import.json file - https://github.com/antfu/unplugin-auto-import
				// eslint globals Docs - https://eslint.org/docs/user-guide/configuring/language-options#specifying-globals
				eslintrc: {
					enabled: true,
					filepath: path.resolve(__dirname, '.eslintrc-auto-import.json'),
					globalsPropValue: true
				},
				resolvers: [
					// 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
					ElementPlusResolver()
				],
				dts: path.resolve(__dirname, 'auto-imports.d.ts')
			}),
			Components({
				resolvers: [
					// 自动导入 Element Plus 组件
					ElementPlusResolver(),
					// 目前其实用不到自动引入，因为想使用动态图标组件，又不想全量引入
					// 所以都有主动引入，详见components/my-icon/iconify-icon
					IconsResolver({
						prefix: 'iconify'
					})
				],
				dts: path.resolve(__dirname, 'components.d.ts')
			}),
			Icons({
				compiler: 'vue3',
				autoInstall: true
			})
		]
	}
})
