<template>
  <div v-if="loading">Cargando...</div>
  <div v-else class="mt-5 md:mt-0 md:col-span-2">
    <form action="#" method="POST" @submit.prevent="formulario">
      <div class="shadow overflow-hidden sm:rounded-md border border-gray-300">
        <div class="flex flex-col md:flex-row flex-wrap">
          <div class="basis-1/3 p-3">
            <label class="block text-sm font-medium text-gray-700">
              Codigo
            </label>
            <input type="text" v-model.trim="client.codigo" required 
              class="form-input border-gray-300 mt-1 block rounded w-full"
            />
          </div>

          <div class="basis-1/3 p-3">
            <label class="block text-sm font-medium text-gray-700">
              Tipo
            </label>
            <select v-model.trim="client.tipo" @click="changetipo" required
              class="form-input border-gray-300 mt-1 block rounded w-full">
              <option value="1" selected>Juridico</option>
              <option value="2">Natural</option>
            </select>
          </div>

          <div class="basis-1/3 p-3">
            <label class="block text-sm font-medium text-gray-700">
              {{ textdescripcion }}
            </label>
            <input type="text" v-model.trim="client.descripcion" required
              class="form-input border-gray-300 mt-1 block rounded w-full"
            />
          </div>

          <div class="basis-1/3 p-3">
            <label class="block text-sm font-medium text-gray-700">
              RUC
            </label>
            <input
              type="text"
              v-model.trim="client.id_fiscal"
              class="form-input border-gray-300 mt-1 block rounded w-full"
            />
          </div>

          <div class="basis-1/3 p-3">
            <label class="block text-sm font-medium text-gray-700">
              DV
            </label>
            <input
              type="text"
              v-model.trim="client.dv"                
              class="form-input border-gray-300 mt-1 block rounded w-full"
            />
          </div>

          <div class="basis-1/3 p-3">
            <label class="block text-sm font-medium text-gray-700">
              Nombre del representante
            </label>
            <input
              type="text"
              v-model.trim="client.representante"                
              class="form-input border-gray-300 mt-1 block rounded w-full"
            />
          </div>

          <div class="basis-1/3 p-3">
            <label class="block text-sm font-medium text-gray-700">
              Direccion 1
            </label>
            <input type="text" v-model.trim="client.direcction1" required             
              class="form-input border-gray-300 mt-1 block rounded w-full"
            />
          </div>

          <div class="basis-1/3 p-3">
            <label class="block text-sm font-medium text-gray-700">
              Direccion 2
            </label>
            <input
              type="text"
              v-model.trim="client.direcction2"                
              class="form-input border-gray-300 mt-1 block rounded w-full"
            />
          </div>

          <div class="basis-1/3 p-3">
            <label class="block text-sm font-medium text-gray-700">
              Pais
            </label>
            <input
              type="text"
              v-model.trim="client.pais"                
              class="form-input border-gray-300 mt-1 block rounded w-full"
            />
          </div>

          <div class="basis-1/3 p-3">
            <label class="block text-sm font-medium text-gray-700">
              Provincia
            </label>
            <input
              type="text"
              v-model.trim="client.estado"                
              class="form-input border-gray-300 mt-1 block rounded w-full"
            />
          </div>

          <div class="basis-1/3 p-3">
            <label class="block text-sm font-medium text-gray-700">
              Distrito
            </label>
            <input
              type="text"
              v-model.trim="client.ciudad"                
              class="form-input border-gray-300 mt-1 block rounded w-full"
            />
          </div>

          <div class="basis-1/3 p-3">
            <label class="block text-sm font-medium text-gray-700">
              Corregimiento
            </label>
            <input
              type="text"
              v-model.trim="client.municipio"                
              class="form-input border-gray-300 mt-1 block rounded w-full"
            />
          </div>

          <div class="basis-1/3 p-3">
            <label class="block text-sm font-medium text-gray-700">
              Telefono
            </label>
            <input
              type="text"
              v-model.trim="client.telefono"                
              class="form-input border-gray-300 mt-1 block rounded w-full"
            />
          </div>

          <div class="basis-1/3 p-3">
            <label class="block text-sm font-medium text-gray-700">
              Celular
            </label>
            <input
              type="text"
              v-model.trim="client.celular"                
              class="form-input border-gray-300 mt-1 block rounded w-full"
            />
          </div>

          <div class="basis-1/3 p-3">
            <label class="block text-sm font-medium text-gray-700">
              E-mail
            </label>
            <input
              type="text"
              v-model.trim="client.email"
              class="form-input border-gray-300 mt-1 block rounded w-full"
            />
          </div>

          <div class="basis-1/3 p-3">
            <label class="block text-sm font-medium text-gray-700">
              Activo
            </label>
            <div class="flex bg-white">
              <div class="flex-1">
                
                <input
                  type="radio"
                  value="1"
                  v-model="client.activo"
                  checked="checked"
                  style="display: none"
                  id="activo-1"
                />
                <label
                  for="activo-1"
                  :class="[
                    'border border-gray-300 border-r-0 cursor-pointer px-3 py-1 rounded-l activo-1',
                  ]"
                  >Si</label>
                
                <input
                  type="radio"
                  value="0"
                  v-model="client.activo"
                  style="display: none"
                  id="activo-0"
                  class="bg-red-500"
                />
                <label
                  for="activo-0"
                  :class="[
                    'border border-gray-300 border-l-0 cursor-pointer px-3 py-1 rounded-r activo-0',
                  ]"
                  >No</label
                >
              </div>
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

<script>
import { useRoute } from "vue-router";
import axios from "axios";
import { inject, onMounted, ref } from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faCalendarDays);

export default {
  name: "Form",
  components: { FontAwesomeIcon },
  setup() {
    const client = inject("client");
    //const client = ref({ id: 0, activo: '1', tipo: '1'});
    const textinsertupdate = ref("Actualizar");
    const textdescripcion = ref("Nombre de la empresa")
    const route = useRoute();
    let nuevo = false;
    const loading = ref(true);
    console.log('comienza');
    console.log(client.value.id);
    console.log('termina');
    const formulario = async () => {
      if (nuevo) {
        await axios
          .post("clients", send_data())
          .then((response) => {
            //clients.value.push(response.data.data);
            //route.push("cliente/" + response.data.data.id);
            console.log(response.data);
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
          .finally(() => (console.log('cliente registrado')));
      } else {
        await axios
          .patch("clients/" + route.params.id, send_data())
          .then((response) => {
            /*clients.value = clients.value.map((item) => {
              if (item.id === response.data.data.id) {
                item = response.data.data;
              }
              return item;
            });*/
            console.log(response.data.data);
          })
          .catch(function (error) {
            console.log(error);
          })
          .finally(() => (console.log('cliente actualizado')));
      }
    };

    const changetipo = () => {
      console.log(typeof client.value.tipo);
      if (client.value.tipo === '1') {
        textdescripcion.value = "Nombre de la empresa";
      } else if (client.value.tipo === '2'){
        textdescripcion.value = "Nombre completo";
      }
    };

    const cleanform = () => {
      
      client.value = {
            codigo: '',
            tipo: 1,
            descripcion: '',
            id_fiscal: '',
            dv: '',
            representante: '',
            direcction1: '',
            direcction2: '',
            pais: '',
            estado: '',
            ciudad: '',
            municipio: '',
            telefono: '',
            celular: '',
            activo: 0,
            email: '',
          };
    };
    const send_data = () => {
      return {
            codigo: client.value.codigo,
            tipo: client.value.tipo,
            descripcion: client.value.descripcion,
            id_fiscal: client.value.id_fiscal,
            dv: client.value.dv,            
            representante: client.value.representante,
            direcction1: client.value.direcction1,
            direcction2: client.value.direcction2,
            pais: client.value.pais,
            estado: client.value.estado,
            ciudad: client.value.ciudad,
            municipio: client.value.municipio,            
            telefono: client.value.telefono,
            celular: client.value.celular,
            activo: client.value.activo,
            email: client.value.email,
          };
    };

    if (
      typeof route.params.id === "undefined" ||
      route.params.id === null ||
      route.params.id === ""
    ) {
      onMounted(() => {
        loading.value = false;
        nuevo = true;
        textinsertupdate.value = "Guardar";
      });
    } else {
      onMounted(() => {
        loading.value = false
        /*await axios
          .get(`clients/${route.params.id}`)
          .then((response) => {
            console.log(response.data);
            if (response.data != "") {
              client.value = response.data.client;
            } else {
              if (clients.value.length > 0) {
                client.value = clients.value.filter(
                  (item) => item.id !== route.params.id
                );
              }
            }
          })
          .catch((error) => console.log(error))
          .finally(() => (loading.value = false));*/
      });
    }
    return { changetipo, client, formulario, loading, textdescripcion, textinsertupdate };
  },
};
</script>
<style>
  input[type="radio"] + label {
    background: bg-white;    
  }
  input[type="radio"]:checked + label.activo-1 {
    background: green;
    color: white;
    transition: background 0.5s ease-in-out;
  }
  input[type="radio"]:checked + label.activo-0 {
    background: red;
    color: white;
    transition: background 0.5s ease-in-out;
  }
</style>