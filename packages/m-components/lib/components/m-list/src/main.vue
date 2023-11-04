<!--
 * @Date: 2022-11-01 09:12:52
 * @LastEditors: squanchy squanchy@yeah.net
 * @LastEditTime: 2023-11-02 12:34:38
 * @FilePath: \zs-ui-vue2\packages\m-components\lib\components\m-list\src\main.vue
-->
<template>
  <div class="MList">
    <div class="MList__search" v-if="!hideSearch">
      <slot
        name="search"
        v-bind="{
          searchParams: listController.searchParams,
          handleSearch: listController.handleSearch, // when you need Search or after created should excute this funcution.
          getList: listController.getList
        }"
      >
      </slot>
    </div>
    <div class="MList__table">
      <slot
        name="table"
        v-bind="{
          list: listController.list,
          getList: listController.getList, // when you already edited or deleted should excute this funcution.
          pageParams: listController.pageParams
        }"
      />
    </div>
    <div class="MList__pagination" v-if="!hidePagination">
      <slot
        name="pagination"
        :handlePageOrSizeChange="listController.handlePageOrSizeChange"
        :pageParams="listController.pageParams"
        :total="listController.total"
      >
        <el-pagination
          :page-size="listController.pageParams.pageSize"
          :current-page="listController.pageParams.pageIndex"
          :total="listController.total"
          :page-sizes="[10, 20, 30, 40]"
          @size-change="(pageSize) => listController.handlePageOrSizeChange({ pageSize })"
          @current-change="(pageIndex) => listController.handlePageOrSizeChange({ pageIndex })"
          layout="total, sizes, prev, pager, next, jumper"
        />
      </slot>
    </div>
    <slot />
  </div>
</template>

<script>
import ListController from './listController';
import { loopFunc } from '../..//m-utils';

export default {
  name: 'MList',
  provide() {
    return {
      mListCtrl: this.listController
    };
  },
  props: {
    controller: {
      type: ListController,
      required: false
    },
    hidePagination: {
      type: Boolean,
      default: false
    },
    hideSearch: {
      type: Boolean,
      default: false
    },
    requestFun: {
      type: [Function, String]
    },
    searchParams: {
      type: Object
    },
    pageParams: {
      type: Object,
      immediate: true,
      deep: true
    },
    searchList: {
      type: Boolean,
      default: false,
      immediate: true
    },
    loadList: {
      type: Boolean,
      default: false,
      immediate: true
    },
    loadLoop: {
      type: Boolean,
      default: false,
      immediate: true
    }
  },
  watch: {
    requestFun: {
      handler: function (requestFun) {
        if (requestFun) {
          this.listController.setOptions({ requestFun });
        }
      },
      immediate: true
    },
    searchParams: {
      handler: function (searchParams) {
        if (searchParams) {
          this.listController.setOptions({ searchParams });
        }
      },
      immediate: true
    },
    pageParams: {
      handler: function (pageParams) {
        if (pageParams) {
          this.listController.setOptions({ pageParams });
        }
      },
      immediate: true
    },
    searchList: {
      handler: function (cur, previous) {
        if (cur === previous || !cur || this.listController.status.searching) {
          return;
        }
        console.log('handleSearch>>>', cur);
        this.listController.handleSearch();
        this.$emit('update:searchList', false);
      },
      immediate: true
    },
    loadList: {
      handler: function (cur, previous) {
        if (cur === previous || !cur || this.listController.status.requestStatus === 'loading') {
          return;
        }
        this.listController.getList();
        this.$emit('update:loadList', false);
      },
      immediate: true
    },
    loadLoop: {
      handler: function (cur, previous) {
        if (cur === previous) return;
        if (cur) {
          this.refreshLogic.start();
        } else {
          this.refreshLogic.stop();
        }
      },
      immediate: true
    }
  },
  data() {
    const listController = this.controller ? this.controller : new ListController();
    listController.setOptions({ componentInstance: this });
    return {
      listController,
      refreshLogic: loopFunc(listController.getList)
    };
  }
};
</script>

<style lang="scss" scoped>
.MList {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;

  &__search {
    height: fit-content;
    width: 100%;
  }

  &__table {
    flex: 1;
    width: 100%;
    overflow: hidden;
  }

  &__pagination {
    height: 50px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
}
</style>
