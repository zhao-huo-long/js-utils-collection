import { libError, isBrowser } from "@/helper";


/**
 * loadScript
 * @param scriptUrl
 * @returns
 */
export function loadScript(scriptUrl: string): Promise<unknown> {
  if (isBrowser) {
    return new Promise<unknown>((resolve, reject) => {
      const script = document.createElement('script');
      script.onload = function () {
        resolve(true)
      }
      script.onerror = function (error) {
        reject(error)
      }
      script.src = scriptUrl
      document.body.appendChild(script)
    })
  }
  throw new Error(libError('loadScript only use in browser'))
}


/**
 * loadScripts
 * @param scriptUrl
 */
export function loadScripts(scriptUrl: string[] | string) {
  let scriptUrls: string[] = [];
  if (Array.isArray(scriptUrl)) {
    scriptUrls = scriptUrl
  } else if (typeof scriptUrl == 'string' && scriptUrl.trim().length) {
    scriptUrls = [scriptUrl]
  }
  return Promise.allSettled(scriptUrls.map(url => loadScript(url)))
}


/**
 * loadCss
 * @param cssUrl
 * @returns
 */
export function loadCss(cssUrl: string) {
  if (isBrowser) {
    return new Promise<unknown>((resolve, reject) => {
      const link = document.createElement('link');
      link.type = 'text/css'
      link.onload = function () {
        resolve(true)
      }
      link.onerror = function (error) {
        reject(error)
      }
      link.rel = 'stylesheet'
      link.href = cssUrl
      document.body.appendChild(link)
    })
  }
  throw new Error(libError('loadCss only use in browser'))
}
