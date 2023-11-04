import { deepMerge } from '../../../m-utils';
import { MTableFieldModel } from '../../m-table-field';

export default class MTableController {
  componentInstance = null;

  props = {
    ref: `table_${Date.now()}`
  };

  fields = [];

  list = [];

  // set
  setOptions({ componentInstance, props, fields, list }) {
    if (componentInstance) {
      this.componentInstance = componentInstance;
    }

    if (props) {
      this.props = deepMerge(this.props, props);
    }

    if (fields) {
      this.fields = fields.map(item => new MTableFieldModel(item));
    }

    if (list) {
      this.list = list;
    }
  }
}
