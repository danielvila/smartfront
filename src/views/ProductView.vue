<script setup>
  import { useRoute } from "vue-router";
  import axios from "axios";
  import {onMounted, provide, ref, watchEffect} from 'vue';  
  import AlternateCodes from "@/components/products/AlternateCodes.vue";
  import Prices from "@/components/products/Prices.vue";
  import ProductForm from "@/components/products/Form.vue";
  import Stocks from "@/components/products/Stocks.vue";  

  const products = ref([]);
  const product = ref({ id: 0, activo: '1', tipo: '1'});
  const route = useRoute();
  const id_product = ref(route.params.id);
  const alternatecodes = ref();
  const prices = ref({id: 0, product_id: id_product, price: 0});
  const stocks = ref();
  const currentTab = ref('ProductForm');
  const tabs = {
    ProductForm,
    AlternateCodes,
    Stocks,
    Prices
  }

  provide('products', products);
  provide('product', product);
  provide('alternatecodes', alternatecodes);
  provide('prices', prices);
  provide('stocks', stocks);

  onMounted(async () => {
    await axios
      .get(`products/${route.params.id}`)
      .then((response) => {
        if (response.data != "") {
          product.value = response.data.product;
          alternatecodes.value = product.value.alternatecodes;
          prices.value = product.value.prices;
          stocks.value = product.value.stocks;
        } /*else {
          if (products.value.length > 0) {
            product.value = products.value.filter(
              (item) => item.id !== route.params.id
            );
          }
        }*/
      })
      .catch((error) => console.log(error))
      .finally(() => (console.log('listo.')));
  });

  if (localStorage.getItem('products')) {
    products.value = JSON.parse(localStorage.getItem('products'))
  }

  watchEffect(() => {
    localStorage.setItem('products', JSON.stringify(products.value))
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