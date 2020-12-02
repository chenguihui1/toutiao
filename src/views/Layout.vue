<template>
  <div id="Layout">
    <!-- 子路由出口 -->
    <router-view />
    <!-- <van-button icon-prefix=""></van-button> -->
      <van-tabbar v-model="active" route>
        <van-tabbar-item icon-prefix="iconfont" icon="iconfont iconfont icon-shouye" to='/'>首页</van-tabbar-item>
        <van-tabbar-item icon-prefix="iconfont" icon="iconfont icon-wenda" to='/qa'>问答</van-tabbar-item>
        <van-tabbar-item icon-prefix="iconfont" icon="iconfont icon-shipin" to='/video'>视频</van-tabbar-item>
        <van-tabbar-item icon-prefix="iconfont" icon="iconfont icon-wode" to='/my'>我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  name: 'Layout',
  data () {
    return {
      active: 0
    }
  }
}
</script>
<style lang="less">
  .iconfont{
    font-size: 23px;
  }
</style>
