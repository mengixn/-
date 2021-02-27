<template>
  <div class="school">
    <div class="s-aside">
      <img class="icon" src="./component/images/my-progress/date.png" alt="" />
    </div>
    <div class="card">
      <div class="c-title">{{ dataList.name }}</div>
      <div class="c-date">{{ dataList.sjwcsj }}</div>
      <div class="detail">{{ dataList.jdms }}</div>
      <template v-for="(link, lIndex) in dataList.fj">
        <div class="link" @click="onLink(link)" :key="lIndex">
          <img :src="fileType(link.wjlx)" alt="" class="icon" />
          <span class="label">{{ link.wjlx ? '附件' : '视频地址' }}-</span>
          <span class="file">{{ link.wjlx ? link.wjmc : link.wjdz }}</span>
        </div>
        <br :key="lIndex + 'br'" />
      </template>
    </div>
    <div class="img-cover" v-show="imgShow">
      <div class="exit" @click="imgExit"></div>
      <img :src="imgCover" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'School',
  props: {
    dataList: {
      type: Object,
      default() {
        return []
      }
    }
  },
  computed: {
    fileType() {
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
  data() {
    return {
      filePic: {
        pdf: require('./images/pdf.png'),
        xlsx: require('./images/xlsx.png'),
        word: require('./images/word.png'),
        ppt: require('./images/ppt.png'),
        png: require('./images/png.png'),
        video: require('./images/video.png')
      },
      imgShow: false,
      imgCover: ''
    }
  },
  methods: {
    imgExit() {
      this.imgShow = false
      this.imgCover = ''
    },
    onLink(link) {
      if (
        link.wjlx === 'ppt' ||
        link.wjlx === 'pptx' ||
        link.wjlx === 'doc' ||
        link.wjlx === 'docx' ||
        link.wjlx === 'xls' ||
        link.wjlx === 'xlsx'
      ) {
        window.open(`https://view.officeapps.live.com/op/view.aspx?src=${link.wjdz}`)
        return
      } else if (link.wjlx === 'png' || link.wjlx === 'jpg' || link.wjlx === 'jpeg') {
        this.imgCover = link.wjdz
        this.imgShow = true
      } else {
        window.open(`${link.wjdz}`)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.school {
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
      margin: 0 auto;
      display: block;
      object-fit: contain;
      z-index: 1;
    }
  }
  display: flex;
  .s-aside {
    flex-shrink: 0;
    position: relative;
    display: flex;
    &::before {
      position: absolute;
      left: calc(50% - 1px);
      content: '';
      width: 2px;
      height: 100%;
      background-color: #fedfc3;
    }
    .icon {
      margin-top: 15px;
      z-index: 1;
      width: 26px;
      height: 26px;
    }
  }
  .card {
    margin-left: 10px;
    padding: 22px 15px;
    box-shadow: 0px 3px 10px 0px rgba(237, 242, 248, 1);
    border-radius: 8px;
    .c-title {
      font-size: 16px;
      color: #2f2f32;
      font-weight: bold;
    }
    .c-date {
      margin-top: 6px;
      font-size: 12px;
      color: #9fa0a5;
    }
    .detail {
      margin-top: 6px;
      font-size: 12px;
      color: #63666d;
      @include textoverflow(2);
    }
    .link {
      display: inline-flex;
      align-items: center;
      margin-top: 15px;
      padding: 4px 9px;
      background-color: #e6e9ee;
      border-radius: 5px;
      font-size: 13px;
      .icon {
        margin-right: 6px;
        width: 10px;
        height: 12px;
      }
      .label {
        color: #2f2f32;
        flex-shrink: 0;
      }
      .file {
        max-width: 180px;
        color: #3680F6;
        @include textoverflow;
      }
    }
  }
}
</style>
