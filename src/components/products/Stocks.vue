<template>
  <div v-if="loading">Cargando...</div>
  <div v-else class="mt-5 md:mt-0 md:col-span-2">
    <form action="#" method="POST" @submit.prevent="formulario">
      <div class="shadow overflow-hidden sm:rounded-md border border-gray-300">
        <div class="flex flex-col md:flex-row flex-wrap">
          <div v-for="stock in stocks" :key="stock.id" class="flex w-full">
            <p>quantity: {{stock.quantity}}--
            <span>{{stock.min}}</span>--
            <span>{{stock.max}}</span>--
            <span>{{stock.storage_id}}</span>--
            {{stock.shelf_id}}</p>
          </div>
          <ProductStok v-for="(stock, index) in stocks" :key="stock.id" :stock="stock" :index="index" />
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

<script setup>
  import axios from "axios";
  import { useRoute } from "vue-router";
  import { inject, onMounted, ref } from "vue";
  import ProductStok from "@/components/products/Stock.vue";
  import { library } from "@fortawesome/fontawesome-svg-core";
  import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
  import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

  library.add(faCalendarDays);

  const loading = ref(true);
  const nuevo = ref(false);    
  const route = useRoute();
  const id_product = ref(route.params.id);
  const storages = ref();
  const shelves = ref();
  const textinsertupdate = ref("Guardar");
  const stocks = inject("stocks");

  const stock = ref({id: 0, product_id: id_product, quantity: 0, min: 0, max: 0, storage_id: 0, shelf_id: 0});

  const formulario = async () => {
      if (nuevo.value) {
        console.log('guardamos si existe el producto' + stock.value.product_id);
        await axios
          .post("stocks", send_data())
          .then((response) => {
            textinsertupdate.value = "Actualizar";          
            console.log(response.data);
            console.log('se agrego stocks');
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
      } else if ( stock.value.id > 0) {
        console.log('guardamos si existe stocks datos en la db');
        await axios
          .patch("stocks/" + stock.value.id, send_data())
          .then((response) => {            
            console.log(response.data.data);
          })
          .catch(function (error) {
            console.log(error);
          })
          .finally(() => (console.log('stocks datos actualizados')));
      }else{
        console.log('primero debe guardar los datos del producto')
      }
  };
 
  const send_data = () => {
    return {
          quantity: stocks.value.quantity,
          min: stocks.value.min,
          max: stocks.value.max,
          product_id: stocks.value.product_id,
          storage_id: stocks.value.storage_id,
          shelf_id: stocks.value.shelf_id,
        };
  };

  onMounted(async () => {  console.log(stocks);
    if (
      typeof route.params.id === "undefined" ||
        route.params.id === null ||
        route.params.id === ""
      ) {
        console.log("cargamos stocks con valores vacios");
        id_product.value = 0;
        loading.value = false;
      }
    await axios
            .get(`storages`)
            .then(response => {          
              storages.value = response.data;
              console.log('cargando storages para stocks desde web');          
            })
            .catch((error) => console.log(error))
            .finally(() => (loading.value = false));
    await axios
            .get(`shelves`)
            .then(response => {          
              shelves.value = response.data;
              console.log('cargando shelves para stocks desde web');          
            })
            .catch((error) => console.log(error))
            .finally(() => (loading.value = false));

    if (id_product.value > 0) {
      if(stock.value.id > 0){
        textinsertupdate.value = "Actualizar";
      }else{
        nuevo.value = true;
        stock.value = {
                  id: 0,
                  product_id: id_product.value,
                  quantity: 0,
                  min: 0,
                  max: 0,
                  storage_id: 0,
                  shelf_id: 0,
              }        
      }            
    }
  });
  
</script>