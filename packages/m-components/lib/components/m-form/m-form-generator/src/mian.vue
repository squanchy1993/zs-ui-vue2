<!--
 * @Author: your name
 * @Date: 2021-06-15 11:12:27
 * @LastEditTime: 2023-11-26 20:34:39
 * @LastEditors: squanchy1993 squanchy@yeah.net
 * @Description: type 的设置 可以写在一个组件里面，可以单独拉出来，看你这个组件复杂不，复杂的话一个模块一个type
 * @FilePath: /m-components/lib/components/m-form/m-form-generator/src/mian.vue
-->
<template>
  <div class="m-form-generator">
    <el-form v-if="formController" :model="formController.formData" v-bind="formController.props">
      <div class="m-form-generator__inner" :style="formController.boxStyle">
        <div
          v-for="(
            { props, itemBoxClass, itemBoxStyle, elemOptions }, index
          ) of formController.fields"
          :key="index"
          :class="['m-form-item', ...itemBoxClass]"
          :style="itemBoxStyle"
        >
          <div
            class="m-form-item__delete"
            @click="$emit('deleteItem', { field: formController.fields[index], index })"
          >
            <i class="el-icon-delete" />
          </div>
          <div
            class="m-form-item__edit"
            @click="$emit('editItem', { field: formController.fields[index], index })"
          >
            <i class="el-icon-edit" />
          </div>

          <el-form-item v-bind="props">
            <MDynamicElem
              :config="elemOptions"
              :data="formController.formData"
              :prop-key="props.prop"
            >
              <template v-if="elemOptions.type == 'slot'" v-slot:[elemOptions.elem]>
                <slot :name="elemOptions.elem" />
              </template>

              <template
                v-else-if="elemOptions.type == 'scopedSlot'"
                v-slot:[elemOptions.elem]="test"
              >
                <slot :name="elemOptions.elem" v-bind="test" />
              </template>
            </MDynamicElem>
          </el-form-item>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
/* eslint-disable */
import MFormController from './MFormController';
import { MDynamicElem } from '../../../m-dynamic-elem';
import { parse, stringify, isEmptyObj, itorKey, setValueByPath, clearObj } from '../../../m-utils';
import { nextTick } from 'vue';

export default {
  name: 'MFormGenerator',
  provide() {
    return {
      mFormCtrl: this.formController
    };
  },
  components: {
    MDynamicElem
  },
  model: {
    prop: 'formData',
    event: 'formDataChange'
  },
  props: {
    controller: {
      type: MFormController,
      default: null,
      required: false
    },
    config: {
      type: Object,
      default: function () {
        return {};
      }
    },
    formData: {
      type: Object,
      default: function () {
        return {};
      }
    }
  },
  watch: {
    controller: {
      handler: function (controller) {
        if (!controller) {
          this.formController = new MFormController();
          this.formController.setOptions({ componentInstance: this });
        } else if (controller && controller !== this.formController) {
          this.formController = null;
          this.$nextTick(() => {
            this._provided.mFormCtrl = this.formController = controller;
            this.formController.setOptions({ componentInstance: this });
          });
        }
      },
      immediate: true
    },
    config: {
      handler: function (config) {
        nextTick(() => {
          if (!isEmptyObj(config)) {
            this.formController.setOptions(config);
          }
        });
      },
      deep: true,
      immediate: true
    },
    formData: {
      // listen input formdata
      handler: function (formData) {
        if (isEmptyObj(formData)) return;

        if (stringify(formData) != stringify(this.formController.formData)) {
          this.formController.formData = parse(stringify(formData));

          if (isEmptyObj(this.formController.originData)) {
            this.formController.originData = parse(stringify(formData));
          }
        }
      },
      deep: true,
      immediate: true
    },
    ['formController.formData']: {
      // notify outside formData's value is changed
      handler: function (formData) {
        if (stringify(formData) != stringify(this.formData)) {
          if(!isEmptyObj(formData)){
            itorKey(
            formData,
            (keys, value) => {
              const prop = keys.join('.');
              setValueByPath(this.formData, prop, value);
            }
          );
          }else {
            clearObj(this.formData)
          }
  
        }
      },
      deep: true
    }
  },
  data() {
    return {
      formController: null
    };
  },
  methods: {
    startup(data) {
      this.formController.startup(data);
    },
    clear() {
      this.formController.clear();
    },
    reset() {
      this.formController.reset();
    }
  }
};
</script>

<style lang="scss" scoped>
.m-form-generator {
  width: 100%;

  &__inner {
    display: flex;
    flex-wrap: wrap;
    .m-form-item {
      position: relative;
      &__delete {
        position: absolute;
        right: 12px;
        bottom: 0;
        width: 12px;
        height: 12px;
        font-size: 8px;
        line-height: 12px;
        overflow: hidden;
        background-color: #f56c6c;
        color: #fff;
        display: none;
      }

      &__edit {
        position: absolute;
        right: 0;
        bottom: 0;
        width: 12px;
        height: 12px;
        font-size: 8px;
        line-height: 12px;
        overflow: hidden;
        background-color: #409eff;
        color: #fff;
        display: none;
      }
    }
  }
}
</style>
