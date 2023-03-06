<!--
    new MFormItemModel({
        title: "选择器",
        keywords: "test2",
        el_type: "MSelectPicker",
        options: {
        pickerItems: [
            { label: "继续前进", value: "CONTINUE" },
            { label: "暂停行进", value: "STOP" },
        ],
        },
    })
-->

<template>
  <el-form-item class="form-item" v-bind="formItem">
    <div ref="tag_panel" class="m-select-picker">
      <div
        class="select__title"
        :class="{
          'is-disabled': formItem.disabled,
        }"
        @click="!formItem.disabled && (isShowList = true)"
      >
        <div class="tag-list">
          <el-tag
            v-for="(tag, index) in selectedTag"
            :key="index"
            size="mini"
            class="selected-item"
            :class="{ 'is-disabled' : formItem.disabled}"
            :disable-transitions="false"
            :closable="!formItem.disabled"
            @close.stop="selectItemClick(tag)"
          >
            {{ tag[labelKey] }}
          </el-tag>
        </div>
      </div>
      <div class="select__body">
        <div v-show="isShowList" class="select__body-inner">
          <el-input
            v-if="filterPropsKey"
            v-model="searchValue"
            :validate-event="false"
            size="mini"
            class="search-header"
            @input="search"
          >
            <i
              slot="prefix"
              class="el-icon-search"
            /></el-input>
          <div class="search-body">
            <div v-if="itemList.length > 0" class="search-body_list">
              <div
                v-for="(item, index) in itemList"
                :key="index"
                :class="isSelected(item) ? 'selected' : ''"
                class="select-option"
                @click="selectItemClick(item)"
              >
                {{ item[labelKey] }}
              </div>
            </div>
            <div v-else class="search-body_empty">暂无内容</div>
          </div>
          <el-pagination
            v-if="isShowPagination"
            layout="prev, total, next"
            :current-page="curPage"
            :total=" total * 1"
            :page-size="size"
            @current-change="getData"
          />
        </div>
      </div>
    </div>
  </el-form-item>
</template>

<script>

export default {
  name: 'MSelectPicker',
  model: {
    prop: 'value',
    event: 'valueChange'
  },
  props: {
    formItem: {
      type: Object,
      default: () => {
        return {}
      }
    },
    value: {
      type: [Array],
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
      size: 10,
      total: 0,
      itemList: []
    }
  },
  computed: {
    inputValueChange() {
      // 监听输入value的变化
      return this.value
    },
    labelKey() {
      return this.formItem.options.labelValue.label
    },
    valueKey() {
      return this.formItem.options.labelValue.value
    },
    isShowPagination() {
      return this.formItem.options.pageData?.pagination
    },
    filterPropsKey() {
      return this.formItem.options.filterPropsKey
    },
    removeInterceptor() {
      return this.formItem.options.removeInterceptor
    }
  },
  watch: {
    inputValueChange: {
      immediate: true,
      handler: function(value) {
        // 延迟到组件创建完毕后再进行
        this.$nextTick(() => {
          console.log('received value change select picker: ', value)
          if ([null, undefined].includes(value)) {
            this.componentValue = null
            this.setTag()
            return
          }

          if (!this._.eq(this.componentValue, value)) {
            this.componentValue = this._.cloneDeep(value)
            this.setTag()
          }
        })
      }
    }
  },
  created: function() {
    // 进行组件初始化
    // this.setTag()
    this.setList()
    this.listenClick()
  },
  destroyed() {
    // 摧毁组件
    this.componentValue = null
    console.log('component destroyed')
  },
  methods: {
    // 通知父元素已经变化
    componentValueChange(value) {
      const emitVal = this.multiple ? this._.cloneDeep(value) : value
      this.$emit('valueChange', emitVal)
    },

    // 监听点击
    listenClick() {
      document.addEventListener('click', (e) => {
        if (!this.$refs.tag_panel) {
          return
        }
        const isSelf = this.$refs.tag_panel.contains(e.target)
        if (!isSelf) {
          this.isShowList = false
        }
      })
    },

    // 设置已选标签
    async setTag() {
      const pageData = this.formItem.options.pageData
      // api 为空意味着不需要请求
      if (!pageData.api) {
        if (this.componentValue) {
          this.selectedTag = pageData.list.filter((item) => this.componentValue.includes(item[this.valueKey]))
        } else {
          this.setTag = []
        }
        return
      }

      // api 存在需要请求
      if (pageData.api) {
        if (this.componentValue) {
          const valueKey = this.formItem.options.valuePropKey
          const params = {
            query: {
              [valueKey]: this.componentValue
            }
          }
          const { list } = (await pageData.api(params)).data
          this.selectedTag = list
        } else {
          this.setTag = []
        }
      }
    },

    // 获得下拉列表
    setList() {
      const pageData = this.formItem.options.pageData
      if (!pageData.api) {
        this.itemList = [...pageData.list]
        return
      } else {
        const curPage = pageData.pagination ? 1 : null
        this.getData(curPage)
      }
    },

    // 获取数据
    getData(curPage) {
      // eslint-disable-next-line no-unused-vars
      return new Promise((resolve, reject) => {
        this.getPageListData(curPage).then((res) => {
          curPage && (this.curPage = curPage)
          const { totalElements, list } = res.data
          this.total = totalElements
          this.itemList = list
          resolve('获取成功')
        })
      })
    },

    // api请求
    getPageListData(curPage) {
      const params = {}

      // 设置分页
      if (curPage) {
        const { pageKeyName, sizeKeyName } = this.formItem.options.pageData.pagination
        const pageable = {
          [pageKeyName]: curPage,
          [sizeKeyName]: this.size
        }
        params[`pageable`] = pageable
      }
      // 搜索框
      if (this.filterPropsKey && this.searchValue) {
        const query = {
          [this.filterPropsKey]: this.searchValue
        }
        params[`query`] = query
      }

      // 进行请求
      return this.formItem.options.pageData.api(Object.keys(params).length ? params : null)
    },

    // 点击item
    selectItemClick(tag) {
      try {
        const id = tag[this.valueKey]
        if (!this.componentValue || !this.componentValue.includes(id)) {
          // 添加
          if (Array.isArray(this.componentValue)) {
            const valueList = Array.from(this.componentValue)
            if (this.formItem.options.limit <= valueList.length) {
              return
            }
          }

          this.selectedTag.push(tag)
          this.componentValue.push(id)
        } else {
          // 清除
          // 检查是否有必需项
          this.removeInterceptor && this.removeInterceptor(id, this.componentValue)

          // 删除tag
          const index = this.selectedTag.findIndex(item => item[this.valueKey] === id)
          this.selectedTag.splice(index, 1)

          // 删除value
          const valueIndex = this.componentValue.findIndex(item => item[this.valueKey] === id)
          this.componentValue.splice(valueIndex, 1)
        }
        this.componentValueChange(this.componentValue)
      } catch (error) {
        this.$message.warning(error.message)
      }
    },

    isSelected(tag) {
      const id = tag[this.valueKey]
      if (this.componentValue) {
        return this.componentValue.includes(id)
      } else {
        return false
      }
    },

    // 搜索
    async search(value) {
      const pageData = this.formItem.options.pageData
      if (!pageData.api) {
        const list = pageData.list.filter(item => item[this.filterPropsKey].includes(value))
        this.list = [...list]
      } else {
        const curPage = pageData.pagination ? 1 : null
        this.getData(curPage)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.is-error {
  .el-input__inner {
    border: 1px solid #dcdfe6 !important;
  }
  .select__title {
    border-color: #f56c6c !important;
  }
}
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
      padding: 0 0 5px 5px;
      width: calc(100% - 5px);
      .selected-item {
        margin: 5px 5px 0 0;
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
    width: 10px;      /* Safari,Chrome 隐藏滚动条 */
    height: 0;     /* Safari,Chrome 隐藏滚动条 */
    background: #fafafa;
  }

  ::-webkit-scrollbar-thumb{
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
        ::v-deep {
          .el-input__inner {
            border: none;
            border-bottom: 1px solid #dcdfe6 !important;
          }
        }
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
    }
  }
  .is-disabled {
    background-color: #f5f7fa;
    border-color: #e4e7ed;
    color: #c0c4cc;
    cursor: not-allowed;
  }
}
</style>
