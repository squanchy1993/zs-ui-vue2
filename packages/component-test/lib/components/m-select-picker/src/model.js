export default class MSelectPickerOption {
    valuePropKey = null // use value to search
    filterPropsKey = null // filter by input
    pageData = {
      api: null, // request http funtion
      List: [], // select item list
      pagination: {
        pageKeyName: 'pageIndex', // api request params
        sizeKeyName: 'pageSize'
      },
      isPagination: true // pagination or juset load all
    }
    labelValue = {
      label: 'title', // select item label key
      value: 'uuid' // select item value key
    }
    limit = null // if limit don't exist it allows mutiply pick.

    constructor({
      api = null,
      list = [],
      isPagination = null,
      pageKeyName = null,
      sizeKeyName = null,
      labelKeyName = null,
      valueKeyName = null,
      valuePropKey = null,
      filterPropsKey = null,
      limit = null
    }) {
      api && (this.pageData.api = api)
      list.length && (this.pageData.list = list)
      isPagination != null && (this.pageData.isPagination = isPagination)
      pageKeyName && (this.pageData.pagination.pageKeyName = pageKeyName)
      sizeKeyName && (this.pageData.pagination.sizeKeyName = sizeKeyName)
      labelKeyName && (this.labelValue.label = labelKeyName)
      valueKeyName && (this.labelValue.value = valueKeyName)
      valuePropKey && (this.valuePropKey = valuePropKey)
      filterPropsKey && (this.filterPropsKey = filterPropsKey)
      limit && (this.limit = limit)
    }
}