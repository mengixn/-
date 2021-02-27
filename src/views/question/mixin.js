import { myQuesion } from '@/api/question'
const mixin = {
  data() {
    return {
      // 选择项
      list: ['对于作业内容不清楚', '课程不是很明白', '不知道怎么去完成作业', '需要老师帮助'],
      // 问题选择框
      result: [],
      checked: false,
      activeIcon: require('../../assets/question/checked.png'),
      inactiveIcon: require('../../assets/question/check.png'),
      // 输入内容绑定数据
      writeMessage: '',
      database: '',
      tabActive: '',
      sId: this.$route.query.id
    }
  },
  // 设置内容输入不超过200字
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
  },
  methods: {
    submits() {
      const that = this
      myQuesion({
        sshfwjd: that.sId,
        bz: that.writeMessage + ',' + that.database
      }).then(res => {
        that.$toast.success('发布成功')
        that.$router.go(-1)
      }).catch(err => {
        console.log(err)
      })
    },
    tabChange(e) {
      const that = this
      that.database += e.target.innerHTML + ','
    }
  }
}
export default mixin
