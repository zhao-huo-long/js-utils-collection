import { treeToMap } from "../TinyUtils";

export interface MenuData {
  /**
   * 菜单路径
   */
  path?: string,
  /**
   * 菜单名称
   */
  title?: string,

  /**
   * 菜单图标
   */
  icon?: string,

  /**
   * 菜单展示
   */
  hide: boolean,

  /**
   * 允许访问
   */
  auth?: string[],

  /**
   * 外链菜单
   */
  href?: string,

  /**
   * 保持活性
   */
  keep?: boolean,

  /**
   * 菜单编码
   */
  code?: string | number,

  /**
   *
   */

  /**
   * 子菜单
   */
  children?: MenuData[],
}

export interface Route {
  path: string;
  children: Route[];
  [i: string]: unknown,
}

export function parseMenuData(menu: MenuData[] = [], originRoutes: Route[] = []) {
  const menuTree = [...menu];
  const routesRes: Route[] = [];
  const map = treeToMap(originRoutes, 'path')
  while (menuTree.length) {
    const item = menuTree.pop()
    if (
      item?.path
      && /^\//.test(item.path)
      && map[item.path]
      ) {
      routesRes.push({
        ...map[item.path],
        meta: {
          keep: item.keep,
          title: item.title,
          code: item.code
        }
      })
    } else {
      throw new Error(`请使用 / 开头的路径`)
    }
  }
  return routesRes
}
