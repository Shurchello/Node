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
  },
  radius: {
    type: Number,
    default: 80     // ← сильно увеличен
  },
  opacity: {
    type: Number,
    default: 0.95    // ← почти непрозрачный
  }
});

const mapContainer = ref(null);
let mapInstance = null;
let heatmapInstance = null;

onMounted(() => {
  const initMap = () => {
    if (!window.ymaps3) {
      console.error('❌ ymaps3 не загружен');
      return;
    }

    window.ymaps3.ready.then(() => {
      const { YMap, YMapDefaultSchemeLayer, YMapHeatmapLayer, YMapMarker } = window.ymaps3;

      // Создаём карту
      mapInstance = new YMap(mapContainer.value, {
        location: { center: props.center, zoom: props.zoom }
      });
      mapInstance.addLayer(new YMapDefaultSchemeLayer());

      // Подготовка данных
      const heatmapData = props.points.map(p => ({
        coordinates: [p.lon, p.lat],
        weight: p.weight || 10
      }));

      console.log('📍 Точки для тепловой карты:', heatmapData);

      // ========== ТЕПЛОВАЯ КАРТА С МАКСИМАЛЬНОЙ ЗАМЕТНОСТЬЮ ==========
      heatmapInstance = new YMapHeatmapLayer({
        data: heatmapData,
        radius: props.radius,      // 80 пикселей
        opacity: props.opacity,     // 0.95
        intensity: 1.0,             // максимальная интенсивность
        colorStops: [
          { stop: 0.0, color: 'rgba(255, 0, 0, 0.95)' },   // ярко-красный
          { stop: 0.5, color: 'rgba(255, 0, 0, 1)' },      // ещё ярче
          { stop: 1.0, color: 'rgba(255, 255, 0, 1)' }     // жёлтый в центре
        ]
      });
      mapInstance.addLayer(heatmapInstance);

      // ========== ДОБАВЛЯЕМ ЯРКИЕ МАРКЕРЫ НА КАЖДУЮ ТОЧКУ ==========
      heatmapData.forEach((point, idx) => {
        const markerElement = document.createElement('div');
        markerElement.textContent = '🔴';
        markerElement.style.fontSize = '32px';
        markerElement.style.filter = 'drop-shadow(0 0 4px white)';
        markerElement.title = `Точка ${idx + 1}: ${point.coordinates[0]}, ${point.coordinates[1]}`;
        
        const marker = new YMapMarker({ coordinates: point.coordinates }, markerElement);
        mapInstance.addChild(marker);
      });

      console.log(`✅ Тепловая карта загружена: ${heatmapData.length} точек, радиус ${props.radius}, прозрачность ${props.opacity}`);
    }).catch(e => console.error('Ошибка ymaps3.ready:', e));
  };

  if (window.ymaps3) {
    initMap();
    return;
  }

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
  height: 600px;
  border-radius: 12px;
  background: #f0f0f0;  /* временно, чтобы видеть контейнер */
  border: 2px solid red; /* временно, чтобы видеть границы */
}
</style>