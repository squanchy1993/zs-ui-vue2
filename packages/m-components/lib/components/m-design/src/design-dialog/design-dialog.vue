<!--
 * @Date: 2023-11-19 16:03:44
 * @LastEditors: squanchy1993 squanchy@yeah.net
 * @LastEditTime: 2023-11-20 11:36:08
 * @FilePath: \m-components\lib\components\m-design\src\design-dialog\design-dialog.vue
-->

<template>
  <div class="design-table-dragge-out">
    <el-table :data="value" style="width: 100%">
      <el-table-column prop="key" label="key" width="180" />
      <el-table-column prop="elem" label="elem" width="180" />
      <el-table-column prop="props" label="props" width="180" show-overflow-tooltip>
        <template slot-scope="{ row }">
          <span style="margin-left: 10px">{{ row.props }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="scrollStyle" label="scrollStyle" width="180" show-overflow-tooltip>
        <template slot-scope="{ row }">
          <span style="margin-left: 10px">{{ row.scrollStyle }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="elemOptions" label="elemOptions" show-overflow-tooltip>
        <template slot-scope="{ row }">
          <span style="margin-left: 10px">{{ row.elemOptions }}</span>
        </template>
      </el-table-column>
      <el-table-column width="200" align="right">
        <template slot="header">
          <el-button size="mini" @click="() => createItem()">createItem</el-button>
        </template>
        <template slot-scope="{ row }">
          <el-button size="mini" @click="() => editItem(row)">editItem</el-button>
          <el-button size="mini" @click="() => deleteItem(row)">deleteItem</el-button>
        </template>
      </el-table-column>
    </el-table>
    <MPopupGenerator ref="dialogSettingRef" :config="dialogConfig">
      <DesignDialogContent />
    </MPopupGenerator>
  </div>
</template>

<script>
import { MPopupGenerator } from '../../../m-popup/m-popup-generator';
import DesignDialogContent from './design-dialog-content.vue';
export default {
  components: {
    MPopupGenerator,
    DesignDialogContent
  },
  model: {
    prop: 'value',
    event: 'valueChange'
  },
  props: {
    value: {
      type: Array,
      default: function () {
        return [];
      }
    }
  },
  data() {
    return {
      dialogConfig: {
        elem: 'el-dialog',
        props: {
          title: 'el-table-column',
          fullscreen: true
        },
        scrollStyle: {
          height: '80vh'
        },
        on: ({ mTableCtrl }) => {
          return {
            close: mTableCtrl.close
          };
        },
        elemOptions: {
          type: 'slot',
          elem: 'default'
        }
      }
    };
  },
  mounted() {},
  methods: {
    deleteItem(tag) {
      let index = this.value.indexOf(tag);
      this.value.splice(index, 1);
    },
    async editItem(item) {
      console.log(item);
      let res = await this.$refs.dialogSettingRef.open({ tag: 'edit', data: item });
      let index = this.value.indexOf(item);
      this.$set(this.value, index, res);
    },

    async createItem() {
      let baseData = {
        key: '',
        elem: 'el-dialog',
        props: {
          title: '',
          width: '60%',
          size: '60%'
        },
        scrollStyle: {
          height: '60vh'
        },
        elemOptions: {
          type: 'registered',
          elem: 'MFormGenerator',
          props: {
            config: {
              props: {
                ref: 'form',
                size: 'mini',
                labelPosition: 'right',
                labelWidth: '140px'
              },
              boxStyle: {
                justifyContent: 'space-between'
              },
              fields: []
            }
          }
        }
      };
      let res = await this.$refs.dialogSettingRef.open({ tag: 'create', data: baseData });
      this.value.push(res);
    }
  }
};
</script>

<style scoped lang="scss">
.design-table-dragge-out {
  width: 100%;
  display: grid;
  flex-direction: column;
  grid-template-columns: 1;
  grid-row-gap: 10px;
  .dragge-out__item {
    width: 100%;
    background-color: #e0d5d5;
    border-radius: 5px;
    padding: 5px;
    .title {
      width: 100%;
      line-height: 28px;
    }
  }
}
</style>
