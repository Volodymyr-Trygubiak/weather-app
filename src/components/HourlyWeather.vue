<template>
  <div class="hourly-weather"></div>
</template>

<script>
export default {
  name: "HourlyWeather",
  props: {
    forecast: {
      type: Object,
      default: () => {},
    },
  },
  created() {
    console.log(this.forecast);
  }
};
</script>

<style lang="scss" scoped>
</style>