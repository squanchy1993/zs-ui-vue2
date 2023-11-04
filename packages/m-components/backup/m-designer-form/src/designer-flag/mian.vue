<!--
 * @Author: your name
 * @Date: 2021-06-15 11:12:27
 * @LastEditTime: 2023-05-24 19:16:00
 * @LastEditors: squanchy1993 squanchy@yeah.net
 * @Description: type 的设置 可以写在一个组件里面，可以单独拉出来，看你这个组件复杂不，复杂的话一个模块一个type
 * @FilePath: \zs-ui-vue2\packages\m-components\lib\components\m-form-designer\src\designer-flag\mian.vue
-->
<template>
  <div class="m-form-designer-flag">
    <el-tag
      :key="tag"
      v-for="tag in previseValue"
      closable
      :disable-transitions="false"
      @close="handleClose(tag)"
    >
      {{ tag }}
    </el-tag>
    <el-input
      class="input-new-tag"
      v-if="inputVisible"
      v-model="inputValue"
      ref="saveTagInput"
      size="small"
      @keyup.enter.native="handleInputConfirm"
      @blur="handleInputConfirm"
    >
    </el-input>
    <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
  </div>
</template>

<script>
import { MFormGenerator } from '../../../m-form-generator/index';
import DesigerCodeEdit from '../desinger-code-edit/index.vue';
/* eslint-disable */
export default {
  name: 'MFormDesignerFlag',
  components: {
    MFormGenerator,
    DesigerCodeEdit
  },
  model: {
    prop: 'value',
    event: 'valueChange'
  },
  props: {
    value: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      previseValue: [],
      inputVisible: false,
      inputValue: ''
    };
  },
  watch: {
    value: {
      deep: true,
      immediate: true,
      handler: function (value) {
        // 延迟到组件创建完毕后再进行
        this.$nextTick(() => {
          if (JSON.stringify(value) !== JSON.stringify(this.previseValue)) {
            this.previseValue = JSON.parse(JSON.stringify(value));
          }
        });
      }
    }
  },
  mounted() {},
  methods: {
    handleClose(tag) {
      this.previseValue.splice(this.previseValue.indexOf(tag), 1);
      this.componentValueChange();
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.previseValue.push(inputValue);

        this.componentValueChange();
      }
      this.inputVisible = false;
      this.inputValue = '';
    },

    // 通知父元素已经变化
    componentValueChange() {
      this.$emit('valueChange', this.previseValue);
    }
  }
};
</script>

<style lang="scss" scoped>
.m-form-designer-flag {
  display: flex;
  padding: 10px;
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
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
}
</style>
