<script setup lang="ts">
import { BzIcon } from '../../dist/bzsh-ui'
import { Icon24HoursFill } from 'bzsh-icon'
</script>

<template>
  <div class="foo">aaaaaaaaaaaaaaaaaaaaaaa</div>
  <BzIcon>
    <Icon24HoursFill />
  </BzIcon>
  <div>测试sss </div>
</template>

<style lang="scss" scoped>
$name: '.foo';

#{$name}{
  color: red;
}
</style>
