
import { deepMerge, buildShortUUID } from '../../m-utils';
export default class MDynamicElemModel {
  id= buildShortUUID();
  type = null;
  elem = null;
  props = {};

  constructor(config = {}) {
    this.setOptions(config);
  }

  setOptions({ type, elem, props }) {
    if (type) this.type = type;
    if (elem) this.elem = elem;
    if (props) this.props = deepMerge(this.props, props);
  }
}
