<template>
  <div class="apply-container">
    <div class="navContainer">
      <div class="nav" ref="nav">
        <div class="nav-scroll">
          <div
            class="nav-item"
            :class="[navActive(fwl, fIndex), id == fwl.id ? 'ing' : '']"
            v-for="(fwl, fIndex) in fwlcList"
            :key="fIndex"
            @click="onRoute(navs[fIndex].path, fwl.id, fIndex)"
          >
            {{ fwl.name }}
            <div class="before" v-if="id2 == fwl.id"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="nav-con"></div>
    <div class="layout-content">
      <keep-alive v-if="$route.meta.keepAlive">
        <router-view :dataList="dataList" :dataId="dataId"></router-view>
      </keep-alive>
      <router-view v-else></router-view>
    </div>
  </div>
</template>

<script>
import { processNode } from '@/api/apply'
export default {
  name: 'ApplyLayout',
  data() {
    return {
      classIn: true,
      id: '',
      id2: '',
      dataId: '',
      sshqkh: '',
      fwlcList: [],
      dataList: [],
      navs: [
        { path: 'aTeam', name: '组建团队' },
        { path: 'aSchool', name: '前期规划' },
        { path: 'aSchool', name: '文书写作' },
        { path: 'aSchool', name: '名校申请' },
        { path: 'aSchool', name: '结果跟盯' },
        { path: 'aSchool', name: '行前准备' },
        { path: 'aJapan', name: '我在日本' }
      ]
    }
  },
  watch: {
    $route: {
      handler(val, oldval) {
        const { sshqkh, fwlc } = val.query
        this.id = fwlc
        this.sshqkh = sshqkh
        this.getProcessNode()
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {
  },
  methods: {
    getProcessNode() {
      const that = this
      processNode({ sshqkh: that.sshqkh, fwlc: that.id }).then(res => {
        console.log(res)
        const { fwlcList, khfwlcNum, khfwlcNumNow, nowNode, nowNodeId } = res.data
        that.fwlcList = fwlcList
        that.id = khfwlcNumNow
        that.id2 = khfwlcNum
        that.dataList = nowNode
        that.dataId = nowNodeId
        that.fwlcList.forEach((obj, fIndex) => {
          if (that.id === obj.id) {
            const path = that.navs[fIndex].path
            const query = that.$route.query
            window.document.title = that.navs[fIndex].name
            if (!that.$route.path.match(path)) {
              that.$router.replace({ path, query })
            }
            that.$nextTick(() => {
              that.$refs.nav.scrollTo(60 * fIndex, 0)
            })
          }
        })
      })
    },
    onRoute(path, fwlc, index) {
      if (fwlc !== this.$route.query.fwlc) {
        this.$router.replace({
          path,
          query: {
            sshqkh: this.sshqkh,
            fwlc
          }
        })
      }
    },
    navActive(obj, fIndex) {
      if (this.id === obj.id) {
        return 'active'
      }
      return ''
    }
  }
}
</script>

<style lang="scss" scoped>
.apply-container {
  .navContainer {
    width: 100%;
    height: 55px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    .nav {
      padding: 0 15px;
      background-color: #fff;
      overflow-x: auto;
      &::-webkit-scrollbar {
        display: none;
      }
      .nav-scroll {
        height: 55px;
        height: 55px;
        box-sizing: border-box;
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        .nav-item {
          position: relative;
          white-space: nowrap;
          font-size: 14px;
          color: #9fa0a5;
          margin-right: 30px;
          & .before {
            content: '';
            position: absolute;
            width: 35px;
            height: 18px;
            top: -12px;
            right: -30px;
            background: url('../applyForProgress/images/ging.png') no-repeat center;
            background-size: cover;
          }
          &.active {
            font-size: 20px;
            color: #2f2f32;
            font-weight: bold;
            &::after {
              position: absolute;
              bottom: -8px;
              left: 50%;
              transform: translateX(-50%);
              content: '';
              width: 24px;
              height: 3px;
              border-radius: 2px;
              background-color: #fd9738;
            }
          }
          &:last-child .before,
          &:first-child .before{
            display: none;
          }
        }
      }
    }
  }
  .nav-con {
    height: 55px;
  }
  .layout-content {
    padding: 15px 20px 40px;
    background-color: #f8f9fb;
  }
}
</style>
