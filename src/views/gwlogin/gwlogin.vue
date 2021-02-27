<template>
  <div class="login">
    <div class="login_bgc">
      <!-- <img src="@/assets/login/login1.png" alt="" /> -->
    </div>
    <div class="minwidth">
      <div class="login_title">
        <div class="denglu">顾问授权</div>
      </div>
      <van-form @submit="onSubmit">
        <!-- <van-cell-group> -->
        <van-field v-model="form.username" left-icon="friends" color="#D9D9DA" placeholder="请输入用户名" :rules="[{ required: true, message: '请填写用户名' }]" />
        <div class="width8"></div>
        <van-field v-model="form.yqm" left-icon="lock" color="#D9D9DA" placeholder="请输入邀请码" type="password" :rules="[{ required: true, message: '请填写邀请码' }]" />
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit"  :class="login ? 'active':''" >登录</van-button>
        </div>
        <!-- </van-cell-group> -->
      </van-form>
      <div class="routerlink" @click="nextlink()">
        <div class="logins">用户登录</div>
      </div>
    </div>
  </div>
</template>

<script>
import { gwlogin } from '@/api/user'
export default {
  data() {
    return {
      login: true,
      form: {
        // 15210978147
        // 123456789
        username: '15210978147',
        yqm: '123456789'
      }
    }
  },
  mounted() {},
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
      }
    },
    onSubmit(values) {
      gwlogin({ mobile: this.form.username, yqm: this.form.yqm })
        .then(res => {
          console.log(res)
          if (res.data.openid === null || res.data.openid === undefined) {
            this.WechatLogin(res.data.id)
            return
          }
          this.$toast('登录成功,感谢配合')
        })
        .catch(error => {
          console.log(error)
          this.$toast('用户名账号密码错误')
        })
    },
    nextlink() {
      this.$router.push('/login')
    }
  },
  watch: {
    form: {
      handler: function(Val) {
        if (Val.username && Val.password) {
          this.login = true;
        }
        if (!Val.username || !Val.password) {
          this.login = false;
        }
        return
      },
      deep: true
    }
  }
}
</script>

<style lang="scss" scoped>
.routerlink{
  width: 100%;
  font-size: 16px;
  font-weight:500;
  color: #2A86DE;
  .logins{
    width: 66px;
    margin-left: auto;
    border-bottom: 1px solid #2A86DE;
    position: fixed;
    bottom:0.5rem;
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
  &.active{
    background: #FD9738;
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
    height: 229px;
    background: url('../../assets/login/login8.png') no-repeat center/cover;
    position: relative;
    img {
      position: absolute;
      right: 0px;
      bottom: -10px;
      width: 122px;
      height: 193px;
    }
  }
}
</style>
