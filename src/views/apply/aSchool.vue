<template>
  <div class="a-school" :class="dataIndex === -1 ? 'disnone' : ''">
    <div
      class="row clearfix"
      :ref="
        nodeIndex
          ? rIndex === nodeIndex
            ? 'nodeActive'
            : rIndex === dataIndex && 'rowActive'
          : rIndex === dataIndex && 'rowActive'
      "
      :class="[rIndex === dataIndex && 'active']"
      v-for="(row, rIndex) in dataList"
      :key="rIndex"
    >
      <!-- <div class="r-aside">
        <div class="icon">
          <div class="circle"></div>
          <img src="@/assets/icon/date.png" alt="" class="icon-date" />
        </div>
      </div> -->
      <div class="r-card-con">
        <div class="r-card">
          <van-icon v-show="!row.sfqr" @click="onRoute('/question', { id: row.id })" class="doubt" name="question-o" />
          <div class="title">{{ row.name }}</div>
          <!-- 完成态 & 进行中 -->
          <template v-if="rIndex <= dataIndex">
            <div class="date">{{ row.sjwcsj }}</div>
            <div class="describe">描述：{{ row.jdms }}</div>
            <template v-for="(link, lIndex) in row.fj">
              <div class="link" @click="onLink(link)" :key="lIndex">
                <img :src="fileType(link.wjlx)" alt="" class="icon" />
                <span class="label">{{ link.wjlx ? '附件' : '视频地址' }}-</span>
                <span class="file">{{ link.wjlx ? link.wjmc : link.wjdz }}</span>
              </div>
              <br :key="lIndex + 'br'" />
            </template>
            <div class="c-footer">
              <div class="btns">
                <button
                  :class="btn.active && 'active'"
                  v-for="(btn, bIndex) in btns"
                  :key="bIndex"
                  v-show="btn.handel(row)"
                  @click="doIt(btn.name, row, row.khpj[0] ? row.khpj[0].id : '')"
                >
                  {{ btn.name }}
                </button>
              </div>
            </div>
          </template>
          <!-- 未开始 有预计开始时间 -->
          <template v-else-if="row.yjkssj">
            <div class="labels">预计开始时间</div>
            <div class="date">{{ row.yjkssj }}——{{ row.yjjssj || '?' }}</div>
          </template>
          <!-- 未开始 无预计开始世家 -->
          <template v-else>
            <div class="not">暂未开始</div>
          </template>
        </div>
      </div>
    </div>
    <div class="img-cover" v-show="imgShow">
      <div class="exit" @click="imgExit"></div>
      <img :src="imgCover" alt="" />
    </div>
    <van-dialog v-model="show" :showConfirmButton="false" :showCancelButton="false">
      <div class="exit" @click="exit()"></div>
      <p>
        您有提交的疑问还未处理，<br />
        确定要进行该节点的<span>确认</span>吗？
      </p>
      <div>
        <a href="JavaScript:;" class="cancle" type="default" @click="exit()">取消</a>
        <a href="JavaScript:;" class="confirm" @click="call()">确认</a>
      </div>
    </van-dialog>
  </div>
</template>

<script>
export default {
  props: {
    dataId: {
      type: String,
      default: ''
    },
    dataList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  computed: {
    dataIndex() {
      const findDataList = this.dataList.findIndex((item, index) => {
        return item.id === this.dataId
      })
      return findDataList
    },
    nodeIndex() {
      let findDataList = null
      if (this.$route.query.gsfwjd) {
        findDataList = this.dataList.findIndex((item, index) => {
          return item.id === this.$route.query.gsfwjd
        })
      }
      return findDataList
    },
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
  watch: {
    dataIndex(val) {
      const that = this
      if (!this.$route.query.gsfwjd) {
        this.$nextTick(() => {
          const elActive = that.$refs.rowActive[0]
          const top = elActive.offsetTop
          window.scrollTo(0, top - 55)
        })
      }
    },
    nodeIndex(val) {
      const that = this
      if (this.$route.query.gsfwjd) {
        this.$nextTick(() => {
          const elActive = that.$refs.nodeActive[0]
          const top = elActive.offsetTop
          window.scrollTo(0, top - 55)
        })
      }
    }
  },
  filters: {
    handelDate() {}
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
      btns: [
        {
          name: '确认',
          active: true,
          handel({ sfqr, sjwcsj }) {
            // 实际完成时间  确认状态
            return sjwcsj && !sfqr
          }
        },
        {
          name: '发表评价',
          active: true,
          handel({ khpj, sfqr }) {
            //  是否评价 确认状态
            return !khpj.length && sfqr
          }
        },
        {
          name: '查看评价',
          handel({ sfqr, khpj }) {
            return sfqr && khpj.length
          }
        },
        {
          name: '查看导师',
          handel({ hwds }) {
            return hwds
          }
        },
        {
          name: '导师评语',
          handel({ dspy }) {
            return dspy
          }
        }
      ],
      show: false, // 控制弹框
      tanId: '',
      tanName: '',
      imgShow: false,
      imgCover: '',
      sId: '' // 客户id
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
    },
    onRoute(path, query = {}) {
      this.$router.push({
        path: path,
        query
      })
    },
    doIt(name, item, pjid) {
      // 按钮事件
      if (name === '确认') {
        this.queren(item.id, item.name, item.xsyw)
      } else if (name === '发表评价') {
        this.evaluate(item.id, 0)
      } else if (name === '查看评价') {
        this.check(item.id, pjid)
      } else if (name === '查看导师') {
        this.toTutor(item.hwds)
      } else if (name === '导师评语') {
        this.toCommit(item.id)
      }
    },
    queren(id, name, confirm) {
      // 确认
      this.tanId = id
      this.tanName = name
      if (!confirm.length) {
        this.$router.push({
          path: '/project',
          query: {
            sId: id,
            name: name,
            node: 1
          }
        })
      } else {
        this.show = true
      }
    },
    exit() {
      this.show = false
    },
    call() {
      const that = this
      this.$router.push({
        path: '/project',
        query: {
          sId: that.tanId,
          name: that.tanName,
          node: 1
        }
      })
    },
    evaluate: function(id, type) {
      // 发表评价
      this.$router.push({
        path: '/publish',
        query: {
          sId: id,
          type: type,
          node: 1
        }
      })
    },
    check: function(id, id2) {
      // 查看评价
      this.$router.push({
        path: '/evaluation',
        query: {
          sId: id2,
          tId: id
        }
      })
    },
    toTutor(id) {
      // 查看导师
      const that = this
      this.$router.push({
        path: '/tutorDetail',
        query: {
          id: id,
          type: 1,
          sshqkh: that.sId,
          fwlc: that.$route.query.fwlc
        }
      })
    },
    toCommit(id) {
      // 导师评语
      this.$router.push({
        path: '/tutorComment',
        query: {
          jdid: id
        }
      })
    }
  },
  mounted() {
    const sId = JSON.parse(localStorage.getItem('userInfo'))
    this.sId = sId.user.sshqkh
  }
}
</script>

<style lang="scss" scoped>
.a-school {
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
      object-fit: contain;
      margin: 0 auto;
      z-index: 1;
    }
  }
  /deep/ .van-dialog {
    padding: 0 0.53rem;
    padding-bottom: 0.6rem;
    box-sizing: border-box;
    text-align: center;
    overflow: initial;
    .exit {
      width: 0.5rem;
      height: 0.5rem;
      position: absolute;
      right: 0.5rem;
      top: 0.5rem;
      border-radius: 50%;
      overflow: hidden;
      border: 1px solid #333;
      transform: rotateZ(45deg);
      &::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 2px;
        top: 50%;
        transform: translateY(-50%);
        left: 0;
        background-color: #333;
      }
      &::after {
        content: '';
        position: absolute;
        height: 100%;
        width: 2px;
        left: 50%;
        transform: translateX(-50%);
        top: 0;
        background-color: #333;
      }
    }
    .van-dialog__content > p {
      color: #2f2f32;
      font-size: 0.37rem;
      margin-top: 1.4rem;
      margin-bottom: 0.8rem;
      font-weight: bold;
      span {
        color: #fd9738;
        font-size: 0.5rem;
      }
    }
    .cancle,
    .confirm {
      width: 2.91rem;
      height: 1.17rem;
      line-height: 1.17rem;
      float: right;
      text-align: center;
      font-size: 0.37rem;
      font-weight: bold;
    }
    .cancle {
      float: left;
      border-radius: 0.2rem;
      border: 0.02rem solid #c6c8ce;
      color: #2f2f32;
    }
    .confirm {
      color: #fff;
      background: #fd9738;
      box-shadow: 0rem 0.2rem 0.4rem 0rem rgba(253, 151, 56, 0.4);
      border-radius: 0.2rem;
    }
  }
  .row {
    overflow: hidden;
    .r-aside {
      margin-right: 10px;
      flex-shrink: 0;
      float: left;
      width: 26px;
      height: 100%;
      .icon {
        height: 100%;
        .circle {
          flex-shrink: 0;
          border-radius: 50%;
          border: 3px solid #ececee;
          width: 6px;
          height: 6px;
          margin: 0 auto;
        }
        .icon-date {
          flex-shrink: 0;
          display: none;
          width: 26px;
          height: 26px;
          margin: 0 auto;
        }
        &::before {
          content: '';
          color: #000;
          width: 3px;
          height: 26px;
          background-color: #ececee;
          display: block;
          margin: 0 auto;
        }
        &::after {
          content: '';
          color: #000;
          width: 3px;
          height: 100%;
          background-color: #ececee;
          display: block;
          margin: 0 auto;
        }
      }
    }
    .r-card-con {
      float: right;
      width: 299px;
      position: relative;
      &::before {
        content: '';
        position: absolute;
        left: -0.68rem;
        top: 0;
        height: calc( 100% + 26px);
        width: 0.08rem;
        background-color: #fd9738;
        z-index: 1;
      }
      &:after {
        content: '';
        position: absolute;
        left: -0.8rem;
        top: 1rem;
        width: 0.16rem;
        height: 0.16rem;
        border: 0.08rem solid #fd9738;
        border-radius: 50%;
        z-index: 2;
        background: #fff;
      }
      .r-card {
        width: 100%;
        box-sizing: border-box;
        padding: 22px 15px 15px;
        background-color: #fff;
        box-shadow: 0px 3px 10px 0px rgba(237, 242, 248, 1);
        border-radius: 8px;
        position: relative;
        .doubt {
          position: absolute;
          right: 30px;
        }
        .title {
          margin-right: 40px;
          font-size: 16px;
          color: #2f2f32;
          font-weight: bold;
          @include textoverflow;
        }
        .date {
          margin-top: 6px;
          font-size: 12px;
          color: #9fa0a5;
        }
        .describe {
          margin-top: 5px;
          font-size: 12px;
          color: #63666d;
        }
        .link {
          display: inline-flex;
          align-items: center;
          margin-top: 5px;
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
        .labels {
          margin-top: 5px;
          font-size: 12px;
          color: #2ee670;
        }
        .not {
          margin-top: 10px;
          display: inline-block;
          padding: 4px 5px;
          background: #8c909e;
          border-radius: 4px;
          opacity: 0.4;
          font-size: 12px;
          color: #fff;
        }
        .c-footer {
          margin-top: 14px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .btns {
            flex: 1;
            button {
              margin-top: 10px;
              margin-right: 11px;
              width: 76px;
              height: 28px;
              font-size: 13px;
              color: #63666d;
              border-radius: 5px;
              border: 1px solid #c6c8ce;
              background-color: transparent;
              transition: all 0.6s;
              &:hover {
                color: #fd9738;
                border-color: inherit;
              }
            }
          }
        }
      }
    }
  }
  .row:not(:first-of-type) {
    .r-card {
      margin-top: 10px;
    }
  }
  .row:not(.active ~ .row) {
    .r-card-con {
      &::before{
        background-color: #fd9738;
      }
    }
  }
  .row.active {
    .r-card-con {
      &::before{
        background-color: #fd9738;
      }
      &:after{
        width: .69333rem;
        height: .69333rem;
        background: url('../../assets/icon/date.png') no-repeat center;
        background-size: cover;
        border: none;
        left: -.97rem;
        top: .8rem;
      }
    }
    .r-card {
      .title {
        color: #fd9738;
      }
    }
  }
  .row.active ~ .row {
    .r-card-con {
      &::before{
        background-color: #ececee;
      }
      &:after{
        width: 0.16rem;
        height: 0.16rem;
        top: 1rem;
        left: -0.78rem;
        border: 0.08rem solid #ececee;
        background: #fff;
      }
    }
    .r-card {
      i {
        display: none;
      }
      .title {
        color: #adadae;
      }
    }
  }
  &.disnone {
    .r-card-con {
      &::before{
        background-color: #ececee;
      }
      &::after{
        border: 0.08rem solid #ececee;
      }
    }
    .r-card {
      .doubt {
        display: none;
      }
    }
  }
}
</style>
