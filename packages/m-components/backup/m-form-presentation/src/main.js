/* eslint-disable quotes */
import { MFormGenerator, MFormOpreationButton } from '../../m-form-generator/index';
export default {
  name: 'MFormPresentation',
  props: {
    presentationOption: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  created() {
    console.log(this.presentationOption);
  },
  render(h) {
    const { element, option } = this.presentationOption;
    return (
      <element props={{ ...option }}>
        <MFormGenerator form-option={this.presentationOption.formOption} />
        <MFormOpreationButton
          presentationOption={this.presentationOption}
          slot="footer"
        ></MFormOpreationButton>
      </element>
    );
  }
};
