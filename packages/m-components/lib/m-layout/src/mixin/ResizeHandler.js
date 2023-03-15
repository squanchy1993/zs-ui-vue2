
const { body } = document
const WIDTH = 992 // refer to Bootstrap's responsive design

export default {
  inject: ['layoutState', 'operator'],
  computed: {
    settingState() {
      return this.layoutState()
    },
    sidebar() {
      return this.settingState.sidebar
    },
    device() {
      return this.settingState.device
    },
    fixedHeader() {
      return this.settingState.fixedHeader
    }
  },
  watch: {
    $route(route) {
      if (this.device === 'mobile' && this.sidebar.opened) {
        this.operator.closeSideBar(false)
      }
    }
  },
  beforeMount() {
    window.addEventListener('resize', this.$_resizeHandler)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.$_resizeHandler)
  },
  mounted() {
    const isMobile = this.$_isMobile()
    if (isMobile) {
      this.operator.toggleDevice('mobile')
      this.operator.closeSideBar(true)
    }
  },
  methods: {
    // use $_ for mixins properties
    // https://vuejs.org/v2/style-guide/index.html#Private-property-names-essential
    $_isMobile() {
      const rect = body.getBoundingClientRect()
      return rect.width - 1 < WIDTH
    },
    $_resizeHandler() {
      if (!document.hidden) {
        const isMobile = this.$_isMobile()
        this.operator.toggleDevice(isMobile ? 'mobile' : 'desktop')

        if (isMobile) {
          this.operator.closeSideBar(true)
        }
      }
    }
  }
}
