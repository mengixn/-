<template>
  <div class="progress" ref="progress">
    <div class="progress-scroll">
      <template v-for="(pro, proIndex) in progress">
        <div class="point" :class="proActive == proIndex && 'active'" :data-name="pro.name" :key="proIndex + 'point'">
          <img class="icon" :src="require(`./images/my-progress/${iconName(proIndex)}.png`)" alt="" />
        </div>
        <div v-if="progress.length != proIndex + 1" class="line" :key="proIndex + 'line'"></div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    progress: {
      type: Array,
      require: true
    },
    proActive: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {}
  },
  watch: {
    proActive(val) {
      this.$nextTick(() => {
        this.$refs.progress.scrollTo(70 * val, 0)
      })
    }
  },
  mounted() {},
  methods: {
    iconName(proIndex) {
      const proActive = this.proActive
      let str = ''
      if (proActive === proIndex) {
        str = `pa${proIndex + 1}`
      }
      if (proActive > proIndex) {
        str = 'true'
      }
      if (proActive < proIndex) {
        str = `p${proIndex + 1}`
      }
      return str
    }
  }
}
</script>

<style lang="scss" scoped>
.progress {
  overflow-x: auto;
  overflow-y: hidden;
  &::-webkit-scrollbar {
    display: none;
  }
  .progress-scroll {
    display: flex;
    align-items: center;
    padding: 30px 20px;
    .point {
      flex-shrink: 0;
      position: relative;
      .icon {
        width: 32px;
        height: 32px;
        object-fit: cover;
      }
      &::after {
        position: absolute;
        left: 50%;
        bottom: -24px;
        transform: translateX(-50%);
        content: attr(data-name);
        white-space: nowrap;
      }
    }
    .active {
      .icon {
        width: 49px;
        height: 49px;
      }
      & ~ .line {
        background-color: #c6c8ce;
      }
      &::before{
        content: '';
        position: absolute;
        z-index: 1;
        width: 35px;
        height: 17px;
        bottom: 38px;
        left: 37px;
        background: url('../images/ging.png') no-repeat center;
        background-size: cover;
      }
      &::after {
        bottom: -15px;
      }
    }
    .line {
      flex-shrink: 0;
      width: 46px;
      height: 2px;
      background-color: #fd9738;
    }
  }
}
</style>
