import { getLists } from '@/api/advice'
const mixin = {
  data() {
    return {
      sId: '',
      writeMessage: '' // 输入内容绑定数据
    }
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
  },
  methods: {
    submits() {
      const that = this
      getLists({
        content: that.writeMessage,
        sshqkh: that.sId
      }).then(res => {
        that.$toast.success('发布成功')
        setTimeout(() => {
          that.$router.replace('/')
        }, 2000)
      }).catch(err => {
        console.log(err)
      })
    }
  },
  mounted() {
    const sId = JSON.parse(localStorage.getItem('userInfo'))
    this.sId = sId.user.sshqkh
  }
}
export default mixin
