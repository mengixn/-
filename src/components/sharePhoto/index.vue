<template>
  <div class="share" ref="share" @touchmove.prevent>
    <img class="photo" :src="imgUrl" v-if="imgUrl" alt="" />
    <div class="canvas" ref="canvas" v-else>
      <div class="banner-con">
        <img src="./images/banner.png" alt="" class="banner" />
        <h3 v-if="url == 'yingyu' || url == 'biaohua'">
          我的{{infoList.title.name}}成绩
          <b>{{ infoList.title.value }}</b>
          <i>分</i>
        </h3>
        <template v-if="url == 'xueshu'" data-html2canvas-ignore>
          <h3>
            学术科研背景
            <b>{{ infoList.backgroups_count }}</b>
            <i>篇</i>
          </h3>
        </template>
        <template v-if="url == 'shixi'" data-html2canvas-ignore>
          <h3>
            实习实践背景
            <b>{{ infoList.undergos_count }}</b>
            <i>次</i>
          </h3>
        </template>
        <p>
          已超越
          <span>{{ infoList.weight }}%</span>
          的同期申请者，加油！
        </p>
      </div>
      <div class="con clearfix" style="padding-bottom: 0;">
        <p>{{ tit }}</p>
        <div class="tip">
          <template v-if="url == 'yingyu' || url == 'biaohua'" data-html2canvas-ignore>
            <div class="fl" v-for="(item, index) in infoList.score" :key="index">{{ item.name }}：{{ item.value }}</div>
          </template>
          <template v-if="url == 'xueshu'" data-html2canvas-ignore>
            <div class="fl" v-for="(item, index) in infoList.backgroups" :key="index">
              {{ item.xslx }}：{{ item.num }}
            </div>
          </template>
          <template v-if="url == 'shixi'" data-html2canvas-ignore>
            <div class="fl" style="width: 100%;" v-for="(item, index) in infoList.undergos" :key="index">
              {{ item.lxxf }}{{ item.xmlx }}
            </div>
          </template>
        </div>
      </div>
      <div class="con">
        <p>导师评语</p>
        <span>{{ infoList.dspy }}</span>
      </div>
      <img src="./images/bottom.png" alt="" class="bottom" />
    </div>
    <div class="options">
      <div class="col" @click="onDownload()">
        <img class="icon" src="./images/download.png" alt="" />
        <div class="title">下载本地</div>
      </div>
      <div class="col" @click="onDownload()">
        <img class="icon" src="./images/wechat.png" alt="" />
        <div class="title">分享朋友圈</div>
      </div>
    </div>
  </div>
</template>
<script>
import html2canvas from 'html2canvas'
import { appShareData } from '@/utils/wechat'
export default {
  props: {
    infoList: {
      type: Object
    },
    url: {
      type: String
    },
    tit: {
      type: String
    }
  },
  data() {
    return {
      imgUrl: ''
    }
  },
  mounted() {},
  methods: {
    DownloadImg() {
      this.$toast('请长按图片保存到本地相册后，再分享到朋友圈哦~')
    },
    async onDownload() {
      this.createPic().then(res => {
        const aLink = document.createElement('a')
        const blob = this.base64ToBlob(res)
        const evt = document.createEvent('HTMLEvents')
        evt.initEvent('click', true, true)
        aLink.download = '分享图片.png'
        aLink.href = URL.createObjectURL(blob)
        aLink.click()
        this.DownloadImg()
      })
    },
    async createPic() {
      const saveUrl = await this.getCanvas()
      this.imgUrl = saveUrl
      return saveUrl
    },
    async onAppShare() {
      const saveUrl = await this.getCanvas()
      await appShareData(saveUrl)
    },
    async getCanvas() {
      if (this.imgUrl) {
        return this.imgUrl
      }
      const elCanvas = this.$refs.canvas
      const elShare = this.$refs.share
      const canvas = await html2canvas(elCanvas, {
        allowTaint: true,
        windowWidth: elShare.scrollWidth,
        windowHeight: elShare.scrollHeight
      })
      // const img = await canvas2image.convertToPNG(canvas, elCanvas.clientWidth, elCanvas.clientHeight)
      // const url = img.getAttribute('src')
      const url = canvas.toDataURL('image/png', 1)
      return url
    },
    base64ToBlob(code) {
      const parts = code.split(';base64,')
      const contentType = parts[0].split(':')[1]
      const raw = window.atob(parts[1])
      const rawLength = raw.length
      const uInt8Array = new Uint8Array(rawLength)
      for (let i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i)
      }
      return new Blob([uInt8Array], { type: contentType })
    }
  }
}
</script>

<style lang="scss" scoped>
.share {
  width: 100vw;
  min-height: 100vh;
  z-index: 10;
  .canvas {
    display: block;
    box-shadow: 0px 0px 10px 0px rgba(25, 25, 25, 0.1);
    position: relative;
    margin: 22px auto;
    width: 266px;
    background: #fff url('./images/bg.png') no-repeat 0 0/197px 204px;
    padding: 0 11px;
    .banner-con {
      width: 100%;
      position: relative;
      height: 6.34667rem;
      padding: 0 0.38rem;
      box-sizing: border-box;
      text-align: left;
      overflow: hidden;
      .banner {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
      }
      h3 {
        margin-top: 3rem;
        color: #040002;
        font-size: 0.46rem;
        margin-bottom: 0.25rem;
        font-weight: bold;
        position: relative;
        z-index: 2;
        b {
          display: inline-block;
          position: relative;
          font-size: 0.8rem;
          padding: 0 0.3rem;
          text-align: center;
          min-width: 28px;
          &::before {
            content: '';
            z-index: -1;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 90%;
            height: 1.2rem;
            background: #02fdc2;
            border-radius: 50%;
          }
        }
        i {
          font-size: 0.55rem;
          font-style: normal;
        }
      }
      p {
        color: #040002;
        font-size: 0.31rem;
        position: relative;
        z-index: 2;
        span {
          display: inline-block;
          font-weight: bold;
          position: relative;
          &::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 100%;
            height: 0.13rem;
            background: #02fdc2;
            z-index: -1;
          }
        }
      }
    }
    .bottom {
      width: 100%;
      display: block;
      border-top: 1px solid #d0d0d0;
    }
    .con {
      width: 100%;
      padding: 0.6rem 0.49rem 0.6rem 0.6rem;
      box-sizing: border-box;
      background-color: #fff;
      .fl {
        width: 50%;
        border-bottom: 1px solid #ececee;
        padding: 0.24rem 0.1rem;
        color: #2f2f32;
        font-size: 0.37rem;
        box-sizing: border-box;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      p {
        color: #2f2f32;
        font-size: 0.43rem;
        position: relative;
        font-weight: bold;
        margin-bottom: 0.2rem;
        &::before {
          content: '';
          width: 0.13rem;
          height: 0.32rem;
          background: #ff9025;
          border-radius: 0.04rem;
          position: absolute;
          top: 50%;
          left: -0.26rem;
          transform: translateY(-50%);
        }
      }
      span {
        color: #63666d;
        font-size: 0.32rem;
        line-height: 0.56rem;
        display: block;
      }
    }
  }
  .options {
    display: flex;
    justify-content: center;
    .col {
      margin: 0 25px;
      .icon {
        width: 60px;
        height: 60px;
      }
      .title {
        text-align: center;
      }
    }
  }
  .photo {
    display: block;
    margin: 22px auto;
    width: 288px;
    object-fit: contain;
    box-shadow: 0px 0px 10px 0px rgba(25, 25, 25, 0.1);
  }
}
</style>
