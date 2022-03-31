<template>
  <tr class="hover:bg-lime-100">
    <td class="border border-slate-700 p-4">{{index + 1}}</td>
    <td class="border border-slate-700 p-4">{{seller.email}}</td>
    <td class="border border-slate-700 p-4">
      <RouterLink :to="{name: 'vendedor', params: {id: seller.id}}">
        {{seller.name}}
      </RouterLink>
    </td>
    <td class="border border-slate-700 p-4">
      <span role="button" @click="eliminar(seller.id)" class="flex-1">X</span>
    </td>
  </tr>
</template>

<script setup>
  defineProps({
    seller: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  });
  import {inject} from 'vue';

  const sellers = inject('sellers')
  const eliminar = id => {
    sellers.value = sellers.value.filter(item => item.id !== id)
  }
</script>
