<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <header>
    <nav class="navbar navbar-dark bg-dark">
      <router-link to="/" class="navbar-brand">MyList</router-link>
    </nav>
  </header>

  <RouterView />
</template>

<style>
* {
  margin: 0;
  padding: 0;
}

#app {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  font-weight: normal;
  overflow: hidden;
}

nav {
  padding: 0 4.5rem;
}

@media (min-width: 1024px) {
  body {
    box-sizing: border-box;
    height: 100%;
  }
}
</style>
