<template>
  <div v-if="loading" class="text-center mt-5">Cargando...</div>
  <div v-else class="flex flex-col">
    <div class="flex w-full mb-3">      
      <label class="mr-3 text-sm font-medium text-gray-700">
        Movimientos
      </label>
      <select required
      class="form-input border-gray-300 mt-1 block rounded w-40">
        <option value="1" selected>Todos</option>
        <option value="2">Mes actual</option>
        <option value="2">Ultimos 3 meses</option>
        <option value="2">Ultimos 6 meses</option>
        <option value="2">Ultimos 9 meses</option>
        <option value="2">Ultimos 12 meses</option>
        <option value="2">Por rango</option>
      </select>      
    </div>
    <div class="overflow-x-auto pb-3">
      <div class="inline-block min-w-full sm:rounded-md border border-gray-300">
        <table class="min-w-full">
          <thead class="border-b text-white">
            <tr class="bg-teal-400">
              <th scope="col" class="text-sm font-medium p-3 text-left">C&oacute;digo</th>
              <th scope="col" class="text-sm font-medium p-3 text-left">Descripci&oacute;n</th>
              <th scope="col" class="text-sm font-medium p-3 text-left">Cantidad</th>
              <th scope="col" class="text-sm font-medium p-3 text-left">Costo</th>
              <th scope="col" class="text-sm font-medium p-3 text-left">Total costo</th>
              <th scope="col" class="text-sm font-medium p-3 text-left">Documento</th>
              <th scope="col" class="text-sm font-medium p-3 text-left">Fecha</th>
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
            </tr>     
          </tbody>
        </table>        
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  import { useRoute } from "vue-router";
  import { inject, onMounted, ref } from "vue";
  import { library } from "@fortawesome/fontawesome-svg-core";
  import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
  import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

  library.add(faCalendarDays);

export default {
  name: "Products",
  components: { FontAwesomeIcon },
  setup() {
    const clients = ref([]);    
    const loading = ref(true);
    const nuevo = ref(false);    
    const route = useRoute();
    const sellers = ref([]);
    const textinsertupdate = ref("Guardar");
    const zones = ref([]);
    const id_client = ref(route.params.id);

    const otrosdatos = ref({id: 0, client_id: id_client, zone_id: 0, user_id: 0, client_cxc: 0, type_client: 0, type_price: 0});
    
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
              // La respuesta fue hecha y el servidor respondió con un código de estado
              // que esta fuera del rango de 2xx
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            } else if (error.request) {
              // La petición fue hecha pero no se recibió respuesta
              // `error.request` es una instancia de XMLHttpRequest en el navegador y una instancia de
              // http.ClientRequest en node.js
              console.log(error.request);
            } else {
              // Algo paso al preparar la petición que lanzo un Error
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
            zone_id: otrosdatos.value.zone_id,
            user_id: otrosdatos.value.user_id,
            client_cxc: otrosdatos.value.client_cxc,
            type_client: otrosdatos.value.type_client,
            type_price: otrosdatos.value.type_price,
          };
    };

    onMounted(async () => {
      await axios
          .get('zones')
          .then(response => {
            zones.value = response.data
            console.log('cargando zonas desde web');          
          })
          .catch((error) => console.log(error))
          .finally(() => (loading.value = false));
      await axios
          .get('clients')
          .then(response => {
            if (
              typeof route.params.id === "undefined" ||
              route.params.id === null ||
              route.params.id === ""
            ) {
              clients.value = response.data
            }else{
              clients.value = response.data.filter(item => item.id !== route.params.id)
            }
            console.log(clients.value);
            console.log('cargando clientes desde web');       
          })
          .catch((error) => console.log(error))
          .finally(() => (loading.value = false));
      await axios
          .get('sellers')
          .then(response => {          
            sellers.value = response.data
            console.log('cargando vendedores desde web');          
          })
          .catch((error) => console.log(error))
          .finally(() => (loading.value = false));
      if (
        typeof route.params.id === "undefined" ||
          route.params.id === null ||
          route.params.id === ""
        ) {
          console.log("cargamos otrosdatos con valores vacios");
          id_client.value = 0;
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
                    "zone_id": 0,
                    "user_id": 0,
                    "client_cxc": 0,
                    "type_client": 0,
                    "type_price": 0,
                }        
        }            
      }
    });

    return { clients, zones, formulario, id_client, loading, nuevo, otrosdatos, sellers, textinsertupdate };
  },
};
</script>
