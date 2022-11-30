<template> 
  <div class="mt-5 md:mt-0 md:col-span-2">
    <form action="#" method="POST" @submit.prevent="formulario">
      <div class="shadow overflow-hidden sm:rounded-md border border-gray-300">
        <div class="flex flex-col md:flex-row flex-wrap">          
          <div class="flex w-full">
            <div class="basis-1/4 p-3">
              <label class="text-sm font-medium text-gray-700">
                Cantidad
              </label>
              <input type="text" v-model.number="stock.quantity" class="form-input border-gray-300 mt-1 block rounded w-full" />
            </div>

            <div class="basis-1/4 p-3">
              <div class="flex w-full">
                <div class="basis-1/4 px-3">
                  <label class="block text-sm font-medium text-gray-700">
                    Minimo
                  </label>
                  <input type="text" v-model.number="stock.min" required 
                    class="form-input border-gray-300 mt-1 block rounded w-full"
                  />
                </div>
                <div class="basis-1/4 px-3">
                  <label class="block text-sm font-medium text-gray-700">
                    M&aacute;ximo
                  </label>
                  <input type="text" v-model.number="stock.max" required 
                    class="form-input border-gray-300 mt-1 block rounded w-full"
                  />
                </div>
              </div>
            </div>            
            <div class="basis-1/4 p-3">              
              <label class="block text-sm font-medium text-gray-700">
                Bodega
              </label>
              <select v-model="stock.storage_id" required
                class="form-input border-gray-300 mt-1 block rounded w-full">
                <option value="0" selected>Seleccionar Bodega</option>
                <option v-for="storage in storages" :value="storage.id" >{{storage.name}}</option>
              </select>
            </div>
            <div class="basis-1/4 p-3">
              <label class="block text-sm font-medium text-gray-700">
                Estante
              </label>
              <select v-model="stock.shelf_id" required
                class="form-input border-gray-300 mt-1 block rounded w-full">
                <option value="0" selected>Seleccionar Estante</option>
                <option v-for="shelf in shelves" :value="shelf.id" >{{shelf.name}}</option>
              </select>
            </div>
          </div>
        </div>
        <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <button type="submit"
            class="inline-flex justify-center py-2 px-4 mr-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Actualizar
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
  defineProps({
    stock: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  });
  import axios from "axios";
  import { useRoute } from "vue-router";
  import { inject, ref } from "vue";
  import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

  const loading = ref(true);
  const nuevo = ref(false);    
  const route = useRoute();
  const id_product = ref(route.params.id);
  const storages = inject("storages");
  const shelves = inject("shelves");
  
  const formulario = async () => {
    if ( stock.value.id > 0) {
      console.log('guardamos si existe stock datos en la db');
      await axios
        .patch("stocks/" + stock.value.id, send_data())
        .then((response) => {            
          console.log(response.data.data);
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(() => (console.log('stock datos actualizados')));
    }
  };
 
  const send_data = () => {
    return {
          quantity: stock.value.quantity,
          min: stock.value.min,
          max: stock.value.max,
          product_id: stock.value.product_id,
          storage_id: stock.value.storage_id,
          shelf_id: stock.value.shelf_id,
        };
  };

</script>