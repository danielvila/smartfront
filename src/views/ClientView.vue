<script setup>
  import { useRoute } from "vue-router";
  import axios from "axios";
  import {onMounted, provide, ref, watchEffect} from 'vue';  
  import FinancialData from "@/components/clients/FinancialData.vue";
  import ClientForm from "@/components/clients/Form.vue";
  import OtrosDatos from "@/components/clients/OtrosDatos.vue";
  import Record from "@/components/clients/Record.vue";

  const clients = ref([]);
  const client = ref({ id: 0, activo: '1', tipo: '1'});
  const route = useRoute();
  const id_client = ref(route.params.id);
  const otrosdatos = ref({id: 0, client_id: id_client, zone_id: 0, user_id: 0, client_cxc: 0, type_client: 0, type_price: 0});
  const financialdatos = ref({id: 0, client_id: id_client, credito: 0, credito_limite: 0, credito_dias: 0, tolerancia: 0, tolerancia_dias: 0, interes_mora: 0, descuento: 0});
  const currentTab = ref('ClientForm');
  const tabs = {
    ClientForm,
    OtrosDatos,
    FinancialData,
    Record
  }

  provide('clients', clients);
  provide('client', client);
  provide('otrosdatos', otrosdatos);
  provide('financialdatos', financialdatos);

  onMounted(async () => {
    await axios
      .get(`clients/${route.params.id}`)
      .then((response) => {
        if (response.data != "") {
          client.value = response.data.client;
          otrosdatos.value = response.data.otherdata;
          financialdatos.value = response.data.financialdata;
          financialdatos.value.credito = response.data.financialdata.credito? true : false;
          financialdatos.value.tolerancia = response.data.financialdata.tolerancia? true : false;
          financialdatos.value.interes_mora = response.data.financialdata.interes_mora? true : false;
        } /*else {
          if (clients.value.length > 0) {
            client.value = clients.value.filter(
              (item) => item.id !== route.params.id
            );
          }
        }*/
      })
      .catch((error) => console.log(error))
      .finally(() => (console.log('listo.')));
  });

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