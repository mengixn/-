<template>
  <div class="login">
    <div class="login_bgc">
      <img src="@/assets/login/login1.gif" alt="" />
    </div>
    <div class="minwidth">
      <div class="login_title">
        <div class="denglu">登录</div>
        <div class="Japanese">サインイン</div>
      </div>
      <van-form @submit="onSubmit">
        <!-- <van-cell-group> -->
        <van-field
          v-model="form.username"
          left-icon="friends"
          color="#D9D9DA"
          placeholder="请输入用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <div class="width8"></div>
        <van-field
          v-model="form.password"
          left-icon="lock"
          color="#D9D9DA"
          placeholder="请填写密码"
          type="password"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit" :class="login ? 'active' : ''">登录</van-button>
        </div>
        <!-- </van-cell-group> -->
      </van-form>
      <!-- <div class="routerlink" @click="nextlink()">
        <div class="logins">顾问授权登录</div>
      </div> -->
    </div>
  </div>
</template>

<script>
import { login } from '@/api/user'
export default {
  data() {
    return {
      login: true,
      form: {
        username: '',
        // username: '13223232323',
        password: ''
        // password: 'TWoiLQ3M'
      }
    }
  },
  mounted() {
    if (localStorage.getItem('phone-call')) {
      this.form.username = localStorage.getItem('phone-call')
    }
  },
  methods: {
    WechatLogin(userid) {
      // var this_page_url = window.location.href
      var openid = ''
      var appID = 'wx2b367d82671da084'
      var redirect_uri = encodeURIComponent('https://svcapi.beliwin.com/api/wechat/notify?suserId=' + userid)
      // 用户头像和昵称按照自己的需要进行填写
      if (openid === null || openid === '' || openid === undefined) {
        // 通过这个判断openid是否存在进行html页面里的跳转
        var recatTo =
          'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' +
          appID +
          '&redirect_uri=' +
          redirect_uri +
          '&response_type=code&scope=snsapi_userinfo&state=0#wechat_redirect'
        window.location.href = recatTo
        // console.log(recatTo)
      }
    },
    onSubmit(values) {
      const that = this
      login({ name: this.form.username, password: this.form.password })
        .then(res => {
          if (res.data.user.openid === null || res.data.user.openid === undefined) {
            localStorage.setItem('userInfo', JSON.stringify(res.data))
            localStorage.setItem('phone-call', that.form.username)
            this.WechatLogin(res.data.user.id)
            return
          } else {
            localStorage.setItem('userInfo', JSON.stringify(res.data))
            localStorage.setItem('phone-call', that.form.username)
            this.$toast('登录成功')
            this.$router.replace('/home')
          }
        })
        .catch(error => {
          console.log(error)
          this.$toast('用户名账号密码错误')
        })
    },
    nextlink() {
      this.$router.push('/gwlogin')
    }
  },
  watch: {
    form: {
      // 判断是否填写完整
      handler: function(Val) {
        if (Val.username && Val.password) {
          this.login = true
        }
        if (!Val.username || !Val.password) {
          this.login = false
        }
        return
      },
      deep: true
    }
  }
}
</script>

<style lang="scss" scoped>
.routerlink {
  width: 100%;
  font-size: 16px;
  font-weight: 500;
  color: #2a86de;
  .logins {
    width: 98px;
    margin-left: auto;
    border-bottom: 1px solid #2a86de;
    position: fixed;
    bottom: 0.5rem;
    left: 50%;
    transform: translateX(-50%);
  }
}
.active {
  background: #fd9738 !important;
}
.van-cell {
  border-radius: 10px;
}
.van-button--info {
  background: #f7ddc7;
  border-radius: 4px;
  border: 1px solid #f7ddc7;
  font-size: 18px;
  font-weight: 500;
  letter-spacing: 2px;
  &.active {
    background: #fd9738;
    box-shadow: 0px 15px 30px 0px rgba(253, 151, 56, 0.4);
  }
}
.login {
  .width8 {
    width: 100%;
    height: 8px;
  }
  .minwidth {
    width: 94%;
    margin: 20px auto;
    .login_title {
      margin-bottom: 44px;
      .denglu {
        font-size: 32px;
        font-weight: 500;
        color: #2f2f32;
        display: inline-block;
      }
      .Japanese {
        font-size: 18px;
        display: inline-block;
        font-weight: 500;
        color: #d9d9da;
        margin-left: 6px;
      }
    }
  }
  .login_bgc {
    width: 100%;
    height: 202px;
    background: url('../../assets/login/login2.png') no-repeat center/cover;
    position: relative;
    img {
      position: absolute;
      right: 0px;
      bottom: -10px;
      width: 122px;
    }
  }
}
</style>
