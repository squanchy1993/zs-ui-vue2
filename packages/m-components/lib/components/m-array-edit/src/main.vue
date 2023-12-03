<!--
 * @Date: 2023-05-07 20:54:37
 * @LastEditors: squanchy1993 squanchy@yeah.net
 * @LastEditTime: 2023-11-30 15:04:47
 * @FilePath: \m-components\lib\components\m-array-edit\src\main.vue
 * @TODO:既可以兼容原生js也可以使用eavl
-->
<template>
  <div class="m-array-edit__container">
    <el-tag
      v-for="(tag, index) in this.previousValue"
      :key="index"
      closable
      :disable-transitions="false"
      @click="editDialog(tag)"
      @close="deleteTag(tag)"
    >
      {{ tag[labelKey] }}
    </el-tag>
    <el-button class="button-new-tag" size="small" @click="openDialog">添加</el-button>
    <MPopupGenerator ref="form" :config="formConfig" />
  </div>
</template>

<script>
import { stringify, parse, difference } from '../../m-utils';

const defaultValue = [];
export default {
  name: 'MArrayEdit',
  model: {
    prop: 'value',
    event: 'valueChange'
  },
  components: {
    MPopupGenerator: () => import('../../m-popup/m-popup-generator/src/mian.vue')
  },
  props: {
    arrayType: {
      type: String, // Object String Number
      default: 'Object'
    },
    value: {
      type: Array,
      default: function () {
        return [];
      }
    },
    fields: {
      type: Array,
      default: function () {
        return [];
      }
    },
    labelKey: {
      type: String,
      default: 'label'
    }
  },
  computed: {
    inputValueChange() {
      // 监听输入value的变化
      return this.value;
    }
  },
  watch: {
    inputValueChange: {
      handler: function (value) {
        console.log(value);
        // 延迟到组件创建完毕后再进行
        this.$nextTick(() => {
          if (!value) {
            this.previousValue = defaultValue;
            return;
          }

          if (stringify(value) !== stringify(this.previousValue)) {
            this.previousValue = this.dealInput(value);
          }
        });
      },
      immediate: true,
      deep: true
    }
  },
  data() {
    return {
      previousValue: [],
      formConfig: {
        elem: 'el-dialog',
        props: {
          title: 'array form',
          width: '60%',
          size: '60%',
          appendToBody: true
        },
        on: ({ mTableCtrl }) => {
          return {
            close: mTableCtrl.close
          };
        },
        elemOptions: {
          type: 'registered',
          elem: 'MFormGenerator',
          props: {
            config: {
              props: {
                ref: 'form',
                size: 'mini',
                labelPosition: 'right',
                labelWidth: '140px'
              },
              boxStyle: {
                'justify-content': 'space-between'
              },
              fields: [
                ...this.fields,
                {
                  defaultValue: '',
                  itemBoxStyle: {
                    width: '100%'
                  },
                  elemOptions: {
                    type: 'registered',
                    elem: 'MButtonOperator',
                    props: {
                      btns: [
                        {
                          name: '保存',
                          code: async ({
                            injectData: { mFormCtrl, mFormDialogCtrl, mListCtrl }
                          }) => {
                            try {
                              const { validateFields, formData, originData } = mFormCtrl;
                              await validateFields();

                              // only submit changed data;
                              const params = difference(formData, originData);
                              if (!Object.keys(params).length) {
                                this.$message.error('没有修改!');
                                throw new Error('没有修改!');
                              }
                              mFormDialogCtrl.openResolve(params);
                              mFormDialogCtrl.clear();
                            } catch (error) {
                              console.log('提交失败', error);
                            }
                          }
                        },
                        {
                          name: '重置',
                          code: ({ injectData: { mFormCtrl } }) => mFormCtrl.reset()
                        }
                      ],
                      boxStyle: {
                        'justify-content': 'flex-end'
                      }
                    }
                  }
                }
              ]
            }
          }
        }
      }
    };
  },
  methods: {
    dealInput(val) {
      let tempArray = [];
      switch (this.arrayType) {
        case 'Object':
          tempArray = parse(stringify(val));
          console.log('tempArray>>', tempArray);
          break;
        case 'String':
          tempArray = val.reduce((state, cur) => {
            state.push({ value: String(cur) });
            return state;
          }, []);
          break;
        case 'Number':
          tempArray = val.reduce((state, cur) => {
            state.push({ value: Number(cur) });
            return state;
          }, []);
          break;
      }
      return tempArray;
    },

    change() {
      const outValue = this.dealOutput(this.previousValue);
      this.$emit('valueChange', outValue);
    },

    dealOutput(val) {
      let tempArray = [];
      switch (this.arrayType) {
        case 'Object':
          tempArray = parse(stringify(val));
          break;
        case 'String':
          tempArray = val.reduce((state, cur) => {
            state.push(String(cur.value));
            return state;
          }, []);
          break;
        case 'Number':
          tempArray = val.reduce((state, cur) => {
            state.push(Number(cur.value));
            return state;
          }, []);
          break;
      }
      return tempArray;
    },

    deleteTag(tag) {
      let index = this.previousValue.indexOf(tag);
      this.previousValue.splice(index, 1);
      this.change();
    },

    async openDialog() {
      let res = await this.$refs.form.open({ tag: 'create', data: {} });
      this.previousValue.push(res);
      this.change();
    },

    async editDialog(tag) {
      let res = await this.$refs.form.open({ tag: 'edit', data: tag });
      for (const [k, v] of Object.entries(res)) {
        tag[k] = v;
      }
      this.change();
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
