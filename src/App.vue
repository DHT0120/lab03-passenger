<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
  <div id="layout">
    <header>
      <div class="wrapper">
        <nav>
          <RouterLink :to="{ name: 'passenger' }">Passenger</RouterLink> |
          <RouterLink :to="{ name: 'about' }">About</RouterLink>
        </nav>
      </div>
    </header>

    <RouterView />
  </div>

</template>

<style>
#layout {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #01010b;
}

nav {
  padding: 30px;

}

nav a {
  font-weight: bold;
  color: #020302;

}

nav a.router-link-exact-active {
  color: #0fd8be;

}

h2 {
  font-size: 20px;
}
</style>
