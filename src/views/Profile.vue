<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar
      class="app-nav-bar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    >
    </van-nav-bar>
    <!-- 导航栏 -->
    <input
      type="file"
      hidden
      ref="file"
      accept="image/*"
      @change="onFileChange"
    >
    <van-cell
      title="头像"
      is-link
      center
      @click="$refs.file.click()"
    >
      <van-image
        width="35"
        height="35"
        round
        fit="cover"
        :src="user.photo"
      />
    </van-cell>
    <van-cell
      title="昵称"
      is-link
      :value="user.name"
      @click="isEditNameShow = true"
    />
    <van-cell
      title="性别"
      is-link
      :value="user.gender === 0 ? '男' : '女'"
      @click="isEditGenderShow = true"
    />
    <van-cell
      title="生日"
      is-link
      :value="user.birthday"
      @click="isEditBirthdayShow = true"
    />
    <!-- 修改昵称 :style="{ height: '100%'}" -->
    <van-popup
      v-model="isEditNameShow"
      position="bottom"
      :style="{ height: '30%'}"
    >
    <!-- @update-name="user.name=$event" -->
      <update-name
        v-if="isEditNameShow"
        v-model="user.name"
        @close="isEditNameShow = false"
      />
    </van-popup>
    <!-- 修改性别 -->
    <van-popup
      v-model="isEditGenderShow"
      position="bottom"
    >
      <update-gender
        v-model="user.gender"
        @close="isEditGenderShow=false"
      />
    </van-popup>
    <!-- 修改生日 -->
    <van-popup
      v-model="isEditBirthdayShow"
      position="bottom"
    >
      <update-birthdat
        v-if="isEditBirthdayShow"
        v-model="user.birthday"
        @close="isEditBirthdayShow=false"
      />
    </van-popup>
    <!-- 修改头像-->
    <van-popup
      v-model="isEditPhotoShow"
      position="bottom"
    >
      修改用户头像
    </van-popup>
  </div>
</template>
<script>
import { getUserProfile } from '@/assets/api/user'
import UpdateName from '@/components/update-name'
import UpdateGender from '@/components/update-gender'
import UpdateBirthdat from '@/components/update-birthdat'

export default {
  name: 'UserProfile',
  components: {
    UpdateName,
    UpdateGender,
    UpdateBirthdat
  },
  data () {
    return {
      user: {}, // 用户数据
      isEditNameShow: false, // 编辑昵称显示状态
      isEditGenderShow: false, // 编辑性别显示状态
      isEditBirthdayShow: false, // 编辑生日显示状态
      isEditPhotoShow: false // 编辑头像显示状态
    }
  },
  created () {
    this.loadUserProfile()
  },
  methods: {
    async loadUserProfile () {
      const { data } = await getUserProfile()
      // console.log(data)
      this.user = data.data
    },
    onFileChange () {
      this.isEditPhotoShow = true
      // 情况file的value
      this.$refs.file.value = ''
    }
  }
}
</script>
<style lang="less">
.van-popup{
  background-color: #f5f7f9;
}
</style>
