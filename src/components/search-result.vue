<template>
    <div class="search-result">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell
          v-for="(article, index) in list"
          :key="index"
          :title="article.title"
        />
      </van-list>
    </div>
</template>
<script>
import { getSearchResult } from '../assets/api/search'
export default {
  name: 'SearchResult',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      perPage: 10
    }
  },
  methods: {
    async onLoad () {
      // 请求获取数据
      const { data } = await getSearchResult({
        page: this.page, // 页吗
        per_page: this.perPage, // 每页大小
        q: this.searchText // 搜索的字符串
      })
      // 将数据放到数据列表
      // console.log(data)
      const { results } = data.data
      this.list.push(...results)
      // 关闭本次loading
      this.loading = false
      // 频道是否还有数据
      if (results.length) {
        // 如果有，就更新获取下一页数据
        this.page++
      } else {
        // 如果没有就关闭finished为true
        this.finished = true
      }
    }
  }
}
</script>
<style lang="less">
</style>
