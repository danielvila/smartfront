<script setup>
  import {inject} from 'vue';
  import ZoneItem from "@/components/administrator/zones/Item.vue";
  import { library } from '@fortawesome/fontawesome-svg-core';
  import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

  library.add( faCirclePlus);
  const zones = inject('zones');
</script>

<template>
  <RouterLink :to="{name: 'zona'}">
    <font-awesome-icon :icon="['fas', 'circle-plus']" />
  </RouterLink>
  <table class="border-collapse border border-slate-500 w-full">
    <thead>
      <tr>
        <th class="border border-slate-500 p-4">Numero</th>
        <th class="border border-slate-500 p-4">Nombre</th>
        <th class="border border-slate-500 p-4">Descripcion</th>
        <th class="border border-slate-500 p-4">Opciones</th>
      </tr>
    </thead>
    <tbody>
      <ZoneItem v-for="(zone, index) in zones" :key="zone.id" :zone="zone" :index="index" />    
    </tbody>
  </table>
</template>
<style scoped>
  .inactivo{color: red}
</style>