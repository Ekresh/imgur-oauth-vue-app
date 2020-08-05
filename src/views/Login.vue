<template>
  <div>
    <h4 v-if="!loginLoading || token">Please to Login with imgur</h4>
    <button v-if="!loginLoading || token" @click="login" class="mt-3">Login</button>
    <Preloader v-if="loginLoading" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Preloader from "../components/Preloader";

export default {
  name: "Login",
  components: {
    Preloader
  },
  computed: {
    ...mapGetters(["loginLoading", "token"])
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