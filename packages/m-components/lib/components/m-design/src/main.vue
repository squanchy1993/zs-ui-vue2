<template>
  <div class="m-design">
    <el-tabs class="tab-area" type="border-card">
      <el-tab-pane label="列表设置">
        <MFormGenerator v-model="config.listConfig" :config="besicData.listConfig" />
      </el-tab-pane>
      <el-tab-pane label="元素">
        <div class="design-table">
          <div class="design-table__drop-in">
            <MList v-bind="config.listConfig">
              <template #search>
                <MFormGenerator
                  :config="config.searchFormConfig"
                  @deleteItem="deleteFormItem"
                  @editItem="editFormItem"
                />
              </template>
              <template #table>
                <MTableGenerator
                  :config="config.tableConfig"
                  :list="[{}]"
                  @deleteItem="deleteTableItem"
                  @editItem="editTableItem"
                />
              </template>
              <template #pagination="{ handlePageOrSizeChange, pageParams, total }">
                <el-pagination
                  :page-size="pageParams.pageSize"
                  :current-page="pageParams.pageIndex"
                  :total="total"
                  :page-sizes="[10, 30, 50]"
                  layout="total, sizes, prev, pager, next, jumper"
                  @size-change="(pageSize) => handlePageOrSizeChange({ pageSize })"
                  @current-change="(pageIndex) => handlePageOrSizeChange({ pageIndex })"
                />
              </template>
            </MList>
          </div>
          <div class="design-table__dragge-out">
            <el-tabs type="border-card">
              <el-tab-pane label="元素">
                <designTableDraggeOut :fields="besicData.elemFields" />
              </el-tab-pane>
              <el-tab-pane label="列表设置" />
            </el-tabs>
          </div>

          <MPopupGenerator ref="tableColumnRef" :config="besicData.tableColumnDialogConfig" />
          <MPopupGenerator ref="formItemRef" :config="besicData.formItemDialogConfig" />
        </div>
        <MPopupGenerator
          v-for="(mPopoupConfig, i) in config.dialogConfig"
          :ref="setDialogRef(mPopoupConfig.key)"
          :key="i"
          :config="mPopoupConfig"
        />
      </el-tab-pane>
      <el-tab-pane label="弹框列表">
        <DesignDialog v-model="config.dialogConfig" />
      </el-tab-pane>
    </el-tabs>
    <div class="btn-area">
      <el-button
        style="width: 100%; margin-top: 20px"
        type="primary"
        size="small"
        @click="save"
      >保存</el-button>
    </div>
  </div>
</template>

<script>
import Sortable from 'sortablejs';
import { cloneDeep, uniqueId } from 'lodash-es';
import designTableDraggeOut from './design-table-dragge-out';
import { MList } from '../../m-list/index';
import { MTableGenerator } from '../../m-table/m-table-generator/index';
import { MFormGenerator } from '../../m-form/m-form-generator/index';
import { MPopupGenerator } from '../../m-popup/m-popup-generator';
import { deepMerge, parse, stringify } from '../../m-utils';
import {
  getTableColumnFields,
  getFormItemFields,
  elemFields,
  listConfig,
  tableColumnDialogConfig,
  formItemDialogConfig
} from './config';
import DesignDialog from './design-dialog/design-dialog';

export default {
  provide() {
    return {
      mLayoutTable: this
    };
  },
  components: {
    designTableDraggeOut,
    MList,
    MTableGenerator,
    MFormGenerator,
    MPopupGenerator,
    DesignDialog
  },
  props: {
    value: {
      type: Object,
      default: function () {
        return {};
      }
    }
  },
  data() {
    return {
      besicData: {
        elemFields,
        listConfig,
        tableColumnDialogConfig,
        formItemDialogConfig
      },
      config: {
        listConfig: {},
        searchFormConfig: {},
        tableConfig: {},
        dialogConfig: []
      },
      dialogs: {}
    };
  },
  watch: {
    value: {
      handler: function (inConfig) {
        if (inConfig) {
          this.config = Object.entries(inConfig).reduce((state, [key, value]) => {
            state[key] = typeof value === 'string' ? parse(value) : value;
            return state;
          }, {});
          console.log('this.config', this.config);
        }
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {
    this.initColumnDrop();
    this.initFormDrop();
  },
  methods: {
    // 列拖动
    initColumnDrop() {
      // 接受列表
      const wrapperTr = document.querySelector('.design-table .el-table__header-wrapper tr');
      Sortable.create(wrapperTr, {
        group: 'shared',
        animation: 180,
        delay: 0,
        onEnd: (evt) => {
          const { oldIndex, newIndex } = evt;
          let tempList = cloneDeep(this.config.tableConfig.fields);
          const oldItem = tempList.splice(oldIndex, 1)[0];
          tempList.splice(newIndex, 0, oldItem);
          this.config.tableConfig.fields = [];
          this.$nextTick(() => {
            this.config.tableConfig.fields = tempList;
          });
        },
        onAdd: (evt) => {
          // same properties as onEnd
          const { newDraggableIndex, oldDraggableIndex } = evt;
          let tempList = cloneDeep(this.config.tableConfig.fields);
          let {
            elemOptions,
            props: { label, prop = uniqueId('prop_') }
          } = cloneDeep(this.besicData.elemFields[oldDraggableIndex]);

          const insertItem = {
            props: {
              label,
              prop
            },
            elemOptions
          };
          tempList.splice(newDraggableIndex, 0, insertItem);
          wrapperTr.removeChild(evt.item);

          this.config.tableConfig.fields = [];
          this.$nextTick(() => {
            this.config.tableConfig.fields = tempList;
          });
        }
      });
    },

    initFormDrop() {
      // 接受列表
      const wrapperTr = document.querySelector(
        '.design-table .design-table__drop-in .m-form-generator__inner'
      );
      Sortable.create(wrapperTr, {
        group: 'shared',
        animation: 180,
        delay: 0,
        onEnd: (evt) => {
          console.log('onEnd>>', evt);
          const { oldIndex, newIndex } = evt;
          let tempList = cloneDeep(this.config.searchFormConfig.fields);
          const oldItem = tempList.splice(oldIndex, 1)[0];
          tempList.splice(newIndex, 0, oldItem);
          this.config.searchFormConfig.fields = [];
          this.$nextTick(() => {
            this.config.searchFormConfig.fields = tempList;
          });
        },
        onAdd: (evt) => {
          // same properties as onEnd
          const { newDraggableIndex, oldDraggableIndex } = evt;
          let tempList = cloneDeep(this.config.searchFormConfig.fields);
          let {
            elemOptions,
            props: { prop = uniqueId('prop_'), label }
          } = cloneDeep(this.besicData.elemFields[oldDraggableIndex]);

          const insertItem = {
            props: {
              label,
              prop
            },
            itemBoxStyle: {
              width: '200px',
              paddingRight: '10px'
            },
            elemOptions
          };
          tempList.splice(newDraggableIndex, 0, insertItem);
          wrapperTr.removeChild(evt.item);

          this.config.searchFormConfig.fields = [];
          this.$nextTick(() => {
            this.config.searchFormConfig.fields = tempList;
          });
        }
      });
    },

    setDialogRef(k) {
      this.$nextTick(() => {
        this.dialogs[k] = this.$refs[k][0];
      });
      return k;
    },

    // table-column
    deleteTableItem({ index }) {
      this.config.tableConfig.fields.splice(index, 1);
    },

    async editTableItem({ index, field }) {
      this.besicData.tableColumnDialogConfig.elemOptions.props.config.fields = getTableColumnFields(
        field.elemOptions.elem
      );
      await this.$nextTick();

      const changedField = await this.$refs.tableColumnRef.open({ tag: 'edit', data: field });
      let tempList = cloneDeep(this.config.tableConfig.fields);
      deepMerge(tempList[index], changedField);
      this.config.tableConfig.fields = [];
      await this.$nextTick();
      this.config.tableConfig.fields = tempList;
    },

    // form-item
    deleteFormItem({ index }) {
      this.config.searchFormConfig.fields.splice(index, 1);
    },

    async editFormItem({ index, field }) {
      this.besicData.formItemDialogConfig.elemOptions.props.config.fields = getFormItemFields(
        field.elemOptions
      );
      await this.$nextTick();
      console.log('field>>>>>', field);

      const changedField = await this.$refs.formItemRef.open({
        tag: 'edit',
        data: this.config.searchFormConfig.fields[index]
      });
      let tempList = cloneDeep(this.config.searchFormConfig.fields);
      deepMerge(tempList[index], changedField);
      this.config.searchFormConfig.fields = [];
      await this.$nextTick();
      this.config.searchFormConfig.fields = tempList;
    },

    async save() {
      let params = Object.entries(this.config).reduce((state, [key, value]) => {
        state[key] = value instanceof Object ? stringify(value) : value;
        return state;
      }, {});
      // update
      this.$emit('save', params);
    }
  }
};
</script>

<style scoped lang="scss">
.m-design {
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-rows: auto 100px;
  .tab-area {
    .design-table {
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
      }

      &__dragge-out {
        width: 20%;
      }
    }
  }
}
</style>

<style>
.design-table__drop-in .sortable-ghost {
  height: 20px !important;
}
</style>
