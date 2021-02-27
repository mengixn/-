 <template>
  <div class="page">
    <div class="client">
      <div class="author">
        <img :src="userInfo.user.tx" alt="" />
      </div>
      <div class="info">
        <div class="col">
          <div class="label">姓名</div>
          <span class="lbael-value">{{ userInfo.user.name }}</span>
        </div>
        <div class="col" v-for="(col, cIndex) in userInfo.contract.slice(0, 1)" :key="cIndex">
          <div class="label">签约时间</div>
          <span class="lbael-value">{{ col.qyrq.split(' ')[0] }}</span>
        </div>
        <!-- <div class="col">
          <div class="label">全程咨询导师</div>
          <span class="lbael-value">张老师</span>
        </div>
        <div class="col">
          <div class="label">规划导师</div>
          <span class="lbael-value">廖老师</span>
        </div> -->
      </div>
    </div>
    <div class="container">
      <div class="progress">
        <div class="p-title">
          <div class="label">目前进度</div>
          <div class="label-value">{{ progress[proActive] && progress[proActive].name }}</div>
        </div>
        <my-progress :progress="progress" :proActive="proActive" class="p-progress"></my-progress>
        <div class="content">
          <div class="content-title">{{ progress[proActive] && progress[proActive].name }}</div>
          <keep-alive>
            <component v-bind:is="proConponents[proActive].component" :dataList="nowNode"></component>
          </keep-alive>
        </div>
        <div class="more" @click="onRoute('/applyMore', progress[proActive].id)">
          查看更多 <img src="@/assets/icon/arrw-right.png" alt="" class="icon" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import myProgress from './component/my-progress'
import School from './school.vue'
import Team from './team.vue'
import Site from './site.vue'
import { process } from '@/api/apply'
export default {
  components: {
    myProgress
  },
  data() {
    return {
      id: '',
      progress: [],
      proConponents: [
        { component: Team },
        { component: School },
        { component: School },
        { component: School },
        { component: School },
        { component: School },
        { component: Site }
      ],
      nowNode: null
    }
  },
  computed: {
    proActive() {
      if (!this.progress.length) {
        return 0
      }
      const id = this.id
      const index = this.progress.findIndex((item, index) => {
        return item.id === id
      })
      return ~~index
    },
    userInfo() {
      const user = JSON.parse(localStorage.getItem('userInfo'))
      return user
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    onRoute(path, fwlc) {
      const userid = this.userInfo.user.sshqkh
      this.$router.push({
        path,
        query: { sshqkh: userid, fwlc: this.id }
      })
    },
    getList() {
      const userid = this.userInfo.user.sshqkh
      process({ sshqkh: userid }).then(res => {
        console.log(res)
        const { fwlcList: progress, khfwlcNum, nowNode } = res.data
        this.progress = progress
        this.id = khfwlcNum
        this.nowNode = nowNode
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  background-color: #fff;
  min-height: 100vh;
  padding-top: 28px;
  .client {
    display: flex;
    padding: 0 30px;
    .author {
      margin-right: 18px;
      flex-shrink: 0;
      img {
        border-radius: 50%;
        width: 60px;
        height: 60px;
        object-fit: cover;
      }
    }
    .info {
      .col {
        display: flex;
        font-size: 14px;
        line-height: 2em;
        .label {
          color: #2f2f32;
          font-weight: bold;
          width: 6em;
          margin-right: 2em;
        }
        .lable-value {
          color: #63666d;
        }
      }
    }
  }
  .container {
    padding: 30px 0 50px;
    margin-top: 20px;
    box-shadow: 0px -3px 10px 0px rgba(237, 242, 248, 1);
    border-radius: 15px 15px 0 0;
    .progress {
      --pd: 15px;
      .p-title {
        padding: 0 var(--pd);
        display: flex;
        font-size: 16px;
        font-weight: bold;
        .label {
          color: #2f2f32;
        }
        .label-value {
          margin-left: 15px;
          color: #fd9738;
        }
      }
      .content {
        margin-top: 50px;
        padding: 0 var(--pd);

        .content-title {
          font-size: 16px;
          color: #2f2f32;
          font-weight: bold;
          padding-bottom: 15px;
        }
      }
      .more {
        margin-top: 20px;
        text-align: center;
        font-size: 13px;
        color: #9fa0a5;
        .icon {
          width: 14px;
          height: 14px;
        }
      }
    }
  }
}
</style>
