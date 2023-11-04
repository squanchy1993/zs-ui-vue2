<!--
 * @Date: 2022-11-01 09:12:52
 * @LastEditors: squanchy squanchy@yeah.net
 * @LastEditTime: 2023-03-26 18:39:59
 * @FilePath: /m-components/lib/components/m-input/src/main.vue
-->
<template>
  <div
    :class="[
      'm-input',
      fieldClassName('m-input'),
      fieldDisabled ? 'is-disabled' : ''
    ]"
  >
    <input
      v-model="componentValue"
      :disabled="fieldDisabled"
      class="m-input__inner"
      autocomplete="off"
      @input="componentValueChange(componentValue)"
    >
  </div>
</template>

<script>
const defaultVal = '';
export default {
  inject: ['mForm'],
  name: 'MInput',
  model: {
    prop: 'value',
    event: 'valueChange'
  },
  props: {
    value: {
      type: String,
      default: defaultVal
    },
    size: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: null
    },
    initialValue: {
      type: String,
      default: defaultVal
    }
  },
  data() {
    return {
      componentValue: defaultVal
    };
  },
  computed: {
    fieldValueChange() {
      // 监听输入value的变化
      return this.value;
    },

    // size
    fieldClassName() {
      return function (sizeName) {
        const size = this.size || this.mForm.size;
        switch (size) {
          case 'medium':
            sizeName = sizeName + '--medium'
            break;
          case 'small':
            sizeName = sizeName + '--small'
            break;
          case 'mini':
            sizeName = sizeName + '--mini'
            break;
          default:
            break;
        }
        return sizeName
      }
    },

    // disabled
    fieldDisabled() {
      if (this.disabled != null) return this.disabled;
      if (this.mForm.disabled != null) return this.mForm.disabled;
      return false
    }
  },
  watch: {
    fieldValueChange: {
      immediate: true,
      handler: function (value) {
        // 延迟到组件创建完毕后再进行
        this.$nextTick(() => {
          console.log('received value change: ', value);
          if (!value) {
            this.componentValue = defaultVal;
            return;
          }
          if (this.componentValue !== value) {
            this.componentValue = value;
          }
        });
      }
    }
  },
  methods: {
    // 通知父元素已经变化
    componentValueChange(value) {
      this.$emit('valueChange', value);
    },

    resetField() {
      console.log('this.mFomr', this.mForm.formDataStashed)
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../../../../styles/common.scss';

.m-input {
  width: 100%;
  &__inner {
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    outline: none;
    padding: 0 15px;
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    width: 100%;
  }
}

@include input-compoment-size('m-input');
@include input-compoment-disabled('m-input');
</style>

