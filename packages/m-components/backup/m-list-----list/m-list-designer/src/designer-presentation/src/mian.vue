<!--
 * @Author: your name
 * @Date: 2021-06-15 11:12:27
 * @LastEditTime: 2023-05-28 18:24:15
 * @LastEditors: squanchy squanchy@yeah.net
 * @Description: type 的设置 可以写在一个组件里面，可以单独拉出来，看你这个组件复杂不，复杂的话一个模块一个type
 * @FilePath: /zs-ui-vue2/packages/m-components/lib/components/m-form/m-form-designer/src/designer-presentation/src/mian.vue
-->
<template>
  <div class="m-form-designer-presentation">
    <div class="select-item">
      <span class="title">Presentation</span>
      <el-select
        v-model="presentationOption.element"
        size="mini"
        placeholder="choose form's presentation"
        @change="change"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <div class="form-area">
      <MFormGenerator ref="form" class="MFormGenerator" :form-option="formOption" />
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { MFormGenerator, MDynamicField } from '../../../../../m-form/m-form-generator/index';
import { FormOption, DynamicFieldOption } from '../../../../../m-models/index';

export default {
  name: 'MFormDesignerPresentation',
  components: {
    MFormGenerator,
    MDynamicField
  },
  props: {
    presentationOption: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      options: [
        {
          value: 'el-dialog',
          label: 'dailog'
        },
        {
          value: 'el-drawer',
          label: 'drawer'
        }
      ],
      formOption: new FormOption({
        option: {
          size: 'mini',
          labelWidth: '80px'
        },
        formData: this.presentationOption.option,
        MDynamicFields: []
      }),

      formFields: {
        'el-dialog': [
          new DynamicFieldOption({
            label: 'title',
            prop: 'title',
            elType: 'registered',
            element: 'el-input',
            required: false,
            defaultValue: '',
            width: '100%',
            option: {
              placeholder: '请输入title'
            }
          }),
          new DynamicFieldOption({
            label: 'width',
            prop: 'width',
            elType: 'registered',
            element: 'el-input',
            required: false,
            defaultValue: '100%',
            width: '100%',
            option: {
              placeholder: '组件宽度 100% or 100px'
            }
          })
        ],
        'el-drawer': [
          new DynamicFieldOption({
            label: 'title',
            prop: 'title',
            elType: 'registered',
            element: 'el-input',
            required: false,
            defaultValue: '',
            width: '100%',
            option: {
              placeholder: '请输入title'
            }
          }),
          new DynamicFieldOption({
            label: 'withHeader',
            prop: 'withHeader',
            elType: 'registered',
            element: 'el-switch',
            required: false,
            defaultValue: false,
            width: '100%',
            option: {
              placeholder: '请输入withHeader'
            }
          })
        ]
      }
    };
  },
  created() {
    this.formOption.MDynamicFields = this.formFields['el-dialog'];
  },
  methods: {
    change(e) {
      this.formOption.MDynamicFields = this.formFields[e];
    }
  }
};
</script>

<style lang="scss" scoped>
.m-form-designer-presentation {
  padding: 10px;

  .select-item {
    width: 100%;
    display: flex;
    margin-bottom: 5px;
    .title {
      width: 80px;
    }
  }
  .form-area {
    border: 1px dashed #409eff;
    padding: 5px;
  }
}
</style>