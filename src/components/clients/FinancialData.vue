<template>
  <div v-if="loading">Cargando...</div>
  <div v-else class="mt-5 md:mt-0 md:col-span-2">
    <form action="#" method="POST" @submit.prevent="formulario">
      <div class="shadow overflow-hidden sm:rounded-md border border-gray-300">
        <div class="flex flex-col md:flex-row flex-wrap">
          <div class="flex w-full">
            <div class="basis-1/3 p-3">
              <label class="text-sm font-medium text-gray-700">
                Tiene cr&eacute;dito
              </label>
              <input type="checkbox" class="rounded text-pink-500" />
            </div>
            <div class="basis-1/3 p-3">
              <label class="block text-sm font-medium text-gray-700">
                Limite cr&eacute;dito
              </label>
              <input type="text" v-model.number="otrosdatos.zone" required 
                class="form-input border-gray-300 mt-1 block rounded w-full"
              />
            </div>
            <div class="basis-1/3 p-3">
              <label class="block text-sm font-medium text-gray-700">
                D&iacute;as de cr&eacute;dito
              </label>
              <input type="text" v-model.number="otrosdatos.zone" required 
                class="form-input border-gray-300 mt-1 block rounded w-full"
              />
            </div>
          </div>
          <div class="flex w-full">
            <div class="basis-1/3 p-3">
              <label class="text-sm font-medium text-gray-700">
                Tiene tolerancia
              </label>
              <input type="checkbox" class="rounded text-pink-500" />
            </div>
            <div class="basis-1/3 p-3">
              <label class="block text-sm font-medium text-gray-700">
                D&iacute;as de tolerancia
              </label>
              <input type="text" v-model.number="otrosdatos.zone" required 
                class="form-input border-gray-300 mt-1 block rounded w-full"
              />
            </div>
          </div>
          <div class="flex w-full">
            <div class="basis-1/3 p-3">
              <label class="text-sm font-medium text-gray-700">
                Inter&eacute;s de mora
              </label>
              <input type="checkbox" class="rounded text-pink-500" />
            </div>
          </div> 
          <div class="flex w-full">
            <div class="basis-1/3 p-3">
              <label class="text-sm font-medium text-gray-700">
                % Descuento
              </label>
              <input type="text" v-model.number="otrosdatos.zone" required 
                class="form-input border-gray-300 mt-1 rounded"
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
            @click="$router.push('/clientes')"
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
  const id_client = ref(route.params.id);
  const textinsertupdate = ref("Guardar");

  const otrosdatos = ref({id: 0, client_id: id_client, zone: 0, user_id: 0, client_cxc: 0, type_client: 0, type_price: 0});

  const formulario = async () => {
      if (nuevo.value) {
        console.log('guardamos si existe el cliente' + otrosdatos.value.client_id);
        await axios
          .post("other_data", send_data())
          .then((response) => {            
            console.log(response.data);
            console.log('se agrego otrosdatos');
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
      } else if ( otrosdatos.value.id > 0) {
        console.log('guardamos si existe otros datos en la db');
        await axios
          .patch("other_data/" + otrosdatos.value.id, send_data())
          .then((response) => {
            zones.value = zones.value.map((item) => {
              if (item.id === response.data.data.id) {
                item = response.data.data;
              }
              return item;
            });
            console.log(response.data.data);
          })
          .catch(function (error) {
            console.log(error);
          })
          .finally(() => (console.log('otros datos actualizados')));
      }else{
        console.log('primero debe guardar los datos del cliente')
      }
    };
 
    const send_data = () => {
      return {
            client_id: otrosdatos.value.client_id,
            zone: otrosdatos.value.zone,
            user_id: otrosdatos.value.user_id,
            client_cxc: otrosdatos.value.client_cxc,
            type_client: otrosdatos.value.type_client,
            type_price: otrosdatos.value.type_price,
          };
    };

    onMounted(async () => {
        
      if (
        typeof route.params.id === "undefined" ||
          route.params.id === null ||
          route.params.id === ""
        ) {
          console.log("cargamos otrosdatos con valores vacios");
          id_client.value = 0;
          loading.value = false;
        }else{
          await axios
              .get(`show_client/${route.params.id}`)
              .then(response => {          
                otrosdatos.value = response.data
                console.log('cargando otrosdatos desde web');          
              })
              .catch((error) => console.log(error))
              .finally(() => (loading.value = false));
      }

      if (id_client.value > 0) {
        if(otrosdatos.value.id > 0){
          textinsertupdate.value = "Actualizar";
        }else{
          nuevo.value = true;
          otrosdatos.value = {
                    "id": 0,
                    "client_id": id_client.value,
                    "zone": 0,
                    "user_id": 0,
                    "client_cxc": 0,
                    "type_client": 0,
                    "type_price": 0,
                }        
        }            
      }
    });
  
</script>