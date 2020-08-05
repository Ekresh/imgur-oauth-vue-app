<template>
  <div class="header border-bottom fixed-top">
    <div class="container">
      <header class="w-100 d-flex justify-content-between my-3">
        <h3 class="mb-0">
          <router-link to="/" class="text-decoration-none pl-0 ml-0" exact>imgur Store</router-link>
        </h3>
        <nav :class="{ active: isActive }">
          <ul class="unstyled mb-0">
            <li class="d-none close">
              <button class="shadow-none" @click="toggleNav">
                <svg
                  width="1em"
                  height="1em"
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
            </li>
            <li @click="toggleNav" v-if="token" class="d-inline-block">
              <router-link to="/gallary" class="text-decoration-none">Gallery</router-link>
            </li>
            <li @click="toggleNav" v-if="token" class="d-inline-block">
              <router-link to="upload" class="text-decoration-none">Upload</router-link>
            </li>
            <li v-if="token" class="d-inline-block">
              <button @click="multiple" class="pr-0">Logout</button>
            </li>
          </ul>
        </nav>
        <button v-if="token" @click="toggleNav" class="d-none menu shadow-none">
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
            class="bi bi-justify"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M2 12.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"
            />
          </svg>
        </button>
      </header>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Header",
  data() {
    return {
      isActive: false
    };
  },
  computed: mapGetters(["token"]),
  methods: {
    ...mapActions(["logout"]),
    toggleNav() {
      this.isActive = !this.isActive;
      this.isActive
        ? (document.body.style.overflowY = "hidden")
        : (document.body.style.overflowY = "auto");
    },
    multiple() {
      this.logout();
      this.toggleNav();
    }
  }
};
</script>

<style scoped>
.header {
  background-color: var(--main-bg);
}
header button,
header a {
  padding: 0;
  outline: none;
  margin-left: 20px;
}
header a,
header button {
  color: var(--main-color);
  background-color: var(--main-bg);
}
.router-link-active {
  font-weight: bold;
}
h3 a,
h3 a.router-link-active {
  color: var(--main-color);
  font-weight: inherit;
}
@media (max-width: 400px) {
  .menu {
    display: block !important;
  }
  .menu svg {
    font-size: 30px;
  }
  svg {
    color: var(--main-color) !important;
  }
  .close svg {
    display: block;
    font-size: 35px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 30px;
  }
  nav li {
    display: block !important;
  }
  nav,
  ul {
    width: 100vw;
    height: 100vh;
    padding: 0;
    margin: 0;
  }
  nav {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 20;
    background: var(--main-bg);
    transform: translateX(100%);
    transition: all 0.3s ease-in-out;
  }
  nav.active {
    transform: translateX(0);
  }
  nav a,
  nav button {
    padding: 0;
    margin: 0;
    width: 100%;
    text-align: center;
    display: block;
    font-size: 20px;
    margin-top: 30px;
  }
  header button:focus {
    margin-left: 0;
  }
}
header li {
  padding-top: 15px;
}
header {
  white-space: nowrap;
  line-height: 0;
}
</style>