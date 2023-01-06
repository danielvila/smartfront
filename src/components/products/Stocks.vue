<template>
  <div v-if="loading">Cargando...</div>
  <div v-else class="mt-5 md:mt-0 md:col-span-2">
    <ProductStok v-for="(stock, index) in stocks" :key="stock.id" :stock="stock" :index="index" />
    <ProductStok :key="stock.id" :stock="stock" :index="index" />
  </div>
</template>

<script setup>
  import axios from "axios";
  import { useRoute } from "vue-router";
  import { inject, onMounted, provide, ref } from "vue";
  import ProductStok from "@/components/products/Stock.vue";
  import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
  
  const route = useRoute();
  const id_product = ref(route.params.id);
  const storages = ref();
  const shelves = ref();
  const loading = ref(true);
  provide('storages', storages);
  provide('shelves', shelves);
  const stocks = inject("stocks");

  const stock = ref({id: 0, product_id: id_product, quantity: 0, min: 0, max: 0, storage_id: 0, shelf_id: 0});

  onMounted(async () => {    
    await axios
            .get(`storages`)
            .then(response => {          
              storages.value = response.data;
              console.log('cargando storages para stocks desde web');          
            })
            .catch((error) => console.log(error))
            .finally(() => (loading.value = false));
    await axios
            .get(`shelves`)
            .then(response => {          
              shelves.value = response.data;
              console.log('cargando shelves para stocks desde web');          
            })
            .catch((error) => console.log(error))
            .finally(() => (loading.value = false));
    loading.value = false;
  });  
</script>