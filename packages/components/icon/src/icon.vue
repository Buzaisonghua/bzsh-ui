<template>
  <div>
    <span>我是ICONS</span>
    <span>{{ props }}</span>
  </div>
</template>

<script lang="ts" setup>
import { iconProps } from './icon'

defineOptions({
  name: 'BzIcon',
  inheritAttrs: false
})
const props = defineProps(iconProps)
</script>
