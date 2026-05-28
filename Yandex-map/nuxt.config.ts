// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    'vue-yandex-maps/nuxt',
  ],

  yandexMaps: {
    apikey: process.env.NUXT_PUBLIC_YANDEX_MAPS_API_KEY,
  },

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  // Меняем режим с статического на серверный
  ssr: true,
  
  nitro: {
    preset: 'netlify',  // Вместо netlify-static
    prerender: {
      routes: []  // Очищаем, ничего не принудительно генерируем
    }
  },

  compatibilityDate: '2025-01-15',

  vite: {
    ssr: {
      noExternal: ['vue-yandex-maps'],
    },
    build: {
      rollupOptions: {
        output: {
          assetFileNames: '_nuxt/[name][extname]',
          chunkFileNames: '_nuxt/[name].js',
          entryFileNames: '_nuxt/[name].js',
        }
      }
    }
  },

  // @ts-ignore
  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})