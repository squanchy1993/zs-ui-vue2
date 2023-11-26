<!--
 * @Date: 2023-05-07 20:54:37
 * @LastEditors: squanchy1993 squanchy@yeah.net
 * @LastEditTime: 2023-11-26 19:38:10
 * @FilePath: /m-components/lib/components/m-code-input/src/main.vue
 * @TODO:既可以兼容原生js也可以使用eavl
-->
<template>
  <div class="code-container">
    <codemirror
      ref="newCm"
      v-model="componentValue"
      style="height: 100%"
      :options="cmOptions"
      @ready="onCmReady"
      @input="change"
    />
  </div>
</template>

<script>
/* eslint-disable */

// codemirror
/// 核心组件
import { codemirror } from 'vue-codemirror';

/// 核心样式
import 'codemirror/lib/codemirror.css';

/// 高亮库
import 'codemirror/mode/javascript/javascript.js';

/// 主题css
import 'codemirror/theme/cobalt.css';

/// require active-line.js
import 'codemirror/addon/selection/active-line.js';

/// closebrackets
import 'codemirror/addon/edit/closebrackets.js';

import 'codemirror/addon/display/autorefresh';

/// 代码错误检查
// import 'codemirror/addon/lint/lint.css'
// import 'codemirror/addon/lint/lint'
// import 'codemirror/addon/lint/javascript-lint'

// import jshint from 'jshint'
// window.JSHINT = jshint.JSHINT;

/// 代码美化
import jsBeautify from 'js-beautify';
const beautifyJs = jsBeautify.js_beautify;

// others
import { parse, isObj, isFunction, isArr } from '../../m-utils';

export default {
  name: 'MCodeInput',
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
      type: [Function, Object, Array],
      default: null
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
            if (isObj(value) || isArr(value)) {
              this.componentValue = this.parseObjToCodeStr(value);
            }

            if (isFunction(value)) {
              this.componentValue = beautifyJs(value.toString(), {
                indent_size: 2
              });
            }
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
        lint: true,
        line: true,
        mode: 'text/javascript', // 选择代码语言，我这里选的sql
        extraKeys: { Ctrl: 'autocomplete' }, // 自动提示配置
        lineWrapping: true, // 自动换行
        theme: 'cobalt', // 主题根据需要自行配置
        minLines: 4,
        autoRefresh: true
      },
      visible: false
    };
  },
  methods: {
    onCmReady(cm) {
      // 设置代码编辑框宽和高
      this.$refs.newCm.codemirror.setSize('-webkit-fill-available', 'auto');
    },
    change(val) {
      let emitVal = null;
      try {
        let value = new Function(`return ${val}`)();
        value && (emitVal = value);
      } catch (error) {
        console.log('change: error', error);
      }
      this.$emit('valueChange', emitVal);
    },

    parseObjToCodeStr(ojb) {
      let funcStrings = [];
      const jsonStr = JSON.stringify(
        ojb,
        (key, value) => {
          let data = value;
          try {
            let func = new Function(`return ${data}`)();
            if (isFunction(func)) {
              let funcStr = func.toString();
              funcStrings.push(funcStr);
              return funcStr;
            }
          } catch (error) {}
          return value;
        },
        '\t'
      );
      const codeStr = funcStrings.reduce((state, cur) => {
        state = state.replace(JSON.stringify(cur), cur);
        return state;
      }, jsonStr);
      return codeStr;
    }
  }
};
</script>
<style lang="scss" scoped>
.code-container {
  width: 100%;
}
::v-deep {
  .CodeMirror {
    text-align: left !important;
    height: 100% !important;
    .CodeMirror-line,
    .CodeMirror-linenumber {
      font-size: 12px;
      line-height: 12px;
    }
  }
}
</style>
