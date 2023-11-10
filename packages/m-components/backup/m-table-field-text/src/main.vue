<!--
 * @Date: 2022-11-01 09:12:52
 * @LastEditors: squanchy squanchy@yeah.net
 * @LastEditTime: 2023-09-25 14:08:54
 * @FilePath: \zs-ui-vue2\packages\m-components\lib\components\m-table\m-table-field-text\src\main.vue
-->
<template>
    <span style="line-height: 40px;">{{ previseValue }}</span>
</template>

<script>
import { MTableFieldController } from '../../../../index';
const defaultValue = '暂无';
export default {
  name: 'MTableFieldText',
  model: {
    prop: 'value',
    event: 'valueChange'
  },
  props: {
    value: {
      type: [String, Number, Boolean, Object],
      default: null
    },
    row: {
      type: Object,
      default: () => {}
    },
    tableFieldOptions: {
      type: Object,
      default: () => new MTableFieldController({})
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

<style lang="scss" scoped></style>
