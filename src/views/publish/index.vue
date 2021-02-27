<template>
  <div>
    <div class="publish mx-content">
      <div class="mx-box">
        <div class="publishUser">
          <p>
            <span>服务节点</span><span>{{ list.name }}</span>
          </p>
          <p>
            <span>课程时间</span><span>{{ list.yjkssj }}</span>
          </p>
        </div>
        <!-- 修改 -->
        <div class="publishInfo">
          <ul class="rateList">
            <li class="rateItem">
              服务态度
              <p class="rateP">
                <van-rate v-model="value1" :size="24" color="#FD9738" />
              </p>
            </li>
            <li class="rateItem">
              课程质量
              <p class="rateP">
                <van-rate v-model="value2" :size="24" color="#FD9738" />
              </p>
            </li>
            <li class="rateItem">
              课程收获
              <p class="rateP">
                <van-rate v-model="value3" :size="24" color="#FD9738" />
              </p>
            </li>
          </ul>
          <h2>热门标签<em>（可多选，非必选）</em></h2>
          <ul class="rateTag">
            <li
              class="tagItem"
              v-for="(item, index) in tag"
              :key="index"
              ref="tags"
              :data-id="item.id"
              @click="changeTag(index, item.id)"
              :class="{ active: colorTb.indexOf(index) > -1 }"
            >
              {{ item.name }}
            </li>
          </ul>
          <div class="writeBox">
            <textarea
              name=""
              id=""
              cols="30"
              rows="1"
              placeholder="满意你就夸一夸"
              v-model="writeMessage"
              ref="text"
            ></textarea>
            <p><span ref="num">0</span>/200</p>
          </div>
        </div>
        <!--  首次填写
        <div class="publishInfo" v-else>
          <p>不是修改首次填写</p>
          <ul class="rateList">
            <li class="rateItem">
              服务态度
              <p class="rateP">
                <van-rate v-model="value1" :size="24" color="#FD9738" />
              </p>
            </li>
            <li class="rateItem">
              课程质量
              <p class="rateP">
                <van-rate v-model="value2" :size="24" color="#FD9738" />
              </p>
            </li>
            <li class="rateItem">
              课程收获
              <p class="rateP">
                <van-rate v-model="value3" :size="24" color="#FD9738" />
              </p>
            </li>
          </ul>
          <h2>热门标签<em>（可多选，非必选）</em></h2>
          <ul class="rateTag">
            <li
              class="tagItem"
              v-for="(item, index) in tag"
              :key="index"
              ref="tags"
              :data-id="item.id"
              @click="changeTag(index, item.id)"
              :class="{ active: colorTb.indexOf(index) > -1 }"
            >
              {{ item.name }}
            </li>
          </ul>
          <div class="writeBox">
            <textarea
              name=""
              id=""
              cols="30"
              rows="1"
              placeholder="你可以在这里添加其他的描述哦"
              v-model="writeMessage"
              ref="text"
            ></textarea>
            <p><span ref="num">0</span>/200</p>
          </div>
        </div> -->
        <div class="submitBtn" @click="publish"><p>提交</p></div>
        <!-- <div class="anonymity">
          <van-checkbox v-model="checked">
            匿名评价
            <template #icon="props">
              <img class="img-icon" :src="props.checked ? activeIcon : inactiveIcon" />
            </template>
          </van-checkbox>
        </div> -->
      </div>
    </div>
    <van-popup v-model="show">
      <div class="contentWrapper">
        <img src="../../assets/question/toast.gif" alt="" class="toast" />
        <img src="../../assets/question/thanks.png" alt="" class="thanks" />
        <p class="backHome" @click="toMain()">返回首页</p>
        <p class="checkRate" @click="toDaiban()">查看评价</p>
      </div>
    </van-popup>
  </div>
</template>
<script>
import mixin from './mixin.js'
export default {
  mixins: [mixin],
  data() {
    return {}
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
@import './mixin.scss';
/deep/ .van-popup{
  overflow: initial;
  .contentWrapper{
        border-radius: 0.4rem;
  }
}
</style>
