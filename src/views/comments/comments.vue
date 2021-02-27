<template>
  <div class="minwidth">
    <div class="teacher_list">
      <div class="maxwidth">
        <div class="flex-sb">
          <div class="jiedian">服务节点</div>
          <div class="content">{{listext.name}}</div>
        </div>
        <div class="flex-sb">
          <div class="jiedian">课程时间</div>
          <div class="content">{{listext.sjwcsj}}</div>
        </div>
        <div class="flex-sb">
          <div class="jiedian">主讲老师</div>
          <div class="content">暂无</div>
        </div>
      </div>
    </div>
    <!-- 评语 -->
    <div class="comments">
      <div class="comment"><em></em>评语</div>
      <div class="school">
        <div class="maxwidth">
          <div class="text" v-html="listext.dspy"></div>
        </div>
      </div>
    </div>
    <!-- 评语 -->
    <!-- 提升建议 -->
    <div class="advice">
      <div class="comment"><em></em>提升建议</div>
      <div class="ascension">
        <div class="header">{{listext.jdms}}</div>
        <div class="maincate">
          <template v-for="(item,index) in imgurl">
              <router-link :to="{path:item.tzdzlj}" :key="index">
            <!-- <a href="javascript:" :key="index"> -->
              <img :src="item.cptpdz" class="site" alt="">
              <div class="shadow">
                <div class="flex-sb">
                  <div class="english">{{item.name}}</div>
                  <div class="bgc"></div>
                </div>
              </div>
              </router-link>
            <!-- </a> -->
          </template>
        </div>
      </div>
    </div>
    <!-- 提升建议 -->
  </div>
</template>

<script>
import { pingyu } from '@/api/user'
export default {
  data() {
    return {
      listext: {
        name: '规划头脑风暴',
        sjwcsj: '2021-02-06',
        teacher: '王老师',
        dspy: '你还是有很大希望录取到名校的，不过建议在现有成绩的基础上再努力再去提升一些，日语冲刺一下更高的分数，如果时间来的及再去考一个托福成绩，为申请名校增加筹码，加油，希望你梦圆名校......',
        jianyi: '这两款产品挺适合你现在的阶段的，'
      },
      imgurl: [
        {
          img: require('./images/xljy4.png')
        },
        {
          img: require('./images/xljy5.png')
        },
        {
          img: require('./images/xljy4.png')
        },
        {
          img: require('./images/xljy5.png')
        }
      ]
    }
  },
  mounted() {
    pingyu({ jdid: 'a262021474274D9jMhS5' }).then(res => {
      this.listext = res.data.info
      this.imgurl = res.data.tjcp
    }).catch(error => {
      this.$toast('数据走丢了~')
      console.log(error)
    })
  }
}
// 335736383
</script>

<style lang="scss" scoped>
.minwidth {
  width: 90%;
  margin: 0 auto;
  .advice {
    .comment {
      margin: 34px 0 10px 0;
      font-size: 16px;
      font-weight: bold;
      color: #2f2f32;
      vertical-align: middle;
      em {
        width: 24px;
        height: 24px;
        background: url('../comments/images/xljy3.png') no-repeat center/cover;
        display: inline-block;
        vertical-align: middle;
      }
    }
    .ascension {
      width: 100%;
      background: #fff;
      padding-bottom: 10px;
      border-radius: 8px;
      .header {
        padding: 16px 10px 30px 10px;
        line-height: 22px;
        color: #63666d;
      }
      .maincate {
        width: 98%;
        white-space: nowrap;
        overflow-x: scroll;
        overflow-y: hidden;
        -webkit-backface-visibility: hidden;
        -webkit-perspective: 1000;
        -webkit-overflow-scrolling: touch;
        text-align: justify;
        box-sizing: border-box;
        margin: 0 auto;
        a {
          display: inline-block;
          position: relative;
          // margin-right: 10px;
          img {
            width: 168px;
            object-fit: cover;
            height: 123px;
          }
          .shadow {
            width: 90%;
            height: 60px;
            background: linear-gradient(180deg, rgba(47, 47, 50, 0) 0%, rgba(47, 47, 50, 0.8) 100%);
            border-radius: 0px 0px 8px 8px;
            position: absolute;
            bottom: 12px;
            left: 9px;
            .flex-sb {
              display: flex;
              justify-content: space-between;
              width: 88%;
              margin: 24px auto;
              .english {
                font-size: 16px;
                font-weight: 800;
                color: #ffffff;
              }
              .bgc {
                width: 14px;
                height: 14px;
                background: url('./images/xljy1.png') no-repeat center/cover;
                margin-top: 6px;
              }
            }
          }
        }
      }
    }
  }
  .comments {
    .comment {
      margin: 34px 0 10px 0;
      font-size: 16px;
      font-weight: bold;
      color: #2f2f32;
      vertical-align: middle;
      em {
        width: 24px;
        height: 24px;
        background: url('../comments/images/xljy3.png') no-repeat center/cover;
        display: inline-block;
        vertical-align: middle;
      }
    }
    .school {
      width: 100%;
      background: #fff;
      padding: 15px 0;
      line-height: 22px;
      border-radius: 8px;
      .maxwidth {
        width: 92%;
        margin: 0 auto;
        .text {
          color: #63666d;
        }
      }
    }
  }
  .teacher_list {
    width: 100%;
    padding-bottom: 12px;
    background: #ffffff;
    box-shadow: 0px 3px 10px 0px rgba(237, 242, 248, 1);
    border-radius: 8px;
    margin-top: 15px;
    .maxwidth {
      width: 90%;
      margin: 0 auto;
      padding-top: 20px;

      .flex-sb {
        display: flex;
        justify-content: space-between;
        margin-bottom: 12px;
        .jiedian {
          font-size: 14px;
          font-weight: 400;
          color: #9fa0a5;
        }
        .content {
          font-size: 14px;
          font-weight: 400;
          color: #2f2f32;
        }
      }
    }
  }
}
</style>
