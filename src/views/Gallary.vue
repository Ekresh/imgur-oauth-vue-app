<template>
  <div>
    <Preloader v-if="imagesLoading && images.length === 0" />
    <Modal
      v-if="isShowModal"
      firstBtn="Cancel"
      @firstEvent="cancelDelete"
      @secondEvent="onDeleteImage(deleteHash)"
      secondBtn="Delete"
      title="Sure, Delete this?"
    />
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
            v-if="!isFullScreenImage.add"
            class="delete-image"
            @click="showModal(image.deletehash)"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 16 16"
              class="bi bi-trash"
              fill="#fff"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
              />
              <path
                fill-rule="evenodd"
                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
              />
            </svg>
          </button>
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
          <button
            @click="prevImage"
            :disabled="index === 0"
            v-if="isFullScreenImage.add && !isTouchScreen"
            class="left-button"
          >
            <svg
              width="30px"
              height="30px"
              viewBox="0 0 16 16"
              class="bi bi-arrow-left"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M5.854 4.646a.5.5 0 0 1 0 .708L3.207 8l2.647 2.646a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 0 1 .708 0z"
              />
              <path
                fill-rule="evenodd"
                d="M2.5 8a.5.5 0 0 1 .5-.5h10.5a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
              />
            </svg>
          </button>
          <button
            @click="nextImage"
            :disabled="index === images.length - 1"
            v-if="isFullScreenImage.add && !isTouchScreen"
            class="right-button"
          >
            <svg
              width="30px"
              height="30px"
              viewBox="0 0 16 16"
              class="bi bi-arrow-right"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10.146 4.646a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L12.793 8l-2.647-2.646a.5.5 0 0 1 0-.708z"
              />
              <path
                fill-rule="evenodd"
                d="M2 8a.5.5 0 0 1 .5-.5H13a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 8z"
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
import Modal from "../components/Modal";

export default {
  name: "Gallary",
  title: "imgur Store - Gallary",
  components: {
    Preloader,
    Modal
  },
  data() {
    return {
      isFullScreenImage: {
        add: false,
        i: 0
      },
      yTouchArray: [],
      xTouchArray: [],
      isTouchScreen: false,
      deleteHash: "",
      isShowModal: false
    };
  },
  computed: {
    ...mapGetters(["imagesLoading", "images"])
  },
  created() {
    this.fetchImages();
    if ("ontouchstart" in document.documentElement) {
      this.isTouchScreen = true;
    } else {
      this.isTouchScreen = false;
    }
  },
  methods: {
    ...mapActions(["fetchImages", "deleteImage"]),
    openFullScreenImage(i) {
      this.isFullScreenImage = {
        add: true,
        i
      };
    },
    closeFullScreenImage() {
      this.isFullScreenImage.add = false;
    },
    nextImage() {
      if (this.isFullScreenImage.i < this.images.length - 1) {
        this.isFullScreenImage.i++;
      }
    },
    prevImage() {
      if (this.isFullScreenImage.i > 0) {
        this.isFullScreenImage.i--;
      }
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
    },
    showModal(i) {
      this.isShowModal = true;
      this.deleteHash = i;
    },
    cancelDelete() {
      this.isShowModal = false;
    },
    async onDeleteImage(imageId) {
      await this.deleteImage(imageId);
      this.isShowModal = false;
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
@media (max-width: 767px) {
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
.left-button,
.right-button {
  top: 50%;
  transform: translateY(-50%);
}
.left-button {
  left: 20px;
}
.right-button {
  right: 20px;
}
.delete-image {
  height: 30px;
  width: 30px;
  top: 10px;
  right: 10px;
}
</style>