<template>
  <div>
    <transition name="fade">
      <ul class="chooseBox">
        <li class="chooseItem" @click="modifyTab(0)">男</li>
        <li class="chooseItem" @click="modifyTab(1)">女</li>
      </ul>
    </transition>
  </div>
</template>
<script>
import { update } from '@/api/logout'
export default {
  data() {
    return {
      active: 0,
      gender: '',
      sId: '',
      qyrq: '',
      sshqkh: ''
    }
  },
  methods: {
    modifyTab(index) {
      const that = this
      index === 0 ? this.gender = '男' : this.gender = '女'
      this.$store.commit('change_gender', this.gender)
      update({ sshqkh: that.sshqkh, suserId: that.sId, csrq: that.qyrq, xb: that.gender }).then(res => {
        that.$toast('修改成功')
        that.$router.replace('/resume')
      }).catch(err => {
        console.log(err)
      })
    }
  },
  mounted() {
    const sId = JSON.parse(localStorage.getItem('userInfo'))
    this.sId = sId.user.id
    this.sshqkh = sId.user.sshqkh
    // 获取生日信息
    if (localStorage.getItem('date')) {
      this.qyrq = localStorage.getItem('date')
    } else {
      this.qyrq = sId.contract.qyrq
    }
  }
}
</script>
<style lang="scss" scoped>
.chooseBox {
  width: 100%;
  margin-top: 0.67rem;
  .chooseItem {
    padding: 0.48rem 0;
    background: #fff;
    border-bottom: 1px solid #ececee;
    text-align: center;
    font-size: 0.37rem;
    font-weight: 400;
    color: #040415;
  }
}
.float-enter-active,
.float-leave-active {
  transition: opacity 10.5s;
}
.float-enter, .float-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
