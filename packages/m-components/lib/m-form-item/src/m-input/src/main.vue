<!--
 * @Date: 2022-11-01 09:12:52
 * @LastEditors: DESKTOP-58041OI\zzs squanchy@yeah.net
 * @LastEditTime: 2022-11-01 13:50:31
 * @FilePath: \zs-ui-vue2\packages\m-form\lib\m-form-item\src\m-input\src\main.vue
-->
<template>
  <el-form-item
    class="form-item"
    v-bind="formItem"
  >
    <el-input
      v-model="componentValue"
      class="item_input"
      autocomplete="off"
      :disabled="formItem.disabled"
      v-bind="formItem.options"
      @input="componentValueChange(componentValue)"
    />
  </el-form-item>
</template>

<script>
import { CommonUtils } from '@zs-ui-vue2/shared';
const defaultVal = '';
export default {
  name: 'MInput',
  model: {
    prop: 'value',
    event: 'valueChange'
  },
  props: {
    formItem: {
      type: Object,
      default: () => {
        return {}
      }
    },
    value: {
      type: String,
      default: defaultVal
    }
  },
  data() {
    return {
      componentValue: defaultVal
    }
  },
  computed: {
    inputValueChange() {
      // 监听输入value的变化
      return this.value
    }
  },
  watch: {
    inputValueChange: {
      immediate: true,
      handler: function(value) {
        // 延迟到组件创建完毕后再进行
        this.$nextTick(() => {
          console.log('received value change: ', value)
          if (CommonUtils.isEmpty(value)) {
            this.componentValue = defaultVal
            return;
          }
          if (!this._.eq(this.componentValue, value)) {
            this.componentValue = this._.cloneDeep(value)
          }
        })
      }
    }
  },
  methods: {
    // 通知父元素已经变化
    componentValueChange(value) {
      console.log('noticed father: ', value)
      this.$emit('valueChange', value)
      this.formItem.change(value)
    }
  }
}
</script>

