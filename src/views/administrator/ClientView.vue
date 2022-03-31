<script setup>
  import {provide, ref, watchEffect} from 'vue';  
  import FinancialData from "@/components/clients/FinancialData.vue";
  import ClientForm from "@/components/clients/Form.vue";
  import OtrosDatos from "@/components/clients/OtrosDatos.vue";
  import Record from "@/components/clients/Record.vue";

  const clients = ref([])
  const currentTab = ref('ClientForm')
  const tabs = {
    ClientForm,
    OtrosDatos,
    FinancialData,
    Record
  }

  provide('clients', clients)

  if (localStorage.getItem('clients')) {
    clients.value = JSON.parse(localStorage.getItem('clients'))
  }

  watchEffect(() => {
    localStorage.setItem('clients', JSON.stringify(clients.value))
  });
</script>

<template>
  <div>
    <button
       v-for="(_, tab) in tabs"
       :key="tab"
       :class="['tab-button', { active: currentTab === tab }]"
       @click="currentTab = tab"
     >
      {{ tab }}
    </button>
    <component :is="tabs[currentTab]" class="tab"></component>
  </div>
  
</template>
<style>
  .tab-button {
    padding: 6px 10px;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    border: 1px solid #ccc;
    cursor: pointer;
    background: #f0f0f0;
    margin-bottom: -1px;
    margin-right: -1px;
  }
  .tab-button:hover {
    background: #e0e0e0;
  }
  .tab-button.active {
    background: #e0e0e0;
  }
  .tab {
    border: 1px solid #ccc;
    padding: 10px;
  }
</style>