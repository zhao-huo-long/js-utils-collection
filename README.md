## js-utils-collection

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

#### `Storage`

扩展原 Web Storage 的` setItem``getItem `接口, 在 ts 中使用，能传入类型变量, 以此获得的 key,value 类型提示。

```ts
import { Storage } from "js-utils-collection";

interface KeyValType {
  id: number;
  username: string;
}

const storage = new Storage<KeyValType>("sessionStorage");

storage.setItem("id", 2);
// if you write storage.setItem('id', '2'), typescript will throw type error

storage.getItem("id");
// if you write storage.getItem('ids'), typescript will throw type error
```

> 工厂函数
> `import { storageBuilder } from "js-utils-collection";`

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

#### `fakeRequest`

模拟 ajax 异步返回值

```ts
import { fakeRequest } from "js-utils-collection";

fakeRequest({ msg: "hello world." }, 4000).then((data) => {
  // 4s后执行...
  console.log(data);
  // log: { msg: “hello world." }
});
```

| params  | 类型     | 描述                          |
| ------- | -------- | ----------------------------- |
| `data`  | `any`    | 等待一段时间后被 resolve 的值 |
| `delay` | `number` | 等待时间, 默认 1s             |

#### `interval`

用 `setTimeout` 模拟 `setInterval` 功能

```ts
import { interval } from "js-utils-collection";
```

#### `StringBox`
用来实现文字输入效果
```ts
import { StringBox } from "js-utils-collection";

new StringBox("abcd").pipelineChar((str, next) => {
  console.log(str, next)
})

// 每200ms打印一次
// a ture
// ab ture
// abc ture
// abcd false
```
```ts
interface TPipelineOption {
  speed?: number;
  signal?: AbortSignal;
  mode?: "append" | "single";
}
declare class StringBox extends String {
  pipelineChar: (cb: (str: string, next: boolean) => void, optionOuter?: TPipelineOption) => Promise<void>;
}
```
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
