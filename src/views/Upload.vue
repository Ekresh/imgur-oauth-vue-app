<template>
  <div>
    <p v-if="notImageError">{{notImageError}}</p>
    <div v-if="imageSources.length === 0" class="position-relative text-center">
      <input type="file" @change="onAddImages" multiple accept="image/*" />
      <button class="choose shadow-lg">Upload Or Drag images</button>
    </div>
    <div v-if="imageSources.length > 0" class="upload">
      <button @click="cancel">Cancel</button>
      <button>Upload</button>
    </div>
    <div v-if="imageSources.length > 0" class="image-container">
      <img v-for="(src, index) in imageSources" :key="index" :src="src" />
    </div>
  </div>
</template>

<script>
// uploadedPost.append("imageUrl", this.imageFiles[0], this.imageFiles[0].name);
export default {
  name: "Upload",
  data() {
    return {
      imageFiles: [],
      imageSources: [],
      notImageError: "",
      src: ""
    };
  },
  methods: {
    onAddImages(e) {
      this.notImageError = "";
      for (let file of Array.from(e.target.files)) {
        if (!file.name.match(/\.(jpg|jpeg|png|gif)$/)) {
          this.imageSources = [];
          this.notImageError = "Files must be images only.";
          return;
        }
        if (this.imageSources.length > 3) {
          this.imageSources = [];
          this.notImageError = "Sorry, max 4 images.";
          return;
        }
        this.imageSources.push(URL.createObjectURL(file));
      }
    },
    cancel() {
      this.imageSources = [];
    }
  }
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
button.choose {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 100%;
  height: 100px;
  max-width: 300px;
  transform: translate(-50%, -50%);
  z-index: -1;
}
button:first-of-type:not(.choose) {
  margin-right: 30px;
}
.upload {
  margin-bottom: 30px;
}
.image-container {
  column-count: 6;
  column-gap: 0;
}
@media (max-width: 400px) {
  .image-container {
    column-count: 2;
    column-gap: 0;
  }
}
img {
  display: inherit;
  max-width: 100%;
  padding: 5px;
}
p {
  text-align: center;
  color: #ea5656;
  margin-bottom: 20px;
}
</style>