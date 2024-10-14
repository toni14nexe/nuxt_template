<script lang="ts" setup>
const router = useRouter()
const { $axios } = useNuxtApp()

onMounted(async () => {
  try {
    const response = await $axios.get('/test-route')
  } catch (error) {
    console.error('API Error:', error)
  }
})
</script>

<template>
  <div>
    <h1>Welcome to My Nuxt 3 App</h1>
    <p>This is the home page</p>
    <ElButton plain @click="router.push('/')">About</ElButton>
    <NuxtLink to="/">About</NuxtLink>
  </div>
</template>

<style></style>
