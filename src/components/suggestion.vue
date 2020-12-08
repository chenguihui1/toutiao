<template>
  <div class="search-container">
    <van-cell
      icon="search"
      v-for="(str, index) in suggestions"
      :key="index"
      :title="str"
      @click="$emit('search', str)"
    >
      <div slot="title" v-html="highlight(str)"></div>
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
      suggestions: [], // 联想建议数据
      htmlStr: 'Hello <span style="color:red">world</span>'
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
    highlight (str) {
      const hien = `<span style="color: red">${this.searchText}</span>`
      return str.replace(
        new RegExp(this.searchText, 'gi'),
        hien
      )
    }
  }
}
</script>
<style lang="less">
</style>
