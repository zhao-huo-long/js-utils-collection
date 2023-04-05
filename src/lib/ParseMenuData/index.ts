import { treeToMap } from "../TinyUtils";

export interface MenuData {
  /**
   * 菜单路径
   */
  path?: string;
  /**
   * 菜单名称
   */
  title?: string;

  /**
   * 菜单图标
   */
  icon?: string;

  /**
   * 菜单展示
   */
  hide: boolean;

  /**
   * 允许访问
   */
  auth?: string[];

  /**
   * 外链菜单
   */
  href?: string;

  /**
   * 保持活性
   */
  keep?: boolean;

  /**
   * 菜单编码
   */
  code?: string | number;

  /**
   *
   */

  /**
   * 子菜单
   */
  children?: MenuData[];
}

export interface Route {
  path?: string;
  children?: Route[];
  [i: string]: unknown;
  redirect?: string;
}

/**
 * parseMenuData
 * @param menu
 * @param originRoutes
 * @returns
 */
export function parseMenuData(
  menu: MenuData[] = [],
  originRoutes: Route[] = []
) {
  const menuTree = [...menu];
  const routesRes: Route[] = [];
  const map = treeToMap(originRoutes, "path");
  while (menuTree.length) {
    const item = menuTree.shift();
    if (item?.children?.length) {
      menuTree.unshift(...item.children);
    }
    if (typeof item?.path === "string" && map[item.path].component) {
      if (!/^\//.test(item.path)) {
        console.warn(`[${item.path}], 请使用 / 开头的路径`);
        continue;
      }
      routesRes.push({
        path: item.path,
        ...map[item.path],
        meta: {
          keep: item.keep,
          title: item.title,
          code: item.code,
        },
      });
    }
  }
  return routesRes;
}

export function handlerMenuData(menu: MenuData[] = []) {
  const arr = [...menu];
  while (arr.length) {
    const item = arr.shift();
    if (item?.children?.length) {
      arr.unshift(...item.children);
    }
  }
}
