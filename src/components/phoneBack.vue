<template>
  <div>
    <!-- 电话回访弹出框 -->
    <van-dialog v-model="show" :showConfirmButton="false" :showCancelButton="false">
      <img src="./image/phone.gif" class="phone"/>
      <img src="./image/phonetip.png" class="tip"/>
      <span>
        请确认是否立即反馈 <br />
        24小时咨询热线：
        {{phone}}
      </span>
      <div style="padding: 0 .4rem; box-sizing: border-box;">
        <a href="JavaScript:;" class="cancle" type="default" @click="cancle()">取消</a>
        <a class="confirm" :href="'tel:' + phone" @click="call()">确认</a>
      </div>
    </van-dialog>
  </div>
</template>
<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    phone: {
      type: String,
      default: '400-900-9770'
    }
  },
  data() {
    return {
    }
  },
  methods: {
    cancle() {
      // 电话取消
      this.$emit('itemClick', false)
    },
    call() {
      // 拨打电话
      this.$emit('itemClick', false)
    }
  }
}
</script>
<style lang="scss" scoped>
/deep/ .van-dialog {
  padding: 0 0.53rem;
  padding-bottom: 0.6rem;
  box-sizing: border-box;
  text-align: center;
  overflow: initial;
  top: 50%;
  .van-dialog__content .phone {
      width: 57%;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: -82%;
      z-index: -1;
  }
  .van-dialog__content .tip{
    display: block;
    width: 74%;
    margin: 30px auto 20px;
  }
  .van-dialog__content > p {
    color: #2f2f32;
    font-size: 0.48rem;
    margin-bottom: 0.4rem;
    font-weight: bold;
  }
  .van-dialog__content > span {
    color: #63666d;
    font-size: 0.37rem;
    display: block;
    line-height: 0.56rem;
    margin-bottom: .4rem;
  }
  .cancle,
  .confirm {
    width: 2.91rem;
    height: 1.17rem;
    line-height: 1.17rem;
    float: right;
    text-align: center;
    font-size: 0.37rem;
    font-weight: bold;
  }
  .cancle {
    float: left;
    border-radius: 0.2rem;
    border: 0.02rem solid #c6c8ce;
    color: #2f2f32;
  }
  .confirm {
    color: #fff;
    background: #fd9738;
    box-shadow: 0rem 0.2rem 0.4rem 0rem rgba(253, 151, 56, 0.4);
    border-radius: 0.2rem;
  }
}
</style>
