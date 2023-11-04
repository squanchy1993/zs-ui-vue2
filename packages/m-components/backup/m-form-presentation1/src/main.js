
/* eslint-disable */
import { MFormGenerator } from '@lib/index.js'
export default {
  name: 'MFormPresentation',
  components: {
    MFormGenerator,
  },
  props: {
    formInstance: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  
  methods: {
    click(code) {
      console.log('form instance', this.formInstance)
      console.log('form execute code', code)
      const func =  eval(code);
      func()
    }
  },
  render(h) {
    const {
      formBtns,
      windowOption: { element, option, ref },
      formOption,
      formData
    } = this.formInstance;
    return (
      <element
        ref={ref}
        props={{ ...option }}
        visible={this.formInstance.visible}
        before-close={() => {
          this.formInstance.reject && this.formInstance.reject()
          this.formInstance.close();
        }}
      >
        <MFormGenerator form-option={formOption} form-data={formData} />
        <div slot="footer">
          {formBtns.map((v) => {
            return <el-button props={v.option} onClick={() => this.click(v.code)}>{v.name}</el-button>
          })}
        </div>
      </element>
    );
  }
};
