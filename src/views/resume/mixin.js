import { logout, update } from '@/api/logout'
const mixin = {
  data() {
    return {
      sId: '', // 用户id
      show: false,
      minDate: new Date(1020, 0, 1),
      maxDate: new Date(3025, 10, 1),
      currentDate: new Date(),
      qyrq: '',
      sshqkh: '',
      gender: '',
      list: []
    }
  },
  mounted() {
    const that = this
    const sId = JSON.parse(localStorage.getItem('userInfo'))
    this.sId = sId
    this.sshqkh = sId.user.sshqkh
    logout({ suserId: that.sId.user.id }).then(res => {
      that.list = res.data
      // 在页面加载时读取localStorage里的状态信息
      if (localStorage.getItem('gender')) {
        that.list.xb = localStorage.getItem('gender')
      }
      if (localStorage.getItem('date')) {
        that.list.csrq = localStorage.getItem('date')
      }
    }).catch(err => {
      console.log(err)
    })
  },
  methods: {
    // 格式化數據
    timeFormat(time) { // 时间格式化 2019-09-08
      const year = time.getFullYear()
      const month = time.getMonth() + 1
      const day = time.getDate()
      return year + '-' + (month > 9 ? month : '0' + month) + '-' + day
    },
    onConfirm(date) {
      const that = this
      this.show = false
      this.list.csrq = this.timeFormat(date)
      this.$store.commit('change_date', this.list.csrq)
      // 获取生日信息
      if (localStorage.getItem('date')) {
        this.qyrq = localStorage.getItem('date')
      } else {
        this.qyrq = this.sId.contract.qyrq
      }
      // 获取性别
      if (localStorage.getItem('gender')) {
        this.gender = localStorage.getItem('gender')
      } else {
        this.gender = this.sId.user.xb
      }
      console.log(that.qyrq)
      update({ sshqkh: that.sshqkh, suserId: that.sId.user.id, csrq: that.qyrq, xb: that.gender }).then(res => {
        that.$toast('修改成功')
      }).catch(err => {
        console.log(err)
      })
    },
    onCancel() {
      this.show = false
    },
    // 退出登录
    logOut() {
      this.list.xb = ''
      this.list.csrq = ''
      localStorage.removeItem('userInfo')
      this.$router.replace('/login')
    }
  }
}
export default mixin
