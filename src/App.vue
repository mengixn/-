<template>
  <div id="app">
    <router-view />
    <toHome v-if="show" />
  </div>
</template>
<script>
import toHome from '@/components/toHome'
export default {
  name: 'App',
  components: { toHome },
  data() {
    return {
      show: true
    }
  },
  mounted() {
    window.addEventListener('offline', () => {
      // 网络由正常常到异常时触发
      sessionStorage.locationUrl = window.location.href
      this.$router.replace('/networkError')
    })
    window.addEventListener('online', () => {
      window.location.href = sessionStorage.locationUrl
    })
  },
  watch: {
    $route(to, from) {
      if (to.query.log === 1) {
        this.show = false
      } else {
        this.show = true
      }
    }
  }
}
</script>
<style lang="scss">
body {
  padding-bottom: constant(safe-area-inset-bottom); /* 兼容 iOS < 11.2 */
  padding-bottom: env(safe-area-inset-bottom); /* 兼容 iOS >= 11.2 */
}
</style>
