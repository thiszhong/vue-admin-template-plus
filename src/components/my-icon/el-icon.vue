<template>
  <render />
</template>

<script setup>
import { defineProps } from 'vue'
import * as ElIcons from '@element-plus/icons-vue'
import mixProps from './props'
import { camelize } from '@/utils'

const props = defineProps(mixProps)

const render = () => {
  const { name, ...rest } = props
  const UseIcon = ElIcons[camelize(name, true)]

  return <el-icon { ...rest }><UseIcon /></el-icon>
}
</script>
