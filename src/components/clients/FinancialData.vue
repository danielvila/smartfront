<template>
  <div v-if="loading">Cargando...</div>
  <div v-else class="mt-5 md:mt-0 md:col-span-2">
    <form action="#" method="POST" @submit.prevent="formulario">
      <div class="shadow overflow-hidden sm:rounded-md border border-gray-300">
        <div class="flex flex-col md:flex-row flex-wrap">
          <div class="flex w-full">
            <div class="basis-1/4 p-3">
              <label class="text-sm font-medium text-gray-700">
                Tiene cr&eacute;dito
              </label>
              <input type="checkbox" v-model="financialdatos.credito" value="1" class="rounded text-pink-500" />
            </div>
            <div class="basis-1/4 p-3" v-if="financialdatos.credito">
              <label class="block text-sm font-medium text-gray-700">
                Limite cr&eacute;dito
              </label>
              <input type="text" v-model.number="financialdatos.credito_limite" required 
                class="form-input border-gray-300 mt-1 block rounded w-full"
              />
            </div>
            <div class="basis-1/4 p-3" v-if="financialdatos.credito">
              <label class="block text-sm font-medium text-gray-700">
                D&iacute;as de cr&eacute;dito
              </label>
              <input type="text" v-model.number="financialdatos.credito_dias" required 
                class="form-input border-gray-300 mt-1 block rounded w-full"
              />
            </div>
          </div>
          <div class="flex w-full">
            <div class="basis-1/4 p-3">
              <label class="text-sm font-medium text-gray-700">
                Tiene tolerancia
              </label>
              <input type="checkbox" v-model="financialdatos.tolerancia" value="1" class="rounded text-pink-500" />
            </div>
            <div class="basis-1/4 p-3" v-if="financialdatos.tolerancia">
              <label class="block text-sm font-medium text-gray-700">
                D&iacute;as de tolerancia
              </label>
              <input type="text" v-model.number="financialdatos.tolerancia_dias" required 
                class="form-input border-gray-300 mt-1 block rounded w-full"
              />
            </div>
          </div>
          <div class="flex w-full">
            <div class="basis-1/4 p-3">
              <label class="text-sm font-medium text-gray-700">
                Inter&eacute;s de mora
              </label>
              <input type="checkbox" v-model="financialdatos.interes_mora" value="1" class="rounded text-pink-500" />
            </div>
          </div> 
          <div class="flex w-full">
            <div class="basis-1/4 p-3">
              <label class="text-sm font-medium text-gray-700">
                % Descuento
              </label>
              <input type="text" v-model.number="financialdatos.descuento" required 
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
            <div class="basis-1/4 p-3">Ultima venta</div>
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
            <div class="basis-1/4 p-3">M&aacute;ximo factura</div>
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
            <div class="basis-1/4 p-3">D&iacute;as prom. pago</div>
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
          <div class="flex w-full">
            <div class="basis-1/4 p-3">Puntos acumulados</div>
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
  const financialdatos = inject("financialdatos");

  /*const financialdatos = ref({id: 0, client_id: id_client, credito: 0, credito_limite: 0, credito_dias: 0, tolerancia: 0, tolerancia_dias: 0, interes_mora: 0, descuento: 0});*/

  const formulario = async () => {
      if (nuevo.value) {
        console.log('guardamos si existe el cliente' + financialdatos.value.client_id);
        await axios
          .post("financial_data", send_data())
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
          .patch("financial_data/" + financialdatos.value.id, send_data())
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
          client_id: financialdatos.value.client_id,
          credito: financialdatos.value.credito? 1 : 0,
          credito_limite: financialdatos.value.credito_limite,
          credito_dias: financialdatos.value.credito_dias,
          tolerancia: financialdatos.value.tolerancia? 1 : 0,
          tolerancia_dias: financialdatos.value.tolerancia_dias,
          interes_mora: financialdatos.value.interes_mora? 1 : 0,
          descuento: financialdatos.value.descuento,
        };
  };

    onMounted(async () => {        
      if (
        typeof route.params.id === "undefined" ||
          route.params.id === null ||
          route.params.id === ""
        ) {
          console.log("cargamos financialdatos con valores vacios");
          id_client.value = 0;
          loading.value = false;
        }else{
          loading.value = false
          /*await axios
              .get(`show_financial_client/${route.params.id}`)
              .then(response => {          
                financialdatos.value = response.data;
                financialdatos.value.credito = response.data.credito? true : false;
                financialdatos.value.tolerancia = response.data.tolerancia? true : false;
                financialdatos.value.interes_mora = response.data.interes_mora? true : false;
                console.log('cargando financialdatos desde web');          
              })
              .catch((error) => console.log(error))
              .finally(() => (loading.value = false));*/
      }

      if (id_client.value > 0) {
        if(financialdatos.value.id > 0){
          textinsertupdate.value = "Actualizar";
        }else{
          nuevo.value = true;
          financialdatos.value = {
                    id: 0,
                    client_id: id_client.value,
                    credito: false,
                    credito_limite: 0,
                    credito_dias: 0,
                    tolerancia: false,
                    tolerancia_dias: 0,
                    interes_mora: false,
                    descuento: 0,
                }        
        }            
      }
    });
  
</script>