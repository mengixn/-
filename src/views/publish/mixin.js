import { getHeader, getTag, getSubmit } from '@/api/publish'
const mixin = {
  data() {
    return {
      // 星星评分数据
      value1: 0,
      value2: 0,
      value3: 0,
      // 匿名发布按钮
      checked: true,
      activeIcon: require('../../assets/question/radioed.png'),
      inactiveIcon: require('../../assets/question/radio.png'),
      // 输入文字数据绑定
      writeMessage: '',
      // 头部返回信息
      list: [],
      id: '',
      // r热门标签
      tag: [],
      // 热门标签颜色
      colorTb: [],
      colorTag: [],
      currentActive: 0,
      colors: null,
      colorList: [
        '#FC9C42', '#FFD01F', '#8DDEFF', '#6DD9AF'
      ], // 颜色列表
      tabActive: '',
      // 弹出层
      show: false,
      sId: this.$route.query.sId,
      tId: this.$route.query.tId,
      type: this.$route.query.type
    }
  },
  mounted() {
    const that = this
    if (this.$route.query.type) {
      this.type = this.$route.query.type
    }
    // 头部信息
    getHeader({ jdid: that.sId })
      .then(res => {
        console.log(res)
        that.list = res.data[0]
        that.value1 = parseInt(that.list.fwtd)
        that.value2 = parseInt(that.list.kczl)
        that.value3 = parseInt(that.list.kcsh)
        if (that.list.pjnr) {
          that.writeMessage = that.list.pjnr
        }
        // 修改评价
        if (that.tId) {
          // that.tag = that.list.rmbq
          that.$nextTick(() => {
            if (that.list.rmbq.length) {
              console.log(that.list.rmbq)
              that.list.rmbq.forEach((item, index) => {
                const arrIndex = that.colorTb.indexOf(index)
                if (arrIndex > -1) {
                  that.$refs.tags[index].style.background = '#ECECEE'
                  // 设置标签内文字颜色
                  that.$refs.tags[index].style.color = '#9FA0A5'
                  that.colorTb.splice(arrIndex, 1)
                  // 获取id
                  that.colorTag.splice(arrIndex, 1)
                } else {
                  // 设置标签颜色
                  that.colors = that.colorList[parseInt(Math.random() * 4)]
                  that.$refs.tags[index].style.background = that.colors
                  // 设置标签内文字颜色
                  that.$refs.tags[index].style.color = '#fff'
                  that.colorTb.push(index)
                  // 获取id
                  that.colorTag.push(item.id)
                }
                that.tabActive = that.colorTag.join(';') + ';'
              })
            }
          })
        }
      })
      .catch(err => {
        console.log(err)
      })

    // 热门标签
    getTag()
      .then(res => {
        console.log(res)
        that.tag = res.data
      })
      .catch(err => {
        console.log(err)
      })
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
  },
  methods: {
    // 热门标签选择
    changeTag(index, id) {
      const that = this
      const arrIndex = that.colorTb.indexOf(index)
      if (arrIndex > -1) {
        that.$refs.tags[index].style.background = '#ECECEE'
        // 设置标签内文字颜色
        that.$refs.tags[index].style.color = '#9FA0A5'
        that.colorTb.splice(arrIndex, 1)
        // 获取id
        that.colorTag.splice(arrIndex, 1)
      } else {
        // 设置标签颜色
        that.colors = that.colorList[parseInt(Math.random() * 4)]
        that.$refs.tags[index].style.background = that.colors
        // 设置标签内文字颜色
        that.$refs.tags[index].style.color = '#fff'
        that.colorTb.push(index)
        // 获取id
        that.colorTag.push(id)
      }
      that.tabActive = that.colorTag.join(';') + ';'
    },
    publish() {
      const that = this
      if (that.sId && that.value1 && that.value2 && that.value3) {
        getSubmit({
          jdid: that.sId,
          kczl: that.value1,
          fwtd: that.value2,
          kcsh: that.value3,
          pjnr: that.writeMessage,
          rmbq: that.tabActive,
          type: that.type,
          pjid: that.tId
        })
          .then(res => {
            that.show = true
            return false
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        alert('请填写完整评价~')
      }
    },
    toMain() {
      this.$router.replace('/')
    },
    toDaiban() {
      this.$router.replace('/daiban?type=2')
    }
  }
}
export default mixin
