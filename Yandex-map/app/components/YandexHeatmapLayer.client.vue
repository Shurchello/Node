<template>
  <div ref="mapContainer" class="heatmap-container"></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps({
  // Координаты точек [{ lon, lat, weight }]
  points: {
    type: Array,
    required: true,
    default: () => []
  },
  // Центр карты [долгота, широта]
  center: {
    type: Array,
    default: () => [37.617644, 55.755819]
  },
  zoom: {
    type: Number,
    default: 10
  },
  radius: {
    type: Number,
    default: 30
  },
  opacity: {
    type: Number,
    default: 0.75
  }
});

const mapContainer = ref(null);
let mapInstance = null;
let heatmapInstance = null;

onMounted(() => {
  // Функция инициализации карты
  const initMap = () => {
    if (!window.ymaps3) {
      console.error('❌ ymaps3 не загружен');
      return;
    }

    window.ymaps3.ready.then(() => {
      const { YMap, YMapDefaultSchemeLayer, YMapHeatmapLayer } = window.ymaps3;

      // Создаём карту
      mapInstance = new YMap(mapContainer.value, {
        location: { center: props.center, zoom: props.zoom }
      });

      // Добавляем базовый слой
      mapInstance.addLayer(new YMapDefaultSchemeLayer());

      // Преобразуем данные для тепловой карты
      const heatmapData = props.points.map(p => ({
        coordinates: [p.lon, p.lat],
        weight: p.weight || 1
      }));

      // Создаём тепловой слой
      heatmapInstance = new YMapHeatmapLayer({
        data: heatmapData,
        radius: props.radius,
        opacity: props.opacity,
        colorStops: [
          { stop: 0.0, color: 'rgba(0, 100, 255, 0.2)' },
          { stop: 0.4, color: 'rgba(0, 200, 255, 0.6)' },
          { stop: 0.6, color: 'rgba(255, 255, 0, 0.8)' },
          { stop: 1.0, color: 'rgba(255, 50, 0, 1)' }
        ]
      });

      mapInstance.addLayer(heatmapInstance);
      console.log('✅ Тепловая карта загружена', heatmapData.length, 'точек');
    }).catch(e => console.error('Ошибка ymaps3.ready:', e));
  };

  // Если API уже загружен — сразу инициализируем
  if (window.ymaps3) {
    initMap();
    return;
  }

  // Иначе подключаем скрипт
  const script = document.createElement('script');
  script.src = 'https://api-maps.yandex.ru/v3/?apikey=c7f3ba44-8c30-4715-bed2-9331e6fe6d7a&lang=ru_RU&mode=heatmap';
  script.onload = initMap;
  script.onerror = () => console.error('❌ Ошибка загрузки API');
  document.head.appendChild(script);
});

onBeforeUnmount(() => {
  if (mapInstance) {
    mapInstance.destroy();
    mapInstance = null;
  }
});
</script>

<style scoped>
.heatmap-container {
  width: 100%;
  height: 500px;
  border-radius: 12px;
}
</style>