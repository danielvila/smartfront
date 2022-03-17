<script setup>
  import axios from 'axios';
  import {onMounted, provide, ref, watchEffect} from 'vue';
  import ClientList from "@/components/clients/List.vue";

  const clients = ref([])
  provide('clients', clients)
  const clientes = ref([])
  const loading = ref(true);
  if (localStorage.getItem('clients')) {
    clientes.value = JSON.parse(localStorage.getItem('clients'));
  }

  onMounted(async () => {
    await axios
        .get('clients')
        .then(response => {          
          clients.value = response.data
          localStorage.setItem('clients', JSON.stringify(clients.value))
          console.log('cargando datos desde web');          
        })
        .catch((error) => console.log(error))
        .finally(() => (loading.value = false));
  });

  if (clients.value === '') {
    clients.value = clientes.value
    console.log('cargando datos desde localStorage');
  }

  watchEffect(() => {
    localStorage.setItem('clients', JSON.stringify(clients.value))
  });
</script>

<template>
  <div v-if="loading">Cargando...</div>
  <div v-else class="mt-5 md:mt-0 md:col-span-2">
    <ClientList />
  </div>
</template>
