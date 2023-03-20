<!--
 * @Date: 2023-03-15 13:03:27
 * @LastEditors: squanchy1993 squanchy@yeah.net
 * @LastEditTime: 2023-03-20 09:11:41
 * @FilePath: \m-directives\README.md
-->
## Table of Contents

  - [Installing](#installing)
    - [Package manager](#package-manager)
  - [Example](#example)
  - [Directives API](#directives-api)
  - [License](#license)

## Installing

### Package manager

Using npm:

```bash
$ npm install @zs-ui-vue2/m-directives
```

Using yarn:

```bash
$ yarn add  @zs-ui-vue2/m-directives
```

Using pnpm:

```bash
$ pnpm add @zs-ui-vue2/m-directives
```

## Example
```js
import directive from '@zs-ui-vue2/m-directives';
Vue.directive('longPress', new directive.LongPress())
// or
import { LongPress } from '@zs-ui-vue2/m-directives';
Vue.directive('longPress', new LongPress())
```

```js
<i
    v-longPress="{delay:5000 ,interval: 1000 }"
    class="el-icon-arrow-up"
    @longPressStart="()=> longPressStart('forward')"
    @longPressEnd="()=> longPressEnd('robot')"
    @longPressInterval="()=> longPressInterval()"
/>
```

## Directives api

### LongPress
- v-longPress

The delay and interval default value is 400ms and 50ms, but you can change it by `Vue.directive('longPress', new LongPress( delay: 5000 ,interval: 1000 ))`or onely change temporary by
`v-longPress="{delay:5000 ,interval: 1000 }"`. 

- longPressStart

When longPress started will call function

- longPressEnd

When longPress ended will call function

- longPressInterval

When longPress going on it will call function every `interval`

## License

[MIT](LICENSE)