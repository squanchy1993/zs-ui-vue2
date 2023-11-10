import { deepMerge, buildShortUUID } from '../../../m-utils';

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

  _resetFields = () => {
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
    this._resetFields();

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

    this._resetFields();

    this.tag = null;

    // clear form validate
    this.clearFieldsValidate();
  };

  reset = async () => {
    this._resetFields()
    this.clearFieldsValidate();
  }
}

export class MFormFieldModel {
  id = buildShortUUID();
  props = {};
  defaultValue = null;
  itemBoxStyle = {}; // 盒子的style
  itemBoxClass = []; // 盒子自定义class
  elemOptions = {
    type: null,
    elem: null,
    props: {}
  };

  constructor(config = {}) {
    this.setOptions(config);
  }

  setOptions({ id, props, defaultValue, itemBoxStyle, itemBoxClass, elemOptions }) {
    if (id) this.id = !id;

    if (props) this.props = deepMerge(this.props, props);

    if (defaultValue !== undefined) this.defaultValue = defaultValue;

    if (itemBoxStyle) deepMerge(this.itemBoxStyle, itemBoxStyle);

    if (itemBoxClass) this.itemBoxClass = [...this.itemBoxClass, ...this.itemBoxClass];

    if (elemOptions) this.elemOptions = deepMerge(this.elemOptions, elemOptions);
  }
}
