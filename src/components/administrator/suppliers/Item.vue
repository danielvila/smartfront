<template>
  <tr class="hover:bg-lime-100">
    <td class="border border-slate-700 p-4">{{index + 1}}</td>
    <td class="border border-slate-700 p-4">{{supplier.codigo}}</td>
    <td class="border border-slate-700 p-4">{{supplier.ruc}}</td>
    <td class="border border-slate-700 p-4">
      <RouterLink :to="{name: 'proveedor', params: {id: supplier.id}}">
        {{supplier.name}}
      </RouterLink>
    </td>
    <td class="border border-slate-700 p-4"><span role="button" @click="eliminar(supplier.id)" class="flex-1">X</span></td>
  </tr>
</template>

<script setup>
  defineProps({
    supplier: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  });
  import {inject} from 'vue';

  const suppliers = inject('suppliers')
  const eliminar = id => {
    suppliers.value = suppliers.value.filter(item => item.id !== id)
  }
</script>
