<template>
  <div class="channel-edit">
    <van-cell
      center
      :border="false"
    >
      <div
        slot="title"
        class="channel-title"
      >
        我的频道
      </div>
      <van-button
        type="danger"
        round
        plain
        size="mini"
        @click="isEdit = !isEdit"
      >
        {{ isEdit ? '完成' : '编辑'}}
      </van-button>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        class="grid-item"
        :class="{ active: index === active }"
        :icon="(isEdit && index !== 0) ? 'clear' : ''"
        v-for="(channel, index) in userChannels"
        :key="index"
        :text="channel.name"
        @click="onUserChannelClick(index)"
      />
    </van-grid>
    <van-cell
      center
      :border="false"
    >
      <div
        slot="title"
        class="channel-title"
      >
        频道推荐
      </div>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(channel, index) in recommendChannels"
        :key="index"
        :text="channel.name"
        @click="onAdd(channel)"
      />
    </van-grid>
  </div>
</template>
<script>
import { getAllChannels } from '@/assets/api/channel'
export default {
  name: 'ChannelEdit',
  props: {
    userChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      allChannels: [], // 所以频道数据列表
      isEdit: false
    }
  },
  computed: {
    // 推荐频道
    recommendChannels () {
      // 所以频道 减去我的频道 等于剩下的频道
      // true 来收集数据
      return this.allChannels.filter(channels => {
        // 判断 channels 是否属于用户判断
        return !this.userChannels.find(userChannels => {
          // 满足条件的元素
          return userChannels.id === channels.id
        })
      })
    }
  },
  created () {
    this.loadAllChannels()
  },
  methods: {
    async loadAllChannels () {
      const { data } = await getAllChannels()
      this.allChannels = data.data.channels
    },
    onAdd (channels) {
      // console.log(channels)
      this.userChannels.push(channels)
    },
    onUserChannelClick (index) {
      if (this.isEdit && index !== 0) {
        // 编辑状态
        this.deleteChannel(index)
      } else {
        // 非编辑状态
        this.switchChannel(index)
      }
    },
    deleteChannel (index) {
      // 如果删除的是当前激活频道
      if (index <= this.active) {
        // 更新激活频道的索引
        this.$emit('update-active', this.active - 1)
      }
      this.userChannels.splice(index, 1)
    },
    switchChannel (index) {
      // console.log('切换')
      // 切换判断
      this.$emit('update-active', index)
      // 关闭弹出层
      this.$emit('close')
    }
  }
}
</script>
<style lang="less">
  .channel-edit {
    padding-top: 54px;
    .channel-title {
      font-size: 16px;
      color: black;
    }
    .grid-item {
      width: 80px;
      height: 43px;
      .van-grid-item__content{
        background-color: #f4f5f6;
        .van-grid-item__text{
          font-size: 14px;
          color: #222;
          margin-top: 0;
        }
      }
      .van-grid-item__icon{
        position: absolute;
        right: -5px;
        top: -5px;
        font-size: 20px;
        color: #ccc;
      }
    }
    .active {
      /deep/.van-grid-item__text{
        color: red !important;
      }
    }
    /deep/ .van-button--danger{
      width: 50px;
    }
  }
</style>
