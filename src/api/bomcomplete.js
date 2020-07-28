import request from '@/utils/request'

const baseURL = process.env.VUE_APP_YH_Taobao_API

export function fetchList(query) {
  return request({
    baseURL: baseURL,
    url: '/api/BOMCompletion',
    method: 'get',
    params: query
  })
}

export function fetchBOMCompletion(id) {
  return request({
    baseURL: baseURL,
    url: `/api/BOMCompletion/${id}`,
    method: 'get'
  })
}

export function createBOMCompletion(data) {
  return request({
    baseURL: baseURL,
    url: '/api/BOMCompletion/create',
    method: 'post',
    data
  })
}

export function updateBOMCompletion(data) {
  return request({
    baseURL: baseURL,
    url: '/api/BOMCompletion/update',
    method: 'post',
    data
  })
}

export function deleteBOMCompletion(id) {
  return request({
    baseURL: baseURL,
    url: `/api/BOMCompletion/delete/${id}`,
    method: 'post',
    data: { 'id': id }
  })
}

export function createBatNo() {
  return request({
    baseURL: baseURL,
    url: `/api/BOMCompletion/create/batno`,
    method: 'get'
  })
}

