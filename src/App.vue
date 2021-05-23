<template>
  <div class="main">
    <Modal v-if="modalOpen" :APIkey="APIkey" @close-modal="toggleModal" />
    <Navigation
      :addCityActive="addCityActive"
      :isDay="isDay"
      :isNight="isNight"
      @add-city="toggleModal"
      @edit-city="toggleEdit"
    />
    <router-view
      :isDay="isDay"
      :isNight="isNight"
      :APIkey="APIkey"
      :cities="cities"
      :edit="edit"
      @is-day="dayTime"
      @is-night="dayNight"
      @reset-days="resetDays"
    />
  </div>
</template>

<script>
import axios from "axios";
import db from "./firebase/firebaseinit";
import Navigation from "./components/Navigation";
import Modal from "./components/Modal";
export default {
  name: "App",

  components: {
    Navigation,
    Modal,
  },

  data() {
    return {
      isDay: null,
      isNight: null,
      APIkey: "de3ff7e4a2e6e2ae885cc072dc222bc2",
      cities: [],
      modalOpen: null,
      edit: null,
      addCityActive: null,
    };
  },

  created() {
    this.getCityWeather();
    this.checkRoute();
  },

  methods: {
    getCityWeather() {
      let firebaseDB = db.collection("cities");

      firebaseDB.onSnapshot((snap) => {
        snap.docChanges().forEach(async (doc) => {
          if (doc.type === "added" && !doc.doc.Nd) {
            try {
              const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${
                  doc.doc.data().city
                }&units=imperial&APPID=${this.APIkey}`
              );
              const data = response.data;
              firebaseDB
                .doc(doc.doc.id)
                .update({
                  currentWeather: data,
                })
                .then(() => {
                  this.cities.push(doc.doc.data());
                });
            } catch (err) {
              console.log(err);
            }
          } else if (doc.type === "added" && doc.doc.Nd) {
            this.cities.push(doc.doc.data());
          } else if (doc.type === "removed") {
            this.cities = this.cities.filter(
              (city) => city.city != doc.doc.data().city
            );
          }
        });
      });
    },

    toggleModal() {
      this.modalOpen = !this.modalOpen;
    },

    toggleEdit() {
      this.edit = !this.edit;
    },

    checkRoute() {
      if (this.$route.name === "AddCity") {
        this.addCityActive = true;
      } else {
        this.addCityActive = false;
      }
    },

    dayTime() {
      this.isDay = !this.isDay;
    },

    dayNight() {
      this.isNight = !this.isNight;
    },

    resetDays() {
      this.isDay = false;
      this.isNight = false;
    },
  },

  watch: {
    $route() {
      this.checkRoute();
    },
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Quicksand", sans-serif;
}

body::-webkit-scrollbar {
  width: 10px;
}

body::-webkit-scrollbar-track {
  box-shadow: 5px 5px 5px -5px rgba(34, 60, 80, 0.2) inset;
  -webkit-box-shadow: 5px 5px 5px -5px rgba(34, 60, 80, 0.2) inset;
  background-color: #f9f9fd;
}

body::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, #7090aa, #356184)
}

.day {
  transition: 300ms ease all;
  background-color: rgba(36, 221, 253, 0.8);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.night {
  transition: 300ms ease all;
  background-color: rgb(30, 58, 109);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.main {
  max-width: 1024px;
  margin: 0 auto;
  height: 100vh;

  .container {
    padding: 0 20px;
  }
}
</style>
