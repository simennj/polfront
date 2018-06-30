import axios from 'axios'

export const API_URL = 'http://127.0.0.1:8000'

export const PRODUCTS = axios.create({
  baseURL: API_URL + '/products'
})

export const CATEGORIES = axios.create({
  baseURL: API_URL + '/category'
})
