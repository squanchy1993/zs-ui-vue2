<!--
 * @Author: your name
 * @Date: 2021-06-15 11:12:27
 * @LastEditTime: 2023-11-12 20:42:50
 * @LastEditors: squanchy1993 squanchy@yeah.net
 * @Description: type 的设置 可以写在一个组件里面，可以单独拉出来，看你这个组件复杂不，复杂的话一个模块一个type
 * @FilePath: /zs-ui-vue2/packages/m-components/lib/components/m-popup/m-popup-generator/src/mian.vue
-->
<script>
/* eslint-disable */
import MPopupController from './MPopupController';
import { MFormGenerator } from '../../../m-form/m-form-generator/index'
export default {
  name: 'MPopupGenerator',
  components: {
    MFormGenerator
  },
  provide() {
    return {
      mFormDialogCtrl: this.popupController
    };
  },
  props: {
    controller: {
      type: MPopupController,
      required: false
    },
    config: {
      type: Object,
      default: function (params) {
        return {};
      },
      required: false
    }
  },
  watch: {
    controller: {
      handler: function (controller) {
        if (controller && controller !== this.popupController) {
          this.popupController = null;
          this.$nextTick(() => {
            this.popupController = controller;
            this.popupController.setOptions({ componentInstance: this });
          });
        }
      }
    },
    config: {
      handler: function (config) {
        if (config) {
          this.popupController.setOptions(config);
        }
      },
      deep: true,
      immediate: true
    }
  },
  data() {
    const popupController = this.controller ? this.controller : new MPopupController({});
    popupController.setOptions({ componentInstance: this });
    return {
      popupController
    };
  },
  methods: {
    contentGenerator(h, elemOptions) {
      // eslint-disable-next-line prefer-const
      let returnElement = null;
      // eslint-disable-next-line no-unused-vars
      const { type, elem, props } = elemOptions;
      // const [res, key] = this.getValueByObjPath(this.formData, prop)
      switch (type) {
        case 'registered':
          // eslint-disable-next-line no-case-declarations
          returnElement = <elem props={{ ...props }} />;
          break;
        case 'async':
          returnElement = <MAsyncComponent path={elem} props={{ ...props }} />;
          break;
        case 'render':
          // eslint-disable-next-line no-undef
          returnElement = elem({ h, props: { ...props } });
          break;
        case 'slot':
          // eslint-disable-next-line no-undef
          returnElement = this.$slots[elem];
          break;
        default:
          returnElement = <div>donsnet</div>;
          break;
      }
      return returnElement;
    },
    open(data) {
      return this.popupController.open(data);
    }
  },
  render(h) {
    const { 
      elem, 
      props, 
      on, 
      scrollStyle, 
      visible, 
      visibleKey, 
      elemOptions 
    } = this.popupController;

    const elementContent = this.contentGenerator(h, elemOptions);
    this.popupController.setOptions({ contentInstance: elementContent })
    return (
      <elem class="m-popup" props={{ ...props, [visibleKey]: visible }} on={{ ...on }}>
        <el-scrollbar class="m-popup__scrollbar" style={scrollStyle}>
          {elementContent}
        </el-scrollbar>
      </elem>
    );
  }
};
</script>

<style lang="scss" scoped>
.m-popup {
  ::v-deep {
    .el-scrollbar__wrap {
      overflow-x: hidden;
    }
  }
}
</style>
