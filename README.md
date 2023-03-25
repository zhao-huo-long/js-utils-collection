## js-utils-collection

js 常用函数和类的集合包, 使用 typescript 编写, 在使用时代码提示友好.

### 安装方式

```shell
npm install js-utils-collection
```

```shell
yarn js-utils-collection
```

```shell
pnpm install js-utils-collection
```

---

### 工具类

#### `EventBus`

事件总线类, 在 ts 中使用，能传入类型变量, 以此获得的事件名、回调参数类型提示。

```ts
import { EventBus } from "js-utils-collection";

interface EventMap {
  count: number;
}

const bus = new EventBus<EventMap>();

bus.on("count", (value) => {
  // typescript will known `value` is number or undefined
});

bus.fire("count", 2023);
// if your code is '2023' string, ts will throw a type error
```

| 方法   | 类型                                               | 描述                            |
| ------ | -------------------------------------------------- | ------------------------------- |
| `on`   | `(eventName: string, callback: function) => void ` | 监听事件                        |
| `fire` | `(eventName: string, value: unknown) => void`      | 触发事件                        |
| `off`  | `(eventName: string, callback: function) => void ` | 取消监听事件                    |
| `once` | `(eventName: string, callback: function) => void ` | 监听事件,触发一次后自动取消监听 |

> 工厂函数  
> `import { newEventBus } from "js-utils-collection";`

#### `StorageWithType`

扩展原 Web Storage 的` setItem``getItem `接口, 在 ts 中使用，能传入类型变量, 以此获得的 key,value 类型提示。

```ts
import { StorageWithType } from "js-utils-collection";

interface KeyValType {
  id: number;
  username: string;
}

const storage = new StorageWithType<KeyValType>("sessionStorage");

storage.setItem("id", 2);
// if you write storage.setItem('id', '2'), typescript will throw type error

storage.getItem("id");
// if you write storage.getItem('ids'), typescript will throw type error
```

> 工厂函数  
> `import { newStorageWithType } from "js-utils-collection";`

---

### 环境常量

#### `isNode`

```js
import { isNode } from "js-utils-collection";
```

| value   | 类型      | 描述                         |
| ------- | --------- | ---------------------------- |
| `true`  | `boolean` | 当前 js 运行在 node 环境     |
| `false` | `boolean` | 当前 js 没有运行在 node 环境 |

#### `isBrowser`

```js
import { isBrowser } from "js-utils-collection";
```

| value   | 类型      | 描述                         |
| ------- | --------- | ---------------------------- |
| `true`  | `boolean` | 当前 js 运行在浏览器环境     |
| `false` | `boolean` | 当前 js 没有运行在浏览器环境 |

---
