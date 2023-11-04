<!--
 * @Date: 2023-05-07 20:54:37
 * @LastEditors: squanchy1993 squanchy@yeah.net
 * @LastEditTime: 2023-05-26 13:14:08
 * @FilePath: \zs-ui-vue2\packages\m-components\lib\components\m-form-designer\src\desinger-code-edit\index.vue
-->
<template>
  <div class="code-container">
    <codemirror
      ref="newCm"
      v-model="componentValue"
      :options="cmOptions"
      @ready="onCmReady"
      @input="change"
    />
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
  model: {
    prop: 'value',
    event: 'valueChange'
  },
  props: {
    option: {
      type: Object,
      default: () => {
        return {};
      }
    },
    value: {
      type: String,
      default: ''
    }
  },
  computed: {
    inputValueChange() {
      // 监听输入value的变化
      return this.value;
    }
  },
  watch: {
    inputValueChange: {
      immediate: true,
      handler: function (value) {
        // 延迟到组件创建完毕后再进行
        this.$nextTick(() => {
          if (value !== this.componentValue && value !== null) {
            this.componentValue = value;
          }
        });
      }
    }
  },
  data() {
    return {
      componentValue: '',
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
    change(val) {
      this.$emit('valueChange', val);
    },
    test() {
      // eslint-disable-next-line no-eval
      eval(this.componentValue);
    }
  }
};
</script>
<style lang="scss" scoped>
.code-container {
  width: 100%;
  max-height: 300px;
  overflow: scroll;
}
::v-deep {
  .CodeMirror {
    text-align: left !important;
  }
}
</style>