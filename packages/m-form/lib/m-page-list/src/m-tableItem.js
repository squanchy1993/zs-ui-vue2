export default {
  props: {
    row: Object,
    column: Object,
    index: Number
  },
  render(h) {
    return <div>
      {this.column.render ? this.column.render.call(this, h, { row: this.row, column: this.column, $index: this.index })
        : this.getValueByObjPath(this.row, this.column.prop)
      }
    </div>
  },
  methods: {
    getValueByObjPath(obj, path) {
      const paths = path.split('.')
      let res = obj
      let tempPath
      // 此处本来可以写成 while (tempPath = paths.shift()) ，但是eslint 报错：不能在判断的地方赋值
      while ((function() { tempPath = paths.shift(); return tempPath })()) {
        res = res[tempPath]
      }
      return res
    }
  }
}
