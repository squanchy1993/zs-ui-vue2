import { deepMerge, buildShortUUID } from '../../../m-utils';
export default class MTableFieldModel {
  id = buildShortUUID();
  props = {
    label: null,
    prop: null, // 键名
    'show-overflow-tooltip': true,
    align: 'center'
  };

  itemBoxClass = { width: '100%' };

  defaultValue = null;

  elemOptions = {
    type: null,
    elem: null,
    props: {}
  };

  constructor({ id, props, itemBoxClass, defaultValue = null, elemOptions }) {
    if (id) this.id = !id;

    if (props) this.props = deepMerge(this.props, props);

    if (itemBoxClass) this.itemBoxClass = deepMerge(this.itemBoxClass, itemBoxClass);

    this.defaultValue = defaultValue;

    if (elemOptions) {
      this.elemOptions = deepMerge(this.elemOptions, elemOptions);
    }
  }
}
