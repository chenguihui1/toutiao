<template>
  <div class="update-photo">
    <img class="image" :src="image" ref="image">
    <van-nav-bar
      class="toolbar"
      left-text="取消"
      right-text="确认"
      @click-left="$emit('close')"
      @click-right="onConfirm"
    />
  </div>
</template>
<script>
import { updateUserPhoto } from '@/assets/api/user'
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
export default {
  name: 'UpdatePhoto',
  props: {
    file: {
      // type: Object,
      required: true
    }
  },
  data () {
    return {
      image: window.URL.createObjectURL(this.file),
      cropper: null // 裁切实例
    }
  },
  mounted () {
    // 获取需要裁切的图片
    const image = this.$refs.image
    this.cropper = new Cropper(image, {
      viewMode: 1,
      dragMode: 'move',
      aspectRatio: 1,
      cropBoxMovable: true,
      cropBoxResizable: false,
      background: false,
      movable: false
    })
  },
  methods: {
    getCroppedCanvas () {
      return new Promise(resolve => {
        this.cropper.getCroppedCanvas().toBlob((blob) => {
          resolve(blob)
        })
      })
    },
    async onConfirm () {
      this.$toast.loading({
        message: '保存中',
        forbidclick: true,
        duration: 0
      })

      const file = await this.getCroppedCanvas()
      const fd = new FormData()
      fd.append('photo', file)
      // const fd = new FormData()
      // fd.append('photo', this.file)
      await updateUserPhoto(fd)
      this.$toast.success('保存成功')
      // 更新父组件用户头
      this.$emit('update-photo', window.URL.createObjectURL(file))
      // 关闭弹窗层
      this.$emit('close')
    }
  }
}
</script>
<style lang="less">
.toolbar{
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: black;
}
.image{
  display: block;
  /* This rule is very important, please don't ignore this */
  max-width: 100%;
}
</style>
