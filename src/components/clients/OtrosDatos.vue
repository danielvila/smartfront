<template>
  <div v-if="loading">Cargando...</div>
  <div v-else class="mt-5 md:mt-0 md:col-span-2">
    <form action="#" method="POST" @submit.prevent="formulario">
      <div class="shadow overflow-hidden sm:rounded-md border border-gray-300">
        <div class="flex flex-col md:flex-row flex-wrap">
          <div class="basis-1/3 p-3">
            <label class="block text-sm font-medium text-gray-700">
              Zona
            </label>
            <select v-model="otrosdatos.zone_id" required
              class="form-input border-gray-300 mt-1 block rounded w-full">
              <option value="0" selected>Seleccionar zona</option>
              <option v-for="zone in zones" :value="zone.id" >{{zone.name}}</option>
            </select>
          </div>

          <div class="basis-1/3 p-3">
            <label class="block text-sm font-medium text-gray-700">
              Vendedor
            </label>
            <select v-model="otrosdatos.user_id" required
              class="form-input border-gray-300 mt-1 block rounded w-full">
              <option value="0" selected>Seleccionar vendedor</option>
              <option v-for="seller in sellers" :value="seller.id" >{{seller.name}}</option>
            </select>
          </div>

          <div class="basis-1/3 p-3">
            <label class="block text-sm font-medium text-gray-700">
              Cliente CxC
            </label>
            <select v-model="otrosdatos.client_cxc" required
              class="form-input border-gray-300 mt-1 block rounded w-full">
              <option value="0" selected>Seleccionar cliente</option>
              <option v-for="client in clients" :value="client.id" >{{client.descripcion}}</option>
            </select>
          </div>

          <div class="basis-1/3 p-3">
            <label class="block text-sm font-medium text-gray-700">
              Tipo de Cliente
            </label>
            <select v-model="otrosdatos.type_client" required
              class="form-input border-gray-300 mt-1 block rounded w-full">
              <option value="0" selected>Seleccionar tipo cliente</option>
              <option value="1" selected>Contribuyente</option>
              <option value="2">Consumidor final</option>
              <option value="3">Exento</option>
            </select>
          </div>

          <div class="basis-1/3 p-3">
            <label class="block text-sm font-medium text-gray-700">
              Tipo de precio
            </label>
            <select v-model="otrosdatos.type_price" required
              class="form-input border-gray-300 mt-1 block rounded w-full">
              <option value="0" selected>Seleccionar tipo precio</option>
              <option value="6" selected>Precio 0</option>
              <option value="1">Precio 1</option>
              <option value="2">Precio 2</option>
              <option value="3">Precio 3</option>
              <option value="4">Precio 4</option>
              <option value="5">Precio 5</option>
            </select>
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

<script>
  import axios from "axios";
  import { useRoute } from "vue-router";
  import { inject, onMounted, ref } from "vue";
  import { library } from "@fortawesome/fontawesome-svg-core";
  import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
  import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

  library.add(faCalendarDays);

export default {
  name: "OtrosDatos",
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
