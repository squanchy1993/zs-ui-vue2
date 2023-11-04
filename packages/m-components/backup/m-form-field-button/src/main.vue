<!--
 * @Date: 2022-11-01 09:12:52
 * @LastEditors: squanchy squanchy@yeah.net
 * @LastEditTime: 2023-08-06 19:10:41
 * @FilePath: /zs-ui-vue2/packages/m-components/lib/components/m-form-item-button/src/main.vue
-->
<template>
  <div :class="['m-form-item-button', fieldClassName('m-input'), fieldDisabled ? 'is-disabled' : '']">
    <MFormPopover
      :key="index"
      :ref="`${tag.name}_${index}`"
      v-for="(tag, index) in previousValue"
      :formData.sync="previousValue[index]"
      :MDynamicFields="fields"
      class="m-form-item-button__item"
    >
      <el-tag :disable-transitions="false" size="small" @close="handleClose(tag)" closable>
        {{ tag.name }}
      </el-tag>
    </MFormPopover>

    <el-input
      class="input-new-tag"
      v-if="inputVisible"
      v-model="inputValue"
      ref="saveTagInput"
      size="small"
      @keyup.enter.native="handleInputConfirm"
      @blur="handleInputConfirm"
    >
    </el-input>
    <el-tag type="success" v-else class="button-new-tag" size="small" @click="showInput">+ New button</el-tag>
  </div>
</template>

<script>
const defaultVal = [];
import { DynamicFieldOption, MFormPopover } from '../../../../index';

export default {
  inject: ['mForm'],
  name: 'MFormFieldButton',
  components: {
    MFormPopover
  },
  model: {
    prop: 'value',
    event: 'valueChange'
  },
  props: {
    value: {
      type: Array,
      default: () => []
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
          console.log('received value change: ', value);
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
        this.previousValue.push({ name: this.inputValue, code: '', option: { size: 'mini', type: 'primary' }});
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
  display: flex;
  flex-wrap: wrap;
  &__item{
    margin-right: 5px;
    margin-bottom: 5px;
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
