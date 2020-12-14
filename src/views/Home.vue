<template>
    <div class="home-container">
      <!-- 导航栏 -->
      <van-nav-bar class="app-nav-bar">
        <van-button
          slot="title"
          class="search-btn"
          icon="search"
          type="info"
          round
          size="small"
          to="/search"
        >
          搜索
        </van-button>
      </van-nav-bar>
      <!-- 导航栏 -->
      <!-- 文章频道列表 -->
      <van-tabs v-model="active">
        <van-tab
          :title="channel.name"
          v-for="channel in channels"
          :key="channel.id"
        >
          <!-- 文章列表 -->
          <artcle-list :channel="channel"  />
          <!-- 文章列表 -->
        </van-tab>
        <div
          slot="nav-right"
          class="wap-nav-placehoder"
        ></div>
        <div
          slot="nav-right"
          class="wap-nav-warp"
          @click="isChannelEditShow=true"
        >
          <van-icon name="wap-nav" />
        </div>
      </van-tabs>
      <!-- 判断编辑
       -->
      <van-popup
        class="channel-edit-popup"
        position="bottom"
        closeable
        close-icon-position="top-left"
        v-model="isChannelEditShow"
        get-container="body"
      >
        123
      </van-popup>
    </div>
</template>
<script>
import { getUserChannels } from '@/assets/api/user'
import ArtcleList from '@/components/artcle-list'
import '@/assets/style/home.less'
// import '@/assets/JavaScript/'
export default {
  name: 'home',
  components: {
    ArtcleList
  },
  data () {
    return {
      active: 0, // 控制被激活的标签
      channels: [], // 频道列表
      isChannelEditShow: false
    }
  },
  created () {
    this.loadCannels()
  },
  methods: {
    async loadCannels () {
      // 请求获取频道数据
      const { data } = await getUserChannels()
      // console.log(data)
      this.channels = data.data.channels
    }
  }
}
</script>
<style lang="less">
</style>
