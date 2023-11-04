/* eslint-disable */
import { deepMerge, buildShortUUID } from '../../../m-utils';

export default class MFormFieldModel {
  itemBoxStyle = { width: '100%' };
  constructor({
    props = {},
    itemBoxStyle = {}, // 盒子的style
    itemBoxClass = null, // 盒子自定义class
    defaultValue = null, // 默认值
    id = buildShortUUID(),
    isFormItemChild = true,
    change = new Function(), // 改变的回调
    elemOptions = {
      type: 'registered',
      elem: 'el-input',
      props: {}
    }
  }) {
    this.props = props;
    // deal rules
    if (props.rules) {
      this.rules = this.rules;
    }

    this.itemBoxStyle = deepMerge(this.itemBoxStyle, itemBoxStyle);
    this.itemBoxClass = itemBoxClass;
    this.defaultValue = defaultValue;
    this.id = id;
    this.isFormItemChild = isFormItemChild;
    this.change = change;
    this.elemOptions = elemOptions;
  }
}
