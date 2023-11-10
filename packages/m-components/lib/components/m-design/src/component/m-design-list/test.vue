<!-- <template>
  <div class="page">
    <div class="page-left">
      <el-table class="table" :data="tableData" row-key="id" border style="width: 100%">
        <el-table-column
          v-for="item in colList"
          :key="item.prop"
          align="center"
          show-overflow-tooltip
          :prop="item.prop"
          :label="item.label"
          :width="item.minWidth"
        />
      </el-table>
      <div :class="['input-area', showInput ? 'showInput' : '']" />
    </div>

    <div
      class="page-right"
      style="display: flex; flex-direction: column; height: 200px; width: 50%"
    >
      <p v-for="item in colList2" :key="item.prop">
        {{ item.label }}
      </p>
    </div>
  </div>
</template>

<script>
import Sortable from 'sortablejs';
import { cloneDeep, uniqueId } from 'lodash-es';
export default {
  data() {
    return {
      //动态列数组
      colList: [
        {
          label: '创建日期',
          prop: 'date',
          minWidth: 100
        },
        {
          label: '无人机名称',
          prop: 'name',
          minWidth: 200
        },
        {
          label: '地址',
          prop: 'address',
          minWidth: 300
        }
      ],

      colList2: [
        {
          label: '创建日期',
          prop: 'date1'
        },
        {
          label: '无人机名称',
          prop: 'nam2e'
        },
        {
          label: '地址',
          prop: 'add3ress'
        }
      ],
      //拖拽列
      tableData: [
        {
          date: '2016-05-03',
          name: 'asdf',
          address: 'No. 189, Grove St, Los Angeles'
        }
      ],

      showInput: false
    };
  },
  mounted() {
    this.columnDrop();
  },
  methods: {
    // 列拖动
    columnDrop() {
      const wrapperTr = document.querySelector('.el-table__header-wrapper tr');
      Sortable.create(wrapperTr, {
        group: 'shared',
        animation: 180,
        delay: 0,
        onEnd: (evt) => {
          console.log('onEnd>>', evt);
          const { oldIndex, newIndex } = evt;
          let tempList = cloneDeep(this.colList);
          tempList[oldIndex] = tempList.splice(newIndex, 1, tempList[oldIndex])[0];
          this.colList = [];
          this.$nextTick(() => {
            this.colList = tempList;
          });
        }
      });

      //接受列表
      const wrapperTr3 = document.querySelector('.input-area');
      Sortable.create(wrapperTr3, {
        group: 'shared1',
        animation: 180,
        delay: 0,
        onAdd: (evt) => {
          console.log('onAdd', evt);
          const { oldDraggableIndex } = evt;
          let item = cloneDeep(this.colList2[oldDraggableIndex]);
          item['prop'] = uniqueId('prop_');
          this.$nextTick(() => {
            this.colList.push(item);
          });
        }
      });

      // 拖出列表
      const wrapperTr2 = document.querySelector('.page-right');
      Sortable.create(wrapperTr2, {
        group: {
          name: 'shared1',
          pull: 'clone',
          put: false // 不允许拖拽进这个列表
        },
        animation: 180,
        delay: 0,
        sort: false,
        onStart: (evt) => {
          this.showInput = true;
        },
        onEnd: (evt) => {
          this.showInput = false;
          let childs = wrapperTr3.childNodes;
          for (var i = childs.length - 1; i >= 0; i--) {
            wrapperTr3.removeChild(childs[i]);
          }
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
.page {
  display: flex;
  height: 100px;
  .page-left {
    width: 80%;
    height: 100%;
    position: relative;
    .table {
      position: absolute;
      width: 100%;
      height: 100%;
    }
    .input-area {
      z-index: 12;
      position: absolute;
      width: 0;
      height: 0;
      background-color: rgba($color: #4b474779, $alpha: 0.8);
      overflow: 'hidden';
    }

    .input-area.showInput {
      width: 100%;
      height: 100%;
    }
  }
  .page-right {
    width: 20%;
    height: 100%;
  }
}
</style> -->
