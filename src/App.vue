<template>
  <div id="app">
    <Header />
    <main class="container py-5">
      <router-view />
    </main>
    <SnackBar v-if="responseOrErrorSnack" />
  </div>
</template>

<script>
import Header from "./components/Header";
import SnackBar from "./components/Snack-bar";
import { mapGetters } from "vuex";

export default {
  components: {
    Header,
    SnackBar
  },
  computed: {
    ...mapGetters(["responseOrErrorSnack"])
  }
};
</script>

<style>
@import "./assets/css/custom-bootstrap.css";
@import "./assets/css/general.css";
main {
  margin-top: 62px;
}
</style>
