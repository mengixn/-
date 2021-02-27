<template>
  <div class="content" v-if="list">
    <div class="minwidth">
      <template v-for="(item, index) in list">
        <div
          class="study"
          :key="index"
          @click="onRoute('/applyMore/aSchool', { sshqkh: userInfo.user.sshqkh, fwlc: item.lcid, gsfwjd: item.id })"
        >
          <div class="flex-sb">
            <div class="magnetic">
              <div class="title">{{ item.name }}</div>
              <div class="time">
                <template v-if="num == 0 || num == 1">
                  {{ item.sjwcsj }}
                </template>
                <template v-if="num == 2">
                  {{ item.pjrq }}
                </template>
              </div>
              <template v-if="item.fj.length > 0">
                <div
                  class="attachment"
                  :class="item1.wjlx !== '' && item1.wjlx ? '' : 'video'"
                  v-for="(item1, index1) in item.fj"
                  :key="index1"
                  @click.stop="OpenUrl(item1.wjdz, item1.wjlx)"
                >
                  <template v-if="item1.wjlx !== '' && item1.wjlx">
                    <span class="other">附件 - </span>
                    <div class="listing">
                      <img :src="fileCheck(item1.wjlx)" alt="" v-if="item1.wjlx != ''" />
                      <div>{{ item1.wjmc }}</div>
                    </div>
                  </template>
                  <template v-else>
                    <span class="other">
                      视频地址：
                    </span>
                    <a class="listing" :href="item1.wjdz">{{ item1.wjdz }}</a>
                  </template>
                </div>
              </template>
            </div>
            <div class="evaluation" v-if="num == 0" @click.stop="confirm(item.id, item.name)">确认</div>
            <div class="evaluation" v-if="num == 1" @click.stop="evaluate(item.id, 0)">发表评价</div>
            <div class="evaluation" v-if="num == 2" @click.stop="check(item.khpjid, item.id)">查看评价</div>
            <!-- 查看评价 -->
          </div>
        </div>
      </template>
    </div>
    <van-empty
      class="custom-image"
      :image="require('../images/error.png')"
      description="暂无内容"
      v-if="list.length == 0"
    />
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default() {
        return {}
      }
    },
    num: {
      type: Number || String,
      default() {
        return ''
      }
    }
  },
  data() {
    return {
      filePic: {
        pdf: require('../images/pdf.png'),
        xlsx: require('../images/xlsx.png'),
        word: require('../images/word.png'),
        ppt: require('../images/ppt.png'),
        png: require('../images/png.png'),
        video: require('../images/video.png')
      }
    }
  },
  methods: {
    onRoute(path, query) {
      this.$router.push({
        path: path,
        query
      })
    },
    OpenUrl(url, type) {
      if (type === 'doc' || type === 'docx' || type === 'ppt' || type === 'pptx' || type === 'xls' || type === 'xlsx') {
        window.open('https://view.officeapps.live.com/op/view.aspx?src=' + url)
        return
      } else if (type === 'png' || type === 'jpg' || type === 'jpeg') {
        const obj = {
          imgCover: url,
          imgShow: true
        }
        this.$emit('fromChild', obj)
      } else {
        window.open(`${url}`)
      }
    },
    confirm: function(id, name) {
      this.$router.push({
        path: '/project',
        query: {
          sId: id,
          name: name,
          node: 0
        }
      })
    },
    evaluate: function(id, type) {
      this.$router.push({
        path: '/publish',
        query: {
          sId: id,
          type: type,
          node: 0
        }
      })
    },
    check: function(id, id2) {
      this.$router.push({
        path: '/evaluation',
        query: {
          sId: id,
          tId: id2
        }
      })
    }
  },
  computed: {
    userInfo() {
      const handleUserInfo = JSON.parse(localStorage.getItem('userInfo'))
      return handleUserInfo
    },
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
  }
}
</script>

<style lang="scss" scoped>
/deep/ .van-empty__image {
  height: auto;
  margin-top: 2.6rem;
  position: relative;
}
.content {
  padding-bottom: 0.6rem;
  .empty {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    margin-top: 1.87rem;
    img {
      width: 3.31rem;
      height: 3.31rem;
      object-fit: cover;
    }
    p {
      font-size: 0.35rem;
      font-weight: 400;
      color: #9fa0a5;
      margin-top: 0.4rem;
    }
  }
  .minwidth {
    width: 92%;
    margin: 0 auto;
    .study {
      width: 100%;
      background: #ffffff;
      box-shadow: 0px 3px 10px 0px rgba(237, 242, 248, 1);
      border-radius: 8px;
      padding-bottom: 20px;
      margin-top: 18px;
      .flex-sb {
        display: flex;
        justify-content: space-between;
        width: 92%;
        position: relative;
        margin: 0 auto;
        .magnetic {
          width: 100%;
          .attachment {
            text-align: center;
            padding: 2px 8px 0 50px;
            box-sizing: border-box;
            background: #f2f3f6;
            border-radius: 5px;
            margin-top: 10px;
            position: relative;
            &.video {
              padding-left: 70px;
            }
            &:nth-child(1) {
              margin-top: 20px;
            }
            .other {
              position: absolute;
              top: 8px;
              left: 10px;
            }
            .others {
              text-align: left;
            }
            a {
              @include textoverflow();
            }
            .listing {
              font-size: 13px;
              font-weight: 500;
              color: #63666d;
              line-height: 0.8rem;
              text-align: left;
              img {
                transform: translateY(0.1rem);
                margin-right: 5px;
                width: 16px;
                height: 16px;
              }
              div {
                vertical-align: middle;
                display: inline-block;
                font-size: 13px;
                color: #3680f6;
              }
              em {
                display: inline-block;
                width: 12px;
                height: 12px;
                background: url('../images/word.png') no-repeat center/cover;
                vertical-align: middle;
                margin: 0 4px;
              }
            }
          }
          .title {
            font-size: 16px;
            font-weight: 500;
            color: #2f2f32;
            margin-top: 20px;
          }
          .time {
            font-size: 13px;
            color: #9fa0a5;
            margin-top: 8px;
          }
        }
        .evaluation {
          width: 73px;
          height: 28px;
          position: absolute;
          top: 20px;
          right: 0;
          background: #fd9738;
          border-radius: 5px;
          text-align: center;
          line-height: 28px;
          color: #fff;
        }
      }
    }
  }
}
</style>
