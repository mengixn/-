<template>
  <div class="a-team">
    <div class="card" v-for="(card, cIndex) in dataList" :key="cIndex" @click="toDetails(card.tutorId, card.tutorType)">
      <img :src="card.tutorAvatar" alt="" class="author" />
      <div class="info">
        <div class="i-header">
          <div class="headline">
            <div class="name">{{ card.tutorName }}</div>
            <div class="job">{{ card.dslx }}</div>
          </div>
          <template v-if="card.tutorType === '2'">
            <a class="phone" :href="`tel:${card.tutorMobile}`">
              <img src="@/assets/icon/phone.png" alt="" class="icon" />
              <span class="text">联系TA</span>
            </a>
          </template>
          <template v-else-if="card.tutorType === '1'">
            <a class="phone serve" href="JavaScript:;">
              <span class="text">服务{{ card.tutorFwcs }}次</span>
            </a>
          </template>
        </div>
        <div class="content">
          {{ card.tutorBackground }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dataList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    toDetails: function(id, type) {
      this.$router.push('/tutorDetail?id=' + id + '&type=' + type)
    }
  },
  mounted() {}
}
</script>

<style lang="scss" scoped>
.a-team {
  .card {
    margin-top: 15px;
    padding: 20px 15px;
    display: flex;
    border-radius: 8px;
    box-shadow: 0px 3px 10px 0px rgba(237, 242, 248, 1);
    background-color: #fff;
    .author {
      flex-shrink: 0;
      margin-right: 15px;
      width: 90px;
      height: 120px;
      object-fit: contain;
    }
    .info {
      flex: 1;
      .i-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .headline {
          .name {
            width: 120px;
            overflow: hidden;
            font-size: 16px;
            color: #2f2f32;
            font-weight: bold;
            @include textoverflow(1);
          }
          .job {
            margin-top: 5px;
            font-size: 14px;
            color: #9fa0a5;
          }
        }
        .phone {
          width: 76px;
          height: 28px;
          border-radius: 5px;
          border: 1px solid #fd9738;
          display: flex;
          align-items: center;
          justify-content: center;
          .icon {
            width: 14px;
            height: 14px;
            margin-right: 5px;
          }
          .text {
            font-size: 14px;
            color: #fd9738;
          }
          &.serve {
            height: auto;
            width: auto;
            border: none;
          }
        }
      }
      .content {
        margin-top: 8px;
        font-size: 12px;
        color: #63666d;
      }
    }
  }
}
</style>
