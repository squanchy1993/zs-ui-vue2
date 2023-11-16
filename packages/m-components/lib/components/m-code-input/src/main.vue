<!--
 * @Date: 2023-05-07 20:54:37
 * @LastEditors: squanchy1993 squanchy@yeah.net
 * @LastEditTime: 2023-11-16 16:52:49
 * @FilePath: \zs-ui-vue2\packages\m-components\lib\components\m-code-input\src\main.vue
 * @TODO:既可以兼容原生js也可以使用eavl
-->
<template>
  <div class="code-container">
    <codemirror
      style="height: 100%"
      ref="newCm"
      v-model="componentValue"
      :options="cmOptions"
      @ready="onCmReady"
      @input="change"
    />
  </div>
</template>

<script>
/* eslint-disable */

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

import 'codemirror/addon/display/autorefresh';

const CodeMirror = require('codemirror/lib/codemirror'); // 后续要使用CodeMIrror，故使用require方式引入

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
      type: Function,
      default: function () {}
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
            this.componentValue = value.toString();
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
        theme: 'cobalt', // 主题根据需要自行配置
        minLines: 4,
        autoRefresh: true,
      },
      visible: false
    };
  },
  created() {
    CodeMirror.defineExtension('autoFormatRange', function (from, to) {
      var cm = this;
      var outer = cm.getMode(),
        text = cm.getRange(from, to).split('\n');
      var state = CodeMirror.copyState(outer, cm.getTokenAt(from).state);
      var tabSize = cm.getOption('tabSize');

      var out = '',
        lines = 0,
        atSol = from.ch === 0;

      function newline() {
        out += '\n';
        atSol = true;
        ++lines;
      }

      for (var i = 0; i < text.length; ++i) {
        var stream = new CodeMirror.StringStream(text[i], tabSize);
        while (!stream.eol()) {
          var inner = CodeMirror.innerMode(outer, state);
          var style = outer.token(stream, state),
            cur = stream.current();
          stream.start = stream.pos;
          if (!atSol || /\S/.test(cur)) {
            out += cur;
            atSol = false;
          }
          if (
            !atSol &&
            inner.mode.newlineAfterToken &&
            inner.mode.newlineAfterToken(
              style,
              cur,
              stream.string.slice(stream.pos) || text[i + 1] || '',
              inner.state
            )
          )
            newline();
        }
        if (!stream.pos && outer.blankLine) outer.blankLine(state);
        if (!atSol) newline();
      }

      cm.operation(function () {
        cm.replaceRange(out, from, to);
        for (var cur = from.line + 1, end = from.line + lines; cur <= end; ++cur) {
          cm.indentLine(cur, 'smart');
        }
      });
    });
  },
  mounted() {
    setTimeout(() => {
      this.formate();
    }, 1000);
  },
  methods: {
    onCmReady(cm) {
      // 设置代码编辑框宽和高
      this.$refs.newCm.codemirror.setSize('-webkit-fill-available', 'auto');
    },
    change(val) {
      try {
        this.$emit('valueChange', new Function(`return ${val}`)());
      } catch (error) {
        console.log('change: error', error);
      }
    },
    async formate() {
      this.$refs.newCm.codemirror.autoFormatRange(
        { line: 0, ch: 0 },
        { line: this.$refs.newCm.codemirror.lineCount() }
      );
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
