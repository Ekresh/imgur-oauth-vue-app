<template>
  <div class="general-container d-flex justify-content-center align-items-center">
    <div class="container">
      <div class="shadow-sm">
        <h5>{{ title }}</h5>
        <div class="d-flex justify-content-between">
          <button @click="emitFirstEvent">{{ firstBtn }}</button>
          <button @click="emitSecondEvent">{{ secondBtn }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  props: {
    firstBtn: {
      type: String
    },
    secondBtn: {
      type: String
    },
    title: {
      type: String
    }
  },
  methods: {
    emitFirstEvent() {
      this.$emit("firstEvent");
    },
    emitSecondEvent() {
      this.$emit("secondEvent");
    }
  }
};
</script>
<style scoped>
.general-container {
  position: fixed;
  z-index: 10000;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(33, 33, 33, 0.3);
}
h5 {
  margin-bottom: 40px;
}
.container > div {
  max-width: 250px;
  margin: auto;
  background: var(--main-bg);
  padding: 20px;
  border-radius: 0.3em;
}
</style>