import {
  deepMerge,
  buildShortUUID,
  setValueByPath,
  getValueByPath,
  itorKey
} from '../../../m-utils';
import { cloneDeep } from 'lodash-es';

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
  setOptions({ componentInstance, props, fields, boxStyle }) {
    if (componentInstance) {
      this.componentInstance = componentInstance;
    }

    if (props) {
      this.props = deepMerge(this.props, props);
    }

    if (boxStyle) {
      this.boxStyle = deepMerge(this.boxStyle, boxStyle);
    }

    if (fields && fields.length) {
      const mFormFields = fields.map((item) => new MFormFieldModel(item));

      // generate formDataDefault
      let tempObj = {};
      for (const dynamicField of mFormFields) {
        const {
          props: { prop },
          defaultValue
        } = dynamicField;
        if (prop && defaultValue !== undefined) {
          setValueByPath(tempObj, prop, defaultValue);
          setValueByPath(this.formDataDefault, prop, defaultValue);
        }
      }
      this.formDataDefault = tempObj;

      this.fields = mFormFields;
    }

    // reset
    this._setFormDataByFormDataDefault();
    this._setFormDataByOriginData();
  }

  _setFormDataByFormDataDefault() {
    let tempObj = {};
    itorKey(
      this.formDataDefault,
      (keys, value) => {
        const prop = keys.join('.');
        setValueByPath(tempObj, prop, value);
      },
      []
    );
    this.formData = tempObj;
  }

  _setFormDataByOriginData() {
    let tempObj = {};
    itorKey(
      this.formDataDefault,
      (keys, value) => {
        const prop = keys.join('.');
        const originDataValue = getValueByPath(this.originData, prop);
        if (![undefined, null].includes(originDataValue)) {
          setValueByPath(tempObj, prop, originDataValue);
        }
      },
      []
    );
    this.formData = tempObj;
  }

  _clearFieldsValidate = () => {
    let formRef = this.componentInstance.$refs[this.props.ref];
    if (formRef) {
      formRef.clearValidate();
    }
  };

  // 进行表单验证
  validateFields = async () => this.componentInstance.$refs[this.props.ref].validate();

  // 设置
  startup = ({ data, tag }) => {
    this._setFormDataByFormDataDefault();
    this.tag = tag;
    if (data) {
      this.originData = cloneDeep(data);
      this._setFormDataByOriginData();
    }

    this._clearFieldsValidate();
  };

  // 清空
  clear = async () => {
    this.originData = {};

    this._setFormDataByFormDataDefault();

    this.tag = null;

    // clear form validate
    this._clearFieldsValidate();
  };

  // 重置按钮
  reset = async () => {
    this._setFormDataByFormDataDefault();
    this._setFormDataByOriginData();
    this._clearFieldsValidate();
  };
}

export class MFormFieldModel {
  id = buildShortUUID();
  props = {
    label: null,
    prop: null
  };
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
