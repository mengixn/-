<template>
  <div>
    <van-tabs v-model="active" @click="onClick(active)" :lazy-render="false" :animated="true">
      <template v-for="(item, index) in tab">
        <van-tab :key="index">
          <template #title v-if="nodeNums">
            {{ item.name }}
            <div class="red" v-if="index == 0 && nodeNums.db_num != 0">{{ nodeNums.db_num }}</div>
            <div class="red" v-if="index == 1 && nodeNums.dpj_num != 0">{{ nodeNums.dpj_num }}</div>
          </template>
          <Content @fromChild="getChild" :list="listInfo" :num="active"></Content>
        </van-tab>
      </template>
    </van-tabs>
    <div class="img-cover" v-show="imgShow">
      <div class="exit" @click="imgExit"></div>
      <img :src="imgCover" alt="" />
    </div>
  </div>
</template>

<script>
import Content from '../daiban/component/content'
import { daiban, checkNum } from '@/api/daiban'
export default {
  components: {
    Content
  },
  data() {
    return {
      sId: '',
      tab: [
        {
          name: '待确认'
        },
        {
          name: '待评价'
        },
        {
          name: '已评价'
        }
      ],
      active: 0,
      imgShow: false,
      imgCover: '',
      listInfo: null, // 总数据
      nodeNums: null // 待办节点数量
    }
  },
  methods: {
    getChild(data) {
      this.imgShow = data.imgShow
      this.imgCover = data.imgCover
    },
    imgExit() {
      this.imgShow = false
      this.imgCover = ''
    },
    onClick(act) {
      this.$router.replace({ query: { type: act }})
      this.pageInit(this.sId, act)
    },
    pageInit(id, type) {
      const that = this
      this.checkNodes(this.sId)
      daiban({ suserId: id, gj: '日本', type: type }).then(res => {
        console.log(res)
        that.listInfo = res.data
        that.listInfo.forEach((item, index) => {
          let openFile = false
          item.fj.forEach((item, index) => {
            if (item.wjlx === '') {
              openFile = true
            }
          })
          item.openFile = openFile
        })
      })
    },
    checkNodes(id) {
      const that = this
      checkNum({ suserId: id, gj: '日本' }).then(res => {
        that.nodeNums = res.data
      })
    }
  },
  mounted() {
    const sId = JSON.parse(localStorage.getItem('userInfo'))
    this.sId = sId.user.id
    if (this.$route.query.type) {
      this.active = parseInt(this.$route.query.type)
    }
    this.pageInit(this.sId, this.active)
  }
}
</script>

<style lang="scss" scoped>
.img-cover {
  width: 100vw;
  height: 100vh;
  position: fixed;
  padding-top: 30vw;
  padding-bottom: 20vw;
  box-sizing: border-box;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 9999;
  overflow-y: scroll;
  .exit {
    width: 0.5rem;
    height: 0.5rem;
    position: absolute;
    right: 0.5rem;
    top: 0.5rem;
    border-radius: 50%;
    overflow: hidden;
    border: 1px solid #fff;
    transform: rotateZ(45deg);
    z-index: 2;
    &::before {
      content: '';
      position: absolute;
      width: 100%;
      height: 2px;
      top: 50%;
      transform: translateY(-50%);
      left: 0;
      background-color: #fff;
    }
    &::after {
      content: '';
      position: absolute;
      height: 100%;
      width: 2px;
      left: 50%;
      transform: translateX(-50%);
      top: 0;
      background-color: #fff;
    }
  }
  img {
    width: 98%;
    display: block;
    margin: 0 auto;
    object-fit: contain;
    z-index: 1;
  }
}
.red {
  height: 0.4rem;
  background: #ff6300;
  border-radius: 7px;
  text-align: center;
  padding: 0 0.1rem;
  color: #fff;
  position: absolute;
  top: 0.2rem;
  left: 2.3rem;
  line-height: 0.4rem;
}
/deep/ .van-tabs__line {
  background-color: #fd9738 !important;
}

/deep/ .van-tab--active {
  color: #fd9738;
}
</style>
