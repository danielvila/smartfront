<script setup>
  import {inject} from 'vue';
  import SupplierItem from "@/components/administrator/suppliers/Item.vue";
  import { library } from '@fortawesome/fontawesome-svg-core';

  import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

  library.add( faCirclePlus);
  const suppliers = inject('suppliers');
</script>

<template>
  <RouterLink :to="{name: 'proveedor'}">
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
      <SupplierItem v-for="(supplier, index) in suppliers" :key="supplier.id" :supplier="supplier" :index="index" />     
    </tbody>
  </table>
</template>
<style scoped>
  .inactivo{color: red}
</style>