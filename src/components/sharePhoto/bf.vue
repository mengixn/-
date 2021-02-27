<template>
  <div class="share" ref="share" @touchmove.prevent>
    <img class="photo" :src="imgUrl" v-if="imgUrl" alt="" />
    <div class="canvas" ref="canvas" v-else>
      <h1>
        <img src="./images/title.png" alt="" />
      </h1>
      <!-- 英语成绩及标化成绩 -->
      <div class="num" v-if="url == 'yingyu' || url == 'biaohua'">
        我的{{ tit }}<span>{{ infoList.title.value }}</span
        >分
      </div>
      <!-- 学术背景 -->
      <template v-if="url == 'xueshu'" data-html2canvas-ignore>
        <div class="num">
          学术科研背景<span>{{ infoList.backgroups_count }}</span
          >篇
        </div>
      </template>
      <!-- 实习经历 -->
      <template v-if="url == 'shixi'" data-html2canvas-ignore>
        <div class="num">
          实习实践背景<span>{{ infoList.undergos_count }}</span
          >次
        </div>
      </template>
      <div class="percentage">
        已超越 <span>{{ infoList.weight }}%</span> 的同期申请者，加油！
      </div>
      <img src="./images/book.png" alt="" class="book" />
      <div class="can-container">
        <div class="label">{{ tit }}</div>
        <!-- 英语成绩及标化成绩 -->
        <template v-if="url == 'yingyu' || url == 'biaohua'" data-html2canvas-ignore>
          <template v-for="(item, index) in infoList.score" data-html2canvas-ignore>
            <div class="row" :key="index">
              <div class="col">{{ item.name }}</div>
              <div class="col">{{ item.value }}</div>
            </div>
            <div class="line" v-if="index != infoList.score.length - 1" :key="index + '-only'"></div>
          </template>
        </template>
        <!-- 学术背景 -->
        <template v-if="url == 'xueshu'" data-html2canvas-ignore>
          <template v-for="(item, index) in infoList.backgroups" data-html2canvas-ignore>
            <div class="row" :key="index">
              <div class="col">{{ item.xslx }}</div>
              <div class="col">{{ item.num }}</div>
            </div>
            <div class="line" v-if="index != infoList.backgroups.length - 1" :key="index + '-only'"></div>
          </template>
        </template>
        <!-- 实习经历 -->
        <template v-if="url == 'shixi'" data-html2canvas-ignore>
          <template v-for="(item, index) in infoList.undergos" data-html2canvas-ignore>
            <div class="row" :key="index">
              <div class="col">{{ item.lxxf }}{{ item.xmlx }}</div>
            </div>
            <div class="line" v-if="index != infoList.undergos.length - 1" :key="index + '-only'"></div>
          </template>
        </template>
        <div class="label teacher">导师评语</div>
        <div class="con-content">
          {{ infoList.dspy }}
        </div>
      </div>
      <div class="can-footer">
        <div class="qrcodes">
          <img src="./images/code.png" alt="" class="code" />
          <div class="q-title">识别二维码，了解更多</div>
        </div>
      </div>
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
    padding: 0 11px;
    margin: 22px auto;
    width: 266px;
    background: #fff url('./images/bg.png') no-repeat 0 0/197px 204px;
    h1 {
      width: 100%;
      height: 39px;
      padding-top: 39px;
      img {
        width: inherit;
        height: inherit;
      }
    }
    .num {
      margin-top: 21px;
      font-size: 11px;
      font-weight: bold;
      color: #fd9738;
      letter-spacing: 0.1em;
      span {
        font-size: 32px;
      }
    }
    .percentage {
      width: 120px;
      letter-spacing: 0.1em;
      font-weight: bold;
      margin-top: 6px;
      font-size: 10px;
      color: #63666d;
      font-weight: normal;
      span {
        color: #fd9738;
      }
    }
    .book {
      position: absolute;
      width: 153px;
      height: 152px;
      top: 80px;
      right: 0;
    }
    .can-container {
      padding: 23px 11px 11px;
      margin-top: 20px;
      background-color: #fff;
      box-shadow: 0px 0px 10px 0px rgba(25, 25, 25, 0.1);
      border-radius: 8px;
      .label {
        margin-bottom: 12px;
        font-size: 11px;
        color: #2f2f32;
        font-weight: bold;
        display: flex;
        align-items: center;
        &::before {
          margin-right: 5px;
          display: block;
          content: '';
          width: 3px;
          height: 8px;
          border-radius: 2px;
          background-color: #ff9025;
        }
      }
      .row {
        display: flex;
        justify-content: space-between;
        .col {
          font-size: 9px;
          color: #2f2f32;
        }
      }
      .line {
        margin: 6px 0;
        width: 100%;
        height: 1px;
        background-color: #ececee;
      }
      .teacher {
        margin-top: 20px;
      }
      .con-content {
        margin-top: 4px;
        font-size: 9px;
        color: #63666d;
        line-height: 1.8em;
        padding-bottom: 90px;
      }
    }
    .can-footer {
      z-index: 1;
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 110px;
      background: url('./images/footer.png') no-repeat center/cover;
      .qrcodes {
        display: inline-block;
        margin: 25px 18px;
        text-align: center;
        .code {
          width: 50px;
          height: 50px;
        }
        .q-title {
          margin-top: 4px;
          font-size: 10px;
          color: #ffffff;
        }
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
