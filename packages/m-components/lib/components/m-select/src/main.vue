<!--
 * @Date: 2023-05-07 20:54:37
 * @LastEditors: squanchy1993 squanchy@yeah.net
 * @LastEditTime: 2023-11-30 14:42:33
 * @FilePath: \m-components\lib\components\m-select\src\main.vue
 * @TODO:既可以兼容原生js也可以使用eavl
-->
<template>
  <el-select v-model="previousValue" v-bind="$attrs" :remote-method="selectRemoteMethod" @change="change">
    <el-option v-for="(item, index) in previousOptions" :key="index" :label="item[lableKey]" :value="item[valueKey]" />
  </el-select>
</template>

<script>
export default {
  name: 'MSelect',
  model: {
    prop: 'value',
    event: 'valueChange'
  },
  props: {
    value: {
      type: [Array, String],
      default: ''
    },
    options: {
      type: Array,
      default: function () {
        return [];
      }
    },
    remoteMethod: {
      type: Function,
      default: null
    },
    valueKey: {
      type: String,
      default: 'value'
    },
    lableKey: {
      type: String,
      default: 'label'
    }
  },
  data() {
    return {
      previousValue: '',
      previousOptions: []
    };
  },
  watch: {
    value: {
      handler: function (value) {
        if (JSON.stringify(value) !== JSON.stringify(this.previousValue)) {
          this.previousValue = value;
        }
      },
      immediate: true,
      deep: true
    },
    options: {
      handler: function (value) {
        if (JSON.stringify(value) !== JSON.stringify(this.previousValue)) {
          this.previousOptions = value;
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    change() {
      this.$emit('valueChange', this.previousValue);
    },
    async selectRemoteMethod(e) {
      this.previousOptions = await this.remoteMethod(e)
    }
  }
};
</script>
<style lang="scss" scoped>
.m-array-edit {
  width: 100%;
  &__container {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    .el-tag + .el-tag {
      margin-left: 10px;
    }
    .button-new-tag {
      margin-left: 10px;
      height: 32px;
      line-height: 30px;
      padding-top: 0;
      padding-bottom: 0;
    }
  }
}
</style>
