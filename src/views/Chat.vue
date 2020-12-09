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
    <van-cell-group
      class="message-list"
      ref="message-list"
    >
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
import { getItem, setItem } from '@/assets/utils/session'
import { Dialog } from 'vant'
import '@/assets/JavaScript/robot-data'
export default {
  name: 'UserChat',
  data () {
    return {
      message: '',
      messages: getItem('messages') || [] // 消息列表
    }
  },
  watch: {
    messages () {
      setItem('messages', this.messages)
      // 数据关闭影响试图更新不是立即的
      this.$nextTick(() => {
        this.scrollToBottom()
      })
    }
  },
  mounted () {
    this.scrollToBottom()
  },
  methods: {
    onSend () {
      // 发送消息
      // 频道输入框是否为空
      if (this.message === '' || this.message === 0) {
        Dialog.confirm({
          title: '错误提醒',
          message: '发送失败，请输入内容'
        })
          .then(() => {
            // 确认执行
          })
          .catch(() => {
            // 取消执行
          })
      } else {
        const data = {
          msg: this.message,
          timestamp: Date.now()
        }
        this.messages.push(data)
        // 清除输入框内容
        this.message = ''
      }
    },
    scrollToBottom () {
      const list = this.$refs['message-list']
      list.scrollTop = list.scrollHeight
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
