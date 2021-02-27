<template>
  <div>
    <div class="notice">
      <div class="noticeTui">
        <p>
          <img src="../../assets/question/bg2.png" alt="" />
          <span
            >共<b>{{ list.count }}</b
            >条消息</span
          >
          <span
            >未读<b ref="unread">{{ list.unread }}</b
            ><em>条</em></span
          >
        </p>
        <p @click="yiRead">全部标为已读</p>
      </div>
      <div class="mx-content">
        <div class="mx-box">
          <ul class="noticeList">
              <van-list v-model="loading" :finished="finished" finished-text="没有更多了" loading-text="加载中……"  @load="onLoad" :offset="100">
                <van-cell v-for="(item, index) in forList" :key="index">
                  <!-- 开课提醒样式 -->
                  <li class="noticeItem" @click="changeKai(item)" :key="index" v-if="item.txbt == '课程开始服务提醒'">
                    <h5>{{ item.tssj }}</h5>
                    <div>
                      <h3>{{ item.txbt}}<em :class="[item.sfyd == '是' ? 'tag' : 'untag']"></em></h3>
                      <span class="others">{{ item.nr }}</span>
                    </div>
                  </li>
                  <!-- 确认方案样式 -->
                  <li class="noticeItem" @click="changeSure(item)" :key="index" v-else-if="item.txbt == '文书待确认提醒'">
                    <h5>{{ item.tssj }}</h5>
                    <div class="clearfix">
                      <p class="fl">
                        <span>{{ item.txbt}}<em :class="[item.sfyd == '是' ? 'tag' : 'untag']"></em></span>
                        <span>{{ item.nr }}</span>
                      </p>
                      <p class="fr"></p>
                    </div>
                  </li>
                  <!-- 待评价提醒 -->
                  <li class="noticeItem" @click="changeNotice(item)" :key="index" v-else>
                    <h5>{{ item.tssj }}</h5>
                    <div class="clearfix">
                      <p class="fl">
                        <span>{{ item.txbt}}<em :class="[item.sfyd == '是' ? 'tag' : 'untag']"></em></span>
                        <span>{{ item.nr }}</span>
                      </p>
                      <p class="fr"></p>
                    </div>
                  </li>
                </van-cell>
              </van-list>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { notice, read } from '@/api/question'
export default {
  data() {
    return {
      list: [],
      forList: [],
      userId: '',
      houqiId: '', // 全部已读id
      sfydCondition: '', // 是否已读状态
      hqId: '',
      loading: false,
      finished: false,
      page: 0, // 请求第几页
      pageSize: 10, // 每页请求的数量
      total: 0 // 总共的数据条数
    }
  },
  mounted() {
    const that = this
    const sId = JSON.parse(localStorage.getItem('userInfo'))
    that.userId = sId.user.id
    that.hqId = sId.user.sshqkh
    notice({ sshfwjd: that.userId, bbhqkh: that.hqId })
      .then(res => {
        that.list = res.data
        // that.forList = res.data.xxtsList.data;
        that.list.xxtsList.data.forEach(item => {
          that.houqiId = item.bbhqkh
        })
      })
      .catch(err => {
        console.log(err)
      })
  },
  methods: {
    // 全部已读
    yiRead() {
      const that = this
      read({
        xxid: that.userId,
        bbhqkh: that.houqiId,
        type: 2
      })
        .then(res => {
          // 设置单条消息为已读状态
          that.forList.forEach(item => {
            item.sfyd = '是'
          })
          that.$refs.unread.innerText = 0

          that.$toast.success('成功')
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 开课提醒样式
    changeKai(item) {
      const that = this
      read({ xxid: item.id })
        .then(res => {
          that.$router.push(`/applyMore/aSchool?sshqkh=${that.hqId}&fwlc=${item.fwlc}&gsfwjd=${item.gsfwjd}`)
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 服务节点确认
    changeSure(item) {
      const that = this
      read({ xxid: item.id })
        .then(res => {
          that.$router.push('/daiban')
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 待评价
    changeNotice(item) {
      const that = this
      read({ xxid: item.id })
        .then(res => {
          that.$router.push('/daiban?type=1')
        })
        .catch(err => {
          console.log(err)
        })
    },
    getList() {
      const that = this
      notice({ sshfwjd: that.userId, bbhqkh: that.hqId, page: that.page })
        .then(res => {
          console.log(res)
          const rows = res.data.xxtsList.data // 请求返回当页的列表
          const newList = that.forList
          that.loading = false
          that.total = res.data.xxtsList.total
          if (rows == null || rows.length === 0) {
            // 加载结束
            that.finished = true
            return
          }
          //  将新数据与老数据进行合并
          that.forList = newList.concat(rows)
          // 如果列表数据条数>=总条数，不再触发滚动加载
          if (that.forList.length >= that.total) {
            that.finished = true
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    onLoad() {
      this.page++
      this.getList()
    }
  }
}
</script>
<style lang="scss" scoped>
@import './mixin.scss';
</style>
