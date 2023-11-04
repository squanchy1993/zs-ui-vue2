/* eslint-disable quotes */
import {
  MFormFieldRules,
  // MFormFieldCodeInput,
  // MFormFieldCodeButton,
  MAsyncComponent,
  MSelectPicker,
  MImgUpload
  // MButtonOperator
} from '../../../../index';

// if use index.js has error;
import { MButtonOperator } from '../../../m-button-operator';

export default {
  name: 'MFormField',
  components: {
    MSelectPicker,
    MImgUpload,
    MAsyncComponent,
    MButtonOperator,
    // MFormFieldCodeButton,
    // MFormFieldCodeInput,
    MFormFieldRules
  },
  props: {
    formFields: {
      type: Object,
      default: () => {
        return {};
      }
    },
    formData: {
      type: Object,
      default: () => {
        return {};
      }
    },
    resetFields: {
      type: Function,
      default: () => {}
    }
  },
  computed: {
    testValue() {
      return this.formData;
    }
  },
  methods: {
    elementGenerator(h, formItem) {
      // eslint-disable-next-line prefer-const
      let returnElement = null;
      // eslint-disable-next-line no-unused-vars
      const {
        props: { prop },
        elemOptions: { type, elem, props }
      } = formItem;
      // const [res, key] = this.getValueByObjPath(this.formData, prop)
      // console.log('getValueByObjPath>>>>', res, key)
      switch (type) {
        case 'registered':
          // eslint-disable-next-line no-case-declarations
          returnElement = (
            <elem
              placeholder={props['placeholder']}
              maxlength={props['maxlength']}
              minlength={props['minlength']}
              props={{ ...props }}
              v-model={this.formData[prop]}
            />
          );
          break;
        case 'async':
          returnElement = (
            <MAsyncComponent path={elem} props={{ ...props }} v-model={this.formData[prop]} />
          );
          break;
        case 'render':
          // eslint-disable-next-line no-undef
          returnElement = elem({
            h,
            formItem,
            value: this.formData[prop],
            onValueChange: (v) => {
              this.formData[prop] = v;
            },
            props: { ...props, resetFields: this.resetFields }
          });
          break;
        case 'slot':
          // eslint-disable-next-line no-undef
          returnElement = this.$slots[elem];
          break;
        default:
          returnElement = <div>donsnet</div>;
          break;
      }
      return returnElement;
    }
  },
  render(h) {
    const { props, itemBoxStyle, itemBoxClass, isFormItemChild } = this.formFields;
    const element = this.elementGenerator(h, this.formFields);
    if (!isFormItemChild) {
      return element;
    }
    return (
      <div class={[itemBoxClass]} style={{ ...itemBoxStyle }}>
        <el-form-item props={{ ...props }}>{element}</el-form-item>
      </div>
    );
  }
};
