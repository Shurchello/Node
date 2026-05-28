<template>
  <div>
    <h2>Тест тепловой карты (API 3.0)</h2>
    <div id="heatmap-map" style="width: 100%; height: 600px;"></div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';

// Функция, которая будет вызвана после загрузки API
const initMapAndHeatmap = () => {
  if (!window.ymaps3) {
    console.error('ymaps3 не загружен');
    return;
  }

  window.ymaps3.ready.then(() => {
    const { YMap, YMapDefaultSchemeLayer, YMapHeatmapLayer } = window.ymaps3;

    const map = new YMap(document.getElementById('heatmap-map'), {
      location: { center: [37.617644, 55.755819], zoom: 10 }
    });

    map.addLayer(new YMapDefaultSchemeLayer());

    const heatmapData = [
      { coordinates: [37.617634, 55.751244], weight: 10 },
      { coordinates: [37.602602, 55.743265], weight: 8 },
      { coordinates: [37.582879, 55.765895], weight: 15 }
    ];

    const heatmapLayer = new YMapHeatmapLayer({
      data: heatmapData,
      radius: 30,
      opacity: 0.7,
      colorStops: [
        { stop: 0, color: 'rgba(0, 100, 255, 0)' },
        { stop: 0.3, color: 'rgba(0, 200, 255, 0.5)' },
        { stop: 0.6, color: 'rgba(255, 255, 0, 0.8)' },
        { stop: 1, color: 'rgba(255, 0, 0, 1)' }
      ]
    });

    map.addLayer(heatmapLayer);
    console.log('✅ Тепловая карта работает!');
  }).catch(e => console.error('Ошибка ymaps3.ready:', e));
};

onMounted(() => {
  // Если API уже загружен (например, на главной странице), просто инициализируем
  if (window.ymaps3 && window.ymaps3.ready) {
    initMapAndHeatmap();
    return;
  }

  // Если API еще не загружен, динамически подключаем скрипт
  // Используем старый добрый script, который вставится в <head>
  const script = document.createElement('script');
  script.src = 'https://api-maps.yandex.ru/v3/?apikey=c7f3ba44-8c30-4715-bed2-9331e6fe6d7a&lang=ru_RU&mode=heatmap';
  script.onload = initMapAndHeatmap;
  script.onerror = () => console.error('Не удалось загрузить API');
  document.head.appendChild(script);
});
</script>