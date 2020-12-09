<template>
    <div class="my-container">
      <van-cell-group v-if="user" class="my-info">
        <van-cell
          class="base-info"
          center
          :border="false"
        >
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="currentUser.photo"
          />
          <div class="name" slot="title">{{currentUser.name}}</div>
          <van-button
            class="update-btn"
            size="small"
            round
            to="/Profile"
          >
            编辑资料
          </van-button>
        </van-cell>
        <van-grid :border="false">
          <van-grid-item>
            <div class="text-wrap" slot="text">
              <div class="count">{{currentUser.art_count}}</div>
              <div class="text">头条</div>
            </div>
          </van-grid-item>
          <van-grid-item>
            <div class="text-wrap" slot="text">
              <div class="count">{{currentUser.follow_count}}</div>
              <div class="text">关注</div>
            </div>
          </van-grid-item>
          <van-grid-item>
            <div class="text-wrap" slot="text">
              <div class="count">{{currentUser.fans_count}}</div>
              <div class="text">粉丝</div>
            </div>
          </van-grid-item>
          <van-grid-item>
            <div class="text-wrap" slot="text">
              <div class="count">{{currentUser.like_count}}</div>
              <div class="text">获赞</div>
            </div>
          </van-grid-item>
        </van-grid>
      </van-cell-group>
      <div v-else class="not-login">
        <div class="login" @click="$router.push({
          name: 'login',
          query: {
            redirect: '/my'
          }
        })">
          <img class="mobile" src="../assets/images/logo.png" alt="">
        </div>
        <div class="text">登录 / 注册</div>
      </div>
      <van-grid class="nav-grid" :column-num="2">
        <van-grid-item
          class="nav-grid-item"
          icon-prefix="iconfont"
          icon="iconfont icon-shoucang"
          text="收藏"
        />
        <van-grid-item
          class="nav-grid-item"
          icon-prefix="iconfont"
          icon="iconfont icon-lishi"
          text="历史"
        />
      </van-grid>
      <van-cell title="消息通知" is-link to="/" />
      <van-cell class="mb-4" title="小智同学" is-link to="/" />
      <van-cell
        v-if="user"
        class="logout-cell"
        title="退出登录"
        @click="onLogout"
      />
    </div>
</template>
<script>
import '@/assets/style/my.less'
import { mapState } from 'vuex'
import { getCurrentUser } from '@/assets/api/user'
import store from '@/store/'
export default {
  name: 'home',
  data () {
    return {
      currentUser: {}
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created () {
    this.loadCurrentUser()
  },
  methods: {
    async loadCurrentUser () {
      // 发送请求数据
      if (store.state.user) {
        const { data } = await getCurrentUser()
        this.currentUser = data.data
      }
    },
    onLogout () {
      // 提示用户是否确认退出
      this.$dialog.confirm({
        title: '退出提醒',
        message: '确认退出吗?'
      })
        .then(() => {
          // 确认执行
          // 清除用户登录状态
          this.$store.commit('setUser', null)
        })
        .catch(() => {
        })
    }
  }
}
</script>
<style lang="less">
</style>
