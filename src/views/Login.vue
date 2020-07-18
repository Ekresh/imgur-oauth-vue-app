<template>
  <div>
    <h3 v-if="!loginLoading">Please login</h3>
    <h3 v-if="loginLoading">Please wait...</h3>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import router from "../router";

export default {
  name: "Login",
  computed: {
    ...mapGetters(["loginLoading", "token"])
  },
  methods: mapActions(["fnalizeLogin"]),
  created() {
    this.fnalizeLogin();
    if (this.token) {
      router.push("/gallary");
    }
  }
};
</script>