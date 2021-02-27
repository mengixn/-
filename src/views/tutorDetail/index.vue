<template>
  <div v-if="infoList">
    <div class="details mx-content">
      <div class="mx-box">
        <div class="tutorBox">
          <div class="tutorTop clearfix">
            <div class="fl">
              <img :src="infoList.tutorAvatar" alt="" />
            </div>
            <div class="fr">
              <h1>{{infoList.tutorName}}</h1>
              <h2>{{infoList.tutorDslx}}</h2>
            </div>
          </div>
          <p class="titles" v-if="infoList.tutorBackground">教育背景</p>
          <ul class="tutorAdvance" v-if="infoList.tutorBackground">
            <li class="advaceItem">{{infoList.tutorBackground}}</li>
          </ul>
          <p class="titles" v-if="infoList.tutorYsld">名师亮点</p>
          <span v-if="infoList.tutorYsld">
            {{infoList.tutorYsld}}
          </span>
        </div>
        <div class="concatBtn" v-if="infoList.tutorMobile" @click.stop="concat(infoList.tutorMobile)"><p>联系导师</p></div>
      </div>
    </div>
    <phoneBack :show="phoneShow" :phone="phone" @itemClick="cpnClick" />
  </div>
</template>
<script>
import mixin from './mixin.js'
import phoneBack from '@/components/phoneBack'
export default {
  mixins: [mixin],
  components: {
    phoneBack
  },
  data() {
    return {}
  }
}
</script>
<style lang="scss" scoped>
@import './mixin.scss';
</style>
