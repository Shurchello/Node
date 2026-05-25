<template>
  <YandexMap
    :settings="{
      location: {
        center: [37.617644, 55.755819],
        zoom: 9,
      },
    }"
    width="100%"
    height="500px"
  >
    <YandexMapDefaultSchemeLayer />
    <YandexMapDefaultFeaturesLayer />
  </YandexMap>
</template>

<script setup>
import {
  YandexMap,
  YandexMapDefaultSchemeLayer,
  YandexMapDefaultFeaturesLayer,
} from 'vue-yandex-maps';
</script>