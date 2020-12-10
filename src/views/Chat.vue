<template>
  <div class="user-chat">
    <!-- 导航栏 -->
    <van-nav-bar
      class="app-nav-bar"
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
      <div>
        <van-cell
          class="message-left"
          :title="item.msg"
          v-for="(item, index) in messages"
          :key="index"
        />
      </div>
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
import { information } from '@/assets/JavaScript/robot-data'
import '@/assets/style/chat.less'
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
      // 数据改变影响试图更新不是立即的
      this.$nextTick(() => {
        this.scrollToBottom()
      })
    }
  },
  methods: {
    onSend () {
      // 发送消息
      if (this.message === '') {
        Dialog.confirm({
          title: '错误提示',
          message: '请输入内容'
        })
          .then(() => {
            // 确认执行
          })
          .catch(() => {
            // 取消执行
            // next(false)
          })
      } else {
        const data = {
          msg: this.message,
          timestamp: Date.now()
        }
        this.messages.push(data)
        // console.log(information())
        for (let i = 0; i < information().length; i++) {
          if (this.message === information()[i].id) {
            const arr = {
              msg: information()[i].msg,
              timestamp: Date.now(),
              id: true
            }
            this.messages.push(arr)
            // 清除输入框内容
            this.message = ''
            return
          }
        }
        // 清除输入框内容
        this.message = ''
        for (let j = 0; j < information().length; j++) {
          if (this.message !== information()[j].id) {
            const arr = {
              msg: '我不知道你在说什么',
              timestamp: Date.now()
            }
            this.messages.push(arr)
          }
          // 清除输入框内容
          this.message = ''
          return
        }
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
</style>
