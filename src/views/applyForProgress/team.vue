<template>
  <div class="team">
    <p class="content">
      研究生毕业于筑波大学
      社会工学专业，5年以上留学咨询从业经历，留学日本，熟悉日本留学市场，了解日本学校的申请详情，带领学生申请到东京大学、京都大学、大阪大学、东京工业大学、东北大学、九州大学、筑波大学
    </p>
    <div class="teacher-list">
      <div class="col" v-for="(col, colIndex) in dataList" :key="colIndex + 'col'">
        <img class="author" :src="col.tutorAvatar" alt="" />
        <div class="name">{{ col.tutorName || '-' }}</div>
        <div class="job">{{ col.tutorType }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Team',
  props: {
    dataList: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.team {
  .content {
    font-size: 12px;
    color: #63666d;
  }
  .teacher-list {
    margin-top: 15px;
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    overflow-y: hidden;
    &::-webkit-scrollbar {
      display: none;
    }
    .col {
      flex-shrink: 0;
      width: 108px;
      text-align: center;
      .author {
        border-radius: 5px;
        width: 100%;
        height: 145px;
        object-fit: cover;
      }
      .name {
        margin-top: 16px;
        font-size: 14px;
        color: #2f2f32;
        font-weight: bold;
        overflow: hidden;
      }
      .job {
        margin-top: 8px;
        font-size: 14px;
        color: #9fa0a5;
      }
    }
    .col:not(:last-of-type) {
      margin-right: 9px;
    }
  }
}
</style>
