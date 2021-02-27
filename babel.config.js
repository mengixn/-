// 获取 VUE_APP_ENV 非 NODE_ENV，测试环境依然 console

module.exports = {
  presets: [['@vue/cli-plugin-babel/preset', { useBuiltIns: 'usage', corejs: 3 }]],
}
