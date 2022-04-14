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
            @close.stop="remove(tag)"
          >
            {{ tag[labelKey] }}
          </el-tag>
        </div>
      </div>
      <div class="select__body">
        <div v-show="isShowList" class="select__body-inner">
          <el-input
            v-if="formItem.options.filterable"
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
            <div v-if="pageListData.list.length > 0" class="search-body_list">
              <div
                v-for="(item, index) in pageListData.list"
                :key="index"
                :class="isSelected(item.uuid) ? 'selected' : ''"
                class="select-option"
                @click="selectItemClick(item)"
              >
                {{ item[labelKey] }}
              </div>
            </div>
            <div v-else class="search-body_empty">暂无内容</div>
          </div>
          <el-pagination
            v-if="pageListData.isShowPagination"
            layout="prev, total, next"
            :current-page="pageListData.listSeting.setValue.current"
            :total="pageListData.totalElement * 1"
            :page-size="10"
            @current-change="paginationClick"
            @size-change="paginationSizeChange"
          />
        </div>
      </div>
    </div>
  </el-form-item>
</template>

<script>
import { CommonUtils } from '@/tools/index.js'
import { ResultModel } from '@/model/index'

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
      type: [String, Array, Number],
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
      searchValue: ''
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
    multiple() {
      return this.formItem.options.multiple
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
          if (value != null) {
            if (this.multiple) {
              this.componentValue = [...value]
            } else {
              this.componentValue = value
            }
          }
          this.setTag()
        })
      }
    }
  },
  created: function() {
    // 进行组件初始化
    this.componentValue = this.formItem.defaultValue
    this.setTag()
    this.setList()
    this.listenClick()
    console.log('component inited', this.componentValue)
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
    setTag() {
      const pageListData = this.formItem.options.pageListData
      // api 为空意味着不需要请求
      if (!pageListData.apiFun) {
        if (this.multiple) {
          // this.selectedTag = this.selectedTag.filter((item) => item[this.valueKey] !== id)
          // this.value_ = this.value_.filter((item) => item !== id)
        }

        if (!this.multiple) {
          const id = this.componentValue
          this.selectedTag = pageListData.list.filter((item) => item[this.valueKey] === id)
        }
        return
      }

      // eslint-disable-next-line prefer-const
      if (CommonUtils.isEmpty(this.componentValue)) {
        return
      }

      // 根据value值 请求 api ，设置请求字段名
      const valueKey = pageListData.query.formItems[0].prop
      const params = {
        query: {
          [valueKey]: this.componentValue
        }
      }
      // 不分页
      if (pageListData.isShowPagination) {
        const { currentKeyName, sizeKeyName } = pageListData.listSeting.keyName
        const pageable = {
          [`${currentKeyName}`]: 1,
          [`${sizeKeyName}`]: 10
        }
        params[`pageable`] = pageable
      }

      pageListData.apiFun(params).then((res) => {
        this.selectedTag = res.data.list
      })
    },

    // 获得下拉列表
    setList() {
      this.pageListData = this.formItem.options.pageListData
      if (!this.pageListData.apiFun) {
        return
      }
      const { current, size } = this.pageListData.listSeting.setValue
      this.getData(current, size)
    },

    // 获取数据
    getData(current, size) {
      // eslint-disable-next-line no-unused-vars
      return new Promise((resolve, reject) => {
        this.getPageListData(current, size).then((res) => {
          const resData = res.data
          this.pageListData.listSeting.setValue.current = current
          this.pageListData.listSeting.setValue.size = size
          this.pageListData.list = resData.list
          this.pageListData.isShowPagination &&
            (this.pageListData.totalElement = resData.totalElements)
          resolve(new ResultModel({ success: true, message: 'success' }))
        })
      })
    },

    // api请求
    getPageListData(current, size) {
      let params = {}

      // 设置分页
      if (this.pageListData.isShowPagination) {
        const { currentKeyName, sizeKeyName } = this.pageListData.listSeting.keyName
        const pageable = {
          [`${currentKeyName}`]: current,
          [`${sizeKeyName}`]: size
        }
        params[`pageable`] = pageable
      }

      // 设置筛选条件
      if (this.pageListData.query.formItems.length > 0) {
        const { formItems, searchFormData } = this.pageListData.query
        const query = this.dealQuery(formItems, searchFormData)
        if (!CommonUtils.isEmpty(query)) {
          params = { ...params, query }
        }
      }

      // // 设置其他参数 (非 adminQuery 字段)
      if (!CommonUtils.isEmpty(this.pageListData.otherParams, true)) {
        Object.keys(this.pageListData.otherParams).forEach((key) => {
          params[key] = this.pageListData.otherParams[key]
        })
      }

      // 进行请求
      return this.pageListData.apiFun(params)
    },

    // 处理查询字段  value有值的时候设置value，无值的话；且defalue不为null 时就默认设置default 进行请求
    dealQuery(formItems, formData) {
      const queryData = {}
      formItems.forEach(({ prop, el_type, defaultValue }) => {
        let formDataValue = null
        var getPathValue = CommonUtils.getValueByObjPath(formData, prop)

        // value为空 而defaultValue为空
        if (CommonUtils.isEmpty(getPathValue) && defaultValue == null) {
          return
        }
        // value为空 而defaultValue不为空
        if (CommonUtils.isEmpty(getPathValue) && defaultValue != null) {
          formDataValue = defaultValue
        }

        if (!CommonUtils.isEmpty(getPathValue)) {
          formDataValue = getPathValue
        }

        switch (el_type) {
          case 'MDateTime':
            if (prop.indexOf('-') !== -1) {
              const keyArr = prop.split('-')
              const maxKey = keyArr[0]
              const minKey = keyArr[1]
              CommonUtils.setDeepValue(queryData, maxKey, formDataValue[0])
              CommonUtils.setDeepValue(queryData, minKey, formDataValue[1])
            } else {
              CommonUtils.setDeepValue(queryData, prop, formDataValue)
            }
            break
          default:
            CommonUtils.setDeepValue(queryData, prop, formDataValue)
            break
        }
      })
      return queryData
    },

    // 分页点击
    paginationClick(current) {
      const { size } = this.pageListData.listSeting.setValue
      this.getData(current, size)
    },

    // 分页个数发生变化
    paginationSizeChange(size) {
      const { current } = this.pageListData.listSeting.setValue
      this.getData(current, size)
    },

    // 刷新
    regetList(isShowSuccessToast) {
      const { current, size } = this.pageListData.listSeting.setValue
      this.getData(current, size).then((res) => {
        if (res.success && isShowSuccessToast) {
          this.$message.success('刷新成功')
        }
      })
    },

    // 重置
    resetList() {
      // eslint-disable-next-line prefer-const
      const { defaultValue } = this.formItem.options
      const valueKey = this.pageListData.query.formItems[0].prop
      const searchKey = this.pageListData.query.formItems[1].prop

      this.pageListData.query.searchFormData = {
        [valueKey]: '',
        [searchKey]: '',
        ...defaultValue
      }

      this.$nextTick(() => {
        const { current, size } = this.pageListData.listSeting.defaultValue
        this.getData(current, size)
      })
    },

    // 搜索
    async search(value) {
      // 重置 current
      const { defaultValue } = this.formItem.options
      const searchKey = this.pageListData.query.formItems[1].prop

      this.pageListData.query.searchFormData = {
        [searchKey]: value,
        ...defaultValue
      }

      const { current, size } = this.pageListData.listSeting.defaultValue
      await this.getData(current, size)
    },

    // 点击item
    selectItemClick(tag) {
      try {
        const id = tag[this.valueKey]
        if (this.formItem.options.multiple) {
          if (!this.componentValue.includes(id)) {
            // 添加
            this.selectedTag.push(tag)
            this.componentValue.push(id)
          } else {
            // 清除

            // 检查是否有必需项
            this.removeInterceptor && this.removeInterceptor(id, this.componentValue)

            this.selectedTag = this.selectedTag.filter((item) => item[this.valueKey] !== id)
            this.componentValue = this.componentValue.filter((item) => item !== id)
          }
        } else {
          if (this.componentValue !== id) {
            // 添加
            this.componentValue = id
            this.selectedTag = [tag]
          } else {
            // 清除
            // 检查是否有必需项
            this.removeInterceptor && this.removeInterceptor(id, this.componentValue)

            this.componentValue = ''
            this.selectedTag = []
          }
        }
        this.componentValueChange(this.componentValue)
      } catch (error) {
        this.$message.warning(error.message)
      }
    },

    // 删除
    remove(tag) {
      try {
        const id = tag[this.valueKey]

        // 检查是否有必需项
        this.removeInterceptor && this.removeInterceptor(id, this.componentValue)

        if (this.multiple) {
          this.selectedTag = this.selectedTag.filter((item) => item[this.valueKey] !== id)
          this.componentValue = this.componentValue.filter((item) => item !== id)
        } else {
          this.componentValue = ''
          this.selectedTag = []
        }
        this.componentValueChange(this.componentValue)
      } catch (error) {
        this.$message.warning(error.message)
      }
    },

    isSelected(uuid) {
      let selected = true
      if (this.multiple) {
        selected = this.componentValue.includes(uuid)
      } else {
        selected = this.componentValue === uuid
      }
      return selected
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
      box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
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
