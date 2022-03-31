<template>
  <div v-if="loading" class="text-center mt-5">Cargando...</div>
  <div v-else class="mt-5 md:mt-0 md:col-span-2">
    <form action="#" method="POST" @submit.prevent="formulario">
      <div class="shadow overflow-hidden sm:rounded-md border border-gray-300">
        <div class="flex flex-col md:flex-row flex-wrap">
          <div class="basis-1/3 p-3">
            <label class="block text-sm font-medium text-gray-700">
              Codigo
            </label>
            <input type="text" v-model.trim="supplier.codigo" required 
              class="form-input border-gray-300 mt-1 block rounded w-full"
            />
          </div>

          <div class="basis-1/3 p-3">
            <label class="block text-sm font-medium text-gray-700">
              Tipo
            </label>
            <select v-model.trim="supplier.tipo" required
              class="form-input border-gray-300 mt-1 block rounded w-full">
              <option value="1" selected>Juridico</option>
              <option value="2">Natural</option>
            </select>
          </div>

          <div class="basis-1/3 p-3">
            <label class="block text-sm font-medium text-gray-700">
              Nombre de la empresa
            </label>
            <input type="text" v-model.trim="supplier.name" required
              class="form-input border-gray-300 mt-1 block rounded w-full"
            />
          </div>

          <div class="basis-1/3 p-3">
            <label class="block text-sm font-medium text-gray-700">
              Tipo proveedor
            </label>
            <select v-model.trim="supplier.tipo" @click="changetipo" required
              class="form-input border-gray-300 mt-1 block rounded w-full">
              <option value="1" selected>Nacional</option>
              <option value="2">Internacional</option>
            </select>
          </div>

          <div class="basis-1/3 p-3">
            <label class="block text-sm font-medium text-gray-700">
              RUC
            </label>
            <input
              type="text"
              v-model.trim="supplier.ruc"
              class="form-input border-gray-300 mt-1 block rounded w-full"
            />
          </div>

          <div class="basis-1/3 p-3">
            <label class="block text-sm font-medium text-gray-700">
              DV
            </label>
            <input
              type="text"
              v-model.trim="supplier.dv"
              class="form-input border-gray-300 mt-1 block rounded w-full"
            />
          </div>

          <div class="basis-1/3 p-3">
            <label class="block text-sm font-medium text-gray-700">
              Nombre del representante
            </label>
            <input
              type="text"
              v-model.trim="supplier.representante"                
              class="form-input border-gray-300 mt-1 block rounded w-full"
            />
          </div>

          <div class="basis-1/3 p-3">
            <label class="block text-sm font-medium text-gray-700">
              Direccion 1
            </label>
            <input type="text" v-model.trim="supplier.direcction1" required             
              class="form-input border-gray-300 mt-1 block rounded w-full"
            />
          </div>

          <div class="basis-1/3 p-3">
            <label class="block text-sm font-medium text-gray-700">
              Direccion 2
            </label>
            <input type="text" v-model.trim="supplier.direcction2" required             
              class="form-input border-gray-300 mt-1 block rounded w-full"
            />
          </div>         

          <div class="basis-1/3 p-3">
            <label class="block text-sm font-medium text-gray-700">
              Pais
            </label>
            <input
              type="text"
              v-model.trim="supplier.pais"                
              class="form-input border-gray-300 mt-1 block rounded w-full"
            />
          </div>

          <div class="basis-1/3 p-3">
            <label class="block text-sm font-medium text-gray-700">
              Provincia
            </label>
            <input
              type="text"
              v-model.trim="supplier.estado"                
              class="form-input border-gray-300 mt-1 block rounded w-full"
            />
          </div>

          <div class="basis-1/3 p-3">
            <label class="block text-sm font-medium text-gray-700">
              Distrito
            </label>
            <input
              type="text"
              v-model.trim="supplier.ciudad"                
              class="form-input border-gray-300 mt-1 block rounded w-full"
            />
          </div>

          <div class="basis-1/3 p-3">
            <label class="block text-sm font-medium text-gray-700">
              Corregimiento
            </label>
            <input
              type="text"
              v-model.trim="supplier.municipio"                
              class="form-input border-gray-300 mt-1 block rounded w-full"
            />
          </div>

          <div class="basis-1/3 p-3">
            <label class="block text-sm font-medium text-gray-700">
              Telefono
            </label>
            <input
              type="text"
              v-model.trim="supplier.telefono"                
              class="form-input border-gray-300 mt-1 block rounded w-full"
            />
          </div>

          <div class="basis-1/3 p-3">
            <label class="block text-sm font-medium text-gray-700">
              Celular
            </label>
            <input
              type="text"
              v-model.trim="supplier.celular"                
              class="form-input border-gray-300 mt-1 block rounded w-full"
            />
          </div>

          <div class="basis-1/3 p-3">
            <label class="block text-sm font-medium text-gray-700">
              E-mail
            </label>
            <input
              type="text"
              v-model.trim="supplier.email"
              class="form-input border-gray-300 mt-1 block rounded w-full"
            />
          </div>

          <div class="basis-1/3 p-3">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Activo
            </label>
            <div class="flex bg-white">
              <div class="flex-1">
                
                <input
                  type="radio"
                  value="1"
                  v-model="supplier.activo"
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
                  v-model="supplier.activo"
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
            @click="$router.push('/administrator/proveedores')"
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
    const suppliers = inject("suppliers");
    const supplier = ref({ id: 0, activo: '1', tipo: '1'});
    const textinsertupdate = ref("Actualizar");
    const route = useRoute();
    let nuevo = false;
    const loading = ref(true);
    const formulario = async () => {
      if (nuevo) {
        await axios
          .post("suppliers", send_data())
          .then((response) => {
            suppliers.value.push(response.data.data);
            //route.push("suppliere/" + response.data.data.id);
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
          .finally(() => (console.log('suppliere registrado')));
      } else {
        await axios
          .patch("suppliers/" + route.params.id, send_data())
          .then((response) => {
            suppliers.value = suppliers.value.map((item) => {
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
          .finally(() => (console.log('suppliere actualizado')));
      }
    };

    const cleanform = () => {
      
      supplier.value = {
            codigo: '',
            tipo: 1,
            name: '',
            ruc: '',
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
            codigo: supplier.value.codigo,
            tipo: supplier.value.tipo,
            name: supplier.value.name,
            ruc: supplier.value.ruc,
            dv: supplier.value.dv,            
            representante: supplier.value.representante,
            direcction1: supplier.value.direcction1,
            direcction2: supplier.value.direcction2,
            pais: supplier.value.pais,
            estado: supplier.value.estado,
            ciudad: supplier.value.ciudad,
            municipio: supplier.value.municipio,            
            telefono: supplier.value.telefono,
            celular: supplier.value.celular,
            activo: supplier.value.activo,
            email: supplier.value.email,
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
          .get(`suppliers/${route.params.id}`)
          .then((response) => {
            console.log(response.data);
            if (response.data != "") {
              supplier.value = response.data;
            } else {
              if (suppliers.value.length > 0) {
                supplier.value = suppliers.value.filter(
                  (item) => item.id !== route.params.id
                );
              }
            }
          })
          .catch((error) => console.log(error))
          .finally(() => (loading.value = false));
      });
    }
    return { supplier, suppliers, formulario, loading, textinsertupdate };
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