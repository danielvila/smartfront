<template>
  <div v-if="loading">Cargando...</div>
  <div v-else class="flex flex-col">
    <div class="overflow-x-auto pb-3">
      <div class="inline-block min-w-full sm:rounded-md border border-gray-300">
        <table class="min-w-full">
          <thead class="border-b text-white">
            <tr class="bg-teal-400">
              <th scope="col" class="text-sm font-medium p-3 text-left">Periodo</th>
              <th scope="col" class="text-sm font-medium p-3 text-left">Nro. factura</th>
              <th scope="col" class="text-sm font-medium p-3 text-left">Contado</th>
              <th scope="col" class="text-sm font-medium p-3 text-left">Cr&eacute;dito</th>
              <th scope="col" class="text-sm font-medium p-3 text-left">Descuentos</th>
              <th scope="col" class="text-sm font-medium p-3 text-left">Total venta</th>
              <th scope="col" class="text-sm font-medium p-3 text-left">Costo de venta</th>
              <th scope="col" class="text-sm font-medium p-3 text-left">Utilidad</th>
              <th scope="col" class="text-sm font-medium p-3 text-left">Nro. de devoluci&oacute;n</th>
              <th scope="col" class="text-sm font-medium p-3 text-left">Monto de devoluci&oacute;n</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b">
              <td class="border-grey-light border text-sm text-gray-900 font-light whitespace-nowrap hover:bg-gray-100 p-3"></td>
              <td class="border-grey-light border text-sm text-gray-900 font-light whitespace-nowrap hover:bg-gray-100 p-3"></td>
              <td class="border-grey-light border text-sm text-gray-900 font-light whitespace-nowrap hover:bg-gray-100 p-3"></td>
              <td class="border-grey-light border text-sm text-gray-900 font-light whitespace-nowrap hover:bg-gray-100 p-3"></td>
              <td class="border-grey-light border text-sm text-gray-900 font-light whitespace-nowrap hover:bg-gray-100 p-3"></td>
              <td class="border-grey-light border text-sm text-gray-900 font-light whitespace-nowrap hover:bg-gray-100 p-3"></td>
              <td class="border-grey-light border text-sm text-gray-900 font-light whitespace-nowrap hover:bg-gray-100 p-3"></td>
              <td class="border-grey-light border text-sm text-gray-900 font-light whitespace-nowrap hover:bg-gray-100 p-3"></td>
              <td class="border-grey-light border text-sm text-gray-900 font-light whitespace-nowrap hover:bg-gray-100 p-3"></td>
              <td class="border-grey-light border text-sm text-gray-900 font-light whitespace-nowrap hover:bg-gray-100 p-3"></td>
            </tr>     
          </tbody>
        </table>        
      </div>
    </div>
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

  name: "Record"

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
<style>
  html,
  body {
    height: 100%;
  }

  @media (min-width: 640px) {
    table {
      display: inline-table !important;
    }

    thead tr:not(:first-child) {
      display: none;
    }
  }

  td:not(:last-child) {
    border-bottom: 0;
  }

  th:not(:last-child) {
    border-bottom: 2px solid rgba(0, 0, 0, .1);
  }
</style>