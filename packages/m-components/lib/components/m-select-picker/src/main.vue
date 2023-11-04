<!--
    new elFormItemModel({
        title: "选择器",
        keywords: "test2",
        elType: "MSelectPicker",
        options: {
        pickerItems: [
            { label: "继续前进", value: "CONTINUE" },
            { label: "暂停行进", value: "STOP" },
        ],
        },
    })
-->

<template>
  <div
    ref="tag_panel"
    :class="[
      'm-select-picker',
      fieldClassName('m-select-picker'),
      fieldDisabled ? 'is-disabled' : ''
    ]"
  >
    <div
      class="select__title m-select-picker__inner"
      :class="{
        'is-disabled': disabled
      }"
      @click="!disabled && (isShowList = true)"
    >
      <div class="tag-list">
        <div v-for="(tag, index) in selectedTag" :key="index" class="selected-item">
          <span class="title">{{ tag[labelValueKey.label] }}</span>
          <span class="close-icon" @click="selectItemClick(tag)">X</span>
        </div>
      </div>
    </div>
    <div class="select__body">
      <div v-show="isShowList" class="select__body-inner">
        <input
          v-if="filterPropsKey"
          v-model="searchValue"
          class="search-header"
          type="text"
          @input="search"
        >
        <div class="search-body">
          <div v-if="list.length > 0" class="search-body_list">
            <div
              v-for="(item, index) in list"
              :key="index"
              :class="isSelected(item) ? 'selected' : ''"
              class="select-option"
              @click="selectItemClick(item)"
            >
              {{ item[labelValueKey.label] }}
            </div>
          </div>
          <div v-else class="search-body_empty">暂无内容</div>
        </div>
        <div class="search-pagination">
          <!-- eslint-disable-next-line vue/no-parsing-error -->
          <span :class="[isDisablePre? 'disabel-btn': '']" @click="()=> getData(curPage -1)"><</span>
          <span>{{ curPage }}</span>
          <span :class="[isDisableNext? 'disabel-btn': '']" @click="()=> getData(curPage + 1)">></span>
        </div>
      </div>
    </div>
  </div></template>

<script>
const defaultVal = [];
export default {
  inject: ['elForm'],
  name: 'MSelectPicker',
  model: {
    prop: 'value',
    event: 'valueChange'
  },
  props: {
    value: {
      type: Array,
      default: null
    },
    size: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: null
    },
    initialValue: {
      type: Array,
      default: () => defaultVal
    },
    api: {
      type: Function, // promise
      default: null
    },
    list: {
      type: Array, // promise
      default: () => []
    },
    pagination: {
      type: Object,
      default: () => {
        return {
          pageKey: 'page', // select item label key
          sizeKey: 'size', // select item value key
          isPagination: false
        };
      }
    },
    labelValueKey: {
      type: Object,
      default: () => {
        return {
          label: 'title', // select item label key
          value: 'uuid' // select item value key
        };
      }
    },
    limit: {
      type: Number, // promise
      default: null
    },
    valuePropKey: {
      type: String,
      default: null
    }, // use value to search
    filterPropsKey: {
      type: String,
      default: null
    }, // filter by input
    removeInterceptor: {
      type: Function, // promise
      default: null
    }
  },
  data() {
    return {
      // 组件value
      componentValue: null,

      pageListData: null,
      selectedTag: [],
      isShowList: false,
      searchValue: '',
      curPage: 1,
      pageSize: 10,
      total: 0
    };
  },
  computed: {
    inputValueChange() {
      // 监听输入value的变化
      return this.value;
    },
    // size
    fieldClassName() {
      return function (sizeName) {
        const size = this.size || this.elForm.size;
        switch (size) {
          case 'medium':
            sizeName = sizeName + '--medium';
            break;
          case 'small':
            sizeName = sizeName + '--small';
            break;
          case 'mini':
            sizeName = sizeName + '--mini';
            break;
          default:
            break;
        }
        return sizeName;
      };
    },
    // disabled
    fieldDisabled() {
      if (this.disabled != null) return this.disabled;
      if (this.elForm.disabled != null) return this.elForm.disabled;
      return false;
    },
    isDisablePre() {
      return this.curPage - 1 >= 0
    },
    isDisableNext() {
      return (this.curPage - 1) * this.pageSize + this.list.length === this.total
    }
  },
  watch: {
    inputValueChange: {
      immediate: true,
      handler: function (value) {
        // 延迟到组件创建完毕后再进行
        this.$nextTick(() => {
          console.log('received value change select picker: ', value);

          // remove __ob__: Observer: 1. Array.from 2. JSON.parse(JSON.stringify(value))
          const importVal = JSON.stringify(value);
          const innerVal = JSON.stringify(this.componentValue);
          if ([null, undefined].includes(importVal)) {
            this.componentValue = null;
            this.setTag();
            return;
          }

          if (innerVal !== importVal) {
            console.log('got setTag', innerVal, importVal);
            this.componentValue = JSON.parse(importVal);
            this.setTag();
          }
        });
      }
    }
  },
  created: function () {
    // 进行组件初始化
    // this.setTag()
    this.setList();
    this.listenClick();
  },
  destroyed() {
    // 摧毁组件
    this.componentValue = null;
    console.log('component destroyed');
  },
  methods: {
    // 通知父元素已经变化
    componentValueChange(value) {
      const emitVal = JSON.parse(JSON.stringify(value));
      console.log('notify father value change select picker: ', emitVal);
      this.$emit('valueChange', emitVal);
    },

    // 监听点击
    listenClick() {
      document.addEventListener('click', (e) => {
        if (!this.$refs.tag_panel) {
          return;
        }
        const isSelf = this.$refs.tag_panel.contains(e.target);
        if (!isSelf) {
          this.isShowList = false;
        }
      });
    },

    // 设置已选标签
    async setTag() {
      const { value: valueKey } = this.labelValueKey;
      // api 为空意味着不需要请求
      if (!this.api) {
        if (this.componentValue) {
          this.selectedTag = this.list.filter((item) =>
            this.componentValue.includes(item[valueKey])
          );
        } else {
          this.setTag = [];
        }
        return;
      }

      // api 存在需要请求
      if (this.api) {
        if (this.componentValue) {
          const params = {
            query: {
              [this.valuePropKey]: this.componentValue
            }
          };
          const { list } = (await this.api(params)).data;
          this.selectedTag = list;
        } else {
          this.setTag = [];
        }
      }
    },

    // 获得下拉列表
    setList() {
      if (!this.api) {
        console.log('setList>>>>', this.list, this.limit)
        return;
      } else {
        const curPage = this.pagination.isPagination ? 1 : null
        this.getData(curPage);
      }
    },

    // 获取数据
    getData(curPage) {
      // eslint-disable-next-line no-unused-vars
      return new Promise((resolve, reject) => {
        this.getPageListData(curPage).then((res) => {
          curPage && (this.curPage = curPage);
          const { total, list } = res.data;
          this.total = total;
          this.list = list;
          resolve('获取成功');
        });
      });
    },

    // api请求
    getPageListData(curPage) {
      const params = {};

      // 设置分页
      console.log('设置分页>>>>>', curPage)
      if (curPage) {
        const { pageKey, sizeKey } = this.pagination;
        const pageable = {
          [pageKey]: curPage,
          [sizeKey]: this.pageSize
        };
        params[`pageable`] = pageable;
      }
      // 搜索框
      if (this.filterPropsKey && this.searchValue) {
        const query = {
          [this.filterPropsKey]: this.searchValue
        };
        params[`query`] = query;
      }

      // 进行请求
      return this.api(Object.keys(params).length ? params : null);
    },

    // 点击item
    selectItemClick(tag) {
      try {
        const { value: valueKey } = this.labelValueKey;
        const id = tag[valueKey];
        if (!this.componentValue || !this.componentValue.includes(id)) {
          // 添加
          if (Array.isArray(this.componentValue)) {
            const valueList = Array.from(this.componentValue);
            if (this.limit && this.limit <= valueList.length) {
              return;
            }
          }

          this.selectedTag.push(tag);
          this.componentValue.push(id);
        } else {
          // 清除
          // 检查是否有必需项
          this.removeInterceptor && this.removeInterceptor(id, this.componentValue);

          // 删除tag
          const index = this.selectedTag.findIndex((item) => item[valueKey] === id);
          this.selectedTag.splice(index, 1);

          // 删除value
          const valueIndex = this.componentValue.findIndex((item) => item === id);
          this.componentValue.splice(valueIndex, 1);
        }
        this.componentValueChange(this.componentValue);
      } catch (error) {
        this.$message.warning(error.message);
      }
    },

    isSelected(tag) {
      const { value: valueKey } = this.labelValueKey;
      const id = tag[valueKey];
      if (this.componentValue) {
        return this.componentValue.includes(id);
      } else {
        return false;
      }
    },

    // 搜索
    async search(value) {
      if (!this.api) {
        const list = this.list.filter((item) => item[this.filterPropsKey].includes(value));
        this.list = [...list];
      } else {
        const curPage = this.pagination.isPagination ? 1 : null
        this.getData(curPage);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../../styles/common.scss';
.m-select-picker {
  width: 100%;
  position: relative;
  display: inline-block;
  .select__title {
    min-height: 28px;
    display: flex;
    justify-content: space-between;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    position: relative;
    .tag-list {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-items: center;
      width: calc(100% - 5px);
      height: 100%;
      .selected-item {
        margin: 0px 5px 0 0;
        background-color: #ecf5ff;
        box-sizing: border-box;
        white-space: nowrap;
        height: 80%;
        line-height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 5px;
        box-sizing: border-box;
        .title {
          color: #409eff;
          line-height: unset;
          margin-right: 5px;
        }
        .close-icon {
          font-size: 12px;
          color: #909399;
        }
      }
    }
    .expandBtn {
      height: 100%;
      width: 25px;
      background: #409eff;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      .isShow {
        transform: rotate(180deg);
      }
    }
  }
  .select__body {
    height: 0;
    position: relative;
    width: 100%;
    ::-webkit-scrollbar {
      width: 10px; /* Safari,Chrome 隐藏滚动条 */
      height: 0; /* Safari,Chrome 隐藏滚动条 */
      background: #fafafa;
    }

    ::-webkit-scrollbar-thumb {
      background: #c7c7c7;
    }
    .select__body-inner {
      position: absolute;
      top: 12px;
      min-height: 28px;
      width: 100%;
      display: flex;
      flex-direction: column;
      border: solid 1px #e4e7ed;
      border-radius: 4px;
      background-color: #fff;
      margin-top: 5px;
      z-index: 999;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 10%);

      box-sizing: border-box;
      .search-header {
        height: 28px;
        width: 100%;
        background-color: #fff;
        background-image: none;
        border-radius: 4px;
        border: 1px solid #dcdfe6;
        box-sizing: border-box;
        color: #606266;
        display: inline-block;
        font-size: inherit;
        outline: none;
        padding: 0 15px;
        transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
      }
      .search-body {
        max-height: 100px;
        overflow: scroll;
        .search-body_empty {
          width: 100%;
          display: flex;
          justify-content: center;
        }
        .select-option {
          font-size: 14px;
          padding: 0 20px;
          position: relative;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          color: #606266;
          height: 34px;
          line-height: 34px;
          box-sizing: border-box;
          cursor: pointer;
        }
        .selected {
          color: #409eff;
          background-color: #fff;
          font-weight: bolder;
        }
      }

      .search-pagination {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 12px;
        height: 20px;
        line-height: 20px;
        span {
          margin: 0 5px;
          padding: 0 10px;
          border-radius: 3px;
          font-weight: 700;
        }
        .disabel-btn{
          color: #909399;
          cursor: not-allowed;
          pointer-events: none
        }
      }
    }
  }
}

@include input-compoment-size('m-select-picker');
@include input-compoment-disabled('m-select-picker');
</style>
