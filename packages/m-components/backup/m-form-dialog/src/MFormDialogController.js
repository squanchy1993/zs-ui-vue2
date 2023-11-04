import { deepMerge } from '../../../m-utils';

export default class MFormController {
  option = {
    ref: `form_${Date.now()}`
  }
  componentInstance = null

  // set
  setOptions({ option, componentInstance }) {
    if (option) {
      this.option = deepMerge(this.option, option);
    }

    if (componentInstance) {
      this.componentInstance = componentInstance;
    }
  }

  // reset
  reset = () => {
    this.componentInstance.$refs[this.option.ref].resetFields()
  }
}
