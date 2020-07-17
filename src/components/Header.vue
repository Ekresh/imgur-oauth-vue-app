<template>
  <div class="border-bottom fixed-top">
    <div class="container">
      <header class="w-100 d-flex justify-content-between my-3">
        <h3 class="mb-0">
          <router-link to="/" class="text-decoration-none pl-0 ml-0">imgur Store</router-link>
        </h3>
        <nav>
          <ul class="unstyled mb-0">
            <li class="d-inline-block">
              <router-link to="/" class="text-decoration-none">Login</router-link>
            </li>
            <li class="d-inline-block">
              <router-link to="/gallary" class="text-decoration-none">Gallery</router-link>
            </li>
            <li class="d-inline-block">
              <router-link to="upload" class="text-decoration-none">Upload</router-link>
            </li>
            <li class="d-inline-block">
              <button class="pr-0">Logout</button>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header"
};
</script>

<style>
header button,
header button:focus,
header a {
  padding: 0;
  outline: none;
  background: #fff;
  margin-left: 10px;
}
header li {
  padding-top: 15px;
}
header {
  white-space: nowrap;
  line-height: 0;
}
</style>