import { downloadFile } from "@/lib/tiny-utils";

export interface TOption {
  onProgress?: (msg: {
    all: number,
    done: number,
    complete: boolean,
    fileName: string,
    url: string,
  }) => void,
}

/**
 * 获取文件
 * @param url
 * @param fileName
 * @param option
 * @returns
 */
export function getFile(url: string, fileName: string, option: TOption & RequestInit) {
  if (typeof url === 'string') {
    const { onProgress, ...fetchInit } = option || {}
    return fetch(url, {
      mode: 'cors',
      cache: 'no-cache',
      ...fetchInit
    }).then(response => {
      const sizeStr = response.headers.get('Content-Length'.toLocaleLowerCase())
      const bodySize = parseInt(sizeStr || '0');
      const res = response.clone();
      const reader = res?.body?.getReader?.();
      let i = 0;
      if (reader) {
        const read = async () => {
          const a = await reader.read()
          if (!a.done) {
            i = i + a.value.length
            /**
             * progress callback
             */
            onProgress?.({
              done: i,
              all: bodySize,
              complete: i === bodySize,
              fileName,
              url,
            })
            await read()
          }
        }
        read()
      } else {
        return Promise.reject(new Error('have a error on get reader'))
      }
      return response.blob()
    })
  }
  return Promise.reject(new Error(`url must be a string value`))
}

/**
 * 下载文件
 * @param url
 * @param fileName
 * @param option
 * @returns
 */
export function download(
  url: string,
  fileName: string,
  option: TOption & RequestInit
) {
  return getFile(url, fileName, option)
    .then(function (blob) {
      downloadFile(fileName, blob)
    })
}
