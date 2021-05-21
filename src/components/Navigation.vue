<template>
  <header class="container add-city">
    <nav>
      <span>Add City</span>
      <div class="right">
        <i class="far fa-edit" ref="editCities" @click="editCities"></i>
        <i class="fas fa-sync" @click="reloadApp"></i>
        <i class="fas fa-plus" @click="addCity"></i>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: "Navigation",

  methods: {
    addCity() {
      this.$emit("add-city");
    },

    reloadApp() {
      location.reload();
    },
    editCities() {
      this.$refs.editCities.classList.toggle("edit-active");
      this.$emit("edit-city");
    },
  },
};
</script>

<style lang="scss" scoped>
.add-city {
  background-color: #313640;
}
header {
  z-index: 99;
  position: fixed;
  max-width: 1024px;
  width: 100%;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  nav {
    display: flex;
    color: #fff;
    padding: 22px 0;
    justify-content: space-between;
    align-items: center;
  }

  .edit-active {
    color: rgba(210, 75, 75, 1);
  }

  .right {
    i {
      padding: 8px;
      font-size: 20px;
      cursor: pointer;
      border-radius: 15px;
    }
    i:hover {
      background-color: darken(#313640, 2%);
    }
    i:active {
      background-color: darken(#313640, 1%);
    }
    i:nth-child(2),
    i:nth-child(3) {
      margin-left: 16px;
    }
  }

  span {
    font-weight: 600;
  }
}
</style>