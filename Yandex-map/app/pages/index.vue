<template>
  <div>
    <h2>Проверка компонента</h2>
    <div style="padding: 20px; background: yellow;">
      Если вы видите ЖЁЛТЫЙ блок — компонент загрузился
    </div>
    <YandexHeatmapLayer :points="[]" />
  </div>
</template>

<script setup>
import YandexHeatmapLayer from '@/components/YandexHeatmapLayer.client.vue';
console.log('✅ index.vue загружен, импортирован компонент');
</script>