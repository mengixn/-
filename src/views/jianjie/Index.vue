<template>
  <div class="content">
    <template v-if="!type">
      {{ tit }}
    </template>
    <template v-else>
      <img :src="tit" alt="" />
      <span class="tip">长按图片保存到手机</span>
    </template>
    <div class="btn" @click="go">
      <span class="btn-span">我要咨询</span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tit: '',
      type: this.$route.query.type
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
    this.tit = localStorage.getItem('jianjie')
  }
}
</script>
<style lang="scss" scoped>
.content {
  font-size: 16px;
  line-height: 26px;
  letter-spacing: 0.5px;
  color: #000;
  padding: 0.6rem;
  img {
    width: 100%;
    object-fit: contain;
    display: block;
  }
  .tip{
    text-align: right;
    color: #000;
    display: block;
    font-size: .3rem;
  }
  .btn {
    width: 100%;
    height: 1.47rem;
    line-height: 1.47rem;
    background: #fd9738;
    box-shadow: 0rem 0.2rem 0.4rem 0rem rgba(253, 151, 56, 0.4);
    border-radius: 0.2rem;
    color: #ffffff;
    font-size: 0.43rem;
    font-weight: bold;
    text-align: center;
    margin-top: .4rem;
    .btn-span {
      position: relative;
    }
  }
}
</style>
