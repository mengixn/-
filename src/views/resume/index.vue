<template>
  <div>
    <div class="resume">
      <div class="resumeBox">
        <div class="users">
          <p>头像</p>
          <p><img :src="list.tx" alt="" /></p>
        </div>
        <div class="infor noIcon">
          <p>姓名</p>
          <p><input type="text" v-model="list.name" readonly /></p>
        </div>
        <router-link to="/gender">
          <div class="infor underlines">
            <p>性别</p>
            <p><input type="text" placeholder="请选择您的性别" v-model="list.xb" /></p>
          </div>
        </router-link>
        <div class="infor gaps" @click="show = true">
          <p>生日</p>
          <p><input placeholder="请选择您的生日" v-model="list.csrq" readonly /></p>
        </div>
        <div class="regisOut" @click="logOut"><p>退出登录</p></div>
      </div>
      <!-- 调取日历 -->
      <van-popup v-model="show" position="bottom" :style="{ height: '40%' }">
        <van-datetime-picker
          v-model="currentDate"
          v-show="show"
          type="date"
          title="选择年月日"
          :min-date="minDate"
          :max-date="maxDate"
          @confirm="onConfirm"
          @cancel="onCancel"
          :timeFormat="timeFormat"
        />
      </van-popup>
    </div>
  </div>
</template>
<script>
import mixin from './mixin.js'
export default {
  mixins: [mixin],
  data() {
    return {
    }
  }
}
</script>
<style lang="scss" scoped>
@import './mixin.scss';
</style>
