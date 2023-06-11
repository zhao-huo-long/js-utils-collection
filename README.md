## js-utils-collection

![npm bundle size](https://img.shields.io/bundlephobia/minzip/js-utils-collection)
![npm](https://img.shields.io/npm/dw/js-utils-collection)
![NPM](https://img.shields.io/npm/l/js-utils-collection)

常用工具函数整理，使用 `typescript` 实现，类型提示友好

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
| `fire` | `(eventName: string, value: unknown) => void`      | 触发事件                        |
| `off`  | `(eventName: string, callback: function) => void ` | 取消监听事件                    |
| `once` | `(eventName: string, callback: function) => void ` | 监听事件,触发一次后自动取消监听 |

---

#### `localStorageBuilder & sessionStorageBuilder`

扩展原 Web Storage 的 `setItem` `getItem` 接口, 在 ts 中使用，能传入类型变量, 以此获得的 key,value 类型提示。

```ts
import { localStorageBuilder } from "js-utils-collection";
// import { sessionStorageBuilder } from "js-utils-collection";


interface KeyValType {
  id: number;
  username: string;
}

const storage = localStorageBuilder<KeyValType>();
// const storage = sessionStorageBuilder<KeyValType>();

storage.setItem("id", 2);
// 如果传入id的类型不对，会抛出类型错误

storage.getItem("id");
// 能获取到id的值为 null | number
```

---

#### `wait`

返回一个等待一段时间的 promise 实例

```ts
import { wait } from "js-utils-collection";
wait(4000).then(() => {
  // 4s后执行...
});
```

| params  | 类型     | 描述              |
| ------- | -------- | ----------------- |
| `delay` | `number` | 等待时间, 默认 1s |

---

| params  | 类型     | 描述                          |
| ------- | -------- | ----------------------------- |
| `data`  | `any`    | 等待一段时间后被 resolve 的值 |
| `delay` | `number` | 等待时间, 默认 1s             |

---

#### `interval`
用 `setTimeout` 模拟 `setInterval`
```ts
import { interval } from "js-utils-collection";

const clearFn = interval(function(){
  console.log(`hello world`)
}, 1000)

setTimeout(() => {
  clearFn() // 停止重复执行
}, 4000)
```
api
```ts
const clearFn: () => void = interval(cb: () => any, time: number)

```
---

#### download

下载文件，支持获取下载进度

```ts
import { download } from "js-utils-collection";

download(url, filename, options);
```

api
```typescript
const result: Promise<void> = download(url: string, filename: string, options: TOption & RequestInit)
```

`TOption`
| params  | 类型     | 描述              |
| ------- | -------- | ----------------- |
| `onProgress` | `(msg: { all: number; done: number; complete: boolean; fileName: string; url: string; }) => void; ` | 下载进度回调 |

---

#### 选择文件

调用函数动态唤起文件选择对话框

```ts
import { selectFile } from "js-utils-collection";

const result = selectFile("image/*", { len: 8, maxSize: 1024, minSize: 10, });
```

api
```typescript
const result: Promise<Files[]> = selectFile(accept = string, rule?: FileCheckerRule);
```

`FileCheckerRule`
| params  | 类型     | 描述              |
| ------- | -------- | ----------------- |
| `len` | `number` | 最多选择文件数量，默认 1 |
| `maxSize` | `number` | 允许最大文件的size，默认 Number.MAX_SAFE_INTEGER |
| `maxSize` | `number` | 允许最小文件的size, 默认 0 |

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


