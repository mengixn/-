<template>
  <div class="toHome">
    <div class="btn" @click="toHome">
      <img src="../assets/icon/home.png" alt="" />
      <span>主页</span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  methods: {
    toHome() {
      this.$router.push('/home')
    }
  },
  mounted() {
  }
}
</script>
<style lang="scss" scoped>
.btn {
  width: 1.6rem;
  height: 1.6rem;
  background: rgb(66, 66, 66);
  box-shadow: 0rem 0.2rem 0.4rem 0rem rgba(66, 66, 66, 0.4);
  position: fixed;
  z-index: 9998;
  right: .3rem;
  border-radius: 50%;
  top: 80%;
  text-align: center;
  img{
    width: 0.6rem;
    height: 0.6rem;
    margin: .25rem auto .05rem;
    display: block;
  }
  span{
    color: #FFFFFF;
    font-size: .27rem;
  }
}
</style>
