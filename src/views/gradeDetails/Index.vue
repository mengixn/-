<template>
  <div class="wtg gradeDetails" v-if="infoList">
    <template v-if="infoList.backgroups || infoList.undergos || infoList.score">
      <template v-if="!photoShow">
        <div class="content module1">
          <!-- 语言成绩及标化成绩 -->
          <template v-if="url == 'yingyu' || url == 'biaohua'">
            <p class="grade">{{ infoList.title.value }}<span>分</span></p>
          </template>
          <!-- 学术背景 -->
          <template v-if="url == 'xueshu'">
            <p class="grade">{{ infoList.backgroups_count }}<span>篇</span></p>
          </template>
          <!-- 实习经历 -->
          <template v-if="url == 'shixi'">
            <p class="grade">{{ infoList.undergos_count }}<span>次</span></p>
          </template>
          <p class="descri">我的{{ checkTit(url) }}</p>
          <div class="progress-con">
            <div class="progress">
              <div class="on-pro" :style="'width:' + infoList.weight + '%;'"></div>
            </div>
            <div class="tip" :style="'left:calc( ' + infoList.weight + '% ' + '- .4rem'"></div>
          </div>
          <p class="pass">
            已超越 <b>{{ infoList.weight }}%</b> 的同期申请者，加油！
          </p>
        </div>
        <div class="content module2">
          <div class="title">
            {{ checkTit(url) }}
          </div>
          <div class="box">
            <!-- 语言成绩及标化成绩 -->
            <template v-if="url == 'yingyu' || url == 'biaohua'">
              <template v-for="(item, index) in infoList.score">
                <p class="module2-p" :key="index" v-if="item.value">
                  {{ item.name }}
                  <span class="module2-span">{{ item.value }}</span>
                </p>
              </template>
            </template>
            <!-- 学术背景 -->
            <template v-if="url == 'xueshu'">
              <template v-for="(item, index) in infoList.backgroups">
                <p class="module2-p" :key="index" v-if="item.num">
                  {{ item.xslx }}
                  <span class="module2-span">{{ item.num }}</span>
                </p>
              </template>
            </template>
            <!-- 实习经历 -->
            <template v-if="url == 'shixi'">
              <template v-for="(item, index) in infoList.undergos">
                <p class="module2-p" :key="index" v-if="item.xmlx">{{ item.lxxf }}{{ item.xmlx }}</p>
              </template>
            </template>
          </div>
        </div>
        <div class="content module3">
          <div class="title">
            导师评语
          </div>
          <div class="box">
            <span class="tip">
              {{ infoList.dspy }}
            </span>
            <div class="info">
              <img :src="infoList.tutorInfo.tx" alt="" class="head-pic" />
              <p class="name">{{ infoList.tutorInfo.name }}</p>
            </div>
          </div>
        </div>
        <div class="content module4">
          <div class="title">
            推荐课程
          </div>
          <div class="box clearfix">
            <swiper :options="option1">
              <swiper-slide
                v-for="(item, index) in infoList.tjcp"
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
          </div>
        </div>
        <div class="content">
          <div class="btn" @click="showPhoto">
            <span class="btn-span">晒一晒</span>
          </div>
        </div>
      </template>
      <share-photo v-else :infoList="infoList" :url="url" :tit="checkTit(url)"></share-photo>
    </template>
    <template v-else>
      <van-empty
        class="custom-image"
        image="https://benkexx.oss-cn-beijing.aliyuncs.com/error.png"
        description="暂无数据"
      />
    </template>
  </div>
</template>
<script>
import sharePhoto from '@/components/sharePhoto/index'
import { getGrade, getXueshu, getShixi } from '@/api/grade'
export default {
  components: {
    sharePhoto
  },
  data() {
    return {
      photoShow: false,
      url: this.$route.query.url, // 识别成绩类型
      sId: '',
      option1: {
        slidesPerView: 'auto'
      },
      infoList: null // 总数据
    }
  },
  methods: {
    toJianjie(url, tit) {
      if (url) {
        window.open(url, '_self')
      } else {
        localStorage.setItem('jianjie', tit)
        this.$router.push('/jianjie')
      }
    },
    showPhoto: function() {
      window.scrollTo(0, 0)
      this.photoShow = true
    },
    getGradeE: function(id) {
      // 获取语言成绩
      const that = this
      getGrade({ sshqkh: id, type: 1 }).then(res => {
        console.log(res)
        that.infoList = res.data
      })
    },
    getGradeB: function(id) {
      // 获取标化成绩
      const that = this
      getGrade({ sshqkh: id, type: 2 }).then(res => {
        console.log(res)
        that.infoList = res.data
      })
    },
    getXueshu: function(id) {
      // 获取学术背景
      const that = this
      getXueshu({ sshqkh: id }).then(res => {
        console.log(res)
        that.infoList = res.data
      })
    },
    getShixi: function(id) {
      // 获取实习经历
      const that = this
      getShixi({ sshqkh: id }).then(res => {
        console.log(res)
        that.infoList = res.data
      })
    }
  },
  mounted() {
    const sId = JSON.parse(localStorage.getItem('userInfo'))
    this.sId = sId.user.sshqkh
    if (this.url === 'yingyu') {
      this.getGradeE(this.sId)
    } else if (this.url === 'biaohua') {
      this.getGradeB(this.sId)
    } else if (this.url === 'xueshu') {
      this.getXueshu(this.sId)
    } else if (this.url === 'shixi') {
      this.getShixi(this.sId)
    }
  },
  computed: {
    checkTit() {
      return function(url) {
        if (url === 'yingyu') {
          return '语言成绩'
        } else if (url === 'biaohua') {
          return '标化成绩'
        } else if (url === 'xueshu') {
          return '学术背景'
        } else if (url === 'shixi') {
          return '实习经历'
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import './Index';
</style>
