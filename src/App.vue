<script setup>
  import { RouterLink, RouterView } from "vue-router";
  import HelloWorld from "@/components/HelloWorld.vue";
</script>

<template>
  <header>   
    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav class="flex justify-center space-x-4">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/clientes">Clientes</RouterLink>
        <RouterLink to="/zonas">Zonas</RouterLink>
      </nav>
    </div>
  </header>
  <main class="container mx-auto">
    <RouterView />
  </main>
</template>
