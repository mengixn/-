<template>
  <div class="home wtg" v-if="infoList">
    <div class="module1 content">
      <img class="bg0" src="./image/index/head.png" alt="" />
      <img class="bg1" src="./image/index/xixi.gif" alt="" />
      <img class="bg2" src="./image/index/bg10.png" alt="" />
      <div class="box">
        <div class="head">
          <router-link to="/notice">
            <div class="news">
              <span class="news-span" v-show="infoList.pushMsg > 0">{{ infoList.pushMsg }}</span>
            </div>
          </router-link>
          <!-- <div class="country-picker" @click="showPopup()">{{ country }}</div> -->
          <div class="info clearfix">
            <!-- <img class="head-pic" :src="infoList.suser.tx" alt="" @click="toResume()" /> -->
            <p class="name" @click="toResume()">您好！{{ infoList.suser.name }}</p>
            <span class="fl">
              <img class="icon" src="./image/index/vip.png" alt="" />
              VIP
            </span>
            <!-- <span class="fl">
              <img class="icon" src="./image/index/medal.png" alt="" />
              2枚
            </span> -->
          </div>
          <div class="tip">
            <div class="fl">
              <router-link to="/daiban">
                <img class="icon" src="./image/index/icon1.png" alt="" />
                <span>
                  待办
                </span>
                <em class="news-span" v-show="infoList.waitAction > 0">{{ infoList.waitAction }}</em>
              </router-link>
            </div>
            <div class="fl">
              <router-link to="/contract">
                <img class="icon" src="./image/index/icon2.png" alt="" />
                <span>合同</span>
              </router-link>
            </div>
            <div class="fl">
              <router-link to="/myTutor">
                <img class="icon" src="./image/index/icon3.png" alt="" />
                <span>导师</span>
              </router-link>
            </div>
          </div>
        </div>
        <div class="banner">
          <swiper ref="swiper1" :options="options1" class="swiper1">
            <swiper-slide v-for="(item, index) in infoList.yshd" :key="index">
              <a @click="toJianjie(item.hdtzdz, item.hdjj)">
                <img :src="item.hdtpdz" alt="" class="banner-pic" />
              </a>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>
        </div>
        <div class="tips">
          <div class="fl">
            <router-link to="/applyForProgress">
              <div class="img">
                <img src="./image/index/i1.png" alt="" />
              </div>
              <p class="fl-p">申请进度</p>
              <span class="fl-span">实时查看 全程把控</span>
            </router-link>
          </div>
          <div class="fl">
            <router-link to="/serve">
              <div class="img">
                <img src="./image/index/i2.png" alt="" />
              </div>
              <p class="fl-p">服务流程</p>
              <span class="fl-span">清晰透明 服务无忧</span>
            </router-link>
          </div>
          <div class="fl" @click="phoneCall()">
            <div class="img">
              <img src="./image/index/i3.png" alt="" />
            </div>
            <p class="fl-p">在线反馈</p>
            <span class="fl-span">一键反馈 方便快捷</span>
          </div>
          <div class="fl">
            <router-link to="/grade">
              <div class="img">
                <img src="./image/index/i4.png" alt="" />
              </div>
              <p class="fl-p">我的成绩</p>
              <span class="fl-span">全面诊断 有效提升</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <div class="module2 content">
      <div class="title">特色活动</div>
      <div class="box">
        <a v-for="(item, index) in infoList.tshd" :key="index" @click="toJianjie(item.hdtzdz, item.hdjj)">
          <img :src="item.hdtpdz" alt="" class="fl" />
        </a>
      </div>
    </div>

    <div class="module3 content">
      <div class="title">贴心服务</div>
      <div class="box">
        <div @click="phoneCall()">
          <img src="./image/index/kefu.png" alt="" />
          我的客服
          <span>7*24小时 时刻守护</span>
        </div>
        <div>
          <router-link to="/advice">
            <img src="./image/index/yijian.png" alt="" />
            我的意见
            <span>你的声音 我们的动力</span>
          </router-link>
        </div>
      </div>
    </div>

    <!-- 国家选择弹出层 -->
    <van-popup v-model="show" position="bottom" get-container="body">
      <van-picker
        title=""
        show-toolbar
        :columns="data_choose"
        @confirm="onConfirm"
        @cancel="closePopup"
        @touchmove.stop.prevent="moveHandle"
      />
    </van-popup>

    <!-- 电话提示弹框 -->
    <phoneBack :show="phoneShow" @itemClick="cpnClick" />
  </div>
</template>
<script>
import phoneBack from '@/components/phoneBack'
// import axios from 'axios'
import { home } from '@/api/home'
export default {
  data() {
    return {
      sId: '', // 用户id
      options1: {
        // swiper 选项
        pagination: {
          el: '.banner .swiper-pagination'
        },
        spaceBetween: 20
      },
      data_choose: [
        // 国家选择框选项
        // '美国',
        // '英国',
        '日本'
      ],
      show: false, // 弹出框显隐控制
      phoneShow: false, // 控制电话回访弹框
      country: '日本', // 国家
      infoList: null // 请求的总数据
      // country: null
    }
  },
  components: {
    phoneBack
  },
  methods: {
    toJianjie(url, tit) {
      if (url) {
        // 文件路径
        var filePath = url
        // 获取最后一个.的位置
        var index = filePath.lastIndexOf('.')
        // 获取后缀
        var ext = filePath.substr(index + 1)
        console.log(ext)
        // 输出结果
        if (ext === 'png' || ext === 'jpg' || ext === 'jpeg') {
          localStorage.setItem('jianjie', url)
          this.$router.push('/jianjie?type=1')
        } else {
          window.open(url, '_self')
        }
      } else {
        localStorage.setItem('jianjie', tit)
        this.$router.push('/jianjie?type=0')
      }
    },
    showPopup() {
      // 控制选择国家弹出框显隐
      this.show = true
    },
    onConfirm(value, index) {
      // 弹出框选择事件
      this.show = false
      if (value !== this.country) {
        this.country = value
        this.pageInit({ suserId: this.sId, gj: value })
      }
    },
    closePopup() {
      // 弹出框取消按钮事件
      this.show = false
    },
    phoneCall() {
      // 电话回访
      this.phoneShow = true
    },
    cpnClick(value) {
      // 电话执行完返回数据（子传父）
      this.phoneShow = value
    },
    toResume: function() {
      this.$router.push('/resume')
    },
    pageInit(id, gj) {
      const that = this
      home({ suserId: id, gj: gj }).then(res => {
        console.log(res)
        that.infoList = res.data
      })
    }
  },
  computed: {},
  mounted() {
    // const that = this
    const sId = JSON.parse(localStorage.getItem('userInfo'))
    this.sId = sId.user.id
    this.pageInit({ suserId: this.sId, gj: '日本' })

    // home({ suserId: 'a262021061341DDAn4Zo', gj: '日本' }).then(res => {
    //   console.log(res)
    // })
  },
  destroyed() {}
}
</script>
<style lang="scss" scoped>
@import './css/index.scss';
</style>
