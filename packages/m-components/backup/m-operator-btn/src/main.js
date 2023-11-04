/* eslint-disable */
export default {
  name: 'MFormFieldButton',
  inject: {
    tableRoot: { value: 'tableRoot', default: null }
  },
  props: {
    btns: {
      type: Array,
      default: function () {
        return []
      }
    },
  },

  methods: {
    click(code) {
      console.log('operator', this.tableRoot)
      console.log('operator execute code', code)
      const func = eval(code);
      func()
    }
  },
  render(h) {
    return (
      <div slot="footer">
        {this.btns.map((v) => {
          return <el-button props={v.option} onClick={() => this.click(v.code)}>{v.name}</el-button>
        })}
      </div>
    );
  }
};
