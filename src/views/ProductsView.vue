<script setup>
  import axios from 'axios';
  import {onMounted, provide, ref, watchEffect} from 'vue';
  import ProductsList from "@/components/products/List.vue";

  const products = ref([])
  provide('products', products)
  const productos = ref([])
  const loading = ref(true);
  if (localStorage.getItem('products')) {
    productos.value = JSON.parse(localStorage.getItem('products'));
  }

  onMounted(async () => {
    await axios
        .get('products')
        .then(response => {          
          products.value = response.data
          localStorage.setItem('products', JSON.stringify(products.value))
          console.log('cargando datos desde web');          
        })
        .catch((error) => console.log(error))
        .finally(() => (loading.value = false));
  });

  if (products.value === '') {
    products.value = productos.value
    console.log('cargando datos desde localStorage');
  }

  watchEffect(() => {
    localStorage.setItem('products', JSON.stringify(products.value))
  });
</script>

<template>
  <div v-if="loading">Cargando...</div>
  <div v-else class="mt-5 md:mt-0 md:col-span-2">
    <ProductsList />
  </div>
</template>
