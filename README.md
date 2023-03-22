## utils-collection

utils-collection, 常用功能集合包, typescript 编写代码提示友好。

### 安装方式

```shell
npm install utils-collection
```

```shell
yarn utils-collection
```

```shell
pnpm install utils-collection
```

### 环境变量

- `isNode`

```js
import { isNode } from "utils-collection";
```

| value   | 类型      | 描述                         |
| ------- | --------- | ---------------------------- |
| `true`  | `boolean` | 当前 js 运行在 node 环境     |
| `false` | `boolean` | 当前 js 没有运行在 node 环境 |

- `isBrowser`

```js
import { isBrowser } from "utils-collection";
```

| value   | 类型      | 描述                         |
| ------- | --------- | ---------------------------- |
| `true`  | `boolean` | 当前 js 运行在浏览器环境     |
| `false` | `boolean` | 当前 js 没有运行在浏览器环境 |

### 工具函数

- `newEventBus`  
事件总线, 监听事件、触发事件、取消事件。在 ts 中使用，能传入类型变量, 以此获得的事件名、回调参数类型提示。

```ts
import { newEventBus } from "utils-collection";

interface EventMap {
  eventName: number;
}

const eventBus = newEventBus<EventMap>();

eventBus.on("eventName", (value) => {
  // typescript will known `s` is number or undefined
});

eventBus.fire("eventName", 2023);
// if your code is '2023', ts will throw a type error
```

| 方法   | 类型                                               | 描述                             |
| ------ | -------------------------------------------------- | -------------------------------- |
| `on`   | `(eventName: string, callback: function) => void ` | 监听事件                         |
| `fire` | `(eventName: string, value: unknown) => void`      | 触发事件                         |
| `off`  | `(eventName: string, callback: function) => void ` | 取消监听事件                     |
| `once` | `(eventName: string, callback: function) => void ` | 监听事件,触发一次后自动取消监听, |

- `newStorageWithType`  
扩展原 Web Storage 的` setItem``getItem `接口, 在 ts 中使用，能传入类型变量, 以此获得的 key,value 类型提示。

```ts
import { newStorageWithType } from "utils-collection";
interface KeyValType {
  id: number;
  username: string;
}

const storage = newStorageWithType<KeyValType>("sessionStorage");
storage.setItem("id", 2);
// if you write storage.setItem('id', '2'), typescript will throw type error
storage.getItem("id");
// if you write storage.getItem('ids'), typescript will throw type error
```
