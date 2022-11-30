<template>
  <RouterLink :to="{name: 'producto'}">
    <font-awesome-icon :icon="['fas', 'circle-plus']" />
  </RouterLink>
  <table class="border-collapse border border-slate-500 w-full">
    <thead>
      <tr>
        <th class="border border-slate-500 p-4">#</th>
        <th class="border border-slate-500 p-4">C&oacute;digo</th>
        <th class="border border-slate-500 p-4">Descripci&oacute;n</th>
        <th class="border border-slate-500 p-4">Existencia</th>
        <th class="border border-slate-500 p-4">Precio</th>
        <th class="border border-slate-500 p-4">Opciones</th>
      </tr>
    </thead>
    <tbody>
      <ProductItem v-for="(product, index) in products" :key="product.id" :product="product" :index="index" />
    </tbody>
  </table>
</template>

<script setup>
  import {inject} from 'vue';
  import ProductItem from "@/components/products/Item.vue";
  import { library } from '@fortawesome/fontawesome-svg-core';

  import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

  library.add( faCirclePlus);
  const products = inject('products');
</script>
<style scoped>
  .inactivo{color: red}
</style>