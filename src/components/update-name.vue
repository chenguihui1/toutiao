<template>
  <div class="update-name">
    <!-- 导航栏 -->
    <van-nav-bar
      title="修改昵称"
      left-text="取消"
      right-text="确认"
      @click-left="$emit('close')"
      @click-right="onConfirm"
    />
    <!-- 导航栏 -->
    <div class="name-field-wrap">
      <van-field
        v-model="localName"
        rows="2"
        autosize
        type="textarea"
        maxlength="200"
        placeholder="请输入昵称"
        show-word-limit
      />
    </div>
  </div>
</template>
<script>
import { updateUserProfile } from '@/assets/api/user'
export default {
  name: 'UpdateName',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      localName: this.value
    }
  },
  methods: {
    async onConfirm () {
      // console.log('hello')
      this.$toast.loading({
        message: '保存中',
        forbidclick: true, // 禁止背景点击
        duration: 0
      })
      try {
        // 请求修改名称
        await updateUserProfile({
          name: this.localName
        })
        // 更新成功
        this.$emit('input', this.localName)
        this.$emit('close')
        this.$toast.success('保存成功')
      } catch (err) {
        if (err && err.response && err.response.status === 409) {
          this.$toast.fail('昵称已存在')
        }
      }
    }
  }
}
</script>
<style lang="less">
.name-field-wrap{
  padding: 15px 10px 10px 10px;
  /deep/ .van-field{
    height: 120px;
  }
  .van-field__body{
    margin-top: 10px;
  }
}
.van-nav-bar{
  /deep/ .van-nav-bar__left{
    .van-nav-bar__text{
      color: #969799;
    }
  }
  /deep/ .van-nav-bar__right{
    .van-nav-bar__text{
      color: #576b95;
    }
  }
}
</style>
