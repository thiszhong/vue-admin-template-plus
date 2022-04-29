<template>
  <div v-if="isNetworkIcon" :style="iconStyle" class="my-icon custom-icon--img" @click="onClick"></div>
  <span v-else-if="name"
    @click="onClick"
    :style="iconStyle"
    :class="['custom-icon', 'my-icon', 'icon-' + name]"
  ></span>
</template>

<script setup>
import { computed } from 'vue';
import mixProps from './props'

const props = defineProps(mixProps)
const emit = defineEmits(['click'])

// network image or base64
const isNetworkIcon = computed(() => {
  const name = props.name
  return name && (name.startsWith('http') || name.startsWith('data:image/'));
})
const iconSize = computed(() => {
  const size = props.size
  const reg = /[^0-9.]/
  return size && !reg.test(size) ? `${size}px` : size
})

const iconStyle = computed(() => {
  const { color, name } = props
  let style = ''

  if (!isNetworkIcon.value) {
    iconSize.value && (style += `font-size:${iconSize.value};`)
    if (color) {
      if (color.includes('-gradient')) {
        style += `color:transparent;background-image:${color};`;
      } else {
        style += `color:${color};`;
      }
    }
  } else {
    const s = iconSize.value || '16px'
    style += `width:${s};height:${s};`;
    if (color) {
      style += `-webkit-mask-image:url(${name});mask-image:url(${name});
        -webkit-mask-size:contain;mask-size:contain;
        background:${color};`;
    } else {
      style += `background:url(${name}) center / contain no-repeat;`;
    }
  }
  return style;
})

const onClick = () => {
  emit('click')
}
</script>

<style lang="scss">
.custom-icon, .custom-icon--img {
	display: inline-block;
	line-height: 1;
}
.custom-icon {
	background-clip: text;
	-webkit-background-clip: text;
}
.custom-icon--img {
	mask-repeat: no-repeat;
}
</style>
