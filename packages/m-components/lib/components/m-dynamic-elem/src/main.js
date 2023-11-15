/* eslint-disable quotes */
import { MButtonOperator } from '../../m-button-operator';
import { MAsyncComponent } from '../../m-async-component';
import { MJsonEditor } from '../../m-json-editor';
import MDynamicElemModel from './mDynamicElemModel';
import { getPropByPath } from '../../m-utils';
import { MDynamicInput } from '../../m-dynamc-input'
import { MCodeInput } from '../../m-code-input'
export default {
  name: 'MDynamicElem',
  components: {
    MButtonOperator,
    MAsyncComponent,
    MJsonEditor,
    MDynamicInput,
    MCodeInput
  },
  inject: {
    mLayoutTable: { default: null },
    mListCtrl: { default: null },
    mTableCtrl: { default: null },
    mFormCtrl: { default: null },
    mFormDialogCtrl: { default: null }
  },
  props: {
    elemModel: {
      type: MDynamicElemModel,
      required: false
    },
    config: {
      type: Object,
      default: () => {
        return {};
      }
    },
    data: {
      type: Object,
      default: () => {
        return {};
      }
    },
    propKey: {
      type: String,
      default: ''
    }
  },
  watch: {
    elemModel: {
      handler: function (elemModel) {
        if (elemModel && elemModel !== this.previousElemModel) {
          this.previousElemModel = null;
          this.$nextTick(() => {
            this.previousElemModel = elemModel;
          });
        }
      }
    },
    config: {
      handler: function (config) {
        if (config) {
          this.previousElemModel.setOptions(config);
        }
      },
      immediate: true,
      deep: true
    }
  },
  data() {
    const previousElemModel = this.elemModel ? this.elemModel : new MDynamicElemModel();
    return {
      previousElemModel,
      previousValue: null
    };
  },
  methods: {
    elementGenerator(h) {
      let returnElement = null;
      const { o, k } = getPropByPath(this.data, this.propKey ?? '');
      const { type, elem, props } = this.previousElemModel;
      switch (type) {
        case 'registered':
          returnElement = (
            <elem
              placeholder={props['placeholder']}
              maxlength={props['maxlength']}
              minlength={props['minlength']}
              props={props}
              data={this.data}
              v-model={o[k]}
            />
          );
          break;
        case 'async':
          returnElement = (
            <MAsyncComponent path={elem} props={{ ...props }} v-model={this.data[this.propKey]} />
          );
          break;
        case 'render': {
          const { mLayoutTable, mListCtrl, mTableCtrl, mFormCtrl, mFormDialogCtrl } = this;
          returnElement = elem({
            h,
            props: this.$props,
            injectData: { mLayoutTable, mListCtrl, mTableCtrl, mFormCtrl, mFormDialogCtrl }
          });
          break;
        }
        case 'slot': {
          returnElement = this.$slots[elem];
          break;
        }
        case 'scopedSlot': {
          const { mLayoutTable, mListCtrl, mTableCtrl, mFormCtrl, mFormDialogCtrl } = this;
          returnElement = this.$scopedSlots[elem]({
            props: this.$props,
            injectData: { mLayoutTable, mListCtrl, mTableCtrl, mFormCtrl, mFormDialogCtrl }
          });
          break;
        }
        default:
          returnElement = <span>{this.data[this.propKey] || '--'}</span>;
          break;
      }
      return returnElement;
    }
  },
  render(h) {
    return this.elementGenerator(h);
  }
};
