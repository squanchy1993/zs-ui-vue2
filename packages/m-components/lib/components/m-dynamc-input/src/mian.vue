<!--
 * @Author: your name
 * @Date: 2021-06-15 11:12:27
 * @LastEditTime: 2023-11-13 15:04:26
 * @LastEditors: squanchy1993 squanchy@yeah.net
 * @Description: type 的设置 可以写在一个组件里面，可以单独拉出来，看你这个组件复杂不，复杂的话一个模块一个type
 * @FilePath: /zs-ui-vue2/packages/m-components/lib/components/m-dynamc-input/src/mian.vue
-->
<template>
  <div class="m-json-editor">
    <vueJsonEditor
      v-model="previousValue"
      :show-btns="showBtns"
      :expanded-on-start="expandedOnStart"
      mode="code"
      @json-change="componentValueChange"
    />
  </div>
</template>

<script>
import vueJsonEditor from 'vue-json-editor';
import { debounce } from 'lodash-es';
/* eslint-disable */
export default {
  name: 'MDynamicInput',
  components: {
    vueJsonEditor
  },
  model: {
    prop: 'value',
    event: 'valueChange'
  },
  props: {
    value: {
      type: [String, Number, Array],
      default: () => {
        return [];
      }
    },
    showBtns: {
      type: Boolean,
      default: true
    },
    expandedOnStart: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      previousValue: {
        value: null
      }
    };
  },
  watch: {
    value: {
      deep: true,
      immediate: true,
      handler: function (value) {
        // 延迟到组件创建完毕后再进行
        this.$nextTick(() => {
          console.log(value)
          if ([null, undefined].includes(value)) {
            this.previousValue = {
              value: null
            };
          } else if (value !== JSON.stringify(this.previousValue.value)) {
            this.previousValue.value = value;
          }
        });
      }
    }
  },
  methods: {
    // 通知父元素已经变化
    componentValueChange: debounce(function () {
      this.$emit('valueChange', this.previousValue.value);
    }, 500)
  }
};
</script>

<style lang="scss" scoped>
::v-deep {
  .jsoneditor-menu{
    visibility: hidden;
    height: 0;
    display: none;
  }
  .jsoneditor-outer{
    margin: 0;
    padding: 0;
    .ace_editor{
      min-height: 80px;
    }
  }
}
.m-json-editor {
  width: 100%;
}
</style>
