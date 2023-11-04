<template>
  <div>
    <p>vue-json-editor</p>
    <vue-json-editor v-model="json" :show-btns="true" :expanded-on-start="true" @json-change="onJsonChange" />
  </div>
</template>

<script>
import vueJsonEditor from 'vue-json-editor'

export default {

  components: {
    vueJsonEditor
  },
  data() {
    return {
      json: {
        msg: 'demo of jsoneditor',
        sdf: 'sdf of jsoneditor',
        fun: function (params) {
          console.log('pagesm>>>', params)
        }
      }
    }
  },

  methods: {
    onJsonChange(value) {
      console.log('value:', value)
    }
  }
}
</script>