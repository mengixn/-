import { getTutor } from '@/api/tutor'
const mixin = {
  data() {
    return {
      sId: '',
      phone: '', // 电话号码
      phoneShow: false, // 弹窗显隐控制
      infoList: null // 总数据
    }
  },
  methods: {
    concat: function(phone) {
      console.log(phone)
      this.phoneShow = true
      this.phone = phone
    },
    toDetails: function(id, type) {
      this.$router.push('/tutorDetail?id=' + id + '&type=' + type)
    },
    cpnClick: function(value) {
      // 电话执行完返回数据（子传父）
      this.phoneShow = value
    },
    pageInit(id) {
      const that = this
      getTutor({ sshqkh: id }).then(res => {
        console.log(res)
        that.infoList = res.data.tutorTeam
      })
    }
  },
  mounted() {
    const sId = JSON.parse(localStorage.getItem('userInfo'))
    this.sId = sId.user.sshqkh
    this.pageInit(this.sId)
  }
}
export default mixin
