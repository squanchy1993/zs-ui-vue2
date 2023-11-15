import { deepMerge } from '../../../m-utils';

export default class MPopupController {
  visible = false;
  openResolve;
  openReject;

  componentInstance = null;
  elem = 'el-dialog';
  props = {
    ref: `form_${Date.now()}`
  };
  on = {
    close: () => this.close()
  };
  scrollStyle = {
    height: '100%'
  };
  visibleKey = 'visible';
  elemOptions = {
    type: 'slot',
    elem: 'default',
    props: {}
  };
  contentInstance;

  constructor(options = {}) {
    this.setOptions(options);
  }

  // set
  setOptions({
    componentInstance,
    elem,
    props,
    on,
    scrollStyle,
    visibleKey,
    elemOptions,
    contentInstance
  }) {
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

    if (elemOptions) {
      this.elemOptions = deepMerge(this.elemOptions, elemOptions);
    }

    if (contentInstance) {
      this.contentInstance = contentInstance;
    }
  }

  open = ({ tag, data }) => {
    return new Promise(async (resolve, reject) => {
      this.visible = true;
      // '$slots['default']' will be loaded only if the el-dialog has been opened.
      await this.componentInstance.$nextTick();

      try {
        this.componentInstance?.popupController.contentInstance.componentInstance.startup({
          data,
          tag
        });
      } catch (error) {
        console.warn('excute child error', error);
      }

      this.openResolve = resolve;
      this.openReject = reject;
    });
  };

  close = () => {
    if (!this.visible) return;
    this.openReject && this.openReject('form closed');
    this.clear();
  };

  clear = () => {
    try {
      this.componentInstance?.popupController.contentInstance.componentInstance.clear();
    } catch (error) {
      console.warn('excute child error', error);
    }

    this.openResolve = null;
    this.openReject = null;
    this.visible = false;
  };
}
