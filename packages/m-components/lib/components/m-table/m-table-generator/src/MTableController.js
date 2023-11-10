import { deepMerge, buildShortUUID } from '../../../m-utils';
// import { MTableFieldController } from '../../m-table-field';

export class MTableController {
  componentInstance = null;

  props = {
    ref: `table_${buildShortUUID()}`
  };

  on = {};

  fields = [];

  list = [];

  // set
  setOptions({ componentInstance, props, on, fields, list }) {
    if (componentInstance) {
      this.componentInstance = componentInstance;
    }

    if (props) {
      this.props = deepMerge(this.props, props);
    }

    if (on) {
      this.on = on;
    }

    if (fields) {
      this.fields = fields.map((item) => new MTableFieldModel(item));
    }

    if (list) {
      this.list = list;
    }
  }
}

export class MTableFieldModel {
  id = buildShortUUID();

  props = {
    label: null,
    prop: null, // 键名
    'show-overflow-tooltip': true,
    align: 'center'
  };

  elemOptions = {
    type: null,
    elem: null,
    props: {}
  };

  constructor(config = {}) {
    this.setOptions(config);
  }

  setOptions({ id, props, elemOptions }) {
    if (id) this.id = !id;

    if (props) this.props = deepMerge(this.props, props);

    if (elemOptions) {
      this.elemOptions = deepMerge(this.elemOptions, elemOptions);
    }
  }
}
