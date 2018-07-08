import axios from 'axios'

let apiUrl = '/api'
if (/https?:\/\/[^/:]*:8080/i.test(window.location.href)) {
  apiUrl = /(https?:\/\/[^/:]*:)8080/i.exec(window.location.href)[1] + '8000'
}
export const API_URL = apiUrl

export const PRODUCTS = axios.create({
  baseURL: API_URL + '/products'
})

export const PRODUCT_AGGREGATIONS = axios.create({
  baseURL: API_URL + '/products/aggregations'
})

export const CATEGORIES = axios.create({
  baseURL: API_URL + '/category'
})
