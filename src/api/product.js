import request from '@/utils/request'

const baseURL = process.env.VUE_APP_YH_Taobao_API

export function fetchList(query) {
  return request({
    baseURL: baseURL,
    url: '/api/Product',
    method: 'get',
    params: query
  })
}

export function fetchProduct(id) {
  return request({
    baseURL: baseURL,
    url: `/api/Product/${id}`,
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    baseURL: baseURL,
    url: '/vue-element-admin/article/pv',
    method: 'get',
    params: { pv }
  })
}

export function createProduct(data) {
  return request({
    baseURL: baseURL,
    url: '/api/Product/create',
    method: 'post',
    data
  })
}

export function updateProduct(data) {
  return request({
    baseURL: baseURL,
    url: '/api/Product/update',
    method: 'post',
    data
  })
}

export function deleteProduct(id) {
  return request({
    baseURL: baseURL,
    url: `/api/Product/delete/${id}`,
    method: 'post',
    data: { 'id': id }
  })
}

export function createBOMFile(data) {
  return request({
    baseURL: baseURL,
    url: '/api/BOMFile/create',
    method: 'post',
    data
  })
}

export function updateBOMFile(data) {
  return request({
    baseURL: baseURL,
    url: '/api/BOMFile/update',
    method: 'post',
    data
  })
}

export function deleteBOMFile(id) {
  return request({
    baseURL: baseURL,
    url: `/api/BOMFile/delete/${id}`,
    method: 'post',
    data: { 'id': id }
  })
}

export function fetchBOMFile(id) {
  return request({
    baseURL: baseURL,
    url: `/api/BOMFile/${id}`,
    method: 'get',
    params: { }
  })
}

export function fetchBOMFileList() {
  return request({
    baseURL: baseURL,
    url: `/api/BOMFile`,
    method: 'get',
    params: { }
  })
}

export function fetchStockList(query) {
  return request({
    baseURL: baseURL,
    url: `/api/ProductStock`,
    method: 'get',
    params: query
  })
}

