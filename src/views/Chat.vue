<template>
  <div class="user-chat">
    <!-- 导航栏 -->
    <van-nav-bar
      title="小智同学"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- 导航栏 -->
    <!-- 消息通知 -->
    <van-cell-group class="message-list">
      <van-cell
        :title="item.msg"
        v-for="(item, index) in messages"
        :key="index"
      />
    </van-cell-group>
    <!-- 消息通知 -->
    <!-- 发送消息 -->
    <van-cell-group class="send-message-wrap">
      <van-field
        v-model="message"
        placeholder="请输入您的信息"
        :border="false"
      />
      <van-button
        type="primary"
        size="small"
        @click="onSend"
      >
        发送
      </van-button>
    </van-cell-group>
    <!-- 发送消息 -->
  </div>
</template>
<script>
export default {
  name: 'UserChat',
  data () {
    return {
      message: '',
      messages: [] // 消息列表
    }
  },
  methods: {
    onSend () {
      // 发送消息
      // console.log(this.message)
      const data = {
        msg: this.message,
        timestamp: Date.now()
      }
      this.messages.push(data)
      // 清除输入框内容
      this.message = ''
    }
  }
}
</script>
<style lang="less">
.message-list{
  position: fixed;
  left: 0;
  right: 0;
  top: 46px;
  bottom: 44px;
  overflow-y: auto;
}
.send-message-wrap{
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  padding: 0 14px;
  align-items: center;
  /deep/ .van-button--small{
  width: 60px;
  }
}
</style>
