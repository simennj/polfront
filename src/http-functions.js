import axios from 'axios'

export const PRODUCTS = axios.create({
  baseURL: 'http://127.0.0.1:8000/products'
})
