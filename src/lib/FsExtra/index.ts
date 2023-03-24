import fs, { read } from "fs";
import path from "path";
import { isNode } from "../../helper";


export class Dir {
  public readonly isDir = true
  private __size: null | number = null;
  private __dirPath: string = '';
  constructor(dir: string){
    this.__dirPath = dir
  }
  get dirPath(){
    return this.__dirPath
  }
  get size(){
    if(this.__size === null){
      if(fsPathDetect(this.dirPath) === 'DIR'){
        let size = 0
        const items = fs.readdirSync(this.dirPath)
        .map(i => path.join(this.__dirPath, i))
        while(items.length){
          const itemPath = items.pop()!
          const fd = fs.openSync(itemPath, 'r')
          const info = fs.fstatSync(fd)
          const isDir = info.isDirectory()
          fs.closeSync(fd)
          size += info.size
          if(isDir){
            items.push(...(fs.readdirSync(itemPath)).map(i => path.join(itemPath, i)))
          }
        }
        this.__size = size
        return size
      }
      return 0
    }else{
      return this.__size
    }
  }
  ls = () => {
    if(fsPathDetect(this.dirPath) === 'DIR'){
      return fs.readdirSync(this.dirPath)
      .map(i => {
        const absPath = path.join(this.__dirPath, i)
        const fd = fs.openSync(absPath, 'r')
        const info = fs.fstatSync(fd)
        const isDir = info.isDirectory()
        const shadowInfo = {... info, path: absPath,isDir, isFile: info.isFile() }
        fs.closeSync(fd)
        if(isDir){
          shadowInfo.size += new Dir(absPath).size
        }
        return shadowInfo
      })
    }
    return []
  }
}


/**
 * 探测结果类型
 */
export type DetectRes = "NOT_FOUND" | "FILE" | "DIR";

/**
 * fsPathDetect - 检测路径指向目标的类型
 * 1. 404
 * 2. file
 * 3. dir
 * @param p
 * @returns  "NOT_FOUND" | "FILE" | "DIR"
 */
export function fsPathDetect(p: string): DetectRes {
  if (!isNode) throw new Error("function [fsPathDetect] must be run in node");
  let targetType: DetectRes = "NOT_FOUND";
  if (!fs.existsSync(p)) {
    return targetType;
  }
  const fd = fs.openSync(p, "r");
  const stat = fs.fstatSync(fd);
  if (stat.isFile()) {
    targetType = "FILE";
  } else if (stat.isDirectory()) {
    targetType = "DIR";
  }
  fs.closeSync(fd);
  return targetType;
}
