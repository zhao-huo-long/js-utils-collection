<script setup>
import { selectFile } from 'js-utils-collection'

function onClick() {
  selectFile("image/*", {
    maxSize: 1024 * 100
  }).then(file => {
    console.log('file', file)
  }).catch(error => {
    console.error('error', error)
  })
}

</script>
<template>
  <span class="picker-btn" @click="onClick">
    点我, 唤起文件选择对话框
  </span>
</template>

<style scoped>
.picker-btn {
  cursor: pointer;
  border: 1px solid;
}
</style>
