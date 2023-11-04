export default {
  name: 'MAsyncComponent',
  props: {
    path: {
      type: String,
      default: ''
    }
  },
  created() {
    this.getComponent().then(res => {
      this.$options.components['test'] = res
      this.$forceUpdate();
    })
  },
  data: function () {
    return {
      currentComponent: ''
    }
  },
  mounted() {
    console.log('loaded')
  },
  methods: {
    async getComponent() {
      return new Promise((resolve, reject) => {
        import('@/input.vue').then(res => {
          console.log(res)
          resolve(res)
        })
      })
    }
  },
  async render(createElement) {
    // return <component is={currentComponent}></component>
    // console.log('asdf>>>>', this.$options.components)
    // if (this.$options.components['test']) {
    //   return createElement('test')
    // }
  }
};