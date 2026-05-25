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

  routeRules: {
    '/': { ssr: false }
  },

  compatibilityDate: '2025-01-15',
vite: {
    ssr: {
      noExternal: ['vue-yandex-maps'],
    },
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

