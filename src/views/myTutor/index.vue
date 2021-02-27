<template>
  <div>
    <div class="tutor mx-content">
      <div class="mx-box">
        <ul class="tutorList">
          <li v-for="(item, index) in infoList" :key="index" class="tutorItem clearfix" @click="toDetails(item.tutorId, item.tutorType)">
            <div class="fl">
              <img :src="item.tutorAvatar" alt="" />
            </div>
            <div class="fr">
              <h2>{{item.tutorName}}</h2>
              <h3>{{item.dslx}}</h3>
              <p>
                {{item.tutorBackground}}
              </p>
              <span v-if="!item.tutorFwcs" @click.stop="concat(item.tutorMobile)">联系TA</span>
              <em v-else>- 服务<b>{{item.tutorFwcs}}</b>次 -</em>
            </div>
          </li>
        </ul>
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
    return {
    }
  }
}
</script>
<style lang="scss" scoped>
@import './mixin.scss';
</style>
