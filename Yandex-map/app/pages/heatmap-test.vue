<template>
  <div>
    <h2>Тест тепловой карты - ПРОСТАЯ ВЕРСИЯ</h2>
    <p>Если вы видите этот текст, страница работает.</p>
    <button @click="testClick">Нажми меня</button>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';

console.log('Скрипт начал выполняться');

onMounted(() => {
  console.log('onMounted сработал!');
});

const testClick = () => {
  console.log('Кнопка нажата');
};
</script>