<template>
  <div class="site">
    <div class="col" v-for="(col, colIndex) in 2" :key="colIndex + 'col'">
      <img :src="require(`./images/japan-${colIndex + 1}.png`)" alt="" class="photo" />
      <div class="col-title">{{ titles[colIndex] }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      titles: ['北方姑娘的留学经历分享', '我在日本留学的第三天']
    }
  }
}
</script>

<style lang="scss" scoped>
.site {
  display: flex;
  justify-content: space-between;
  .col {
    --w: 165px;
    width: var(--w);
    .photo {
      border-radius: 15px;
      width: 100%;
      height: var(--w);
      box-shadow: 0px 3px 10px 0px rgba(237, 242, 248, 1);
    }
    .col-title {
      font-size: 14px;
      color: #2f2f32;
      font-weight: bold;
      text-align: center;
    }
  }
}
</style>
