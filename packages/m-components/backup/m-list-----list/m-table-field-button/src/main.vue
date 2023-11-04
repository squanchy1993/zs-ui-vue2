<!--
 * @Date: 2022-11-01 09:12:52
 * @LastEditors: squanchy squanchy@yeah.net
 * @LastEditTime: 2023-06-04 20:31:17
 * @FilePath: /zs-ui-vue2/packages/m-components/lib/components/m-list/m-table-field-button/src/main.vue
-->
<template>
  <div class="buttons-opeation">
    <el-button v-for="(item, index) in previseValue" :key="index" @click="open(`popover_${index}`)" size="mini">{{
      item.name }}</el-button>
  </div>
</template>

<script>
import { MTableFieldModel } from '../../../m-models/index';
const defaultValue = [];
export default {
  name: 'MTableFieldButton',
  model: {
    prop: 'value',
    event: 'valueChange'
  },
  props: {
    value: {
      type: Array,
      default: null
    },
    row: {
      type: Object,
      default: () => { }
    },
    tableFieldOptions: {
      type: Object,
      default: () => new MTableFieldModel({})
    }
  },
  data: function () {
    return {
      previseValue: defaultValue
    };
  },
  watch: {
    value: {
      deep: true,
      immediate: true,
      handler: function (value) {
        // 延迟到组件创建完毕后再进行
        this.$nextTick(() => {
          // 为空时重置为组件的defautValue
          if ([null, undefined].includes(value)) {
            this.previseValue = JSON.parse(JSON.stringify(defaultValue));
          } else if (value !== this.previseValue) {
            this.previseValue = value;
          }
        });
      }
    }
  },
  created() {
    this.previseValue = JSON.parse(JSON.stringify(defaultValue));
  }
};
</script>

<style lang="scss" scoped>
.buttons-opeation {
  width: 100%;
  display: flex;
  padding: 5px 0;

  ::v-deep {
    .el-button {
      height: fit-content;
    }
  }
}
</style>
