<template>
  <div class="update-gender">
    <van-picker
      title="性别"
      show-toolbar
      :columns="columns"
      :default-index="defaultIndex"
      @confirm="onConfirm"
      @cancel="onCancel"
      @change="onChange"
    />
  </div>
</template>
<script>
import { updateUserProfile } from '@/assets/api/user'
export default {
  name: 'UpdateGender',
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      columns: ['男', '女'],
      defaultIndex: this.value
    }
  },
  methods: {
    onChange (picker, value, index) {
      this.defaultIndex = index
    },
    async onConfirm () {
      // console.log('hello')
      this.$toast.loading({
        message: '保存中',
        forbidclick: true, // 禁止背景点击
        duration: 0
      })
      // 请求修改名称
      await updateUserProfile({
        gender: this.defaultIndex
      })
      // 更新成功
      this.$emit('input', this.defaultIndex)
      this.$emit('close')
      this.$toast.success('保存成功')
    },
    onCancel () {
      // Toast('取消')
      this.$emit('close')
    }
  }
}
</script>
<style lang="less">

</style>
