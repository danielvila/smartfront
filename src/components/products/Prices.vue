<template>
  <div v-if="loading">Cargando...</div>
  <div v-else class="mt-5 md:mt-0 md:col-span-2">
    <form action="#" method="POST" @submit.prevent="formulario">
      <div class="shadow overflow-hidden sm:rounded-md border border-gray-300">
        <div class="flex flex-col md:flex-row flex-wrap">
          <div class="basis-1/3 p-3">
            <div class="flex items-center" v-for="(price, index) in prices" :key="price.id" :price="price" :index="index">
              <label for="exent" class="text-sm font-medium text-gray-700 mr-2">Precio {{index}}: </label>
              <input type="text" v-model.trim="price.price" required 
              class="form-input border-gray-300 mt-1 block rounded"
            />
            </div>
          </div>
          <div class="basis-1/3 p-3">
            <div class="flex items-center">
              <label for="exent" class="text-sm font-medium text-gray-700 mr-2">Utilidad: </label>
              <input type="text" v-model.trim="prices.department_id" required 
              class="form-input border-gray-300 mt-1 block rounded"
            />
            </div>
          </div>
          <div class="basis-1/3 p-3">
            <div class="flex items-center">
              <label for="exent" class="text-sm font-medium text-gray-700 mr-2">Con ITBMS: </label>
              <input type="text" v-model.trim="prices.department_id" required 
              class="form-input border-gray-300 mt-1 block rounded"
            />
            </div>
          </div>         
        </div>
        <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <button
            type="submit"
            class="inline-flex justify-center py-2 px-4 mr-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {{ textinsertupdate }}
          </button>
          <button
            type="button"
            @click="$router.push('/productes')"
            class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancelar
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
  import axios from "axios";
  import { useRoute } from "vue-router";
  import { inject, onMounted, ref } from "vue";
  import { library } from "@fortawesome/fontawesome-svg-core";
  import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
  import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

  library.add(faCalendarDays);

  const loading = ref(true);
  const nuevo = ref(false);    
  const route = useRoute();
  const id_product = ref(route.params.id);
  const textinsertupdate = ref("Guardar");
  const prices = inject("prices");

  /*const prices = ref({id: 0, product_id: id_product, credito: 0, credito_limite: 0, credito_dias: 0, tolerancia: 0, tolerancia_dias: 0, interes_mora: 0, descuento: 0});*/

  const formulario = async () => {
      if (nuevo.value) {
        console.log('guardamos si existe el producte' + prices.value.product_id);
        await axios
          .post("financial_data", send_data())
          .then((response) => {
            textinsertupdate.value = "Actualizar";          
            console.log(response.data);
            console.log('se agrego prices');
          })
          .catch(function (error) {
            if (error.response) {
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            } else if (error.request) {
              console.log(error.request);
            } else {
              console.log('Error', error.message);
            }
            console.log(error.config);
            console.log(error.toJSON());
          })
          .finally(() => (console.log('tarea finalizada')));
      } else if ( prices.value.id > 0) {
        console.log('guardamos si existe financial datos en la db');
        await axios
          .patch("financial_data/" + prices.value.id, send_data())
          .then((response) => {            
            console.log(response.data.data);
          })
          .catch(function (error) {
            console.log(error);
          })
          .finally(() => (console.log('financial datos actualizados')));
      }else{
        console.log('primero debe guardar los datos del producte')
      }
  };
 
  const send_data = () => {
    return {
          product_id: prices.value.product_id,
          credito: prices.value.credito? 1 : 0,
          credito_limite: prices.value.credito_limite,
          credito_dias: prices.value.credito_dias,
          tolerancia: prices.value.tolerancia? 1 : 0,
          tolerancia_dias: prices.value.tolerancia_dias,
          interes_mora: prices.value.interes_mora? 1 : 0,
          descuento: prices.value.descuento,
        };
  };

    onMounted(async () => {console.log('----------------');console.log(prices.value);console.log('--------');
      if (
        typeof route.params.id === "undefined" ||
          route.params.id === null ||
          route.params.id === ""
        ) {
          console.log("cargamos prices con valores vacios");
          id_product.value = 0;
          loading.value = false;
        }else{
          loading.value = false
          /*await axios
              .get(`show_financial_product/${route.params.id}`)
              .then(response => {          
                prices.value = response.data;
                prices.value.credito = response.data.credito? true : false;
                prices.value.tolerancia = response.data.tolerancia? true : false;
                prices.value.interes_mora = response.data.interes_mora? true : false;
                console.log('cargando prices desde web');          
              })
              .catch((error) => console.log(error))
              .finally(() => (loading.value = false));*/
      }

      if (id_product.value > 0) {
        if(prices.value.id > 0){
          textinsertupdate.value = "Actualizar";
        }else{
          nuevo.value = true;
          prices.value = {
                    id: 0,
                    price: 0,
                    product_id: id_product.value,                    
                }        
        }            
      }
    });
  
</script>