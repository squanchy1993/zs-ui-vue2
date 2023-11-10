<template>
  <div class="design-table">
    <div class="design-table__drop-in">
      <MTableGenerator :config="config.tableConfig" :list="[{}]" />
      <MPopupGenerator
        v-for="(config, key, i) in dialogConfig"
        :ref="setDialogRef(key)"
        :key="i"
        :config="config"
      />
    </div>
    <div class="design-table__dragge-out">
      <el-tabs type="border-card">
        <el-tab-pane label="列表">
          <designTableDraggeOut :fields="besicData.fields" />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import Sortable from 'sortablejs';
import { cloneDeep, uniqueId } from 'lodash-es';
import { MTableGenerator } from '../../../../m-table/m-table-generator/index';
import { MPopupGenerator } from '../../../../m-popup/m-popup-generator/index';
import designTableDraggeOut from './design-table-dragge-out.vue';

export default {
  components: {
    MTableGenerator,
    MPopupGenerator,
    designTableDraggeOut
  },
  data() {
    return {
      besicData: {
        fields: [
          {
            props: {
              label: 'text',
              prop: 'text'
            }
          },
          {
            props: {
              label: 'el-switch',
              prop: 'el-switch'
            },
            elemOptions: {
              type: 'registered',
              elem: 'el-switch',
              props: {
                placeholder: '输入gender',
                activeValue: 0,
                activeText: '女',
                activeColor: 'pink',
                inactiveValue: 1,
                inactiveText: '男',
                inactiveColor: 'green',
                disabled: true
              }
            }
          }
        ]
      },
      config: {
        tableConfig: {
          props: {
            border: true,
            height: '200px'
          },
          on: {
            'cell-dblclick': (row, column, cell, event) => {
              const index = Array.prototype.indexOf.call(cell.parentNode.children, cell);
              console.log(this.config.tableConfig.fields[index]);
            }
          },
          fields: [
            {
              props: {
                label: 'name',
                prop: 'name'
              }
            },
            {
              props: {
                label: 'age',
                prop: 'age'
              }
            },
            {
              props: {
                label: 'gender',
                prop: 'gender'
              },
              elemOptions: {
                type: 'registered',
                elem: 'el-switch',
                props: {
                  placeholder: '输入gender',
                  activeValue: 0,
                  activeText: '女',
                  activeColor: 'pink',
                  inactiveValue: 1,
                  inactiveText: '男',
                  inactiveColor: 'green',
                  disabled: true
                }
              }
            },
            {
              props: {
                label: 'membership',
                prop: 'membership'
              },
              elemOptions: {
                type: 'registered',
                elem: 'el-switch',
                props: {
                  'active-value': true,
                  'inactive-value': false,
                  disabled: true
                }
              }
            },
            {
              props: {
                label: 'address',
                prop: 'address'
              }
            }
          ]
        }
      },
      // 拖拽列
      dialogConfig: {
        // tableDraggeOut: {
        //   elem: 'el-drawer',
        //   props: {
        //     title: '列表编辑',
        //     width: '80%',
        //     size: '30%'
        //   },
        //   scrollStyle: {
        //     height: '60vh'
        //   },
        //   on: ({ mTableCtrl }) => {
        //     return {
        //       close: mTableCtrl.close
        //     };
        //   },
        //   elemOptions: {
        //     type: 'render',
        //     elem: ({ h, formItem, props: { resetFields } }) => {
        //       return <designTableDraggeOut />;
        //     }
        //   }
        // }
      },
      dialogs: {}
    };
  },
  mounted() {
    this.columnDrop();
    // setTimeout(() => {
    //   console.log('this.dialogs.tableDraggeOut', this.dialogs.tableDraggeOut);
    //   this.dialogs.tableDraggeOut.open({});
    // }, 1000);
  },
  methods: {
    // 列拖动
    columnDrop() {
      // 接受列表
      const wrapperTr = document.querySelector('.design-table .el-table__header-wrapper tr');
      Sortable.create(wrapperTr, {
        group: 'shared',
        animation: 180,
        delay: 0,
        onEnd: (evt) => {
          console.log('onEnd>>', evt);
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
          let insertItem = cloneDeep(this.besicData.fields[oldDraggableIndex]);
          insertItem.prop = uniqueId('prop_');
          this.config.tableConfig.fields.splice(newDraggableIndex, 0, cloneDeep(insertItem));
          wrapperTr.removeChild(evt.item);
        }
      });
    },

    setDialogRef(k) {
      this.$nextTick(() => {
        this.dialogs[k] = this.$refs[k][0];
      });
      return k;
    }
  }
};
</script>

<style scoped lang="scss">
.design-table {
  display: flex;
  height: 400px;
  width: 100%;
  &__drop-in {
    width: 80%;
    .dragge-out__item {
      height: 20px !important;
    }
  }

  &__dragge-out {
    width: 20%;
  }
}
</style>

<style>
.design-table__drop-in .sortable-ghost {
  height: 20px !important;
}
</style>
