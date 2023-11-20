<!--
 * @Date: 2023-11-19 16:03:44
 * @LastEditors: squanchy1993 squanchy@yeah.net
 * @LastEditTime: 2023-11-20 11:33:57
 * @FilePath: \m-components\lib\components\m-design\src\design-dialog\design-dialog-content.vue
-->

<template>
  <div class="design-dialog">
    <div class="tabs">
      <el-tabs type="border-card">
        <el-tab-pane label="列表设置">
          <MFormGenerator ref="MFormGeneratorRef" v-model="formData" :config="popupDialogConfig" />
        </el-tab-pane>
        <el-tab-pane label="元素">
          <div class="formSetting">
            <div class="formSetting__drop-in">
              <MFormGenerator
                :config="fieldConfig"
                @deleteItem="deleteFormItem"
                @editItem="editFormItem"
              />
            </div>
            <div class="formSetting__dragge-out">
              <el-tabs type="border-card">
                <el-tab-pane label="元素">
                  <designTableDraggeOut class="dialog" :fields="besicData.elemList" />
                </el-tab-pane>
              </el-tabs>
            </div>

            <MPopupGenerator ref="formItemRef" :config="besicData.formItemDailogConfig" />
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="btns">
      <el-button size="small" @click="reset">重置</el-button>
      <el-button size="small" @click="save">保存</el-button>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import Sortable from 'sortablejs';
import { MFormGenerator } from '../../../m-form/m-form-generator';
import designTableDraggeOut from '../design-table-dragge-out';
import { getFormItemFields, elemList, formItemDailogConfig, popupDialogConfig} from './config';
import { cloneDeep, uniqueId } from 'lodash-es';
import { deepMerge, difference } from '../../../m-utils';
import { MPopupGenerator } from '../../../m-popup/m-popup-generator';
export default {
  model: {
    prop: 'value',
    event: 'valueChange'
  },
  components: {
    MFormGenerator,
    designTableDraggeOut,
    MPopupGenerator
  },
  inject: {
    mFormDialogCtrl: { default: null }
  },
  props: {
    value: {
      type: Array,
      default: function () {
        return [];
      }
    }
  },
  watch: {
    ['fieldConfig.fields']: {
      handler: function (value) {
        if (
          JSON.stringify(value) !== JSON.stringify(this.formData.elemOptions.props.config.fields)
        ) {
          this.formData.elemOptions.props.config.fields = value;
        }
      },
      deep: true
    }
  },
  computed: {
    fieldConfig() {
      return {
        props: {
          ref: 'form',
          size: 'mini',
          labelPosition: 'right',
          labelWidth: '80px'
        },
        boxStyle: {
          justifyContent: 'space-between'
        },
        fields: this.formData?.elemOptions?.props?.config?.fields ?? []
      };
    }
  },
  data() {
    return {
      besicData: {
        elemList,
        formItemDailogConfig
      },
      popupDialogConfig,
      formData: {}
    };
  },
  mounted() {},
  methods: {
    initFormDrop() {
      // 接受列表
      const wrapperTr = document.querySelector(
        '.design-dialog .formSetting__drop-in .m-form-generator__inner'
      );

      Sortable.create(wrapperTr, {
        group: 'shared',
        animation: 180,
        delay: 0,
        onEnd: (evt) => {
          console.log('onEnd>>', evt);
          const { oldIndex, newIndex } = evt;
          let tempList = cloneDeep(this.formData.elemOptions.props.config.fields);
          const oldItem = tempList.splice(oldIndex, 1)[0];
          tempList.splice(newIndex, 0, oldItem);
          this.formData.elemOptions.props.config.fields = [];
          this.$nextTick(() => {
            this.formData.elemOptions.props.config.fields = tempList;
          });
        },
        onAdd: (evt) => {
          // same properties as onEnd
          const { newDraggableIndex, oldDraggableIndex } = evt;
          let tempList = cloneDeep(this.formData.elemOptions.props.config.fields);
          let {
            elemOptions,
            props: { prop = uniqueId('prop_'), label }
          } = cloneDeep(this.besicData.elemList[oldDraggableIndex]);

          const insertItem = {
            props: {
              label,
              prop
            },
            itemBoxStyle: {
              width: '50%'
            },
            elemOptions
          };
          tempList.splice(newDraggableIndex, 0, insertItem);
          wrapperTr.removeChild(evt.item);

          this.formData.elemOptions.props.config.fields = [];
          this.$nextTick(() => {
            this.formData.elemOptions.props.config.fields = tempList;
          });
        }
      });
    },
    deleteItem(tag) {
      let index = this.value.indexOf(tag);
      this.value.splice(index, 1);
    },
    openItem(item) {
      console.log(item);
      this.$refs.dialogSettingRef.open({ tag: 'edit', data: item });
    },
    startup({ data, tag }) {
      this.formData = data;
      this.$nextTick(() => {
        this.initFormDrop();
      });
      //   this.formData.elemOptions.props.config.fields = cloneDeep(
      //     Array.from(this.formData.elemOptions.props.config.fields)
      //   );
    },

    setDialogRef(k) {
      this.$nextTick(() => {
        this.dialogs[k] = this.$refs[k][0];
      });
      return k;
    },

    // form-item
    deleteFormItem({ index }) {
      this.formData.elemOptions.props.config.fields.splice(index, 1);
    },

    async editFormItem({ index, field }) {
      this.besicData.formItemDailogConfig.elemOptions.props.config.fields = getFormItemFields(
        field.elemOptions.elem
      );
      await this.$nextTick();
      console.log('field>>>>>', field);

      const changedField = await this.$refs.formItemRef.open({
        tag: 'edit',
        data: this.formData.elemOptions.props.config.fields[index]
      });
      let tempList = cloneDeep(this.formData.elemOptions.props.config.fields);
      deepMerge(tempList[index], changedField);
      this.formData.elemOptions.props.config.fields = [];
      await this.$nextTick();
      this.formData.elemOptions.props.config.fields = tempList;
    },

    reset() {
      this.$refs.MFormGeneratorRef.reset();
    },
    async save() {
      console.log('this.$refs.MFormGeneratorRef', this.$refs.MFormGeneratorRef.formController);
      const { validateFields, formData } = this.$refs.MFormGeneratorRef.formController;
      await validateFields();
      this.mFormDialogCtrl.openResolve(formData);
      this.mFormDialogCtrl.clear();
    }
  }
};
</script>

<style scoped lang="scss">
.design-dialog {
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-rows: 60vh 100px;
  .formSetting {
    display: flex;
    height: 400px;
    width: 100%;
    &__drop-in {
      width: 80%;
      .dragge-out__item {
        height: 20px !important;
      }
      ::v-deep {
        .m-table-item,
        .m-form-item {
          &__delete,
          &__edit {
            display: block;
          }
        }
      }
      .m-form-generator {
        width: calc(100% - 40px);
        height: calc(100% - 40px);
        margin: 10px;
        border: 1px dotted red;
        padding: 10px;
      }
    }

    &__dragge-out {
      width: 20%;
    }
  }
}
</style>
<style>
.design-dailog__drop-in .sortable-ghost {
  height: 20px !important;
}
</style>
