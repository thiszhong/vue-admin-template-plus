import { defineConfig } from 'unocss'

export default defineConfig({
	rules: [
		[/^m-([\.\d]+)$/, ([_, num]) => ({ margin: `${num}px` })],
		[/^ml-([\.\d]+)$/, ([_, num]) => ({ 'margin-left': `${num}px` })],
		[/^mt-([\.\d]+)$/, ([_, num]) => ({ 'margin-top': `${num}px` })],
		[/^mr-([\.\d]+)$/, ([_, num]) => ({ 'margin-right': `${num}px` })],
		[/^mb-([\.\d]+)$/, ([_, num]) => ({ 'margin-bottom': `${num}px` })],
		[/^mx-([\.\d]+)$/, ([_, num]) => ({ 'margin-left': `${num}px`, 'margin-right': `${num}px` })],
		[/^my-([\.\d]+)$/, ([_, num]) => ({ 'margin-top': `${num}px`, 'margin-bottom': `${num}px` })],

		[/^p-([\.\d]+)$/, ([_, num]) => ({ padding: `${num}px` })],
		[/^pl-([\.\d]+)$/, ([_, num]) => ({ 'padding-left': `${num}px` })],
		[/^pt-([\.\d]+)$/, ([_, num]) => ({ 'padding-top': `${num}px` })],
		[/^pr-([\.\d]+)$/, ([_, num]) => ({ 'padding-right': `${num}px` })],
		[/^pb-([\.\d]+)$/, ([_, num]) => ({ 'padding-bottom': `${num}px` })],
		[/^px-([\.\d]+)$/, ([_, num]) => ({ 'padding-left': `${num}px`, 'padding-right': `${num}px` })],
		[/^py-([\.\d]+)$/, ([_, num]) => ({ 'padding-top': `${num}px`, 'padding-bottom': `${num}px` })],

		[/^w-([\.\d]+)$/, ([_, num]) => ({ width: `${num}px` })],
		[/^max-w-([\.\d]+)$/, ([_, num]) => ({ 'max-width': `${num}px` })],
		[/^min-w-([\.\d]+)$/, ([_, num]) => ({ 'min-width': `${num}px` })],
		[/^h-([\.\d]+)$/, ([_, num]) => ({ height: `${num}px` })],
		[/^max-h-([\.\d]+)$/, ([_, num]) => ({ 'max-height': `${num}px` })],
		[/^min-h-([\.\d]+)$/, ([_, num]) => ({ 'min-height': `${num}px` })],

		[/^t-([\.\d]+)$/, ([_, num]) => ({ 'font-size': `${num}px` })]
	]
})
