<template>
  <tr class="hover:bg-lime-100">
    <td class="border border-slate-700 p-4">{{index + 1}}</td>    
    <td class="border border-slate-700 p-4">
      <span role="button" class="flex-1">
        <RouterLink :to="{name: 'zona', params: {id: zone.id}}">
          {{zone.name}}
        </RouterLink>
      </span>    
    </td>
    <td class="border border-slate-700 p-4">{{zone.description}}</td>
    <td class="border border-slate-700 p-4"><span role="button" @click="eliminar(zone.id)" class="flex-1">X</span></td>
  </tr>
</template>

<script setup>
  defineProps({
    zone: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  });
  import {inject} from 'vue';

  const zones = inject('zones')
  const eliminar = id => {
    zones.value = zones.value.filter(item => item.id !== id)
  }
</script>
