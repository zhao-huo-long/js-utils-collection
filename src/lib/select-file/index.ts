import { isBrowser } from "../../helper";

/**
 * selectFile
 * @description  文件选择函数,唤起文件选择对话框
 * @example
 * ```
 * import { selectFile } from 'js-utils-collection'
 * selectFile('image/*')
 * .then((file) => {
 *   console.log(file)
 * })
 * // multiple
 * selectFile('image/*')
 * .then((fileList) => {
 *  console.log(fileList)
 * })
 * ```
 * @param accept
 * @param multiple
 * @returns `Promise<File | File[]>`
 */
export function selectFile(
  accept = "*",
  option?: {
    multiple?: boolean;
    fileMaxSize?: number;
    max?: number;
  }
) {
  if (isBrowser) {
    const {
      multiple = false,
      fileMaxSize = Number.MAX_SAFE_INTEGER,
      max = Number.MAX_SAFE_INTEGER,
    } = option || {};
    const input = document.createElement("input");
    input.accept = accept;
    input.multiple = multiple || false;
    input.type = "file";
    return new Promise((res, rej) => {
      input.onselect = function(){
        if(multiple && input.files?.[Symbol.iterator]){
          const files = [...input.files];
          if(files.length > max){
            rej(`file more than ${max}`)
            return
          }
          for(const file of files){
            if(file.size > fileMaxSize){
              rej(`${file.name} file size more than ${fileMaxSize}`)
              return
            }
          }
          res(files)
          return
        }
        const file = input.files?.[0];
        if(!file){
          rej(`${file} is not a file`)
          return
        }
        if (file.size > fileMaxSize) {
          rej(`${file.name} file size more than ${fileMaxSize}`)
        } else {
          res(input.files?.[0] );
        }
        return
      }
    })
    .finally(() => input.remove());
  } else {
    throw new Error("function `selectFile` only can run in browser");
  }
}
