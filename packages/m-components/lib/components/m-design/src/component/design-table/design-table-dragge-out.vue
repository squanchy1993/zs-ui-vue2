<template>
  <div class="design-table-dragge-out">
    <div
      :key="index"
      v-for="({ props: { prop, label }, elemOptions }, index) in fields"
      class="dragge-out__item el-table__cell"
    >
      <p class="title">{{ label }}</p>
      <MDynamicElem :config="elemOptions" :propKey="prop" :data="{}" />
    </div>
  </div>
</template>

<script>
import Sortable from 'sortablejs';
import { MDynamicElem } from '../../../../m-dynamic-elem';

export default {
  components: {
    MDynamicElem
  },
  data() {
    return {
      row: {},
      colEle: null
    };
  },
  props: {
    fields: {
      type: Array,
      default: () => []
    }
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
      const wrapperTr2 = document.querySelector('.design-table-dragge-out');
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
