<template>
  <div>{{ responseOrErrorSnack }}</div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "SnackBar",
  computed: {
    ...mapGetters(["responseOrErrorSnack"])
  }
};
</script>
<style scoped>
div {
  background: var(--main-color);
  color: var(--main-bg);
  position: fixed;
  bottom: 20px;
  left: 50%;
  width: 90%;
  max-width: 400px;
  transform: translateX(-50%);
  padding: 10px;
  font-size: 14px;
  border-radius: 0.3em;
  text-align: center;
}
</style>