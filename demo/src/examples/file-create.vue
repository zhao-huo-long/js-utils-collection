<script setup>
function createFileObject(url) {
  if (typeof url === 'string') {
    return window.fetch(url, {
      mode: "cors",
      cache: 'no-cache'
    })
  }
  return Promise.reject(new Error(`url must be a string value`))
}
createFileObject(`https://img0.baidu.com/it/u=256741667,418440332&fm=253&fmt=auto&app=120&f=JPEG?w=1280&h=800`)
  .then(response => {
    const bodySize = response.headers.get('Content-Length'.toLocaleLowerCase())
    const res = response.clone()
    const reader = res.body.getReader()
    let i = 0;
    const read = async () => {
      const a = await reader.read()
      console.log(a)
      if (!a.done) {
        i = i + a.value.length
        await read()
      }
    }
    read()
    return response.blob()
  }).then(blob => {
    console.log(blob)
  })
</script>

<template>
  <div>

  </div>
</template>
