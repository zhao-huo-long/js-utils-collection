import { libError, isBrowser } from "@/helper";

export const richEditor = () => {
  if (isBrowser) {
    const script = document.createElement('script');
    return new Promise<unknown>((resolve, reject) => {
      script.onload = function () {
        resolve(true)
      }
      script.onerror = function (error) {
        reject(error)
      }
      document.append(script)
    })
  }
  throw new Error(libError('rich-editor only use in browser'))
}
