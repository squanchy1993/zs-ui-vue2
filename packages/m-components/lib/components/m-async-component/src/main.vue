<!--
 * @Date: 2022-11-01 09:12:52
 * @LastEditors: squanchy1993 squanchy@yeah.net
 * @LastEditTime: 2023-03-31 08:46:27
 * @FilePath: \m-components\lib\components\m-async-component\src\main.vue
-->
<template>
  <div v-loading="loading" style="min-height: 80px; width: 100%">
    <div v-if="componentLoaded">
      <component :is="componentName" v-bind="option" v-on="$listeners" />
    </div>
    <div v-if="showError" class="error">
      <span>{{ errorMsg }}</span>
      <el-button size="mini" @click="getComponent">重试</el-button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
export default {
  name: 'MAsyncComponent',
  props: {
    path: {
      type: String,
      default: 'input.vue'
    },
    timeOut: {
      type: Number,
      default: 2000
    },
    option: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data: function () {
    return {
      componentName: '',
      loading: true,
      showError: false,
      componentLoaded: false,
      errorMsg: ''
    };
  },
  mounted() {
    console.log(this.option);
    this.getComponent();
  },
  methods: {
    async getComponent() {
      this.loading = true;
      this.showError = false;
      this.componentLoaded = false;
      try {
        const { default: res } = await this.downLoadFile();
        const componentName = res.name;
        if (!Vue.options.components[componentName]) {
          this.$options.components[componentName] = Vue.component(componentName, res);
        }

        this.componentName = componentName;
        this.componentLoaded = true;
        // eslint-disable-next-line no-empty
      } catch (error) {
        this.showError = true;
        this.componentLoaded = false;
        this.errorMsg = error.message;
      } finally {
        this.loading = false;
      }
    },

    // 测试方法
    // downLoadFile() {
    //   return new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //       reject(new Error('加载超时'));
    //     }, this.timeOut);
    //     import('@/' + this.path)
    //       .then((res) => {
    //         setTimeout(() => {
    //           resolve(res);
    //         }, 1000);
    //       })
    //       .catch((error) => {
    //         reject(error);
    //       });
    //   });
    // },

    async delay() {
      return new Promise((resolve, reject) => {
        setTimeout(resolve, 2000);
      });
    }
  }
};
</script>
