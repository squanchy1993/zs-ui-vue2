<script>
import MInput from '../../m-form/m-input';
import MSelectPicker from '../../m-form/m-select-picker';
import MDateTime from '../../m-form/m-date-time';
import MInputNumber from '../../m-form/m-input-number';
import MImgUpload from '../../m-form/m-img-upload';
import { CommonUtils } from '@/lib/tools/index.js'

import './index.scss';
export default {
  name: 'MFormItem',
  components: {
    MInput,
    MSelectPicker,
    MDateTime,
    MInputNumber,
    MImgUpload,
  },
  props: {
    formItems: {
      type: Array,
      default: () => {
        return [];
      },
    },
    formData: {
      type: Object,
      default: () => {
        return {};
      },
    },
    formItemClass: {
      type: String,
      default: '',
    },
  },
  render(h) {
    return (
      <div class="outer-box">
        {this.formItems.map((formItem, index) => {
          const { el_type, prop, itemBoxStyle, render } = formItem;
          const that = this;
          // 兼容点写法 xxx.xxx
          const value = CommonUtils.getValueByObjPath(this.formData, prop);
          return (
            <div
              v-show={formItem.isShowItem}
              key={index}
              class={['form-item-box', this.formItemClass]}
              style={itemBoxStyle}
            >
              {!render ? (
                <el_type
                  key={el_type}
                  form-item={formItem}
                  value={value}
                  on-valueChange={function (v) {
                    CommonUtils.setDeepValue(that.formData, prop, v);
                  }}
                />
              ) : (
                render({
                  h,
                  formItem,
                  value,
                  formData: this.formData,
                  onValueChange: (v) => {
                    CommonUtils.setDeepValue(that.formData, prop, v);
                  },
                })
              )}
            </div>
          );
        })}
      </div>
    );
  },
};
</script>
