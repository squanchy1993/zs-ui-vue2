
<!-- // todo index.vue 接收子元素上传成功 删除的事件进行操作 -->
<!-- 单文件上传组件 -->
<template>
  <el-form-item
    class="form-item device-form"
    :label="formItem.label"
    :prop="formItem.prop"
    :rules="[{ validator: checkForm, trigger: 'blur' }, ...formItem.rules]"
  >
    <div class="img-upload">
      <WImgUploadItem
        v-for="(item, index) of componentValue"
        :key="item.id"
        v-model="componentValue[index]"
        :api="formItem.options.uploadApi"
        :disabled="formItem.disabled"
        class="img-upload__item"
        @delete="deleteFun"
        @uploaded="uploaded"
      />
      <img :src="localPath">
      <div v-show="componentValue.length < formItem.options.limit && !formItem.disabled" class="img-upload__item img-upload__add">
        <input
          ref="addPicFile"
          type="file"
          class="add-btn"
          :accept="{ String, default: 'image/jpg,image/jpeg,image/png,image/bmp' }"
          @change="addFile"
        >
        <span>上传</span>
      </div>
    </div>
  </el-form-item>
</template>

<script>
import ImgUploadModel from './img-upload-model'
import WImgUploadItem from './ImgUploadItem.vue'
import { CommonUtils } from '@zs-ui-vue/shared';
const defaultVal = [];

export default {
  name: 'MImgUpload',
  components: {
    WImgUploadItem
  },
  model: {
    prop: 'value',
    event: 'valueChange'
  },
  props: {
    formItem: {
      type: Object,
      default: () => {
        return {}
      }
    },
    value: {
      type: [String, Array],
      default: null
    }
  },
  data() {
    return {
      componentValue: defaultVal,
      localPath: ''
    }
  },
  computed: {
    inputValue() {
      // 监听输入value的变化
      return this.value
    }
  },
  watch: {
    // 监听props.value 的变化，转化为内部的格式componentValue
    inputValue: {
      immediate: true,
      handler: function(value) {
        // 延迟到组件创建完毕后再进行
        this.$nextTick(() => {
          console.log('received value change: ', value)
          if (CommonUtils.isEmpty(value)) {
            this.componentValue = defaultVal
            return;
          }

          if (!CommonUtils.isEmpty(value)) {
            this.componentValue = this.formItem.options.inputTransform(value).map(({ localPath, src }) => new ImgUploadModel({
              localPath,
              src,
              upload_state: 'success',
              upload_progress: 100
            }))
          }
        })
      }
    }
  },
  methods: {
    // 通知父元素已经变化
    componentValueChange(value) {
      const badState = value.some((item) => item.upload_state !== 'success')
      if (badState) {
        return
      }
      const imgValue = this.formItem.options.onChanged(value)
      this.$emit('valueChange', imgValue)
    },

    // 添加图片
    addFile(e) {
      const file = e.target.files[0]
      const localPath = window.URL.createObjectURL(file)
      this.componentValue.push(
        new ImgUploadModel({
          localPath,
          file
        })
      )
    },

    // 删除
    deleteFun(e) {
      this.componentValue = this.componentValue.filter((item) => item.id !== e)
      this.componentValueChange(this.componentValue)
    },

    // 上传成功
    uploaded() {
      this.componentValueChange(this.componentValue)
    },

    // 检查项
    checkForm(rule, value, callback) {
      // 检查是否有上传中的
      const isHaveUploading = this.componentValue.some((item) => item.upload_state === 'uploading')
      if (isHaveUploading) {
        return callback(new Error('还有上传中的图片'))
      }

      const isHaveUploadFail = this.componentValue.some((item) => item.upload_state !== 'success')
      if (isHaveUploadFail) {
        return callback(new Error('清除上传失败的图片'))
      }
      console.log('checkForm image:')
      // const imgValue = this.formItem.options.onChanged(this.componentValue)
      // console.log('imgValue', imgValue)
      // this.$emit('valueChange', imgValue)
      callback()
    }
  }
}
</script>

<style lang="scss" scoped >
.img-upload {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  .img-upload__item {
    width: 100px;
    height: 100px;
    background-color: red;
    margin: 0 5px 5px 0;
    background: #efefef;
  }
  .img-upload__add {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    .add-btn {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: none;
      opacity: 0;
    }
  }
}
</style>
