<template>
  <el-form-item
    class="form-item"
    v-bind="formItem"
  >
    <el-input-number
      v-model="componentValue"
      class="item_input"
      v-bind="formItem.options"
      autocomplete="off"
      @blur="componentValueChange(componentValue)"
    />
  </el-form-item>
</template>

<script>
export default {
  name: 'MInputNumber',
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
      type: Number,
      default: null
    }
  },
  data() {
    return {
      componentValue: ''
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
          if (value != null) {
            this.componentValue = this._.cloneDeep(value)
          }
        })
      }
    }
  },
  methods: {
    // 通知父元素已经变化
    componentValueChange(value) {
      this.$emit('valueChange', value)
    }
  }
}
</script>

