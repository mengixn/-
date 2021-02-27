<template>
  <div class="japan-title">
    <span class="title">{{mTitle}}</span>
    <!-- <div class="more">查看更多 <img src="@/assets/icon/arrw-right.png" alt="" class="icon" /></div> -->
  </div>
</template>

<script>
export default {
  props: {
    mTitle: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.japan-title {
  margin: 20px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .title {
    font-size: 16px;
    color: #2f2f32;
    font-weight: bold;
  }
  .more {
    font-size: 13px;
    color: #9fa0a5;
    display: flex;
    align-items: center;
    .icon {
      width: 14px;
      height: 14px;
    }
  }
}
</style>
