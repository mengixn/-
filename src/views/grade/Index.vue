<template>
  <div class="grade wtg">
    <div class="content">
      <div @click="toDetails('biaohua')">
        <img src="./image/i1.png" alt="">
        标化成绩
        <i></i>
      </div>
      <div @click="toDetails('yingyu')">
        <img src="./image/i2.png" alt="">
        语言成绩
        <i></i>
      </div>
      <div @click="toDetails('xueshu')">
        <img src="./image/i3.png" alt="">
        学术背景
        <i></i>
      </div>
      <div @click="toDetails('shixi')">
        <img src="./image/i4.png" alt="">
        实习经历
        <i></i>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
    }
  },
  methods: {
    toDetails: function(url) {
      this.$router.push('/gradeDetails?url=' + url)
    }
  }
}
</script>
<style lang="scss" scoped>
.content{
  padding-top: .4rem;
  & > div{
    width: 100%;
    position: relative;
    height: 1.71rem;
    line-height: 1.71rem;
    padding-left: 1.45rem;
    box-sizing: border-box;
    color: #2F2F32;
    font-size: .43rem;
    font-weight: bold;
    background: #FFFFFF;
    box-shadow: 0rem 0.07rem 0.27rem 0rem #EDF2F8;
    border-radius: 0.2rem;
    margin-bottom: .4rem;
    &:last-child{
      margin-bottom: 0;
    }
    i{
      width: .37rem;
      height: .37rem;
      position: absolute;
      right: .4rem;
      top: 50%;
      transform: translateY(-50%);
      background: url('./image/ri.png') no-repeat center;
      background-size: cover;
    }
    img{
      width: .85rem;
      height: .85rem;
      position: absolute;
      left: .4rem;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>
