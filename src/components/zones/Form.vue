<template>
  <div v-if="loading">Cargando...</div>
  <div v-else class="mt-5 md:mt-0 md:col-span-2">
    <form action="#" method="POST" @submit.prevent="formulario">
      <div class="shadow overflow-hidden sm:rounded-md border border-gray-300">
        <div class="flex flex-col md:flex-row flex-wrap">
          <div class="basis-1/2 p-3">
            <label class="block text-sm font-medium text-gray-700">
              Nombre
            </label>
            <input type="text" v-model.trim="zone.name" required 
              class="form-input border-gray-300 mt-1 block rounded w-full"
            />
          </div>

          <div class="basis-1/2 p-3">
            <label class="block text-sm font-medium text-gray-700">
              Activo
            </label>
            <div class="flex bg-white">
              <div class="flex-1">
                
                <input
                  type="radio"
                  value="1"
                  v-model="zone.active"
                  checked="checked"
                  style="display: none"
                  id="activo-1"
                />
                <label
                  for="activo-1"
                  :class="[
                    'border border-gray-300 border-r-0 cursor-pointer px-2 rounded-l activo-1',
                  ]"
                  >Si</label>
                
                <input
                  type="radio"
                  value="0"
                  v-model="zone.active"
                  style="display: none"
                  id="activo-0"
                  class="bg-red-500"
                />
                <label
                  for="activo-0"
                  :class="[
                    'border border-gray-300 border-l-0 cursor-pointer px-2 rounded-r activo-0',
                  ]"
                  >No</label
                >
              </div>
            </div>              
          </div>

          <div class="basis-full p-3">
            <label class="block text-sm font-medium text-gray-700">
              Descripci&oacute;n
            </label>
            <textarea v-model.trim="zone.description" placeholder="Escriba el detalle de la zona" class="form-input border-gray-300 mt-1 block rounded w-full"></textarea>            
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
            @click="$router.push('/zonas')"
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
  name: "ClientForm",
  components: { FontAwesomeIcon },
  setup() {
    const zones = inject("zones");
    const zone = ref({ id: 0, active: '1'});
    const textinsertupdate = ref("Actualizar");
    const route = useRoute();
    let nuevo = false;
    const loading = ref(true);
    const formulario = async () => {
      if (nuevo) {
        await axios
          .post("zones", send_data())
          .then((response) => {
            zones.value.push(response.data.data);
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
          .finally(() => (cleanform()));
      } else {
        await axios
          .patch("zones/" + route.params.id, send_data())
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
          .finally(() => (console.log('actualizado')));
      }
    };

    const cleanform = () => {
      console.log('registrado');
      zone.value = {
            name: '',
            description: '',
            active: '1',
          };
    };
    const send_data = () => {
      return {
            name: zone.value.name,
            description: zone.value.description,
            active: zone.value.active,
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
      onMounted(async () => {
        await axios
          .get(`zones/${route.params.id}`)
          .then((response) => {
            console.log(response.data);
            if (response.data != "") {
              zone.value = response.data;
            } else {
              if (zones.value.length > 0) {
                zone.value = zones.value.filter(
                  (item) => item.id !== route.params.id
                );
              }
            }
          })
          .catch((error) => console.log(error))
          .finally(() => (loading.value = false));
      });
    }
    return { zone, zones, formulario, loading, textinsertupdate };
  },
};
</script>
<style>
  input[type="radio"] + label {
    background: bg-white;    
  }
  input[type="radio"]:checked + label.activo-1 {
    background: green;
    transition: background 0.5s ease-in-out;
  }
  input[type="radio"]:checked + label.activo-0 {
    background: red;
    transition: background 0.5s ease-in-out;
  }
</style>