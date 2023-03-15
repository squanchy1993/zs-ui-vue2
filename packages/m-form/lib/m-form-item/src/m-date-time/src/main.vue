<!--
    // 时间段配置
    new MFormItemModel({
        title: "日期时间选择器",
        keywords: "startTime-endTime",
        el_type: "MDateTime",
        options: {
            dateTimeType: "daterange",
            valueFormat: "yyyy-MM-dd HH:mm:ss",
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now() - 8.64e7;
                },
            }
        }
    }),

    // 单个时间配置
    new MFormItemModel({
        title: "开始时间",
        keywords: "scheduledTime",
        el_type: "MDateTime",
        options: {
            dateTimeType: "datetime",
            valueFormat: "yyyy-MM-dd HH:mm:ss",
            pickerOptions: {
                disabledDate(time) {
                return time.getTime() < Date.now();
                }
            }
        }
    })

    // 其他
    time.getTime() < Date.now() - 8.64e7;//当天之后的时间可选
    time.getTime() > Date.now() - 8.64e7;//当天之前的时间可选---不包括当天
    time.getTime() > Date.now() ;//当天之前的时间可选---包括当天
-->

<template>
  <el-form-item
    class="form-item"
    v-bind="formItem"
  >
    <el-date-picker
      v-model="componentValue"
      class="item_input"
      v-bind="formItem.options"
      align="right"
      size="mini"
      unlink-panels
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      @blur="componentValueChange(componentValue)"
    />
  </el-form-item>
</template>

<script>
import { CommonUtils } from '@zs-ui-vue2/shared';
const defaultVal = null;
export default {
  name: 'MDateTime',
  model: {
    prop: 'value',
    event: 'valueChange'
  },
  props: {
    formItem: {
      type: Object,
      default: () => {
        return {}
      }
    },
    value: {
      type: [String, Number, Array],
      default: defaultVal
    }
  },
  data() {
    return {
      componentValue: defaultVal
    }
  },
  computed: {
    inputValueChange() {
      // 监听输入value的变化
      return this.value
    }
  },
  watch: {
    inputValueChange: {
      immediate: true,
      handler: function(value) {
        // 延迟到组件创建完毕后再进行
        this.$nextTick(() => {
          console.log('received value change: ', value)
          if (CommonUtils.isEmpty(value)) {
            this.componentValue = defaultVal
            return;
          }
          if (!this._.eq(this.componentValue, value)) {
            this.componentValue = this._.cloneDeep(value)
          }
        })
      }
    }
  },
  methods: {
    // 通知父元素已经变化
    componentValueChange(value) {
      console.log('noticed father: ', value)
      this.$emit('valueChange', value)
      this.formItem.change(value)
    }
  }
}
</script>

