<template>
  <div>
    <h4 v-if="!loginLoading || token">Please to Login with imgur</h4>
    <button v-if="!loginLoading || token" @click="login" class="mt-3">Login</button>
    <div v-if="loginLoading" class="mx-auto">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        style="margin:auto;background:none;display:block;"
        width="30px"
        height="30px"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
      >
        <circle
          cx="50"
          cy="50"
          fill="none"
          stroke="#212121"
          stroke-width="10"
          r="35"
          stroke-dasharray="164.93361431346415 56.97787143782138"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            repeatCount="indefinite"
            dur="1s"
            values="0 50 50;360 50 50"
            keyTimes="0;1"
          />
        </circle>
      </svg>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Login",
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