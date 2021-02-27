<template>
  <div class="evaluation" v-if="list">
    <div class="evaluate mx-content">
      <div class="mx-box">
        <div class="think">
          <p>{{list.name}}</p>
          <p><span>{{list.haoping}}</span>分好评</p>
        </div>
        <div class="rates">
          <ul class="rateList">
            <li class="rateItem">
              服务态度
              <p class="rateP">
                <van-rate v-model="list.fwtd" :size="24" color="#FD9738" readonly />
              </p>
            </li>
            <li class="rateItem">
              课程质量
              <p class="rateP">
                <van-rate v-model="list.kczl" :size="24" color="#FD9738" readonly />
              </p>
            </li>
            <li class="rateItem">
              课程收获
              <p class="rateP">
                <van-rate v-model="list.kcsh" :size="24" color="#FD9738" readonly />
              </p>
            </li>
          </ul>
          <p class="userIn"><img :src="list.tx" alt="" /><span>{{list.stuname}}</span></p>
          <em>{{list.pjnr}}</em>
          <b>评价时间：{{list.lastmodifydate}} </b>
        </div>
        <div class="modifyBtn" v-if="!(list.fwtd == 5 && list.kczl == 5 && list.kcsh == 5) && (list.xgcs < 1 || isNaN(list.xgcs))"><p @click="toPublish()">修改评价</p></div>
      </div>
    </div>
  </div>
</template>
<script>
import mixin from './mixin.js'
export default {
  mixins: [mixin],
  data() {
    return {}
  }
}
</script>
<style lang="scss" scoped>
@import './mixin.scss';
</style>
