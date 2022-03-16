<template>
  <div id="app">
    <!-- <div v-if="displayNavbar" class="nav" ref="nav">
      <router-link to="/">Home</router-link>|<router-link to="/slideshow"
        >Slideshow</router-link
      >|<router-link to="/management">Management</router-link>
    </div> -->
    <router-view />
  </div>
</template>


<script>
export default {
  mounted() {
    console.log("App mounted");
    console.log(this.$route);
  },
  computed: {
    displayNavbar() {
      return true
      // const { $route } = this;
      // const { fullPath } = $route;
      // if (fullPath === "/slideshow") {
      //   return false;
      // }
      // console.log(this.$route);
      // return true;
    },
  },
  methods: {
    hideNav() {
      console.log("hiding nav");
    },
  },
};
</script>