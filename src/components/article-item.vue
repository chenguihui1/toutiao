<template>
  <van-cell class="article-item">
    <div slot="title" class="title">{{articles.title}}</div>
    <div slot="label">
      <div
        v-if="articles.cover.type === 3"
        class="cover-wrap"
      >
        <div class="cover-wrap-item">
          <van-image
            width="116"
            height="73"
            fit="cover"
            v-for="(img, index) in articles.cover.images"
            :key="index"
            :src="img"
          />
        </div>
      </div>
      <div class="label-wrap">
        <span>{{articles.aut_name}}</span>
        <span>{{articles.comm_count}}评论</span>
        <span>{{articles.pubdate}}</span>
        <span>{{articles.collect_count}}</span>
      </div>
    </div>
    <van-image
      v-if="articles.cover.type === 1"
      width="100"
      height="74"
      fit="cover"
      :src="articles.cover.images[0]"
    />
  </van-cell>
</template>
<script>
export default {
  name: 'ArticleItem',
  props: {
    articles: {
      type: Object,
      required: true
    }
  }
}
</script>
<style lang="less">
  .article-item{
    .title{
      // width: 100px;
      font-size: 17px;
      color: #3a3a3a;
    }
    /deep/ .van-cell__value{
      flex: unset;
      width: 116px;
      height: 73px;
    }
  }
</style>
