const url = window.location.href.split('#')[0]
import wx from 'weixin-js-sdk'
import { getShare } from '@/api/wechat'

async function wxConfig() {
  const { data: config } = await getShare({ url })
  const params = {
    debug: false,
    ...config,
    jsApiList: [
      'onMenuShareAppMessage',
      'onMenuShareTimeline',
      'chooseWXPay',
      'showOptionMenu',
      'updateAppMessageShareData',
      'hideMenuItems',
      'showMenuItems',
      'onMenuShareTimeline',
      'onMenuShareAppMessage'
    ] // 必填
  }
  wx.config(params)
}

export async function appShareData(imgUrl) {
  console.log(imgUrl)
  await wxConfig()
  wx.ready(function() {
    // 需在用户可能点击分享按钮前就先调用
    wx.onMenuShareTimeline({
      // title: '测试', // 分享标题
      // desc: '测试.............', // 分享描述
      link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: 'http://service.beliwin.com/static/img/login2.3dc5b25d.png', // 分享图标
      success: function(res) {
        console.log(res, 'success')
        // 设置成功
        // alert('分享成功')
      },
      cancel: function(res) {
        console.log(res, 'cancel')
      }, fail: function(res) {
        console.log(res, 'fail')
      }
    })
  })
}
