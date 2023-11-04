/* eslint-disable quotes */
import { MTableFieldText } from '../../m-table-field-text/index';
import { MTableFieldButton } from '../../m-table-field-button/index';

// import { MAsyncComponent } from '../../async-component/index';
export default {
  name: 'MTableField',
  components: {
    MTableFieldText,
    MTableFieldButton
  },
  props: {
    tableFieldOptions: {
      type: Object,
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
      const { elType, element, elementOptions, tableColumnOptions } = this.tableFieldOptions;
      switch (elType) {
        case 'registered':
          // eslint-disable-next-line no-case-declarations
          returnElement = (
            <element
              row={{ ...this.row }}
              tableFieldOptions={{ ...this.tableFieldOptions }}
              prop={{ ...elementOptions }}
              value={this.row[tableColumnOptions.prop]}
            />
          );
          break;
        // case 'async':
        //   returnElement = (
        //     <MAsyncComponent path={element} option={{ ...option }} v-model={res[key]} />
        //   );
        //   break;
        case 'render':
          // eslint-disable-next-line no-undef
          returnElement = element({
            h,
            row: this.row,
            tableFieldOptions: this.tableFieldOptions
          });
          break;
        default:
          returnElement = <div>elType dosen't exist</div>;
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
