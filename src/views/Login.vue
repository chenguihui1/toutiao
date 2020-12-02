<template>
  <div class="login">
    <!-- 导航栏 -->
    <van-nav-bar
      right-text="退出登录"
      left-arrow
      @click-right="onClickRight"
    >
      <template #left>
        <div class="nav-left">
          <div class="logo"></div>
          <div class="logo-text">Luckin toutiao</div>
        </div>
      </template>
    </van-nav-bar>
    <!-- 标题栏 -->
    <div class="user-box">
      <div class="user-title">
        <div class="welcome">欢迎回来!</div>
        <div class="sub-title">Please login to uour accounts</div>
      </div>
      <!-- 表单控件 -->
      <!--
        :show-error="false" 表示关闭验证不通过的红色标红输入框提示
        :show-error-message="false" 表示关闭验证不通过的红色标红展示错误提示
       -->
      <van-form
        :show-error="false"
        :show-error-message="false"
        validate-first
        ref="login-form"
        @submit="onClickic"
        @failed="onFailed"
      >
        <van-field
          v-model="userInfo.mobile"
          clearable
          center
          name="mobile"
          label="手机号"
          placeholder="请输入手机号"
          :rules="formRules.mobile"
        />
        <van-field
          v-model="userInfo.code"
          clearable
          center
          name="code"
          label="验证码"
          placeholder="验证码(6个字符)"
          autocomplete="off"
          maxlength="6"
          :rules="formRules.code"
        >
          <template #button>
            <van-count-down
              v-if="isCountDownShow"
              :time="1000*60"
              round
              format="ss秒后重新发送"
              @finish="isCountDownShow = false"
              />
            <van-button
              v-else
              size="small"
              round
              :loading="isSendSmsLoading"
              loading-text="加载中..."
              @click.prevent="getValidCode"
            >
              发送验证码
            </van-button>
          </template>
        </van-field>
        <div class="button-buttom">
          <van-button
            round
            block
            type="info"
          >
            注册 / 登录
          </van-button>
        </div>
      </van-form>
      <div class="button-text">
        <h4>如果没有收到验证码请输入万能验证码246810</h4>
      </div>
    </div>
  </div>
</template>
<script>
import '@/assets/style/login.less'
import { login, sendSms } from '@/assets/api/user'

export default {
  name: 'Login',
  data () {
    return {
      // 用户信息
      userInfo: {
        mobile: '',
        code: ''
      },
      formRules: {
        mobile: [
          { required: true, message: '请输入手机号' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '手机号格式错误' }
        ],
        code: [
          { required: true, message: '请输入验证码' },
          { pattern: /^\d{6}$/, message: '验证码格式错误' }
        ]
      },
      // 控制倒计时和发送按钮的显示状态
      isCountDownShow: false,
      // 发送验证吗请求的状态
      isSendSmsLoading: false
    }
  },
  methods: {
    onClickLeft () {
    },
    onClickRight () {
      this.$router.back()
    },
    // 提交请求
    async onClickic () {
      this.$toast.loading({
        message: '登录中...', // 提示文本
        forbidClick: true, // 禁止点击背景
        duration: 0 // 显示时长 值为0时不会消失
      })
      // 请求调用登录
      try {
        const { data } = await login(this.userInfo)
        // 处理响应功能
        // console.log(data)
        // 提示成功
        this.$toast.success('登录成功')
        // 将后端返回的用户登录状态（token等数据）放到vuex容器中
        this.$store.commit('setUser', data.data)
        // 登录成功，跳转回原来的页面
        this.$router.back('/home')
      } catch (err) {
        // console.log(err)
        this.$toast.fail('登录失败手机号或验证码错误')
      }
      // 清除输入框信息
      this.userInfo.mobile = ''
      this.userInfo.code = ''
    },
    onFailed (error) {
      if (error.errors[0]) {
        this.$toast({
          message: error.errors[0].message
          // position: 'top'
        })
      }
      // console.log('验证失败', error)
    },
    // 发送验证
    async getValidCode () {
      // 体验
      try {
        // 验证通过没有值
        await this.$refs['login-form'].validate('mobile')
        // 验证通过， 请求发送验证码
        // 展示按钮 loading状态防止多次点击
        this.isSendSmsLoading = true

        await sendSms(this.userInfo.mobile)
        // 短信发送成功倒计时
        this.isCountDownShow = true
        // 倒计时结束 隐藏倒计时显示发送按钮
        // 如果失败下一步
      } catch (err) {
        // try 里面任何代码的错误都会进入 catch
        // 不同的错误需要有不同的提示通过检测倒计时 finish事件触发
        let message = ''
        if (err && err.response && err.response.status === 429) {
          // 发送短信失败的错误提示
          message = '发送太频繁了，请稍后重试'
        } else if (err.name === 'mobile') {
          // 发送表单验证失败错误提示
          message = err.message
        } else {
          // 未知错误提示
          message = '发送失败，请稍后重试'
        }
        // 提示用户
        this.$toast({
          message
        })
      }
      /**
       * 无论发生验证码成功还是失败
       * 最后都要关闭发生按钮的 loading状态
       */
      this.isSendSmsLoading = false
    }
  }
}
</script>
<style lang="less">
  .login{
    height: 100vh;
    background-color: white;
  }
</style>
