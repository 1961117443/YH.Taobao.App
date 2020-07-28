import request from '@/utils/request'

const baseURL = process.env.VUE_APP_YH_Taobao_API

export function fetchList(query) {
  return request({
    baseURL: baseURL,
    url: '/api/OtherIn',
    method: 'get',
    params: query
  })
}

export function fetchOtherIn(id) {
  return request({
    baseURL: baseURL,
    url: `/api/OtherIn/${id}`,
    method: 'get',
    params: { id }
  })
}

export function createOtherIn(data) {
  return request({
    baseURL: baseURL,
    url: '/api/OtherIn/create',
    method: 'post',
    data
  })
}

export function updateOtherIn(data) {
  return request({
    baseURL: baseURL,
    url: '/api/OtherIn/update',
    method: 'post',
    data
  })
}

export function deleteOtherIn(id) {
  return request({
    baseURL: baseURL,
    url: `/api/OtherIn/delete/${id}`,
    method: 'post',
    data: { 'id': id }
  })
}

