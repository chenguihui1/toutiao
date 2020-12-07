<template>
  <div class="article-list">
    <van-pull-refresh
      v-model="isLoading"
      :success-text="refreshSuccessText"
      :success-duration="1200"
      @refresh="onRefresh"
    >
      <!-- <p>刷新次数: {{ count }}</p> -->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <article-item
          v-for="(articles, index) in articles"
          :key="index"
          :articles="articles"
        />
        <!-- <van-cell
          v-for="(articles, index) in articles"
          :key="index"
          :title="articles.title"
        /> -->
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArtivles } from '@/assets/api/article'
import ArticleItem from '@/components/article-item'
export default {
  name: 'ArticleList',
  components: {
    ArticleItem
  },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      articles: [], // 数据列表
      loading: false, // 控制加载中的 loading 状态
      finished: false, // 控制加载结束，加载完成不在触发
      timestamp: null, // 获取下一页数据的时间戳
      isLoading: false, // 下拉刷新的状态
      refreshSuccessText: '' // 下拉刷新成功的提示
    }
  },
  methods: {
    async onLoad () {
      // console.log('onload')
      // 请求获取数据
      const { data } = await getArtivles({
        // 频道id
        channel_id: this.channel.id,
        // 时间戳请求新数据传当前时间戳
        timestamp: this.timestamp || Date.now(),
        // 是否含置顶
        with_top: 1
      })
      // console.log(data)
      // 把数据放到articles数组中
      const { results } = data.data
      this.articles.push(...results)
      // 设置加载状态
      this.loading = false
      // 数据全部加载完成
      if (results.length) {
        // 更新数据下一页数据
        this.timestamp = data.data.pre_timestamp
      } else {
        // 没有数据
        this.finished = true
      }
    },
    async onRefresh () {
      // 下拉刷新
      const { data } = await getArtivles({
        // 频道id
        channel_id: this.channel.id,
        // 时间戳请求新数据传当前时间戳
        timestamp: Date.now(),
        // 是否含置顶
        with_top: 1
      })
      // 把数据放到数据列表中
      const { results } = data.data
      this.articles.unshift(...results)
      // 关闭刷新的状态
      this.isLoading = false

      this.refreshSuccessText = `更新了${results.length}条数据`
    }
  }
}
</script>
<style lang="less">
  .article-list{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 50px;
    top: 90px;
    overflow-y: auto;
  }
</style>
