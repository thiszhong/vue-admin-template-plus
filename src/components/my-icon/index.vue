<template>
  <render />
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import mixProps from './props'
import ElIcon from './el-icon.vue'
import CustomIcon from './custom-icon.vue'

const props = defineProps({
  ...mixProps,
  // custom icon
  custom: [Boolean, String],
})
const emit = defineEmits(['click'])

const onClick = () => {
  emit('click')
}

const render = () => {
  const { custom, ...iconProps } = props

  if (!iconProps.name) return null

  // custom or network image or base64
  if (custom ||
    iconProps.name.startsWith('http') ||
    iconProps.name.startsWith('data:image/')
  ) return <CustomIcon { ...iconProps } onClick={onClick} />

  return <ElIcon { ...iconProps } class="my-icon" onClick={onClick} />
}

</script>
