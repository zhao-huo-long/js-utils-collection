export function getFile(url: string) {
  if (typeof url === 'string') {
    return window.fetch(url, {
      mode: 'cors',
      cache: 'no-cache'
    }).then(response => {
      const bodySize = response.headers.get('Content-Length')
      const reader = response.body?.getReader()
      // const [ read, s ] = response.body?.tee()
      // read
      // const writeStream = new WritableStream({

      // })
      // response.body?.pipeTo(writeStream)
      // writeStream

    })
  }
  return Promise.reject(new Error(`url must be a string value`))
}
