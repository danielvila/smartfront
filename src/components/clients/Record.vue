<template>
  <div v-if="loading">Cargando...</div>
  <div v-else class="mt-5 md:mt-0 md:col-span-2 scroll-smooth">
    <table class="table-auto border-collapse border border-slate-500 w-full">
    <thead>
      <tr>
        <th class="border border-slate-500 p-4">Periodo</th>
        <th class="border border-slate-500 p-4">Nro. factura</th>
        <th class="border border-slate-500 p-4">Contado</th>
        <th class="border border-slate-500 p-4">Cr&eacute;dito</th>
        <th class="border border-slate-500 p-4">Descuentos</th>
        <th class="border border-slate-500 p-4">Total venta</th>
        <th class="border border-slate-500 p-4">Costo de venta</th>
        <th class="border border-slate-500 p-4">Utilidad</th>
        <th class="border border-slate-500 p-4">Nro. de devoluci&oacute;n</th>
        <th class="border border-slate-500 p-4">Monto de devoluci&oacute;n</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>     
    </tbody>
  </table>
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