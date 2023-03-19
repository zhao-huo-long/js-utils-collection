import { isBrowser } from "../../helper";

/**
 * fileSelect - 文件选择
 * @param accept
 * @param multiple
 * @returns
 */

export function fileSelect<T extends boolean>(accept = "*", multiple?: T) {
  if (isBrowser) {
    const input = document.createElement("input");
    input.accept = accept;
    input.multiple = multiple || false;
    input.type = "file";
    type PromiseRes = T extends true ? File[] : File;
    return new Promise<PromiseRes>((res) => {
      input.onchange = function () {
        if (multiple && input.files?.[Symbol.iterator]) {
          res([...input.files] as PromiseRes);
        } else {
          res(input.files?.[0] as PromiseRes);
        }
        input.remove();
      };
    });
  } else {
    throw new Error("fileSelect only can run in browser");
  }
}
