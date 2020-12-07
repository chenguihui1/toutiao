<template>
  <div class="search-container">
    <van-cell
      icon="search"
      v-for="(str, index) in suggestions"
      :key="index"
      :title="str"
    >
    </van-cell>
  </div>
</template>
<script>
import { getSearchSuggestions } from '@/assets/api/search'
import { debounce } from 'loadsh'
export default {
  name: 'Suggestion',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      suggestions: [] // 联想建议数据
    }
  },
  watch: {
    searchText: {
      handler: debounce(async function () {
        const { data } = await getSearchSuggestions(this.searchText)
        this.suggestions = data.data.options
      }, 500),
      immediate: true
    }
  },
  methods: {
  }
}
</script>
<style lang="less">
</style>
