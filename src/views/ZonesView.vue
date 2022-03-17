<script setup>
  import axios from 'axios';
  import {onMounted, provide, ref, watchEffect} from 'vue';
  import ZoneList from "@/components/zones/List.vue";

  const zones = ref([])
  provide('zones', zones)
  const zonas = ref([])
  const loading = ref(true);
  if (localStorage.getItem('zones')) {
    zones.value = JSON.parse(localStorage.getItem('zones'));
  }

  onMounted(async () => {
    await axios
        .get('zones')
        .then(response => {
          zones.value = response.data
          localStorage.setItem('zones', JSON.stringify(zones.value))
          console.log('cargando datos desde web');          
        })
        .catch((error) => console.log(error))
        .finally(() => (loading.value = false));
  });

  if (zones.value === '') {
    zones.value = zonas.value
    console.log('cargando datos desde localStorage');
  }

  watchEffect(() => {
    localStorage.setItem('zones', JSON.stringify(zones.value))
  })
</script>

<template>
  <div v-if="loading">Cargando...</div>
  <div v-else class="mt-5 md:mt-0 md:col-span-2">
    <ZoneList />
  </div>
</template>
