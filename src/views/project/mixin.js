import { confirmNode } from '@/api/daiban'
const mixin = {
  data() {
    return {
      // 输入内容绑定数据
      writeMessage: '',
      // 文件id
      id: null,
      name: '',
      node: 0
    }
  },
  methods: {
    commit(id, qrmsnr) {
      const that = this
      confirmNode({ jdid: id, qrmsnr: qrmsnr }).then(res => {
        that.$toast({
          type: 'success',
          message: '提交成功',
          onOpened: () => {
            if (that.node === '0') {
              this.$router.replace({
                path: '/daiban',
                query: {
                  type: 1
                }
              })
            } else if (that.node === '1') {
              that.$router.back(-1)
              console.log(1)
            }
          }
        })
      })
    }
  },
  mounted() {
    // 获取路由传参
    this.id = this.$route.query.sId
    this.name = this.$route.query.name
    if (this.$route.query.node) {
      this.node = this.$route.query.node
    }
    console.log(this.$route.query.node)
  },
  // 设置输入的内容不超过200字
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
