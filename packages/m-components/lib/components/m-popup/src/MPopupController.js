import { deepMerge } from '../../m-utils';

export default class MPopupController {
  componentInstance = null;

  elem = 'el-dialog';
  visible = false;
  visibleKey = 'visible';
  props = {
    ref: `form_${Date.now()}`
  };

  scrollStyle = {
    height: '100%'
  };
  openResolve;
  openReject;

  on = {
    close: () => this.close()
  };

  constructor(options = {}) {
    this.setOptions(options);
  }

  // set
  setOptions({ componentInstance, elem, props, on, scrollStyle, visibleKey }) {
    if (componentInstance) {
      this.componentInstance = componentInstance;
    }

    if (elem) {
      this.elem = elem;
    }

    if (props) {
      this.props = deepMerge(this.props, props);
    }

    if (on) {
      let onObj = on({ mTableCtrl: this });
      this.on = { ...this.on, ...onObj };
    }

    if (scrollStyle) {
      this.scrollStyle = deepMerge(this.scrollStyle, scrollStyle);
    }

    if (visibleKey) {
      this.visibleKey = visibleKey;
    }
  }

  open = ({ tag, data }) => {
    return new Promise(async (resolve, reject) => {
      this.visible = true;
      // '$slots['default']' will be loaded only if the el-dialog has been opened.
      await this.componentInstance.$nextTick();

      try {
        this.componentInstance?.$slots['default'][0]['componentInstance'].startup({ data, tag });
      } catch (error) {
        console.warn('excute child error', error);
      }

      this.openResolve = resolve;
      this.openReject = reject;
    });
  };

  close = () => {
    this.openReject && this.openReject('form closed');
    this.clear();
  };

  clear = () => {
    try {
      this.componentInstance?.$slots['default'][0]['componentInstance'].clear();
    } catch (error) {
      console.warn('excute child error', error);
    }

    this.openResolve = null;
    this.openReject = null;
    this.visible = false;
  };
}
