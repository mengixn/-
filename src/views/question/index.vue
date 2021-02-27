<template>
  <div class="question">
    <div class="ques mx-content">
      <div class="mx-box">
        <div class="quesBox">
          <h3>请选择疑问原因(可多选)：</h3>
          <van-checkbox-group v-model="result">
            <van-checkbox v-model="checked" v-for="(item,index) in list" :key="index" :name="index" :data-name="item" ref="checkBox" @click="tabChange($event)">
              {{item}}
              <template #icon="props">
                <img class="img-icon" :src="props.checked ? activeIcon : inactiveIcon" />
              </template>
            </van-checkbox>
          </van-checkbox-group>
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
        </div>
        <div class="sureBtn" @click="submits"><p>确认</p></div>
      </div>
    </div>
  </div>
</template>
<script>
import mixin from './mixin.js'
export default {
  mixins: [mixin],
  data() {
    return {}
  }
}
</script>
<style lang="scss" scoped>
@import './mixin.scss';
</style>
