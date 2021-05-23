<template>
  <div class="hourly-weather">
    <div class="container">
      <div class="hourly-temp" v-for="(time, index) in filteredList" :key="index" >
        <HourlyTemp :time="time" />
      </div>
    </div>
  </div>
</template>

<script>
import HourlyTemp from "./HourlyTemp";
export default {
  name: "HourlyWeather",
  components: {
    HourlyTemp,
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
    filteredList() {
      return this.forecast.hourly.slice(0, 24)
    }
  }
};
</script>

<style lang="scss" scoped>
.hourly-weather {
  padding: 30px 0;
  border-bottom: 1px solid rgba(225, 225, 225, 0.7);
}
.container {
  display: flex;
  max-width: 100vw;
  overflow-x: scroll;
  padding: 0;
  margin: 0 20px;
  
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>