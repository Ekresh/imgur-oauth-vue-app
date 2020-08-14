<template>
  <div>
    <h4 v-if="!loading || token">Please to Login with imgur</h4>
    <button v-if="!loading || token" @click="login" class="ripple mt-3">Login</button>
    <Preloader v-if="loading" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Preloader from "../components/Preloader";

export default {
  title: "imgur Store - Login",
  name: "Login",
  components: {
    Preloader
  },
  computed: {
    ...mapGetters(["loading", "token"])
  },
  methods: {
    ...mapActions(["login", "fnalizeLogin"])
  },
  created() {
    this.fnalizeLogin();
  }
};
</script>

<style scoped>
button {
  letter-spacing: 3px;
}
</style>