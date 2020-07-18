<template>
  <div id="app">
    <Header />
    <main class="container py-5">
      <router-view />
    </main>
  </div>
</template>

<script>
import Header from "./components/Header";

export default {
  components: {
    Header
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
