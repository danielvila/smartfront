<template>
  <tr class="hover:bg-lime-100">
    <td class="border border-slate-700 p-4">{{index + 1}}</td>
    <td class="border border-slate-700 p-4">{{product.code}}</td>    
    <td class="border border-slate-700 p-4">
      <RouterLink :to="{name: 'producto', params: {id: product.id}}">
        {{product.description}}
      </RouterLink>
    </td>
    <td class="border border-slate-700 p-4">{{product.type}}</td>
    <td class="border border-slate-700 p-4">{{product.exent}}</td>
    <td class="border border-slate-700 p-4">
      <span role="button" @click="eliminar(product.id)" class="flex-1">X</span>
    </td>
  </tr>
</template>

<script setup>
  defineProps({
    product: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  });
  import {inject} from 'vue';

  const products = inject('products')
  const eliminar = id => {
    products.value = products.value.filter(item => item.id !== id)
  }
  const changstate = id => {
    /*products.value = products.value.map(item => {
      if(item.id === id){
        item.activo = !item.activo
      }
      return item
    })*/
  }
</script>
