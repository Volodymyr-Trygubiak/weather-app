<template>
  <div class="weekly-forecast">
    <div class="container">
      <div class="daily" v-for="(day, idx) in felteredList" :key="idx">
        <DailyForecast :day="day" />
      </div>
    </div>
  </div>
</template>

<script>
import DailyForecast from "./DailyForecast";
export default {
  name: "WeeklyForecast",
  components: {
    DailyForecast
  },
  props: {
    forecast: {
      type: Object,
      default: () => {},
    },
  },
  created() {
    console.log(this.forecast);
  },
  computed: {
    felteredList() {
      return this.forecast.daily.slice(1, 8);
    },
  },
};
</script>

<style lang="scss" scoped>
.weekly-forecast {
  padding: 20px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.7);

  .daily {
    margin: 24px;
  }

  .daily:last-child {
    margin-bottom: 0;
  }
}
</style>