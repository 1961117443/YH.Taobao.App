import request from '@/utils/request'

const baseURL = process.env.VUE_APP_YH_Taobao_API

export function fetchList(query) {
  return request({
    baseURL: baseURL,
    url: '/api/SalesOut',
    method: 'get',
    params: query
  })
}

export function fetchSalesOut(id) {
  return request({
    baseURL: baseURL,
    url: `/api/SalesOut/${id}`,
    method: 'get',
    params: { id }
  })
}

export function createSalesOut(data) {
  return request({
    baseURL: baseURL,
    url: '/api/SalesOut/create',
    method: 'post',
    data
  })
}

export function updateSalesOut(data) {
  return request({
    baseURL: baseURL,
    url: '/api/SalesOut/update',
    method: 'post',
    data
  })
}

export function deleteSalesOut(id) {
  return request({
    baseURL: baseURL,
    url: `/api/SalesOut/delete/${id}`,
    method: 'post',
    data: { 'id': id }
  })
}

