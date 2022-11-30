<template>
  <div v-if="loading">Cargando...</div>
  <div v-else class="mt-5 md:mt-0 md:col-span-2">
    <form action="#" method="POST" @submit.prevent="formulario">
      <div class="shadow overflow-hidden sm:rounded-md border border-gray-300">
        <div class="flex flex-col md:flex-row flex-wrap">
          <div class="basis-1/3 p-3">
            <label class="block text-sm font-medium text-gray-700">
              Departamento
            </label>
            <input type="text" v-model.trim="product.department_id" required 
              class="form-input border-gray-300 mt-1 block rounded w-full"
            />
          </div>

          <div class="basis-1/3 p-3">
            <label class="block text-sm font-medium text-gray-700">
              Grupo
            </label>
            <select v-model.trim="product.group_id" @click="changetipo" required
              class="form-input border-gray-300 mt-1 block rounded w-full">
              <option value="1" selected>Juridico</option>
              <option value="2">Natural</option>
            </select>
          </div>

          <div class="basis-1/3 p-3">
            <label class="block text-sm font-medium text-gray-700">
              Linea
            </label>
            <input type="text" v-model.trim="product.line_id" required
              class="form-input border-gray-300 mt-1 block rounded w-full"
            />
          </div>

          <div class="basis-1/3 p-3">
            <label class="block text-sm font-medium text-gray-700">
              Codigo
            </label>
            <input
              type="text"
              v-model.trim="product.code"
              class="form-input border-gray-300 mt-1 block rounded w-full"
            />
          </div>

          <div class="basis-1/3 p-3">
            <label class="block text-sm font-medium text-gray-700">
              Tipo
            </label>
            <div class="flex bg-white">
              <div class="flex-1 mt-2">
                <input
                  type="radio"
                  value="1"
                  v-model="product.type"
                  checked="checked"
                  style="display: none"
                  id="type-1"
                />
                <label
                  for="type-1"
                  :class="[
                    'border border-gray-300 border-r-0 cursor-pointer px-3 py-1 rounded-l type-1',
                  ]"
                  >Es Producto</label>            
                <input
                  type="radio"
                  value="2"
                  v-model="product.type"
                  style="display: none"
                  id="type-2"
                />
                <label
                  for="type-2"
                  :class="[
                    'border border-gray-300 cursor-pointer px-3 py-1 type-2',
                  ]"
                  >Es Servicio</label>
                
                <input
                  type="radio"
                  value="0"
                  v-model="product.type"
                  style="display: none"
                  id="type-0"
                  class="bg-red-500"
                />
                <label
                  for="type-0"
                  :class="[
                    'border border-gray-300 border-l-0 cursor-pointer px-3 py-1 rounded-r type-0',
                  ]"
                  >Es Retail POS</label>
              </div>
            </div> 
          </div>

          <div class="basis-1/3 p-3">
            <label class="block text-sm font-medium text-gray-700">
              Descripci&oacute;n
            </label>
            <input
              type="text"
              v-model.trim="product.description"                
              class="form-input border-gray-300 mt-1 block rounded w-full"
            />
          </div>

          <div class="basis-1/3 p-3">
            <label class="block text-sm font-medium text-gray-700">
              Marca
            </label>
            <input type="text" v-model.trim="product.trademark_id" required             
              class="form-input border-gray-300 mt-1 block rounded w-full"
            />
          </div>          

          <div class="basis-1/3 p-3">
            <label class="block text-sm font-medium text-gray-700">
              ITBMS Venta
            </label>
            <input
              type="text"
              v-model.trim="product.itbmssale_id"                
              class="form-input border-gray-300 mt-1 block rounded w-full"
            />
          </div>

          <div class="basis-1/3 p-3">
            <label class="block text-sm font-medium text-gray-700">
              ITBMS Compra
            </label>
            <input
              type="text"
              v-model.trim="product.itbmsbuy_id"                
              class="form-input border-gray-300 mt-1 block rounded w-full"
            />
          </div>

          <div class="basis-1/3 p-3">
            <div class="flex items-center">
              <label for="exent" class="text-sm font-medium text-gray-700 mr-2">Exento</label>
              <input type="checkbox" id="exent" v-model="product.exent" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
            </div>         
          </div>

          <div class="basis-1/3 p-3">
            <div class="flex items-center">
              <label for="packaging" class="text-sm font-medium text-gray-700 mr-2">Uso de empaque?</label>
              <input type="checkbox" id="packaging" v-model="product.use_packaging" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
            </div>            
          </div>          

          <div class="basis-1/3 p-3">
            <div class="flex items-center">
              <label for="with_lots" class="text-sm font-medium text-gray-700 mr-2">Producto con lotes?</label>
              <input type="checkbox" id="with_lots" v-model="product.product_with_lots" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
            </div>
          </div>

          <div class="basis-1/3 p-3">
            <div class="flex items-center">
              <label for="composite_product" class="text-sm font-medium text-gray-700 mr-2">Producto compuesto?</label>
              <input type="checkbox" id="composite_product" v-model="product.composite_product" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
            </div>            
          </div>

          <div class="basis-1/3 p-3">
            <div class="flex items-center">
              <label for="with_serials" class="text-sm font-medium text-gray-700 mr-2">Producto con seriales?</label>
              <input type="checkbox" id="with_serials" v-model="product.product_with_serials" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
            </div>
          </div>

          <div class="basis-1/3 p-3">
            <div class="flex items-center">
              <label for="use_server" class="text-sm font-medium text-gray-700 mr-2">Usa servidor?</label>
              <input type="checkbox" id="use_server" v-model="product.use_server" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
            </div>
          </div>

          <div class="basis-1/3 p-3">
            <div class="flex items-center">
              <label for="area_transactions" class="text-sm font-medium text-gray-700 mr-2">Usa c&aacute;lculo de &aacute;rea en transacciones?</label>
              <input type="checkbox" id="area_transactions" v-model="product.use_area_transactions" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
            </div>
          </div>

          <div class="basis-1/3 p-3">
            <div class="flex items-center">
              <label for="scale_prices" class="text-sm font-medium text-gray-700 mr-2">Precios por escala?</label>
              <input type="checkbox" id="scale_prices" v-model="product.scale_prices" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
            </div>
          </div>

          <div class="basis-1/3 p-3">
            <div class="flex items-center">
              <label for="consignment" class="text-sm font-medium text-gray-700 mr-2">Producto en consignacion?</label>
              <input type="checkbox" id="consignment" v-model="product.product_consignment" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
            </div>
          </div>

          <div class="basis-1/3 p-3">
            <div class="flex items-center">
              <label for="scale" class="text-sm font-medium text-gray-700 mr-2">Usa balanza?</label>
              <input type="checkbox" id="scale" v-model="product.use_scale" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
            </div>
          </div>

          <div class="basis-1/3 p-3">
            <div class="flex items-center">
              <label for="ecommerce" class="text-sm font-medium text-gray-700 mr-2">E-commerce?</label>
              <input type="checkbox" id="ecommerce" v-model="product.ecommerce" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
            </div>
          </div>

          <div class="basis-1/3 p-3">
            <div class="flex items-center">
              <label class="block mr-2 text-sm font-medium text-gray-700">
                Activo
              </label>
              <div class="flex bg-white">
                <div class="flex-1">                
                  <input
                    type="radio"
                    value="1"
                    v-model="product.active"
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
                    v-model="product.active"
                    style="display: none"
                    id="activo-0"
                    class="bg-red-500"
                  />
                  <label
                    for="activo-0"
                    :class="[
                      'border border-gray-300 border-l-0 cursor-pointer px-3 py-1 rounded-r activo-0',
                    ]"
                    >No</label>
                </div>
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
    const product = inject("product");
    //const product = ref({ id: 0, activo: '1', tipo: '1'});
    const textinsertupdate = ref("Actualizar");
    const textdescripcion = ref("Nombre de la empresa")
    const route = useRoute();
    let nuevo = false;
    const loading = ref(true);
    
    const formulario = async () => {
      if (nuevo) {
        await axios
          .post("products", send_data())
          .then((response) => {
            //products.value.push(response.data.data);
            //route.push("producte/" + response.data.data.id);
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
          .finally(() => (console.log('producte registrado')));
      } else {
        await axios
          .patch("products/" + route.params.id, send_data())
          .then((response) => {
            /*products.value = products.value.map((item) => {
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
          .finally(() => (console.log('producte actualizado')));
      }
    };

    const changetipo = () => {
      console.log(typeof product.value.tipo);
      if (product.value.tipo === '1') {
        textdescripcion.value = "Nombre de la empresa";
      } else if (product.value.tipo === '2'){
        textdescripcion.value = "Nombre completo";
      }
    };

    const cleanform = () => {
      
      product.value = {
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
            codigo: product.value.codigo,
            tipo: product.value.tipo,
            descripcion: product.value.descripcion,
            id_fiscal: product.value.id_fiscal,
            dv: product.value.dv,            
            representante: product.value.representante,
            direcction1: product.value.direcction1,
            direcction2: product.value.direcction2,
            pais: product.value.pais,
            estado: product.value.estado,
            ciudad: product.value.ciudad,
            municipio: product.value.municipio,            
            telefono: product.value.telefono,
            celular: product.value.celular,
            activo: product.value.activo,
            email: product.value.email,
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
      });
    }
    return { changetipo, product, formulario, loading, textdescripcion, textinsertupdate };
  },
};
</script>
<style>
  input[type="radio"] + label {
    background: bg-white;    
  }
  input[type="radio"]:checked + label.type-1, input[type="radio"]:checked + label.activo-1 {
    background: green;
    color: white;
    transition: background 0.5s ease-in-out;
  }
  input[type="radio"]:checked + label.type-2 {
    background: blue;
    color: white;
    transition: background 0.5s ease-in-out;
  }
  input[type="radio"]:checked + label.type-0, input[type="radio"]:checked + label.activo-0 {
    background: red;
    color: white;
    transition: background 0.5s ease-in-out;
  }
</style>