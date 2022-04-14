<template>
  <div class="page-list-box">
    <div class="page-list">
      <div class="search-area">
        <el-form
          ref="searchForm"
          class="search-area-form"
          :model="pageListData.query.searchFormData"
          label-position="top"
          label-width="65px"
          size="mini"
        >
          <!-- 输入框 -->
          <MFormItem
            :form-items.sync="pageListData.query.formItems"
            :form-data.sync="pageListData.query.searchFormData"
          />

          <!-- 其他布局 -->
          <slot name="NavOther" />
        </el-form>
      </div>
      <div :id="pageListData.listBoxName" class="body-box flex-column">
        <div class="list">
          <el-table
            v-bind="pageListData.tableSetting"
            :data="pageListData.list"
            style="width: 100%"
            @selection-change="(val)=> pageListData.selected = val"
          >
            <el-table-column v-if="pageListData.isSelection" type="selection" width="55" />
            <el-table-column
              v-for="(columnItem, index) in pageListData.columns"
              :key="index"
              v-bind="columnItem"
            >
              <template slot-scope="scope">
                <m-table-item :row="scope.row" :column="columnItem" :index="scope.$index" />
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div v-if="pageListData.isShowPagination" class="bottom-box">
        <el-pagination
          v-if="pageListData.isShowPagination"
          layout="total, sizes, prev, pager, next, jumper"
          :current-page="pageListData.listSeting.setValue.current"
          :total="pageListData.totalElement * 1"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="10"
          @current-change="paginationClick"
          @size-change="paginationSizeChange"
        />
      </div>
    </div>
  </div>
</template>
<script>
// import { CommonUtils } from 'zs-ui-vue/lib/tools/index.js'
// import { MPageListModel, ResultModel } from 'zs-ui-vue/lib/model/index'
// import MFormItem from 'zs-ui-vue/packages/m-form/m-form-item'
import MTableItem from './m-tableItem'

export default {
  name: 'MPageList',
  components: {
    MFormItem,
    MTableItem
  },
  props: {
    // 其他参数
    pageListData: {
      type: Object,
      default: () => {
        return new MPageListModel()
      }
    }
  },
  data() {
    return {
      countHeight: 0,

      isRomoveSearch: false,

      isHideSearch: false
    }
  },
  mounted: function() {
    this.$nextTick(() => {
      if (!this.pageListData.isAutoInit) return
      const { current, size } = this.pageListData.listSeting.defaultValue
      this.getData(current, size)
    })
  },
  methods: {
    // 获取数据
    getData(current, size) {
      return new Promise((resolve, reject) => {
        if (!this.pageListData.apiFun) {
          reject(new ResultModel({ success: false, message: 'api未填写' }))
        }
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
        const { defaultSearchFormData = {}} = this.pageListData
        let query = this.dealQuery(
          formItems,
          searchFormData
        )
        query = { ...defaultSearchFormData, ...query }
        console.log('Page ListQuery', query)
        if (!CommonUtils.isEmpty(query)) {
          params = { ...params, query }
        }
      }

      // // 设置其他参数 (非 adminQuery 字段)
      if (!CommonUtils.isEmpty(this.pageListData.otherParams, true)) {
        params = { ...params, ...this.pageListData.otherParams }
      }
      // 进行请求
      return this.pageListData.apiFun(params)
    },

    // 处理查询字段
    dealQuery(formItems, formData) {
      const queryData = {}
      formItems.forEach(({ prop, el_type, defaultValue }) => {
        let formDataValue = null
        var getPathValue = CommonUtils.getValueByObjPath(formData, prop)

        // value为空 而defaultValue为空
        if ((CommonUtils.isEmpty(getPathValue) && defaultValue == null) || CommonUtils.isEmpty(prop)) {
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

    /**
     * @func
     * @desc  刷新列表
     * @param { boolean } isShowSuccessToast - 是否展示刷新成功的提示
     * @return void
     */
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
      this.$refs['searchForm'].resetFields()
      this.$nextTick(() => {
        const { current, size } = this.pageListData.listSeting.defaultValue
        this.getData(current, size)
      })
    },

    // 搜索
    async search() {
      // 重置 current
      const { current, size } = this.pageListData.listSeting.defaultValue
      await this.getData(current, size)
      this.$message.success('获取成功')
    },

    /**
     * @func
     * @todo  这个函数需要优化
     * @desc  导出excel
     */
    exportExcel() {
      // const headerText = this.pageListData.exportExcelOptions.headerText;
      // const headerKey = this.pageListData.exportExcelOptions.headerKey;
      // const beforeExportExcel = this.pageListData.exportExcelOptions
      //   .beforeExportExcel;
      // this.getPageListData(1, this.listData.totalElement).then((res) => {
      //   const list = beforeExportExcel
      //     ? beforeExportExcel(res.data.list)
      //     : res.data.list;
      //   if (list.length === 0) {
      //     this.$message({
      //       message: "没有可供导出的列表",
      //       type: "error"
      //     });
      //     return;
      //   }
      //   import("@/lib/excel/vendor/Export2Excel.js").then((excel) => {
      //     excel.export_json_to_excel({
      //       header: headerText,
      //       data: list.map((v) => headerKey.map((j) => v[j])),
      //       filename: `${new Date().toLocaleString()}`,
      //       autoWidth: true,
      //       bookType: "xlsx"
      //     });
      //   });
      // });
    }
  }
}
</script>
<style lang="scss" scoped>
.itemBox {
  // display: flex;
  // align-items: center;
  margin-right: 20px;
  padding: 10px 0;
}
.page-list-box {
  width: 100%;
  .page-list {
    width: 100%;
    .search-area {
      width: 100%;
      border: 1px solid #ebeef5;
      .search-area-form {
        padding: 10px;
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        ::v-deep {
          .outer-box {
            justify-content: flex-start;
            @media screen and (max-width: 990px) {
              width: 100%;
              .form-item-box {
                width: 100%;
              }
            }

            @media screen and (min-width: 990px) {
              .form-item-box {
                width: 200px;
                margin-right: 20px;
              }
            }
            .form-item-box {
              .el-form-item {
                margin-bottom: 0px;
              }
            }
          }
        }
        .search-btn-box {
          margin-top: 28px;
          display: flex;
          .el-button {
            margin: 0 10px 0 0;
          }
        }
      }
    }
    .body-box {
      width: 100%;
      box-sizing: border-box;
      .list {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        overflow: hidden;
        .list-inner {
          width: 100%;
          .classItem {
            width: 100%;
            display: flex;
            flex-direction: column;
            border-bottom: 1px solid #eeeeee;
            .tital {
              height: 18px;
              font-size: 18px;
              position: relative;
              margin: 10px 0 10px 10px;
              :before {
                top: 0;
                left: -10px;
                position: absolute;
                width: 5px;
                height: 18px;
                content: '';
                display: block;
                background-color: red;
              }
              p {
                margin: 0;
                padding: 0;
                line-height: 18px;
              }
            }
            .catList {
              width: 100%;
              font-size: 16px;
              display: flex;
              flex-direction: row;
              flex-wrap: wrap;
              justify-content: flex-start;
              color: #606266;
              .catListItem {
                margin: 0 10px 10px 0;
              }
            }
          }
        }
      }
    }

    .bottom-box {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      width: 100%;
      height: 70px;
      background-color: #fff;
      border: 1px solid #ebeef5;
    }
  }
}
</style>
