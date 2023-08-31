import axios from 'axios'

export const useAxios = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  headers: {
    'Content-Type': 'application/json'
  }
})

useAxios.interceptors.response.use(
  (res) => {
    return res.data
  },
  (error) => {
    if (error?.response?.status == 500) {
      throw { message: 'Server Error  Sorry:(' }
    }

    throw error
  }
)
