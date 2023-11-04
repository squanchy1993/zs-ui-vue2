<!--
 * @Author: your name
 * @Date: 2021-06-15 11:12:27
 * @LastEditTime: 2023-11-04 23:11:27
 * @LastEditors: squanchy squanchy@yeah.net
 * @Description: type 的设置 可以写在一个组件里面，可以单独拉出来，看你这个组件复杂不，复杂的话一个模块一个type
 * @FilePath: /m-components/lib/components/m-json-editor/src/mian.vue
-->
<template>
  <div class="m-json-editor">
    <vueJsonEditor
      v-model="previousValue"
      :show-btns="showBtns"
      :expanded-on-start="expandedOnStart"
      @json-change="componentValueChange"
    />
  </div>
</template>

<script>
import vueJsonEditor from 'vue-json-editor';
import { debounce } from 'lodash-es';
/* eslint-disable */
export default {
  name: 'MJsonEditor',
  components: {
    vueJsonEditor
  },
  model: {
    prop: 'value',
    event: 'valueChange'
  },
  props: {
    value: {
      type: String,
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
      previousValue: {}
    };
  },
  watch: {
    value: {
      deep: true,
      immediate: true,
      handler: function (value) {
        // 延迟到组件创建完毕后再进行
        this.$nextTick(() => {
          if ([null, undefined].includes(value) || typeof value != 'string') {
            this.previousValue = {};
          } else if (value !== JSON.stringify(this.previousValue)) {
            console.log('.>>')
            this.previousValue = JSON.parse(value);
          }
        });
      }
    }
  },
  methods: {
    // 通知父元素已经变化
    componentValueChange: debounce(function(){
      this.$emit('valueChange', JSON.stringify(this.previousValue));
    }, 500)
  }
};
</script>

<style lang="scss" scoped>
.m-json-editor {
  width: 100%;
}
</style>
