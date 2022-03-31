<script setup>
  import {inject} from 'vue';
  import SellerItem from "@/components/administrator/sellers/Item.vue";
  import { library } from '@fortawesome/fontawesome-svg-core';

  import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

  library.add( faCirclePlus);
  const sellers = inject('sellers');
</script>

<template>
  <RouterLink :to="{name: 'vendedor'}">
    <font-awesome-icon :icon="['fas', 'circle-plus']" />
  </RouterLink>
  <table class="border-collapse border border-slate-500 w-full">
    <thead>
      <tr>
        <th class="border border-slate-500 p-4">#</th>
        <th class="border border-slate-500 p-4">Correo</th>
        <th class="border border-slate-500 p-4">Nombre</th>
        <th class="border border-slate-500 p-4">Opciones</th>
      </tr>
    </thead>
    <tbody>
      <SellerItem v-for="(seller, index) in sellers" :key="seller.id" :seller="seller" :index="index" />     
    </tbody>
  </table>
</template>
<style scoped>
  .inactivo{color: red}
</style>