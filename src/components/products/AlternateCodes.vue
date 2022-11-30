<template>
  <div v-if="loading">Cargando...</div>
  <div v-else class="mt-5 md:mt-0 md:col-span-2">
    <form action="#" method="POST" @submit.prevent="formulario">
      <div class="shadow overflow-hidden sm:rounded-md border border-gray-300">
        <div class="flex flex-col md:flex-row flex-wrap">
          <div class="flex w-full" >
            <div class="basis-1/4 p-3">
              <p v-for="alternate in alternatecodes" :key="alternate">
                {{alternatecodes.value[alternate].code}}
              </p>
            </div>
          </div>
          <div class="flex w-full">
            <div class="basis-1/4 p-3">
              <input type="text" class="form-input border-gray-300 mt-1 block rounded w-full" />
            </div>
          </div>
          <div class="flex w-full">
            <div class="basis-1/4 p-3">
              <input type="text" class="form-input border-gray-300 mt-1 block rounded w-full" />
            </div>
          </div>
          <div class="flex w-full">
            <div class="basis-1/4 p-3">
              <input type="text" class="form-input border-gray-300 mt-1 block rounded w-full" />
            </div>
          </div>
          <div class="flex w-full">
            <div class="basis-1/4 p-3">
              <input type="text" class="form-input border-gray-300 mt-1 block rounded w-full" />
            </div>
          </div>
          <div class="flex w-full">
            <div class="basis-1/4 p-3">
              <input type="text" class="form-input border-gray-300 mt-1 block rounded w-full" />
            </div>
          </div>
          <div class="flex w-full">
            <div class="basis-1/4 p-3">
              <input type="text" class="form-input border-gray-300 mt-1 block rounded w-full" />
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
            @click="$router.push('/productos')"
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
  const loading = ref(true);
  const nuevo = ref(false);
  const route = useRoute();
  const id_product = ref(route.params.id);
  const textinsertupdate = ref("Guardar");
  const alternatecodes = inject("alternatecodes");
  /*const alternatecodes = ref({id: 0, product_id: id_product, credito: 0, credito_limite: 0, credito_dias: 0, tolerancia: 0, tolerancia_dias: 0, interes_mora: 0, descuento: 0});*/
  const formulario = async () => {
      if (nuevo.value) {
        console.log('guardamos si existe el producte' + alternatecodes.value.product_id);
        await axios
          .post("financial_data", send_data())
          .then((response) => {
            textinsertupdate.value = "Actualizar";          
            console.log(response.data);
            console.log('se agrego alternatecodes');
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
      } else if ( alternatecodes.value.id > 0) {
        console.log('guardamos si existe financial datos en la db');
        await axios
          .patch("financial_data/" + alternatecodes.value.id, send_data())
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
          product_id: alternatecodes.value.product_id,
          credito: alternatecodes.value.credito? 1 : 0,
          credito_limite: alternatecodes.value.credito_limite,
          credito_dias: alternatecodes.value.credito_dias,
          tolerancia: alternatecodes.value.tolerancia? 1 : 0,
          tolerancia_dias: alternatecodes.value.tolerancia_dias,
          interes_mora: alternatecodes.value.interes_mora? 1 : 0,
          descuento: alternatecodes.value.descuento,
        };
  };

  onMounted(async () => {
    if (
      typeof route.params.id === "undefined" ||
        route.params.id === null ||
        route.params.id === ""
      ) {
        console.log("cargamos alternatecodes con valores vacios");
        id_product.value = 0;
        loading.value = false;
      }else{
        loading.value = false;
        await axios
            .get(`alternatecodes/${route.params.id}`)
            .then(response => {
              alternatecodes.value = response.data.alternatecode;
              console.log(alternatecodes.value);
              console.log('cargando alternatecodes desde web');
            })
            .catch((error) => console.log(error))
            .finally(() => (loading.value = false));
    }
    
    if (id_product.value > 0) {
      if(alternatecodes.value.id > 0){
        textinsertupdate.value = "Actualizar";
      }else{
        nuevo.value = true;
        alternatecodes.value = {}
      }
    }
  });
  
</script>