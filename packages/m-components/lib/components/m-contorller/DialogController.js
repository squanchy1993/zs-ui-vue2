import { setValueByPath, getValueByPath, itorKey } from '../m-utils';
import { cloneDeep } from 'lodash-es';

export default class DialogController {
  openResolve = null;
  openReject = null;

  formDataDefault = {};

  originData = {};

  formData = {};

  visible = false;

  loading = true;

  tag = null;

  constructor(options = {}) {
    this.setOptions(options);
  }

  // set
  setOptions({ formDataDefault, originData, clearValidate, validate }) {
    if (formDataDefault) {
      this.formDataDefault = cloneDeep(formDataDefault);
    }

    if (originData) {
      this.props = cloneDeep(originData);
    }
    if (clearValidate) {
      this.clearValidate = clearValidate;
    }

    if (validate) {
      this.validate = validate;
    }

    // reset
    this._setFormDataByFormDataDefault();
    this._setFormDataByOriginData();
  }

  _setFormDataByFormDataDefault() {
    let tempObj = cloneDeep(this.formDataDefault);
    itorKey(
      tempObj,
      (keys, value) => {
        const prop = keys.join('.');
        setValueByPath(this.formData, prop, value);
      },
      []
    );
  }

  _setFormDataByOriginData() {
    let tempObj = cloneDeep(this.formDataDefault);
    itorKey(
      tempObj,
      (keys, value) => {
        const prop = keys.join('.');
        const originDataValue = getValueByPath(this.originData, prop);
        if (![undefined, null].includes(originDataValue)) {
          setValueByPath(this.formData, prop, originDataValue);
        }
      },
      []
    );
  }

  clearValidate = () => {};

  // 进行表单验证
  validate = () => {};

  // 设置
  open = ({ tag, data }) => {
    return new Promise((resolve, reject) => {
      this._setFormDataByFormDataDefault();
      this.tag = tag;
      if (data) {
        this.originData = cloneDeep(data);
        this._setFormDataByOriginData();
      }

      this.clearValidate();
      this.openResolve = resolve;
      this.openReject = reject;
      this.visible = true;
    });
  };

  // 关闭
  close = () => {
    this?.openReject('form closed');
    this.clear();
  };

  // 清空
  clear = async () => {
    this._setFormDataByFormDataDefault();
    this.clearValidate();

    this.openResolve = null;
    this.openReject = null;

    this.originData = {};

    this.loading = false;

    this.tag = null;

    this.visible = false;
  };

  // 重置按钮
  reset = async () => {
    this._setFormDataByFormDataDefault();
    this._setFormDataByOriginData();
    this.clearValidate();
  };
}
