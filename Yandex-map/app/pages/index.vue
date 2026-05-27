<template>
  <div>
    <YandexMap
      :settings="{
        location: {
          center: [37.617644, 55.755819],
          zoom: 10,
        },
      }"
      width="100%"
      height="500px"
    >
      <YandexMapDefaultSchemeLayer />
    </YandexMap>
  </div>
</template>

<script setup>
import { YandexMap, YandexMapDefaultSchemeLayer } from 'vue-yandex-maps';
</script>