<template>
  <div v-if="loading" class="text-center mt-5">Cargando...</div>
  <div v-else class="mt-5 md:mt-0 md:col-span-2">
    <form action="#" method="POST" @submit.prevent="formulario">
      <div class="shadow overflow-hidden sm:rounded-md border border-gray-300">
        <div class="flex flex-col md:flex-row flex-wrap">
          <div class="flex w-full">
            <div class="basis-1/4 p-3">
              <label class="block text-sm font-medium text-gray-700">
                Tipo retenci&oacute;n
              </label>
              <select required
              class="form-input border-gray-300 mt-1 block rounded w-full">
                <option value="1" selected>Contribuyente</option>
                <option value="2">Internacional</option>
              </select>
            </div>
            <div class="basis-1/4 p-3">
              <label class="block text-sm font-medium text-gray-700">
                Tiene retenci&oacute;n ISLR
              </label>
              <input type="checkbox" v-model="financialdatos.retencion" value="1" class="rounded text-pink-500" />
            </div>          
            <div class="basis-1/4 p-3">
              <label class="block text-sm font-medium text-gray-700">
                Pct. retenci&oacute;n IVA
              </label>
              <input type="text" v-model.number="financialdatos.retencion_iva" required 
                class="form-input border-gray-300 mt-1 rounded"
              />
            </div>
            <div class="basis-1/4 p-3">
              <label class="text-sm font-medium text-gray-700">
                D&iacute;as de cr&eacute;dito
              </label>
              <input type="text" v-model.number="financialdatos.credito_dias" required 
                class="form-input border-gray-300 mt-1 rounded"
              />
            </div>
          </div> 
          <div class="flex w-full">
            <div class="basis-1/4 p-3">
              <label class="text-sm font-medium text-gray-700">
                Observaciones
              </label>
              <input type="text" v-model.number="financialdatos.observaciones" required 
                class="form-input border-gray-300 mt-1 rounded"
              />
            </div>
          </div>
        
          <div class="flex w-full">
            <div class="basis-1/4 p-3">Saldo pendiente</div>
            <div class="basis-1/4 p-3">
              <input type="text" class="form-input border-gray-300 mt-1 block rounded w-full" readonly="readonly" 
              />
            </div>
            <div class="basis-1/4 p-3">Adelantos</div>
            <div class="basis-1/4 p-3">
              <input type="text" class="form-input border-gray-300 mt-1 block rounded w-full" readonly="readonly" 
              />
            </div>
          </div>
          <div class="flex w-full">
            <div class="basis-1/4 p-3">Ultima compra</div>
            <div class="basis-1/4 p-3">
              <input type="text" class="form-input border-gray-300 mt-1 block rounded w-full" readonly="readonly" 
              />
            </div>
            <div class="basis-1/4 p-3">
              <input type="text" class="form-input border-gray-300 mt-1 block rounded w-full" readonly="readonly" 
              />
            </div>
            <div class="basis-1/4 p-3">
              <input type="text" class="form-input border-gray-300 mt-1 block rounded w-full" readonly="readonly" 
              />
            </div>
          </div>
          <div class="flex w-full">
            <div class="basis-1/4 p-3">Ultimo pago</div>
            <div class="basis-1/4 p-3">
              <input type="text" class="form-input border-gray-300 mt-1 block rounded w-full" readonly="readonly" 
              />
            </div>
            <div class="basis-1/4 p-3">
              <input type="text" class="form-input border-gray-300 mt-1 block rounded w-full" readonly="readonly" 
              />
            </div>
            <div class="basis-1/4 p-3">
              <input type="text" class="form-input border-gray-300 mt-1 block rounded w-full" readonly="readonly" 
              />
            </div>
          </div>          
          <div class="flex w-full">
            <div class="basis-1/4 p-3">M&aacute;ximo cr&eacute;dito</div>
            <div class="basis-1/4 p-3">
              <input type="text" class="form-input border-gray-300 mt-1 block rounded w-full" readonly="readonly" 
              />
            </div>
          </div>          
          <div class="flex w-full">
            <div class="basis-1/4 p-3">Retenciones</div>
            <div class="basis-1/4 p-3">
              <input type="text" class="form-input border-gray-300 mt-1 block rounded w-full" readonly="readonly" 
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
  const id_supplier = ref(route.params.id);
  const textinsertupdate = ref("Guardar");

  const financialdatos = ref({id: 0, supplier_id: id_supplier, type_retencion: 0, retencion: 0, retencion_iva: 0, credito_dias: 0, observaciones: ''});

  const formulario = async () => {
      if (nuevo.value) {
        console.log('guardamos si existe el cliente' + financialdatos.value.supplier_id);
        await axios
          .post("supplier_show_financial", send_data())
          .then((response) => {
            textinsertupdate.value = "Actualizar";          
            console.log(response.data);
            console.log('se agrego financialdatos');
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
      } else if ( financialdatos.value.id > 0) {
        console.log('guardamos si existe financial datos en la db');
        await axios
          .patch("supplier_show_financial/" + financialdatos.value.id, send_data())
          .then((response) => {            
            console.log(response.data.data);
          })
          .catch(function (error) {
            console.log(error);
          })
          .finally(() => (console.log('financial datos actualizados')));
      }else{
        console.log('primero debe guardar los datos del cliente')
      }
    };
 
    const send_data = () => {
      return { 
            supplier_id: id_supplier, 
            type_retencion: financialdatos.value.type_retencion, 
            retencion: financialdatos.value.retencion? 1 : 0, 
            retencion_iva: financialdatos.value.retencion_iva, 
            credito_dias: financialdatos.value.credito_dias, 
            observaciones: financialdatos.value.observaciones
          };
    };

    onMounted(async () => {        
      if (
        typeof route.params.id === "undefined" ||
          route.params.id === null ||
          route.params.id === ""
        ) {
          console.log("cargamos financialdatos con valores vacios");
          id_supplier.value = 0;
          loading.value = false;
        }else{
          await axios
              .get(`supplier_show_financial/${route.params.id}`)
              .then(response => {          
                financialdatos.value = response.data;
                financialdatos.value.retencion = response.data.retencion? true : false;
                console.log('cargando financialdatos desde web');          
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
              .finally(() => (loading.value = false));
      }

      if (id_supplier.value > 0) {
        if(financialdatos.value.id > 0){
          textinsertupdate.value = "Actualizar";
        }else{
          nuevo.value = true;
          financialdatos.value = {
                    id: 0,
                    supplier_id: id_supplier, 
                    type_retencion: 1, 
                    retencion: false, 
                    retencion_iva: 0, 
                    credito_dias: 0, 
                    observaciones: ''
                }        
        }            
      }
    });
  
</script>