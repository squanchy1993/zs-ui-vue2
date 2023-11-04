<!--
 * @Date: 2022-11-01 09:12:52
 * @LastEditors: squanchy squanchy@yeah.net
 * @LastEditTime: 2023-11-02 09:13:30
 * @FilePath: \zs-ui-vue2\packages\m-components\lib\components\m-form\m-form-field-rules\src\main.vue
-->
<template>
  <div :class="['m-input', fieldClassName('m-input'), fieldDisabled ? 'is-disabled' : '']">
    <MFormFieldCodeInput v-model="value.fun"></MFormFieldCodeInput>
  </div>
</template>

<script>
const defaultVal = [];
import { DynamicFieldOption, MFormFieldCodeInput } from '@m-components/index.js'

export default {
  inject: ['mForm'],
  name: 'MFormFieldRules',
  components: {
    MFormFieldCodeInput
  },
  model: {
    prop: 'value',
    event: 'valueChange'
  },
  props: {
    value: {
      type: Object,
      default: () => ({
        trigger: 'sdf',
        fun: '12312321'
      })
    },
    size: {
      type: String,
      default: 'mini'
    },
    disabled: {
      type: Boolean,
      default: null
    },
    initialValue: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      previousValue: [],
      inputVisible: false,
      inputValue: '',
      fields: [
        new DynamicFieldOption({
          label: 'name',
          prop: 'name',
          elType: 'registered',
          element: 'el-input',
          required: false,
          defaultValue: null,
          width: '100%',
          option: {
            placeholder: '请输入name'
          }
        }),
        new DynamicFieldOption({
          label: 'validator',
          prop: 'validator',
          elType: 'registered',
          element: 'MFormFieldCodeInput',
          required: false,
          defaultValue: 'sdsd',
          width: '100%',
          option: {
            placeholder: '请输入name'
          }
        })
      ]
    };
  },
  computed: {
    // cache value
    fieldValueChange() {
      return this.value;
    },

    // size
    fieldClassName() {
      return function (sizeName) {
        try {
          const size = this.size || this.mForm.size;
          switch (size) {
            case 'medium':
              sizeName = sizeName + '--medium';
              break;
            case 'small':
              sizeName = sizeName + '--small';
              break;
            case 'mini':
              sizeName = sizeName + '--mini';
              break;
            default:
              break;
          }
        } catch (error) {
          console.log('fieldDisabled>>>>', error);
        }
        return sizeName;
      };
    },

    // disabled
    fieldDisabled() {
      try {
        if (this.disabled != null) return this.disabled;
        if (this.mForm.disabled != null) return this.mForm.disabled;
      } catch (error) {
        console.log('fieldDisabled>>>>', error);
      }
      return false;
    }
  },
  watch: {
    // listen value change
    fieldValueChange: {
      immediate: true,
      handler: function (value) {
        // 延迟到组件创建完毕后再进行
        this.$nextTick(() => {
          if ([undefined, null].includes(value)) {
            this.previousValue = defaultVal;
            return;
          }
          if (this.previousValue !== value) {
            this.previousValue = value;
          }
        });
      }
    }
  },
  methods: {
    // Notify father value has been changed
    notifyParent(value) {
      this.$emit('valueChange', value);
    },

    resetField() {
      console.log('this.mFomr', this.mForm.formDataStashed);
    },

    handleClose(tag) {
      this.previousValue.splice(this.previousValue.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      if (this.inputValue) {
        this.previousValue.push({
          name: this.inputValue,
          code: '',
          option: { size: 'mini', type: 'primary' }
        });
      }
      this.inputVisible = false;
      this.inputValue = '';
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../../../styles/common.scss';

.m-form-item-button {
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

  .el-tag + .el-tag {
    margin-left: 10px;
  }

  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }

  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
}

@include input-compoment-size('m-input');
@include input-compoment-disabled('m-input');
</style>
