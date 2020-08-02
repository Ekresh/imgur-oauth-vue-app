<template>
  <div class="position-relative text-center">
    <input type="file" />
    <button class="shadow-lg">Upload Or Drag images</button>
  </div>
</template>

<script>
export default {
  name: "Upload"
};
</script>

<style scoped>
input {
  width: 100%;
  height: 100px;
  max-width: 300px;
  margin: auto;
  opacity: 0;
  cursor: pointer;
}
button {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 100%;
  height: 100px;
  max-width: 300px;
  transform: translate(-50%, -50%);
  z-index: -1;
}
</style>