import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { visualizer } from 'rollup-plugin-visualizer'

// AutoImport会使 SCSS 变量修改主题失效——css优先级覆盖问题
// import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import Unocss from 'unocss/vite'
import { presetAttributify, presetIcons, presetUno, transformerDirectives, transformerVariantGroup } from 'unocss'
import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders'
// 如果不需要使用 my-icon 组件，可注释/移除 下面这个 import 及相关内容
import { icons } from './src/components/my-icon/iconify-icon-data'
import fs from 'fs'

const pathSrc = path.resolve(__dirname, 'src')

let myIcons = fs.readdirSync(path.resolve(pathSrc, 'assets', 'icons')) || []
myIcons = myIcons.filter((e) => e.endsWith('.svg')).map((e) => e.replace('.svg', ''))
const iconNames = [...icons, ...myIcons].map((e) => {
	return `i-${e.includes(':') ? e.replace(':', '-') : 'my-icons-' + e}`
})

// https://vitejs.dev/config/
export default defineConfig({
	base: '/',
	build: {
		outDir: 'dist'
	},
	resolve: {
		alias: {
			'~/': `${pathSrc}/`,
			'@/': `${pathSrc}/`
		}
	},
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `@use "~/styles/element/index.scss" as *;`
			}
		}
	},
	plugins: [
		vue(),
		Components({
			// allow auto load markdown components under `./src/components/`
			extensions: ['vue', 'md'],
			// allow auto import and register components used in markdown
			include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
			resolvers: [
				ElementPlusResolver({
					importStyle: 'sass'
				})
			],
			dts: 'src/components.d.ts'
		}),

		// https://github.com/antfu/unocss
		// see unocss.config.ts for config
		Unocss({
			presets: [
				presetUno(),
				presetAttributify(),
				presetIcons({
					scale: 1,
					warn: true,
					// cdn: '',
					collections: {
						'my-icons': FileSystemIconLoader('./src/assets/icons', (svg) =>
							svg.replace(/^<svg /, '<svg fill="currentColor" ')
						)
					}
				})
			],
			transformers: [transformerDirectives(), transformerVariantGroup()],
			safelist: iconNames
		}),
		visualizer({
			open: false,
			gzipSize: true
		})
	]
})
