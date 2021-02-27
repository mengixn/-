<template>
  <div class="a-japan">
    <jspan-title mTitle="课程提升" ></jspan-title>
    <div class="row1">
      <div class="row-scroll">
        <div
          class="card"
          :style="{ backgroundImage: `url(${require(`./images/teacher${cIndex + 1}.png`)})` }"
          v-for="(card, cIndex) in row1"
          :key="cIndex"
          @click="go()"
        >
          <div class="c-footer">
            <div class="title">{{ card.title }}</div>
          </div>
        </div>
      </div>
    </div>
    <jspan-title mTitle="租房信息"></jspan-title>
    <div class="row2">
      <div class="card" v-for="(card, cIndex) in row2" :key="cIndex" @click="go()">
        <img :src="require(`./images/family${cIndex + 1}.png`)" alt="" class="photo" />
        <div class="contents">
          <div class="title">{{ card.title }}</div>
          <div class="tags">
            <div class="tag" v-for="(tag, tIndex) in card.labels" :key="tIndex">{{ tag }}</div>
          </div>
          <div class="price">{{ card.price }}<span>元/月</span></div>
        </div>
      </div>
    </div>
    <jspan-title mTitle="我要工作"></jspan-title>
    <div class="row2">
      <div class="card" v-for="(card, cIndex) in row3" :key="cIndex" @click="go()">
        <img :src="require(`./images/work${cIndex + 1}.png`)" alt="" class="photo" />
        <div class="contents">
          <div class="title">{{ card.title }}</div>
          <div class="tags">
            <div class="tag" v-for="(tag, tIndex) in card.labels" :key="tIndex">{{ tag }}</div>
          </div>
          <div class="price">{{ card.price }}<span>元/月</span></div>
        </div>
      </div>
    </div>
    <jspan-title mTitle="留学生活"></jspan-title>
    <div class="row3">
      <div class="photos">
        <img src="./images/life1.png" alt="" class="photo" />
        <img src="./images/life2.png" alt="" class="photo" />
      </div>
      <div class="content">
        刚来日本的时候特别不适应这里的垃圾分类，但是后来慢慢的适应了。日本人很友好，你有什么困难他们会帮你解决，如果出门问路他们会详细的给你解释。学校的生活还是比较丰富多彩的，有各种讲座，交流会，有时候上完课后研究室经常有聚会会，来日本留学是一个正确的选择。
      </div>
      <!-- <button class="share-button"><img src="@/assets/icon/share.png" alt="" class="share" />我要分享</button> -->
      <!-- <div class="ad">分享留学生活，拿惊喜礼品哦</div> -->
    </div>
    <div class="phone">
      <a href="tel:4009009770">
        <span class="phone-text">400-900-9770</span>
        <div class="vline"></div>
        <img src="@/assets/icon/phone.png" alt="" class="icon" />
        <span class="sos">紧急联系</span>
      </a>
    </div>
  </div>
</template>

<script>
import jspanTitle from './components/jspan-title'
export default {
  components: {
    jspanTitle
  },
  data() {
    return {
      row1: [{ title: '日本N1语言课程' }, { title: '日本N2语言课程' }],
      row2: [
        { title: '日本寄宿家庭西雅图的寄宿家庭—', labels: ['优质社区', '精装修'], price: '2000' },
        { title: '日本寄宿家庭东京的寄宿家庭—Shrestha女士的家', labels: ['优质社区', '精装修'], price: '2000' }
      ],
      row3: [
        { title: '大数据工程师和云计算工程师', labels: ['优质社区', '精装修'], price: '2000' },
        { title: '大数据工程师和云计算工程师', labels: ['优质社区', '精装修'], price: '2000' }
      ]
    }
  },
  methods: {
    go() {
      var height = 540
      var width = 688
      var top = Math.round((window.screen.height - height) / 2)
      var left = Math.round((window.screen.width - width) / 2)
      window.open('https://tb.53kf.com/code/client/d794c640cf28f4f6196ded951e3d164f/1', 'newwindow', 'height=' + height +
        ', width=' + width + ', top=' + top + ', left= ' + left +
        ', toolbar =no, menubar=no, scrollbars=no, resizable=no, location=no, status=no')
    }
  },
  mounted() {
    var _53code = document.createElement('script')
    _53code.src = 'https://tb.53kf.com/code/code/d794c640cf28f4f6196ded951e3d164f/1'
    var s = document.getElementsByTagName('script')[0]
    s.parentNode.insertBefore(_53code, s)
  }
}
</script>

<style lang="scss" scoped>
.a-japan {
  .row1 {
    overflow-x: auto;
    overflow-y: hidden;
    &::-webkit-scrollbar {
      display: none;
    }
    .row-scroll {
      display: flex;
      flex-wrap: nowrap;
      .card {
        margin-right: 10px;
        position: relative;
        flex-shrink: 0;
        width: 230px;
        height: 156px;
        background: url('https://pic2.zhimg.com/v2-4aa64b9f866e12a9bb5481ad93f0033e_1440w.jpg?source=172ae18b')
          no-repeat center/cover;
        border-radius: 10px;
        overflow: hidden;
        .c-footer {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 60px;
          background: url('./images/mc.png') no-repeat;
          .title {
            margin: 29px 15px 0;
            font-size: 16px;
            color: #ffffff;
            font-weight: bold;
          }
        }
      }
    }
  }
  .row2 {
    .card {
      padding: 15px 15px 20px;
      background-color: #fff;
      box-shadow: 0px 3px 10px 0px rgba(237, 242, 248, 1);
      border-radius: 8px;
      display: flex;
      .photo {
        flex-shrink: 0;
        margin-right: 17px;
        width: 95px;
        height: 95px;
        border-radius: 5px;
      }
      .contents {
        .title {
          font-size: 16px;
          color: #2f2f32;
          font-weight: bold;
          @include textoverflow(2);
        }
        .tags {
          margin-top: 13px;
          display: flex;
          align-items: center;
          .tag {
            padding: 3px 5px;
            border-radius: 5px;
            border: 1px solid #ececec;
            font-size: 10px;
            color: #9fa0a5;
          }
        }
        .price {
          margin-top: 16px;
          font-size: 18px;
          color: #fd9738;
          font-weight: bold;
          span {
            font-size: 14px;
          }
        }
      }
    }
    .card:not(:first-of-type) {
      margin-top: 15px;
    }
  }
  .row3 {
    padding: 20px 15px 30px;
    background-color: #fff;
    box-shadow: 0px 3px 10px 0px rgba(237, 242, 248, 1);
    border-radius: 8px;
    .photos {
      display: flex;
      justify-content: space-between;
      .photo {
        width: 3.95rem;
        height: 3.95rem;
        object-fit: contain;
        border-radius: 5px;
      }
    }
    .content {
      font-size: 13px;
      color: #63666d;
      margin-top: 10px;
      @include textoverflow(6);
    }
    .share-button {
      margin-top: 30px;
      width: 100%;
      height: 55px;
      background: #ffead7;
      border-radius: 8px;
      border: none;
      outline: none;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      color: #fd9738;
      font-weight: bold;
      .share {
        margin-right: 4px;
        width: 22px;
        height: 22px;
      }
    }
    .ad {
      margin-top: 15px;
      text-align: center;
      font-size: 12px;
      color: #9fa0a5;
    }
  }
  .phone {
    margin-top: 30px;
    a {
      padding: 18px 40px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      width: 345px;
      height: 60px;
      background: #ffffff;
      box-shadow: 0px 3px 10px 0px rgba(237, 242, 248, 1);
      border-radius: 60px;
      white-space: nowrap;
      .phone-text {
        font-size: 18px;
        font-weight: bold;
        color: #9fa0a5;
      }
      .vline {
        margin: 0 20px 0 30px;
        width: 1px;
        height: 100%;
        background-color: #ececee;
      }
      .icon {
        width: 28px;
        height: 28px;
      }
      .sos {
        margin-left: 4px;
        font-size: 14px;
        color: #2f2f32;
        font-weight: bold;
      }
    }
  }
}
</style>
