import axios from 'axios'

export const useAxios = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  headers: {
    'Content-Type': 'application/json'
  }
})

useAxios.interceptors.response.use((res) => {
  return res.data
})
