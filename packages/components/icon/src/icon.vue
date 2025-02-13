<template>
  <div>
    <span class="icon">我是ICONSa1a2a3</span>
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
