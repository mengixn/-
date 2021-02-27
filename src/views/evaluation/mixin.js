import { checkRate } from '@/api/publish'
const mixin = {
  data() {
    return {
      writeMessage: '', // 输入内容绑定数据
      sId: this.$route.query.sId,
      tId: this.$route.query.tId,
      list: null // 请求的接口数据
    }
  },
  methods: {
    toPublish() {
      const that = this
      this.$router.replace({
        path: '/publish',
        query: {
          sId: that.tId,
          tId: that.sId,
          type: 1
        }
      })
    }
  },
  mounted() {
    const that = this
    checkRate({ pjid: that.sId }).then(res => {
      console.log(res)
      that.list = res.data
      that.list.fwtd = parseInt(that.list.fwtd)
      that.list.kczl = parseInt(that.list.kczl)
      that.list.kcsh = parseInt(that.list.kcsh)
      that.list.xgcs = parseInt(that.list.xgcs)
    }).catch(err => {
      console.log(err)
    })
  },
  // 设置输入北荣不超过200字
  watch: {
    writeMessage() {
      const that = this
      const fizeNum = that.writeMessage.length
      if (fizeNum > 200) {
        let char = that.writeMessage
        char = char.substr(0, 200)
        that.writeMessage = char
        that.$toast.fail('描述内容不能超过200字')
      }
      that.$refs.num.innerText = fizeNum
    }
  }
}
export default mixin
