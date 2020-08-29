import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:1234',
  withCredentials: true,
})

export default api
