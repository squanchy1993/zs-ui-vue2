<!--
 * @Date: 2023-05-07 20:54:37
 * @LastEditors: squanchy squanchy@yeah.net
 * @LastEditTime: 2023-05-15 15:06:03
 * @FilePath: /zs-ui-vue2/packages/m-components/src/m-form-codemirro/index.vue
-->
<template>
  <div style="height: 300px; width: 300px">
    <codemirror ref="newCm" v-model="code" :options="cmOptions" @ready="onCmReady" />
    <el-button @click="test">test</el-button>
  </div>
</template>

<script>
// 核心组件
import { codemirror } from 'vue-codemirror';

// 核心样式
import 'codemirror/lib/codemirror.css';

// 高亮库
import 'codemirror/mode/javascript/javascript.js';

// 主题css
import 'codemirror/theme/cobalt.css';

// require active-line.js
import 'codemirror/addon/selection/active-line.js';

// closebrackets
import 'codemirror/addon/edit/closebrackets.js';

export default {
  components: {
    codemirror
  },
  data() {
    return {
      code: '',
      cmOptions: {
        tabSize: 2, // tabsize默认为4
        styleActiveLine: true,
        lineNumbers: true,
        line: true,
        mode: 'text/javascript', // 选择代码语言，我这里选的sql
        extraKeys: { Ctrl: 'autocomplete' }, // 自动提示配置
        lineWrapping: true, // 自动换行
        theme: 'cobalt' // 主题根据需要自行配置
      }
    };
  },
  methods: {
    onCmReady(cm) {
      // 设置代码编辑框宽和高
      this.$refs.newCm.codemirror.setSize('-webkit-fill-available', 'auto');
    },
    test() {
      // eslint-disable-next-line no-eval
      eval(this.code);
    }
  }
};
</script>
<style lang="scss" scoped>
::v-deep {
  .CodeMirror {
    text-align: left !important;
  }
}
</style>