import axios from 'axios'
axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? '/api':window.origin

axios.interceptors.request.use((config) => {
  return config
})
axios.interceptors.response.use((response) => {
  return response.data
}, (error) => {
  console.log(error)
})


export default axios