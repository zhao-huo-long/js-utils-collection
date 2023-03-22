<script setup lang="ts">
import { newEventBus } from 'utils-collection'

newEventBus<{
  m: number,
}>().on('m', (s) => {
  console.log(s)
})
</script>

<template>
  <div>
    utils-collection-playground
  </div>
</template>
