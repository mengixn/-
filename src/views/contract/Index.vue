<template>
  <div class="wtg contract" v-if="infoList">
    <template v-if="infoList.length > 0">
      <div class="content module" v-for="(item, index) in infoList" :key="index">
        <div class="box">
          <div class="con">
            <p class="module-p">
              全程咨询导师
              <span class="module-span">{{ item.owner.name }}</span>
            </p>
            <p class="module-p">
              签约手机
              <span class="module-span">{{ item.zsdh }}</span>
            </p>
            <p class="module-p">
              购买产品
              <a :href="item.sqcp.h5url">
                <span class="module-span main">{{ item.sqcp.name }}</span>
              </a>
            </p>
            <p class="module-p">
              服务开始时间
              <span class="module-span">{{ item.qyrq }}</span>
            </p>
            <p class="module-p">
              合同金额
              <span class="module-span">{{ item.cpje }}</span>
            </p>
            <p class="module-p">
              实付金额
              <span class="module-span">{{ item.yfkje }}</span>
            </p>
            <!-- <p class="module-p">
            签约地点
            <span class="module-span"></span>
          </p> -->
          </div>
          <p class="detail-p">合同详情</p>
          <div class="detail">
            <div class="item" v-for="(item1, index1) in item.attachement" :key="index1" @click="toFile(item1.attId)">
              <img class="pic" :src="fileCheck(item1.type)" alt="" />
              {{ item1.name }}
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <van-empty
        class="custom-image"
        :image="require('./image/error.png')"
        description="暂无内容"
      />
    </template>
    <div class="img-cover" v-show="imgShow">
      <div class="exit" @click="imgExit"></div>
      <img :src="imgCover" alt="" />
    </div>
  </div>
</template>
<script>
import { contract, toFile } from '@/api/contract'
export default {
  data() {
    return {
      sId: '', // 用户id
      infoList: null, // 接口返回数据
      filePic: {
        pdf: require('./image/pdf.png'),
        xlsx: require('./image/xlsx.png'),
        word: require('./image/word.png'),
        ppt: require('./image/ppt.png'),
        png: require('./image/png.png'),
        video: require('./image/video.png')
      },
      imgShow: false,
      imgCover: ''
    }
  },
  methods: {
    pageInit(id) {
      const that = this
      contract({ sshqkh: id }).then(res => {
        console.log(res)
        that.infoList = res.data
        // 截取文件后缀名
        that.infoList.forEach((item, index) => {
          item.attachement.forEach((item, index) => {
            const fileName = item.name.lastIndexOf('.') // 取到文件名开始到最后一个点的长度
            const fileNameLength = item.name.length // 取到文件名长度
            const fileFormat = item.name.substring(fileName + 1, fileNameLength) // 截
            item.type = fileFormat
          })
        })
      })
    },
    toFile(id) {
      toFile({ id: id })
        .then(res => {
          console.log(res)
          if (
            res.data.suffix === '.docx' ||
            res.data.suffix === '.doc' ||
            res.data.suffix === '.xls' ||
            res.data.suffix === '.xlsx' ||
            res.data.suffix === '.ppt' ||
            res.data.suffix === '.pptx'
          ) {
            window.location.href = `https://view.officeapps.live.com/op/view.aspx?src=${res.data.file_url}`
          } else if (res.data.suffix === '.png' || res.data.suffix === '.jpg' || res.data.suffix === '.jpeg') {
            this.imgCover = res.data.file_url
            this.imgShow = true
          } else {
            window.location.href = res.data.file_url
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    imgExit() {
      this.imgShow = false
      this.imgCover = ''
    }
  },
  computed: {
    fileCheck: function() {
      const that = this
      return function(file) {
        switch (file) {
          case 'pdf':
            return that.filePic.pdf
          case 'doc':
          case 'docx':
            return that.filePic.word
          case 'ppt':
          case 'pptx':
            return that.filePic.ppt
          case 'xlsx':
          case 'xls':
            return that.filePic.xlsx
          case 'png':
          case 'jpg':
          case 'jpeg':
            return that.filePic.png
          default:
            return that.filePic.video
        }
      }
    }
  },
  mounted() {
    const sId = JSON.parse(localStorage.getItem('userInfo'))
    this.sId = sId.user.sshqkh
    this.pageInit(this.sId)
  }
}
</script>
<style lang="scss" scoped>
@import './Index';
/deep/ .van-empty__image {
  height: auto;
  margin-top: 2.6rem;
  position: relative;
}
</style>
