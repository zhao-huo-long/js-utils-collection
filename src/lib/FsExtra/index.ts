import fs from "fs";
import path, { sep } from "path";
import { isNode } from "../../helper";

/**
 * 创建目录, 支持多级
 * @param p 
 */
export function mkDir(p: string) {
  const absPath = path.resolve(p);
  const dirs = absPath.split(sep);
  switch (fsPathDetect(absPath)) {
    case 'DIR':
      break
    case 'FILE':
      throw new Error(`have some errors, [${absPath}] is a file`)
    case 'NOT_FOUND':
      dirs.reduce((curP, dir) => {
        const target = curP + dir
        const targetType = fsPathDetect(target)
        if (targetType === 'FILE') {
          throw new Error(`have some errors, [${target}] is a file`)
        }
        if (targetType === "NOT_FOUND") {
          fs.mkdirSync(target)
        }
        return target
      }, '/')
      break;
    default:
      throw new Error(`have some errors`)
  }
}

/**
 * Dir - 目录类
 */
export class Dir {
  public readonly isDir = true;
  protected __size: null | number = null;
  protected __dirPath = "";
  /**
   * 存储文件的inode, 解决循环访问
   */
  protected readonly __viewSet: Set<number> = new Set();
  constructor(dir: string, mkdirOn404?: boolean) {
    this.__dirPath = path.resolve(dir);
    if (mkdirOn404) {
      mkDir(this.__dirPath)
    }
  }
  get dirPath() {
    return this.__dirPath;
  }
  get size() {
    if (this.__size === null) {
      if (fsPathDetect(this.dirPath) === "DIR") {
        let size = 0;
        const items = fs
          .readdirSync(this.dirPath)
          .map((i) => path.join(this.__dirPath, i));
        while (items.length) {
          const itemPath = items.pop()!;
          const fd = fs.openSync(itemPath, "r");
          const info = fs.fstatSync(fd);
          if (this.__viewSet.has(info.ino)) {
            fs.closeSync(fd);
            break;
          }
          this.__viewSet.add(info.ino);
          const isDir = info.isDirectory();
          fs.closeSync(fd);
          size += info.size;
          if (isDir) {
            items.push(
              ...fs.readdirSync(itemPath).map((i) => path.join(itemPath, i))
            );
          }
        }
        this.__size = size;
        return size;
      }
      return 0;
    } else {
      return this.__size;
    }
  }
  ls = () => {
    if (fsPathDetect(this.dirPath) === "DIR") {
      return fs.readdirSync(this.dirPath).map((i) => {
        const absPath = path.join(this.dirPath, i);
        const fd = fs.openSync(absPath, "r");
        const info = fs.fstatSync(fd);
        const isDir = info.isDirectory();
        const shadowInfo = {
          ...info,
          path: absPath,
          isDir,
          isFile: info.isFile(),
        };
        fs.closeSync(fd);
        if (isDir) {
          shadowInfo.size += new Dir(absPath).size;
        }
        return shadowInfo;
      });
    }
    console.error(`[${this.dirPath}] not a dir`)
    return [];
  };
}

/**
 * createDir 创建Dir实例的工厂函数
 * @param path
 * @returns
 */
export function createDirClass(path = ".") {
  return new Dir(path);
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
