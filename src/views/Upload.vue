<template>
  <div class="text-center">
    <Preloader v-if="imagesLoading" />
    <p class="error" v-if="notImageError">{{notImageError}}</p>
    <div v-if="imageSources.length === 0" class="position-relative text-center">
      <input type="file" @change="onAddImages" multiple accept="image/*" />
      <button class="choose">Upload Or Drag images</button>
    </div>
    <div v-if="imageSources.length > 0 && !imagesLoading" class="upload">
      <p>Upload this images?</p>
      <button @click="cancel">Cancel</button>
      <button @click="onUpload">Upload</button>
    </div>
    <div v-if="imageSources.length > 0" class="image-container">
      <div
        v-for="(src, index) in imageSources"
        :key="index"
        class="column-container position-relative"
      >
        <div :class="{finished: index < uploadPercentCompleted.i}" class="progress">
          <span
            :class="{transparent: index > uploadPercentCompleted.i}"
            :style="{width: uploadPercentCompleted.loadingNumbers + '%'}"
          ></span>
        </div>
        <img :src="src" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Preloader from "../components/Preloader";
export default {
  name: "Upload",
  components: {
    Preloader
  },
  data() {
    return {
      imageFiles: [],
      imageSources: [],
      notImageError: "",
      src: ""
    };
  },
  computed: {
    ...mapGetters(["imagesLoading", "uploadPercentCompleted"])
  },
  methods: {
    ...mapActions(["postImages"]),
    onAddImages(e) {
      this.imageFiles = e.target.files;
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
    onUpload() {
      this.postImages(this.imageFiles);
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
  margin-right: 20px;
}
.upload {
  margin-bottom: 20px;
  margin-top: 15px;
}
.image-container {
  column-count: 4;
  column-gap: 0;
}
.column-container {
  -webkit-column-break-inside: avoid;
  page-break-inside: avoid;
  break-inside: avoid;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
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
  padding: 8px 5px;
}
p.error {
  text-align: center;
  color: #ea5656;
  margin-bottom: 20px;
}
.progress {
  height: 5px;
  border-radius: 0.3em;
  background: var(--border-color);
  position: absolute;
  top: 0px;
  left: 5px;
  width: calc(100% - 10px);
}
.finished.progress {
  background: var(--main-color);
}
.progress span {
  height: 5px;
  width: 0;
  display: block;
  border-radius: 0.3em;
  background: var(--main-color);
}
span.transparent {
  opacity: 0;
}
</style>