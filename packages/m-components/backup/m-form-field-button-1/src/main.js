/* eslint-disable */
export default {
  name: 'MFormFieldButton',
  inject: {
    pageInstance: { default: null },
    mListController: { default: null },
    mFormGenerator: { default: null }
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
    async click(item) {
      try {
        // eslint-disable-next-line no-eval
        const func = eval(item.code);
        const { pageInstance, mListController, mFormGenerator } = this;
        await func({ injectData: { pageInstance, mListController, mFormGenerator } });
      } catch (error) {
        console.error(error);
        this.$confirm(`${error}`, `表单按钮代码执行失败 详情请查看控制台`, { type: 'warning' });
      }
    }
  },
  render(h) {
    return (
      <div class="el-input">
        {this.btns.map((v) => {
          return <el-button props={v.option} onClick={() => this.click(v)}>{v.name}</el-button>
        })}
      </div>
    );
  }
};
