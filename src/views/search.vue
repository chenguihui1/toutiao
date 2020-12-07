<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <!-- Tips: 在 van-search 外层增加 form 标签，且 action 不为空，即可在 iOS 输入法中显示搜索按钮。 -->
    <form action="/">
      <van-search
        v-model="searchText"
        placeholder="请输入搜索关键字"
        show-action
        @search="onSearch"
        @cancel="onCancel"
      />
    </form>
    <!-- 搜索栏 -->
    <!-- 联想建议 -->
    <Suggestion />
    <!-- 联想建议 -->
    <!-- 搜索历史 -->
    <history />
    <!-- 搜索历史 -->
    <!-- 搜索结果 -->
    <SearchResult />
    <!-- 搜索结果 -->
  </div>
</template>
<script>
import Suggestion from '@/components/suggestion'
import History from '@/components/history'
import SearchResult from '@/components/search-result'
export default {
  name: 'Search',
  components: {
    Suggestion,
    History,
    SearchResult
  },
  data () {
    return {
      searchText: ''
    }
  },
  methods: {
    onSearch () {
      console.log('onSearch')
    },
    onCancel () {
      // console.log('onCancel')
      // 返回上一级目录
      this.$router.back()
    }
  }
}
</script>
<style lang="less">
</style>
