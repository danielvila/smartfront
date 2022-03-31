<script setup>

  import {provide, ref, watchEffect} from 'vue';
  import ZoneForm from "@/components/administrator/zones/Form.vue";

  const zones = ref([])
  
  provide('zones', zones)

  if (localStorage.getItem('zones')) {
    zones.value = JSON.parse(localStorage.getItem('zones'))
  }

  watchEffect(() => {
    localStorage.setItem('zones', JSON.stringify(zones.value))
  })
</script>

<template>
  <ZoneForm />
</template>
