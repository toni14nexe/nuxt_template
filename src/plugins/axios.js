import axios from 'axios'
import { defineNuxtPlugin } from '#app'
import { useRuntimeConfig } from '#app'
import { ElNotification } from 'element-plus'

export default defineNuxtPlugin(nuxtApp => {
  const config = useRuntimeConfig()
  const baseURL = config.public.axiosApiBaseUrl

  const apiClient = axios.create({
    baseURL: baseURL,
    headers: {
      'Content-Type': 'application/json'
    }
  })

  // Add a request interceptor
  apiClient.interceptors.request.use(
    config => {
      /* const token = useCookie('token').value
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      } */
      return config
    },
    error => {
      // Handle the error
      return Promise.reject(error)
    }
  )

  // Add a response interceptor
  apiClient.interceptors.response.use(
    response => {
      return response
    },
    error => {
      const status = error.response ? error.response.status : null
      switch (status) {
        case 400:
          showErrorToast(
            'Bad Request: Please check your input and try again.',
            status
          )
          break
        case 401:
          showErrorToast(
            'Unauthorized: Please log in to access this resource.',
            status
          )
          // Redirect to login or perform logout
          break
        case 403:
          showErrorToast(
            'Forbidden: You do not have permission to perform this action.',
            status
          )
          break
        case 404:
          showErrorToast(
            'Not Found: The requested resource could not be found.',
            status
          )
          break
        case 500:
          showErrorToast(
            'Internal Server Error: Something went wrong on our end.',
            status
          )
          break
        default:
          showErrorToast(
            'An unexpected error occurred. Please try again later.',
            status
          )
      }

      console.error(
        'API Error:',
        error.response ? error.response.data : error.message
      )
      return Promise.reject(error)
    }
  )

  function showErrorToast(message, status) {
    ElNotification({
      title: `Error ${status | ''} occured`,
      message: message,
      duration: 5000,
      type: 'error'
    })
  }

  nuxtApp.provide('axios', apiClient)
})
