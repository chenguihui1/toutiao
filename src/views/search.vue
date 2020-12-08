<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <!-- Tips: 在 van-search 外层增加 form 标签，且 action 不为空，即可在 iOS 输入法中显示搜索按钮。 -->
    <form action="/">
      <van-search
        v-model="searchText"
        placeholder="请输入搜索关键字"
        show-action
        @search="onSearch(searchText)"
        @cancel="onCancel"
        @focus="isResultShow = false"
      />
    </form>
    <!-- 搜索栏 -->

    <!-- 搜索结果 -->
    <Search-Result
      v-if="isResultShow"
      :search-text="searchText"
    />
    <!-- 搜索结果 -->

    <!-- 联想建议 -->
    <Suggestion
      v-else-if="searchText"
      :search-text="searchText"
      @search="onSearch"
    />
    <!-- 联想建议 -->

    <!-- 搜索历史 -->
    <history
      v-else
      :search-histories="searchHistories"
    />
    <!-- 搜索历史 -->
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
      searchText: '', // 搜索输入的内容
      isResultShow: false, // 控制搜索结果显示状态
      searchHistories: [] // 搜索历史数据
    }
  },
  methods: {
    onSearch (searchText) {
      // console.log('onSearch')
      // 把输入框设置为要搜索的文本
      this.searchText = searchText

      const index = this.searchHistories.indexOf(searchText)
      if (index !== -1) {
        // 把重复项删除
        this.searchHistories.splice(index, 1)
      }
      // 最新的搜索历史记录放到顶部
      this.searchHistories.unshift(searchText)
      // 显示搜索结果
      this.isResultShow = true
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
  .search-result{
    position: fixed;
    left: 0;
    right: 0;
    top: 54px;
    bottom: 0;
    overflow-y: auto;
  }
</style>
