<template>
  <div>
    <div class="con">
      <h3>该账号已退出登录，请登录后再查看。</h3>
      <p>将在<b>{{miao}}</b>后自动跳转到登录界面</p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      miao: 8
    }
  },
  mounted() {
    const that = this
    const set = setInterval(() => {
      if (that.miao > 0) {
        that.miao--
      } else {
        clearInterval(set)
      }
    }, 1000)
    setTimeout(() => {
      localStorage.clear()
      that.$router.replace('login')
    }, 8000)
  }
}
</script>
<style lang="scss" scoped>
.con{
  width: 100%;
  padding: .4rem;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  text-align: center;
  font-size: 16px;
  line-height: 28px;
}
</style>
