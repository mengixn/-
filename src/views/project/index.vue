<template>
  <div class="question">
    <div class="ques mx-content">
      <div class="mx-box">
        <div class="quesBox">
           <p>确定<span>"{{name}}"</span>方案无误吗？</p>
         <div class="writeBox">
            <textarea name="" id="" cols="30" rows="1" placeholder="你可以在这里添加其他的描述哦" v-model="writeMessage" ref="text"></textarea>
          <p><span ref="num">0</span>/200</p>
         </div>
        </div>
        <div class="sureBtn" @click="commit(id, writeMessage)"><p>提交</p></div>
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
  },
  methods: {
  },
  mounted() {
  }
}
</script>
<style lang="scss" scoped>
@import './mixin.scss';
</style>
