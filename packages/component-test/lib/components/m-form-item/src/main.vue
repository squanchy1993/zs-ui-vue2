/<!--
 * @Date: 2022-11-01 09:12:52
 * @LastEditors: squanchy1993 squanchy@yeah.net
 * @LastEditTime: 2023-03-23 14:52:08
 * @FilePath: \m-components\lib\components\m-form-item\src\main.vue
-->
<template>
  <div class="m-form-item is-required ">
    <div class="m-form-item__content">
      <div class="content__label">
        <span>{{ label }}</span>
      </div>
      <div class="content__body">
        <transition name="fade" appear>
          <div v-if="errorMsg.showed" class="body__border" />
        </transition>
        <slot />
      </div>
    </div>
    <div class="m-form-item__tips">
      <transition name="fade" appear>
        <span v-if="errorMsg.showed" :key="1" class="error-msg">{{ errorMsg.message }}</span>
        <span v-else :key="2" class="warn-msg">{{ tipsMsg }}</span>
      </transition>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    prop: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    rules: {
      type: Array,
      default: () => []
    },
    tipsMsg: {
      type: Array,
      default: () => []
    }
  },
  inject: ['mForm'],
  data() {
    return {
      errorMsg: {
        showed: false,
        message: null
      }
    };
  },
  mounted() {
    this.transformInstacne();
  },
  methods: {
    // transform this to parent
    transformInstacne() {
      // directly execute
      if (!this.prop) return;
      this.$parent.formItemRemoveOrAdd(this);
      this.$once('hook:beforeDestroy', () => {
        this.$parent.formItemRemoveOrAdd(this);
      });

      // $emit
      // this.$parent.emit('m-form.addFormItem', [this]) // child sent
      // this.$on('m-form.addFormItem', (args)=> {})  // father revice

      // $bordcast and dispach
      // will traversal of tree to find name equaled component and
      // use emit api execute the method.
    },

    // validate
    async validate() {
      for (const ruleItem of this.rules) {
        try {
          await ruleItem.validate({ value: this.mForm.formData[this.prop], children: this.$children });
        } catch (error) {
          this.errorMsg.message = error.message;
          this.errorMsg.showed = true;
          throw error;
        }
      }
      this.errorMsg.message = '';
      this.errorMsg.showed = false;
      return `${this.prop} validate`;
    },

    // reset
    // may need requet orgin to reset so use promise
    async resetField() {
      if (!this.prop) return `${this.prop} no need reset`;
      await this.$children.resetField();
      this.errorMsg.message = '';
      this.errorMsg.showed = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.m-form-item {
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  .m-form-item__content {
    width: 100%;
    display: flex;
    .content__label {
      width: 58px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      color: #606266;
    }
    .content__body {
      flex: 1;
      border-radius: 4px;
      position: relative;
      .body__border {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        border: #f56c6c 1px solid;
        pointer-events: none;
        border-radius: 4px;
      }
    }
  }

  .m-form-item__tips {
    font-size: 12px;
    display: flex;
    justify-content: flex-start;
    padding: 3px 0 3px 58px;
    line-height: 12px;
    height: 12px;
    .error-msg {
      color: #f56c6c;
    }
    .warn-msg {
      color: #e6a23c;
    }
  }
}

.is-required {
  .content__label {
    ::before {
      content: '*';
      color: #f56c6c;
      margin-right: 4px;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
