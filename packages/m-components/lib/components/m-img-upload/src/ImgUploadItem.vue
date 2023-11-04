<!--
 * @Author: your name
 * @Date: 2021-07-23 13:29:12
 * @LastEditTime: 2023-02-20 23:11:16
 * @LastEditors: squanchy1993 squanchy@yeah.net
 * @Description: In User Settings Edit
 * @FilePath: /rail-dection-web/src/components/m-img-upload/src/ImgUploadItem.vue
-->
<!-- 单文件上传组件 -->
<template>
  <div class="upload-item">
    <img v-show="!disabled" class="item-delete" :src="deleteImg" mode="aspectFit" alt="图片" @click="deleteFun">
    <div class="item-background">
      <el-image :z-index="9999" class="item-preview" :src="imgData.localPath" mode="aspectFit" alt="图片" :preview-src-list="[imgData.localPath]" />
    </div>
    <div v-if="imgData.upload_state === 'uploading'" class="item-process">
      <div class="process-width" :style="{ 'width': imgData.upload_progress + '%',transition:'1s ease-in-out'}" />
    </div>
    <div v-if="imgData.upload_state === 'fail'" class="item-fail">
      <span>{{ imgData.tips }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WImgUploadItem',
  model: {
    prop: 'value',
    event: 'valueChange'
  },
  props: {
    value: {
      type: Object,
      default: () => {
        return {}
      }
    },
    api: {
      type: Function,
      default: () => {
        return new Function()
      }
    },

    // 是否禁用
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      imgData: null,
      deleteImg: require('./delete.png'),
      upload_progress: 0
    }
  },
  computed: {
    computedValue() {
      return this.value
    }
  },
  watch: {
    computedValue: {
      immediate: true,
      handler: function (value) {
        this.imgData = { ...value }
        const { upload_state } = value
        if (upload_state === 'uploading') {
          this.upload()
        }
      }
    }
  },
  methods: {
    // 上传图片
    upload() {
      this.imgData.upload_progress = 100 * Math.random()
      const form = new FormData()
      const { file } = this.imgData
      form.append('file', file)
      this.api(form).then(res => {
        if (res.code) {
          this.imgData.upload_progress = 100
          this.imgData.upload_state = 'success'
          this.imgData.tips = '上传成功'
          this.imgData.src = res.data
          this.$emit('valueChange', this.imgData)
          this.$emit('uploaded')
        } else {
          throw new Error(res.msg)
        }
      }).catch(() => {
        this.imgData.upload_progress = 0
        this.imgData.upload_state = 'fail'
        this.imgData.tips = '上传失败！'
      })
    },

    // 删除
    deleteFun() {
      this.$emit('delete', this.imgData.id)
    }
  }
}
</script>

<style lang="scss" scoped >
.upload-item {
  overflow: hidden;
  position: relative;
  .item-delete{
    z-index: 12;
    position: absolute;
    right: 0;
    top: 0;
    width: 25%;
    height: 25%
  }
  .item-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
    .item-preview {
      width: 100%;
    }
  };
  .item-process{
      position: absolute;
      left: 5%;
      bottom: 10%;
      width: 90%;
      height: 5%;
      background-color: #fefefe;
      border-radius: 10px;
      overflow: hidden;
      z-index: 11;
      .process-width{
          height: 100%;
          width: 0%;
          background-color:#409eff;
      }
  }

  .item-fail{
    position: absolute;
    z-index: 11;
    width: 100%;
    height: 100%;
    background:rgba($color: #000000, $alpha: 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      color: #fff
    }
  }
}
</style>
