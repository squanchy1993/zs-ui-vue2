<!--
 * @Date: 2022-11-01 09:12:52
 * @LastEditors: squanchy squanchy@yeah.net
 * @LastEditTime: 2023-05-03 21:10:03
 * @FilePath: /zs-ui-vue2/packages/m-components/src/input.vue
-->
<template>
  <div>
    <el-input
      v-model="componentValue"
      class="m-input__inner"
      autocomplete="off"
      v-bind="$attrs"
      @input="componentValueChange(componentValue)"
    />
  </div>
</template>

<script>
const defaultVal = '';
export default {
  inject: ['elForm'],
  name: 'TestA',
  model: {
    prop: 'value',
    event: 'valueChange'
  },
  props: {
    value: {
      type: String,
      default: defaultVal
    }
  },
  data() {
    return {
      componentValue: defaultVal
    };
  },
  computed: {
    fieldValueChange() {
      // 监听输入value的变化
      return this.value;
    }
  },
  watch: {
    fieldValueChange: {
      immediate: true,
      handler: function (value) {
        // 延迟到组件创建完毕后再进行
        this.$nextTick(() => {
          console.log('received value change: ', value);
          if (!value) {
            this.componentValue = defaultVal;
            return;
          }
          if (this.componentValue !== value) {
            this.componentValue = value;
          }
        });
      }
    }
  },
  mounted() {
    // console.log(this.$attrs)
    console.log(this.elForm);
  },
  methods: {
    // 通知父元素已经变化
    componentValueChange(value) {
      console.log('notice father');
      this.$emit('valueChange', value);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>