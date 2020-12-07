<template>
  <van-cell class="article-item">
    <div slot="title" class="title">{{articles.title}}</div>
    <div slot="label">
      <div
        v-if="articles.cover.type === 3"
        class="cover-wrap"
      >
        <div
          class="cover-wrap-item"
          v-for="(img, index) in articles.cover.images"
          :key="index"
        >
          <van-image
            class="cover-image"
            fit="cover"
            :src="img"
          />
        </div>
      </div>
      <div class="label-wrap">
        <span>{{articles.aut_name}}</span>
        <span>{{articles.comm_count}}评论</span>
        <span>{{articles.pubdate | relativeTime}}</span>
        <span>{{articles.collect_count}}</span>
      </div>
    </div>
    <van-image
      v-if="articles.cover.type === 1"
      class="right-cover"
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
      font-size: 17px;
      color: #3a3a3a;
    }
    /deep/ .van-cell__value{
      flex: unset;
      width: 116px;
      height: 73px;
      margin-left: 12px;
    }
    .right-cover{
      width: 116px;
      height: 73px;
    }
    .cover-wrap{
      padding: 15px 0;
      display: flex;
      .cover-wrap-item{
        flex: 1;
        height: 73px;
        &:not(:last-child){
          padding-right: 4px;
        }
        .cover-image{
          width: 100%;
          height: 73px;
        }
      }
    }
    .label-wrap{
      font-size: 11px;
      color: #b4b4b4;
    }
    .label-wrap span{
      margin-right: 12px;
    }
  }
</style>
