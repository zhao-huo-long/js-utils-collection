<script setup lang="ts">
import { newEventBus } from 'utils-collection'

newEventBus<{
  m: number,
}>().on('m', (s) => {
  console.log(s)
})
</script>

<template>

</template>
