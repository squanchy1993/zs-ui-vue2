<!--
 * @Author: your name
 * @Date: 2021-06-15 11:12:27
 * @LastEditTime: 2023-08-20 16:51:05
 * @LastEditors: squanchy squanchy@yeah.net
 * @Description: type 的设置 可以写在一个组件里面，可以单独拉出来，看你这个组件复杂不，复杂的话一个模块一个type
 * @FilePath: /zs-ui-vue2/packages/m-components/lib/components/m-form-item-code-button/src/mian.vue
-->
<template>
  <div class="m-form-designer-button">
    <MFormPopover
      :formData.sync="previousValue"
      :MDynamicFields="fields"
      class="m-form-item-button__item"
    >
      <el-tag :disable-transitions="false" size="small" closable>
        {{ previousValue.name }}
      </el-tag>
    </MFormPopover>
  </div>
</template>

<script>
const defaultVal = {
  name: '',
  code: '',
  option: {}
};
import { MFormPopover, DynamicFieldOption } from '@lib/index.js';
/* eslint-disable */
export default {
  name: 'MFormFieldCodeButton',
  components: {
    MFormPopover
  },
  model: {
    prop: 'value',
    event: 'valueChange'
  },
  props: {
    value: {
      type: Object,
      default: () => null
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
      type: Object,
      default: () => null
    }
  },
  created(){
    this.previousValue = JSON.parse(JSON.stringify(defaultVal))
  },
  data() {
    return {
      previousValue: null,
      visible: false,
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
          label: 'code',
          prop: 'code',
          elType: 'registered',
          element: 'MFormFieldCodeInput',
          required: false,
          defaultValue: "console.log('formInstance', this.formInstance)",
          width: '100%',
          option: {
            placeholder: '请输入name'
          }
        }),
        new DynamicFieldOption({
          label: 'size',
          prop: 'option.size',
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
          label: 'type',
          prop: 'option.type',
          elType: 'registered',
          element: 'el-input',
          required: false,
          defaultValue: null,
          width: '100%',
          option: {
            placeholder: '请输入name'
          }
        })
      ]
    };
  },
  computed: {
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
    value: {
      immediate: true,
      deep: true,
      handler: function (value) {
        // 延迟到组件创建完毕后再进行
        this.$nextTick(() => {
          if ([undefined, null].includes(value)) {
            this.previousValue = JSON.parse(JSON.stringify(defaultVal));
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
    }
  }
};
</script>

<style lang="scss" scoped>
.m-form-designer-button {
  position: relative;
  margin-right: 5px;
  .edit-btn,
  .delete-btn {
    width: 20px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    position: absolute;
  }
  .edit-btn {
    background: #4182d7;
    right: 0;
    bottom: 0;
  }

  .delete-btn {
    background: #f56c6c;
    right: 0;
    top: 0;
  }
  .MFormGenerator {
    :v-deep {
      .el-form-item {
        font-size: 12px;
      }
    }
  }
}
</style>
