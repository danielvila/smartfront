<template>
  <div v-if="loading">Cargando...</div>
  <div v-else class="mt-5 md:mt-0 md:col-span-2">
    <form action="#" method="POST" @submit.prevent="formulario">
      <div class="shadow overflow-hidden sm:rounded-md border border-gray-300">
        <div class="flex flex-col md:flex-row flex-wrap">
          <div class="flex w-full" >
            <div class="basis-1/4 p-3">
              <h2>Codigos alternos</h2>
              <p v-for="alternate in alternatecodes" :key="alternate.id">
                {{alternate.code}}
              </p>              
            </div>
          </div>          
          <div class="flex w-full">
            <div class="basis-1/4 p-3">
              <input type="text" v-model.trim="alternatecode.code" class="form-input border-gray-300 mt-1 block rounded w-full" />
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
  const alternatecode = ref({id: 0, product_id: id_product, code: ""});

  const formulario = async () => {
      if (nuevo.value) {
        console.log('guardamos si existe el producto' + alternatecodes.value.product_id);
        await axios
          .post("alternatecodes", send_data())
          .then((response) => {
            textinsertupdate.value = "Actualizar";          
            console.log(response.data);
            console.log('se agrego codigo alterno');
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
        console.log('guardamos si existe codigo alterno datos en la db');
        await axios
          .patch("alternatecodes/" + alternatecode.value.id, send_data())
          .then((response) => {            
            console.log(response.data.data);
          })
          .catch(function (error) {
            console.log(error);
          })
          .finally(() => (console.log('codigo alterno actualizados')));
      }else{
        console.log('primero debe guardar los datos del producte')
      }
  };
 
  const send_data = () => {
    return {
          product_id: alternatecode.value.product_id,
          code: alternatecode.value.code,
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
        alternatecodes.value.forEach((item, index) => {
          console.log(item.code, index)
        });
        console.log('cargando alternatecodes desde web'); 
        loading.value = false;        
    }
    
    if (id_product.value > 0) {
      if(alternatecode.value.id > 0){
        textinsertupdate.value = "Actualizar";
      }else{
        nuevo.value = true;
      }
    }
  });
  
</script>