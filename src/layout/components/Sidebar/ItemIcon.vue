<template>
  <i v-if="icon && icon.includes('el-icon')" :class="icon + ' sub-el-icon'" />
  <svg-icon v-else-if="icon" :icon-class="icon" />
</template>

<script>
export default {
  name: 'MenuItemIcon',
  functional: true,
  props: {
    icon: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
.sub-el-icon {
  color: currentColor;
  width: 1em;
  height: 1em;
}
</style>
