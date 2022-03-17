<script setup>
  import {inject} from 'vue';
  import ClientItem from "@/components/clients/Item.vue";
  import { library } from '@fortawesome/fontawesome-svg-core';

  import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

  library.add( faCirclePlus);
  const clients = inject('clients');
</script>

<template>
  <RouterLink :to="{name: 'cliente'}">
    <font-awesome-icon :icon="['fas', 'circle-plus']" />
  </RouterLink>
  <table class="border-collapse border border-slate-500 w-full">
    <thead>
      <tr>
        <th class="border border-slate-500 p-4">Numero</th>
        <th class="border border-slate-500 p-4">Codigo</th>
        <th class="border border-slate-500 p-4">RUC</th>
        <th class="border border-slate-500 p-4">Nombre</th>
        <th class="border border-slate-500 p-4">Opciones</th>
      </tr>
    </thead>
    <tbody>
      <ClientItem v-for="(client, index) in clients" :key="client.id" :client="client" :index="index" />     
    </tbody>
  </table>
</template>
<style scoped>
  .inactivo{color: red}
</style>