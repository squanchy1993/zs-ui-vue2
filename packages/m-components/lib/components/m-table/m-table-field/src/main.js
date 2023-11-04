/* eslint-disable quotes */
// import {
//   MButtonOperator
// } from '../../../../index.js';
import { MButtonOperator } from '../../../m-button-operator';
// import { MAsyncComponent } from '../../async-component/index';
import MTableFieldModel from './mtableFieldOption';
export default {
  name: 'MTableField',
  components: {
    MButtonOperator
  },
  props: {
    mTableFieldOption: {
      type: MTableFieldModel,
      default: () => {
        return {};
      }
    },
    row: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  methods: {
    elementGenerator(h) {
      // eslint-disable-next-line prefer-const
      let returnElement = null;
      // eslint-disable-next-line no-unused-vars
      const {
        props: { prop },
        elemOptions: { type, elem, props }
      } = this.mTableFieldOption;
      switch (type) {
        case 'registered':
          // eslint-disable-next-line no-case-declarations
          returnElement = <elem props={{ ...props, row: this.row, value: this.row[prop] }} />;
          break;
        // case 'async':
        //   returnElement = (
        //     <MAsyncComponent path={element} option={{ ...option }} v-model={res[key]} />
        //   );
        //   break;
        case 'render':
          // eslint-disable-next-line no-undef
          returnElement = elem({
            h,
            props: {
              ...props,
              row: this.row
            }
          });
          break;
        default:
          returnElement = <span>{this.row[prop]}</span>;
          break;
      }
      return returnElement;
    }
  },
  render(h) {
    const element = this.elementGenerator(h);
    return element;
  }
};
