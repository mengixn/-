import { getTutorDetails } from '@/api/tutor'
const mixin = {
  data() {
    return {
      query: null, // 路由参数
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
    toDetails: function() {
      this.$router.push('/tutorDetail')
    },
    cpnClick: function(value) {
      // 电话执行完返回数据（子传父）
      this.phoneShow = value
    },
    pageInit(id, type) {
      const that = this
      getTutorDetails({ id: id, type: type }).then(res => {
        console.log(res)
        that.infoList = res.data.nodeTeam
      })
    }
  },
  mounted() {
    console.log(this.$route.query)
    this.query = this.$route.query
    this.pageInit(this.query.id, this.query.type)
  }
}
export default mixin
