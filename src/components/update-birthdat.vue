<template>
  <div class="update-birthday">
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="$emit('close')"
      @confirm="onConfirm"
    />
  </div>
</template>
<script>
import { updateUserProfile } from '@/assets/api/user'
import dayjs from 'dayjs'
export default {
  name: 'UpdateBirthday',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      minDate: new Date(1924, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value)
    }
  },
  methods: {
    async onConfirm () {
      this.$toast.loading({
        message: '保存中',
        forbidclick: true, // 禁止背景点击
        duration: 0
      })
      // const data = `
      //   ${this.currentDate.getFullYear()}-
      //   ${this.currentDate.getMonth() + 1}-
      //   ${this.currentDate.getDate()}
      // `
      const data = dayjs(this.currentDate).format('YYYY-MM-DD')
      // 请求提交更新用户生日
      await updateUserProfile({
        birthday: data
      })
      // 更新成功
      this.$emit('input', data)
      this.$emit('close')
      this.$toast.success('保存成功')
    }
  }
}
</script>
