<script setup>
  import axios from 'axios';
  import {onMounted, provide, ref, watchEffect} from 'vue';
  import SupplierList from "@/components/administrator/suppliers/List.vue";

  const suppliers = ref([])
  provide('suppliers', suppliers)
  const loading = ref(true);

  onMounted(async () => {
    await axios
        .get('suppliers')
        .then(response => {          
          suppliers.value = response.data
          console.log('cargando suppliers desde web');          
        })
        .catch((error) => console.log(error))
        .finally(() => (loading.value = false));
  });
</script>

<template>
  <div v-if="loading" class="text-center mt-5">Cargando...</div>
  <div v-else class="mt-5 md:mt-0 md:col-span-2">
    <SupplierList />
  </div>
</template>
