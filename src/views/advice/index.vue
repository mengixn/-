<template>
  <div class="question">
    <div class="ques mx-content">
      <div class="mx-box ">
        <div class="quesBox">
          <div class="writeBox">
            <textarea
              name=""
              id=""
              cols="30"
              rows="1"
              placeholder="请描述你的问题，彬彬留学老师会在2小时内解答"
              v-model="writeMessage"
              ref="text"
            ></textarea>
            <p><span ref="num">0</span>/200</p>
          </div>
        </div>
        <div class="sureBtn" @click="submits"><p>提交</p></div>
      </div>
    </div>
  </div>
</template>
<script>
import mixin from './mixin.js'
export default {
  mixins: [mixin],
  data() {
    return {
    }
  }
}
</script>
<style lang="scss" scoped>
@import './mixin.scss';
</style>
