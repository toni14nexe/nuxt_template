// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  srcDir: 'src/',
  modules: ['@prisma/nuxt', '@element-plus/nuxt'],
  runtimeConfig: {
    public: {
      axiosApiBaseUrl: process.env.AXIOS_API_BASE_URL
    }
  }
})
