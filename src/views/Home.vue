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
      </van-tabs>
    </div>
</template>
<script>
import { getUserChannels } from '@/assets/api/user'
import ArtcleList from '@/components/artcle-list'
export default {
  name: 'home',
  components: {
    ArtcleList
  },
  data () {
    return {
      active: 0, // 控制被激活的标签
      channels: [] // 频道列表
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
  .home-container{
    /deep/ .van-nav-bar__title{
      max-width: unset;
    }
    .search-btn{
      width: 277px;
      height: 32px;
      background: #5babfb;
      border: none;
      .van-icon{
        font-size: 16px;
      }
      .van-button__text{
        font-size: 14px;
      }
    }
    /deep/.van-tabs__wrap--scrollable{
      .van-tab{
        margin: 0 8px;
      }
      .van-tab__text{
        font-size: 15px;
      }
    }
    /deep/ .van-tabs__nav--complete{
      padding-left: 6px;
    }
  }
</style>
