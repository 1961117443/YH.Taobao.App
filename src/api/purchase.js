import request from '@/utils/request'

const baseURL = process.env.VUE_APP_YH_Taobao_API

export function fetchList(query) {
  return request({
    baseURL: baseURL,
    url: '/api/PurchaseIn',
    method: 'get',
    params: query
  })
}

export function fetchPurchaseIn(id) {
  return request({
    baseURL: baseURL,
    url: `/api/PurchaseIn/${id}`,
    method: 'get',
    params: { id }
  })
}

export function createPurchaseIn(data) {
  return request({
    baseURL: baseURL,
    url: '/api/PurchaseIn/create',
    method: 'post',
    data
  })
}

export function updatePurchaseIn(data) {
  return request({
    baseURL: baseURL,
    url: '/api/PurchaseIn/update',
    method: 'post',
    data
  })
}

export function deletePurchaseIn(id) {
  return request({
    baseURL: baseURL,
    url: `/api/PurchaseIn/delete/${id}`,
    method: 'post',
    data: { 'id': id }
  })
}

