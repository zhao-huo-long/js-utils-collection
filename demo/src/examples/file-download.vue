<script setup>
import { download, stringify } from 'js-utils-collection'
import { reactive } from 'vue'
const value = reactive({
  url: 'https://video.699pic.com/videos/ignore/96/26/46/b_9qVAC1yQmvJe1660962646_10s.mp4',
  filename: 'test.mp4'
})

const log = reactive({})

function onProgress(progress) {
  Object.assign(log, { ...progress })
}

</script>
<template>
  <pre>
导入方式:
import { download } from "js-utils-collection"

类型:
interface TOption {
  onProgress: (msg: {
    all: number,
    done: number,
    complete: boolean,
    fileName: string,
    url: string,
  }) => void,
}
function download(url: string, filename: string, option: TOption & RequestInit): void
  </pre>
  <div>
    文件:
    <input placeholder="URL" v-model="value.url" type="text">
    <input placeholder="文件名" v-model="value.filename" type="text">
    <button @click="download(value.url, value.filename, { onProgress })">下载</button>
  </div>
  <div>
    下载进度:
    <pre>
{{ stringify(log) }}
    </pre>
  </div>
</template>
