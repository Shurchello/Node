<template>
  <div ref="mapContainer" class="heatmap-container"></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps({
  points: {
    type: Array,
    required: true,
    default: () => []
  },
  center: {
    type: Array,
    default: () => [37.617644, 55.755819]
  },
  zoom: {
    type: Number,
    default: 12
  }
});

const mapContainer = ref(null);
let mapInstance = null;
let heatmapInstance = null;

onMounted(() => {
  const initMap = () => {
    if (!window.ymaps3) return;

    window.ymaps3.ready.then(() => {
      const { YMap, YMapDefaultSchemeLayer, YMapHeatmapLayer, YMapMarker } = window.ymaps3;

      // 1. Создаём карту
      mapInstance = new YMap(mapContainer.value, {
        location: { center: props.center, zoom: props.zoom }
      });

      // 2. Добавляем базовый слой
      mapInstance.addLayer(new YMapDefaultSchemeLayer());

      // 3. Подготовка данных
      const heatmapData = props.points.map(p => ({
        coordinates: [p.lon, p.lat],
        weight: p.weight || 10
      }));

      // 4. Добавляем тепловой слой (будет поверх карты)
      heatmapInstance = new YMapHeatmapLayer({
        data: heatmapData,
        radius: 80,
        opacity: 0.95,
        intensity: 1.0,
        colorStops: [
          { stop: 0.0, color: 'rgba(255, 0, 0, 0.9)' },
          { stop: 0.5, color: 'rgba(255, 100, 0, 0.95)' },
          { stop: 1.0, color: 'rgba(255, 255, 0, 1)' }
        ]
      });
      
      // ВАЖНО: добавляем с высоким z-index
      mapInstance.addLayer(heatmapInstance, { zIndex: 100 });

      // 5. Добавляем маркеры для проверки
      heatmapData.forEach((point, idx) => {
        const markerElement = document.createElement('div');
        markerElement.textContent = '🔴';
        markerElement.style.fontSize = '28px';
        markerElement.style.filter = 'drop-shadow(0 0 2px white)';
        const marker = new YMapMarker({ coordinates: point.coordinates }, markerElement);
        mapInstance.addChild(marker);
      });

      console.log('✅ Тепловая карта и маркеры добавлены');
    });
  };

  if (window.ymaps3) {
    initMap();
  } else {
    const script = document.createElement('script');
    script.src = 'https://api-maps.yandex.ru/v3/?apikey=c7f3ba44-8c30-4715-bed2-9331e6fe6d7a&lang=ru_RU&mode=heatmap';
    script.onload = initMap;
    document.head.appendChild(script);
  }
});

onBeforeUnmount(() => {
  if (mapInstance) {
    mapInstance.destroy();
  }
});
</script>

<style scoped>
.heatmap-container {
  width: 100%;
  height: 600px;
}
</style>