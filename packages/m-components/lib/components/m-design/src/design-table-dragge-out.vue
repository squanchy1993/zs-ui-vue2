<!--
 * @Date: 2023-11-15 21:03:14
 * @LastEditors: squanchy1993 squanchy@yeah.net
 * @LastEditTime: 2023-11-28 21:45:06
 * @FilePath: /m-components/lib/components/m-design/src/design-table-dragge-out.vue
-->
<template>
  <el-form size="mini" label-width="100px">
    <div ref="draggeRef" class="design-table-dragge-out">
      <el-form-item
        v-for="({ props: { prop, label }, elemOptions }, index) in fields"
        :key="index"
        class="dragge-out__item el-table__cell"
        :label="label"
      >
        <MDynamicElem :config="elemOptions" :prop-key="prop" :data="{}" />
      </el-form-item>
    </div>
  </el-form>
</template>
<script>
import Sortable from 'sortablejs';
import { MDynamicElem } from '../../m-dynamic-elem';

export default {
  components: {
    MDynamicElem
  },
  props: {
    fields: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      row: {},
      colEle: null
    };
  },
  mounted() {
    this.setSortable();
    this.colEle = document.createElement('col');
    this.colEle.id = 'col_daragge';
    this.colEle.width = '120';
    this.colEle.setAttribute('name', 'el-table_1_column_1');
  },
  methods: {
    // 列拖动
    setSortable() {
      const wrapperTr2 = this.$refs.draggeRef;
      Sortable.create(wrapperTr2, {
        group: {
          name: 'shared',
          pull: 'clone',
          put: false // 不允许拖拽进这个列表
        },
        animation: 180,
        delay: 0,
        sort: false,
        onStart: () => {
          // adapt el-table
          const colgroup = document.querySelector('.el-table__header').childNodes[0];
          const referenceElem = document.getElementsByName('gutter')[0];
          colgroup.insertBefore(this.colEle, referenceElem);
        },
        onEnd: (e) => {
          // adapt el-table
          const colgroup = document.querySelector('.el-table__header').childNodes[0];
          colgroup.removeChild(this.colEle);
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
.design-table-dragge-out {
  width: 200px;
  display: grid;
  flex-direction: column;
  grid-template-columns: 1;
  grid-row-gap: 10px;
  .dragge-out__item {
    width: 200px;
    background-color: #e0d5d5;
    border-radius: 5px;
    padding: 5px;
  }
}
</style>
