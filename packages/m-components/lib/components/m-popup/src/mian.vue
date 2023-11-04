<!--
 * @Author: your name
 * @Date: 2021-06-15 11:12:27
 * @LastEditTime: 2023-11-02 09:37:44
 * @LastEditors: squanchy squanchy@yeah.net
 * @Description: type 的设置 可以写在一个组件里面，可以单独拉出来，看你这个组件复杂不，复杂的话一个模块一个type
 * @FilePath: \zs-ui-vue2\packages\m-components\lib\components\m-popup\src\mian.vue
-->
<script>
/* eslint-disable */
import MPopupController from './MPopupController';
export default {
  name: 'MPopup',
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
    generator() {
      const node = Object.entries(this.$slots).filter(([k, v]) => k !== 'default');
      return node.map(([k, v]) => {
        return <template slot={k}>{v}</template>;
      });
    },
    open(data) {
      return this.popupController.open(data);
    }
  },
  render(h) {
    const { elem, props, on, scrollStyle, visible, visibleKey } = this.popupController;
    return (
      <elem class="m-popup" props={{ ...props, [visibleKey]: visible }} on={{ ...on }}>
        <el-scrollbar class="m-popup__scrollbar" style={scrollStyle}>
          {this.$slots['default']}
        </el-scrollbar>
        {this.generator()}
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
