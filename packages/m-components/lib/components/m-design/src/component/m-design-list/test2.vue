<!-- <template>
  <div class="page">
    <el-table :data="tableData" row-key="id" border style="width: 50%">
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

    <div class="test" style="display: flex; flex-direction: column; height: 200px; width: 50%">
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
          prop: 'date1',
          minWidth: 100
        },
        {
          label: '无人机名称',
          prop: 'nam2e',
          minWidth: 200
        },
        {
          label: '地址',
          prop: 'add3ress',
          minWidth: 300
        }
      ],
      //拖拽列
      tableData: [
        {
          date: '2016-05-03',
          name: 'asdf',
          address: 'No. 189, Grove St, Los Angeles'
        }
      ]
    };
  },
  mounted() {
    this.columnDrop();
  },
  methods: {
    // 列拖动
    columnDrop() {
      //接受列表
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
        },
        onAdd: (/**Event*/ evt) => {
          // same properties as onEnd
          console.log('onAdd>>', evt);
          const { newDraggableIndex, oldDraggableIndex } = evt;
          let tempList = cloneDeep(this.colList);
          let insertItem = this.colList2[oldDraggableIndex];
          insertItem.prop = uniqueId('prop_');
          tempList.splice(newDraggableIndex, 0, cloneDeep(insertItem));
          console.log('insertItem>>', insertItem);

          wrapperTr.removeChild(evt.item);

          this.colList = [];
          this.$nextTick(() => {
            this.colList = tempList;
            console.log(this.colList2);
          });
        }
      });

      // 拖出列表
      const wrapperTr2 = document.querySelector('.test');
      Sortable.create(wrapperTr2, {
        group: {
          name: 'shared',
          pull: 'clone',
          put: false // 不允许拖拽进这个列表
        },
        animation: 180,
        delay: 0,
        sort: false
      });
    }
  }
};
</script>

<style scoped lang="scss">
.page {
  display: flex;
}
</style> -->
