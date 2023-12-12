## js-utils-collection

![npm bundle size](https://img.shields.io/bundlephobia/minzip/js-utils-collection)
![npm](https://img.shields.io/npm/dw/js-utils-collection)
![NPM](https://img.shields.io/npm/l/js-utils-collection)

常用 JavaScript 工具函数整理，使用 `typescript` 实现，类型提示友好

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

### 工具类 & 工具函数

#### `EventBus`

事件总线类, 在 ts 中使用，能传入类型变量, 以此获得的事件名、回调参数类型提示。

```ts
import { eventBusBuilder } from "js-utils-collection";

interface EventMap {
  count: number;
}

const bus = eventBusBuilder<EventMap>();

bus.on("count", (value) => {
  // 在 typescript 项目中 value 能被提示为 number 类型
});

bus.fire("count", 2023);
// 在 typescript 项目中值能被提示为 number 类型

bus.fire("count", "2023");
// 在 typescript 项目会抛出类型错误
```

| 方法   | 类型                                               | 描述                            |
| ------ | -------------------------------------------------- | ------------------------------- |
| `on`   | `(eventName: string, callback: function) => void ` | 监听事件                        |
| `off`  | `(eventName: string, callback: function) => void ` | 取消监听事件                    |
| `fire` | `(eventName: string, value: unknown) => void`      | 触发事件                        |
| `once` | `(eventName: string, callback: function) => void ` | 监听事件,触发一次后自动取消监听 |

---

#### `localStorageBuilder & sessionStorageBuilder`

扩展原 Web Storage 的 `setItem` `getItem` 接口, 在 ts 中使用，能传入类型变量, 以此获得的 key,value 类型提示。

```ts
import { localStorageBuilder } from "js-utils-collection";
import { sessionStorageBuilder } from "js-utils-collection";

interface KeyValType {
  id: number;
  username: string;
}

const localStorage = localStorageBuilder<KeyValType>();
const sessionStorage = sessionStorageBuilder<KeyValType>();

sessionStorage.setItem("id", 2);
// 如果传入id的类型不对，会抛出类型错误

sessionStorage.getItem("id");
// 能获取到id的值为 null | number
```

---

#### `interval`

用 `setTimeout` 模拟 `setInterval`

```ts
import { interval } from "js-utils-collection";

const clearFn = interval(function () {
  console.log(`hello world`);
}, 1000);

setTimeout(() => {
  clearFn(); // 停止重复执行
}, 4000);
```

api

```ts
const clearFn: () => void = interval(cb: () => any, time: number)

```

---

#### 选择文件

调用函数唤起浏览器文件选择对话框

```ts
import { selectFile } from "js-utils-collection";

const result = selectFile("image/*", { len: 8, maxSize: 1024, minSize: 10 });
```

api

```typescript
const result: Promise<Files[]> = selectFile(accept = string, rule?: FileCheckerRule);
```

`FileCheckerRule`
| params | 类型 | 描述 |
| --------- | -------- | ------------------------------------------------ |
| `len` | `number` | 最多选择文件数量，默认 1 |
| `maxSize` | `number` | 允许最大文件的 size，默认 Number.MAX_SAFE_INTEGER |
| `minSize` | `number` | 允许最小文件的 size, 默认 0 |

---
