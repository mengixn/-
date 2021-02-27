<template>
  <div class="wtg tutorComment" v-if="list">
    <div class="content module1">
      <div class="box">
        <p class="module1-p">
          服务节点
          <span class="module1-span">{{ list.info.name }}</span>
        </p>
        <!-- <p class="module1-p">
          课程时间
          <span class="module1-span">{{list.info.sjwcsj}}</span>
        </p> -->
        <!-- <p class="module1-p">
          主讲老师
          <span class="module1-span">A老师</span>
        </p> -->
      </div>
    </div>
    <div class="content module2">
      <div class="title">
        评语
      </div>
      <div class="box">
        <span>{{ list.info.dspy }}</span>
      </div>
    </div>
    <div class="content module3" v-if="(list.info.tsyj && list.info.tsyj !== '') || list.tjcp.length">
      <div class="title">
        提升建议
      </div>
      <div class="box">
        <p class="tip" v-if="list.info.tsyj && list.info.tsyj !== ''">{{ list.info.tsyj }}</p>
        <div class="productList">
          <template v-if="list.tjcp.length">
            <swiper :options="option1">
              <swiper-slide
                v-for="(item, index) in list.tjcp"
                :key="index"
                class="productItem"
                @click="toJianjie(item.tzdzlj, item.cpjj)"
              >
                <a :href="item.tzdzlj">
                  <img class="pic" :src="item.cptpdz" alt="" />
                  <p class="course-name">{{ item.name }}</p>
                </a>
              </swiper-slide>
            </swiper>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { tutorComment } from '@/api/tutor'
export default {
  data() {
    return {
      list: null,
      option1: {
        slidesPerView: 'auto'
      }
    }
  },
  mounted() {
    const that = this
    tutorComment({ jdid: that.$route.query.jdid })
      .then(res => {
        console.log(res)
        that.list = res.data
      })
      .catch(err => {
        console.log(err)
      })
  },
  methods: {
    toJianjie(url, tit) {
      if (url) {
        window.open(url, '_self')
      } else {
        localStorage.setItem('jianjie', tit)
        this.$router.push('/jianjie')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import './Index';
</style>
