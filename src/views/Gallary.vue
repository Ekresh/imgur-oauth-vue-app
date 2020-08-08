<template>
  <div>
    <Preloader v-if="imagesLoading && images.length === 0" />
    <p v-if="!imagesLoading && images.length === 0">
      No images yet, To upload
      <router-link to="/upload" class="text-decoration-none">Click Here</router-link>
    </p>
    <div class="image-container">
      <div
        ref="movable"
        @touchmove="detectMoving($event, index)"
        v-for="(image, index) in images"
        :key="index"
        class="fullScreenContainer d-flex justify-content-center align-items-center"
        :class="{ 'full-screen-toggle': isFullScreenImage.add && isFullScreenImage.i === index }"
      >
        <div class="position-relative d-flex justify-content-center align-items-center">
          <img @click="openFullScreenImage(index)" :src="image.link" :alt="image.id" />
          <button
            v-if="isFullScreenImage.add"
            @click="closeFullScreenImage"
            class="shadow-none d-flex justify-content-center align-items-center"
          >
            <svg
              width="30px"
              height="30px"
              viewBox="0 0 16 16"
              class="bi bi-x"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"
              />
              <path
                fill-rule="evenodd"
                d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Preloader from "../components/Preloader";

export default {
  name: "Gallary",
  components: {
    Preloader
  },
  data() {
    return {
      isFullScreenImage: {
        add: false,
        i: 0
      },
      yTouchArray: [],
      xTouchArray: []
    };
  },
  computed: {
    ...mapGetters(["imagesLoading", "images"])
  },
  created() {
    this.fetchImages();
    if ("ontouchstart" in document.documentElement) {
      console.log("T");
    } else {
      console.log("N");
    }
  },
  methods: {
    ...mapActions(["fetchImages"]),
    openFullScreenImage(i) {
      this.isFullScreenImage = {
        add: true,
        i
      };
    },
    closeFullScreenImage() {
      this.isFullScreenImage.add = false;
    },
    detectMoving(e, i) {
      if (this.$refs.movable) {
        const element = this.$refs.movable[i];
        if (element.classList.contains("full-screen-toggle")) {
          e.preventDefault();
          const touchChanges = e.changedTouches[0];
          const xTouch = touchChanges.clientX;
          const yTouch = touchChanges.clientY;
          this.yTouchArray.push(yTouch);
          this.xTouchArray.push(xTouch);
          const firstYTouch = this.yTouchArray[0];
          const firstXTouch = this.xTouchArray[0];

          for (let item of this.yTouchArray) {
            if (item >= firstYTouch + 30 || item <= firstYTouch - 30) {
              setTimeout(() => {
                this.isFullScreenImage.add = false;
              }, 500);
              this.yTouchArray = [];
              this.xTouchArray = [];
            }
          }

          for (let item of this.xTouchArray) {
            if (item >= firstXTouch + 30 && this.isFullScreenImage.i > 0) {
              this.isFullScreenImage.i--;
              this.xTouchArray = [];
              this.yTouchArray = [];
            }
            if (
              item <= firstXTouch - 30 &&
              this.isFullScreenImage.i < this.images.length - 1
            ) {
              this.isFullScreenImage.i++;
              this.xTouchArray = [];
              this.yTouchArray = [];
            }
          }
        }
      }
    }
  }
};
</script>
<style scoped>
a,
a:focus {
  color: var(--main-color);
  font-weight: bold;
}
.image-container {
  column-count: 4;
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
  max-width: 100% !important;
  max-height: 100% !important;
  padding: 5px;
  cursor: pointer;
}
.full-screen-toggle {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 10000;
  background: var(--main-color);
}
.full-screen-toggle img {
  padding: 0;
}
.full-screen-toggle div {
  width: 100%;
  height: 100%;
}
.fullScreenContainer {
  -webkit-column-break-inside: avoid;
  page-break-inside: avoid;
  break-inside: avoid;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}
button {
  position: absolute;
  top: 25px;
  right: 25px;
  border-radius: 50%;
  height: 50px;
  width: 50px;
  background: rgba(33, 33, 33, 0.3);
  padding: 0;
}
</style>