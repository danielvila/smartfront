<template>
  <tr class="hover:bg-lime-100">
    <td class="border border-slate-700 p-4">{{index + 1}}</td>
    <td class="border border-slate-700 p-4">{{client.codigo}}</td>
    <td class="border border-slate-700 p-4">{{client.id_fiscal}}</td>
    <td class="border border-slate-700 p-4">
      <RouterLink :to="{name: 'cliente', params: {id: client.id}}">
        {{client.descripcion}}
      </RouterLink>
    </td>
    <td class="border border-slate-700 p-4"><span role="button" @click="eliminar(client.id)" class="flex-1">X</span></td>
  </tr>
</template>

<script setup>
  defineProps({
    client: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  });
  import {inject} from 'vue';

  const clients = inject('clients')
  const eliminar = id => {
    clients.value = clients.value.filter(item => item.id !== id)
  }
  const changstate = id => {
    /*clients.value = clients.value.map(item => {
      if(item.id === id){
        item.activo = !item.activo
      }
      return item
    })*/
  }
</script>
