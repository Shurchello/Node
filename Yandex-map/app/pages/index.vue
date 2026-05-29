<template>
  <div>
    <h2>Медицинские организации — покрытие территории</h2>
    <YandexHeatmapLayer 
      :points="hospitals"
      :center="[37.617644, 55.755819]"
      :zoom="10"
      :radius="35"
    />
  </div>
</template>

<script setup>
import YandexHeatmapLayer from '@/components/YandexHeatmapLayer.client.vue';

// Ваши реальные данные — замените на координаты медорганизаций
const hospitals = [
  { lon: 37.617634, lat: 55.751244, weight: 10 },
  { lon: 37.602602, lat: 55.743265, weight: 8 },
  { lon: 37.582879, lat: 55.765895, weight: 15 },
  { lon: 37.647972, lat: 55.776123, weight: 12 },
  { lon: 37.624750, lat: 55.733334, weight: 9 }
];
</script>