import axios from 'axios'
import { API_BASE_URL } from '../constants'

const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})


export default (method, url, data = {}, headers = {}, params = {}) => {
  return client.request({
    method,
    data,
    url,
    headers,
    params
  })
}

