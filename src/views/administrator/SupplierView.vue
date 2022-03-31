<script setup>
  import {ref} from 'vue';  
  import FinancialData from "@/components/administrator/suppliers/FinancialData.vue";
  import SupplierForm from "@/components/administrator/suppliers/Form.vue";
  import Products from "@/components/administrator/suppliers/Products.vue";
  import Record from "@/components/administrator/suppliers/Record.vue";
  import Retentions from "@/components/administrator/suppliers/Retentions.vue";

  const currentTab = ref('SupplierForm')
  const tabs = {
    SupplierForm,
    FinancialData,    
    Record,
    Products,
    Retentions,
  }
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