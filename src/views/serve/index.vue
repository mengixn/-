<template>
  <div class="serve wtg">
    <div class="banner content">
      <p>日本申请-服务流程</p>
    </div>
    <div class="collapse content">
      <p>
        七大阶段
        <router-link to="/applyForProgress">
          <span>我的申请进度</span>
        </router-link>
      </p>
      <van-collapse v-model="activeNames" :border="false" accordion>
        <template v-for="(item, index) in list.bzhfwList">
          <template v-if="item.name === '组建团队'">
            <van-collapse-item
              :key="index"
              :title="(index > 8 ? index + 1 : '0' + (index + 1)) + '.' + item.name"
              :name="index"
              :border="false"
              class="other"
            >
              <div class="item-list">
                您好！您的留学申请团队已经组建成功啦~团队成员如下：<br /><br />
                <a
                  v-for="(item1, index1) in list.tutorTeam"
                  :key="index1"
                  @click="toTutor(item1.tutorId, item1.tutorType)"
                >
                  <span class="a-span">{{ item1.tutorName }}</span>
                  {{ item1.tutorDslx }}
                </a>
                <br />
                导师会尽快与您取得联系，请注意邮箱和手机保持畅通哟~
                <div class="btn" @click="toNodes(item.fwlcid)">详情 >></div>
              </div>
            </van-collapse-item>
          </template>
          <template v-else-if="item.name === '我在日本'">
            <van-collapse-item
              :key="index"
              :title="(index > 8 ? index + 1 : '0' + (index + 1)) + '.' + item.name"
              :name="index"
              :border="false"
              class="other"
            >
              <div class="item-list">
                恭喜您！已经顺利抵达日本并入学名校，在未来的日子里，彬彬教育会一如既往的陪伴您！请您不用担心，在海外生活或者学习有任何问题，您依旧可以联系彬彬教育，我们将竭诚为您服务！
                <div class="phone">
                  <a href="tel:4009009770">
                    <span class="phone-text">400-900-9770</span>
                    <div class="vline"></div>
                    <img src="@/assets/icon/phone.png" alt="" class="icon" />
                    <span class="sos">紧急联系</span>
                  </a>
                </div>
                <div class="btn" @click="toNodes(item.fwlcid)">详情 >></div>
              </div>
            </van-collapse-item>
          </template>
          <template v-else>
            <van-collapse-item
              :key="index"
              :title="(index > 8 ? index + 1 : '0' + (index + 1)) + '.' + item.name"
              :name="index"
              :border="false"
              :disabled="item.bzhfwjd.length > 1 ? false : true"
            >
              <div
                class="item-list"
                :class="item.bzhfwjd.length > 1 ? '' : 'justOne'"
                v-for="(item1, index1) in item.bzhfwjd"
                :key="index1"
              >
                <p>{{ item1.name }}</p>
                <p v-if="item1.ms">{{ item1.ms }}</p>
              </div>
            </van-collapse-item>
          </template>
        </template>
      </van-collapse>
    </div>
  </div>
</template>
<script>
import { getLists } from '@/api/serve'
export default {
  data() {
    return {
      activeNames: [],
      list: [],
      sId: ''
    }
  },
  methods: {
    toTutor(id, type) {
      this.$router.push(`/tutorDetail?id=${id}&type=${type}`)
    },
    toNodes(fwlc) {
      const that = this
      this.$router.push(`/applyMore?sshqkh=${that.sId}&fwlc=${fwlc}`)
    }
  },
  mounted() {
    const that = this
    const sId = JSON.parse(localStorage.getItem('userInfo'))
    this.sId = sId.user.sshqkh
    getLists({ sshqkhu: that.sId })
      .then(res => {
        console.log(res)
        that.list = res.data
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>
<style lang="scss" scoped>
@import './index';
</style>
