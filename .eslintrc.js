module.exports = {
	root: true,
	env: {
		node: true,
		// The Follow config only works with eslint-plugin-vue v8.0.0+
		'vue/setup-compiler-macros': true
	},
	extends: [
		'plugin:vue/vue3-essential',
		'eslint:recommended',
		'@vue/typescript/recommended',
		'./.eslintrc-auto-import.json'
	],
	parserOptions: {
		ecmaVersion: 2020
	},
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-empty': 'warn',
		// for AutoImport - first time like ElMessage - https://github.com/antfu/unplugin-auto-import/issues/3
		'no-undef': 'off',
		'@typescript-eslint/no-empty-function': 'warn',
		'vue/multi-word-component-names': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-non-null-assertion': 'off'
	}
}
