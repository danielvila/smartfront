<script setup>
  import axios from 'axios';
  import {onMounted, provide, ref} from 'vue';
  import SellerList from "@/components/administrator/sellers/List.vue";

  const sellers = ref([])
  provide('sellers', sellers)
  const loading = ref(true);

  onMounted(async () => {
    await axios
        .get('sellers')
        .then(response => {          
          sellers.value = response.data
          console.log('cargando sellers desde web');          
        })
        .catch((error) => console.log(error))
        .finally(() => (loading.value = false));
  });

</script>

<template>
  <div v-if="loading" class="text-center mt-5">Cargando...</div>
  <div v-else class="mt-5 md:mt-0 md:col-span-2">
    <SellerList />
  </div>
</template>
