import { deepMerge } from '../../../m-utils';
import { MFormFieldModel } from '../../m-form-field/index';

export default class MFormController {
  componentInstance = null;

  props = {
    ref: `form_${Date.now()}`
  };
  boxStyle = {};

  formData = {};

  fields = [];

  // gernerator by fields's default property;
  formDataDefault = {};

  // input data;
  originData = {};

  // tag for show diffrent fields;
  tag = null;

  constructor(options = {}) {
    this.setOptions(options);
  }

  // set
  setOptions({ componentInstance, props, formDataDefault, fields, boxStyle }) {
    if (componentInstance) {
      this.componentInstance = componentInstance;
    }

    if (props) {
      this.props = deepMerge(this.props, props);
    }

    if (boxStyle) {
      this.boxStyle = deepMerge(this.boxStyle, boxStyle);
    }

    if (formDataDefault) {
      this.formDataDefault = formDataDefault;
    }

    if (fields && fields.length) {
      this.fields = fields.map((item) => new MFormFieldModel(item));

      // set formDataDefault by fields
      for (const dynamicField of this.fields) {
        const {
          props: { prop },
          defaultValue
        } = dynamicField;
        if (prop && [undefined, null].includes(this.formDataDefault[prop])) {
          if (this.componentInstance) {
            this.componentInstance.$set(this.formDataDefault, prop, defaultValue);
          } else {
            Reflect.set(this.formDataDefault, prop, defaultValue);
          }
        }
      }

      this.formData = JSON.parse(JSON.stringify(this.formDataDefault));
    }
  }

  resetFields = () => {
    this._setFormDataByFormDataDefault();
    this._setFormDataByOriginData();
  };

  validateFields = async () => this.componentInstance.$refs[this.props.ref].validate();

  clearFieldsValidate = () => this.componentInstance.$refs[this.props.ref].clearValidate();

  _setFormDataByFormDataDefault() {
    for (const [k, v] of Object.entries(this.formDataDefault)) {
      this.formData[k] = v;
    }
  }

  _setFormDataByOriginData() {
    for (const [k] of Object.entries(this.formData)) {
      if (this.originData[k] !== undefined) {
        this.formData[k] = this.originData[k];
      }
    }
  }

  startup = ({ data, tag }) => {
    this.resetFields();

    this.tag = tag;

    if (data) {
      this.originData = data;

      for (const [k] of Object.entries(this.formData)) {
        if (data[k] !== undefined) {
          this.formData[k] = data[k];
        }
      }
    }

    this.clearFieldsValidate();
  };

  clear = async () => {
    this.originData = {};

    this.resetFields();

    this.tag = null;

    // clear form validate
    this.clearFieldsValidate();
  };
}
