<template>
  <div ref="mapContainer" class="heatmap-container"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const mapContainer = ref(null);

onMounted(() => {
  console.log('1️⃣ onMounted сработал');
  
  if (!window.ymaps3) {
    console.log('2️⃣ ymaps3 нет, создаём скрипт');
    const script = document.createElement('script');
    script.src = 'https://api-maps.yandex.ru/v3/?apikey=c7f3ba44-8c30-4715-bed2-9331e6fe6d7a&lang=ru_RU&mode=heatmap';
    script.onload = () => {
      console.log('3️⃣ Скрипт загрузился, ymaps3:', !!window.ymaps3);
      window.ymaps3.ready.then(() => {
        console.log('4️⃣ ymaps3.ready выполнен');
        const { YMap, YMapDefaultSchemeLayer } = window.ymaps3;
        const map = new YMap(mapContainer.value, {
          location: { center: [37.617644, 55.755819], zoom: 10 }
        });
        map.addLayer(new YMapDefaultSchemeLayer());
        console.log('5️⃣ Карта создана');
      }).catch(e => console.error('Ошибка ready:', e));
    };
    script.onerror = () => console.error('Ошибка загрузки скрипта');
    document.head.appendChild(script);
  } else {
    console.log('2️⃣ ymaps3 уже есть');
  }
});
</script>

<style scoped>
.heatmap-container {
  width: 100%;
  height: 500px;
  background: #e0e0e0;
  border: 2px solid blue;
}
</style>