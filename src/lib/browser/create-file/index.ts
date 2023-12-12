/**
 *
 * @param file 文件
 * @returns
 * @remark
 * ```
 *  需要 URL.revokeObjectURL
 * ```
 */
export function fileToURL(file: File | Blob) {
  if (file instanceof Blob) {
    return URL.createObjectURL(file)
  }
  throw new Error('param must a File or Blob type value')
}

/**
 * createFile
 * @param filename
 * @param content
 */
export function createFile(filename: string, content: Blob | Uint8Array | string) {
  let url = '';
  if (content instanceof Blob) {
    url = fileToURL(content)
  }
  if (content instanceof Uint8Array || typeof content === 'string') {
    const file = new File([content], filename)
    url = fileToURL(file)
  }
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  setTimeout(() => {
    URL.revokeObjectURL(url);
    a.remove();
  }, 0)
}
