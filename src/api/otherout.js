import request from '@/utils/request'

const baseURL = process.env.VUE_APP_YH_Taobao_API

export function fetchList(query) {
  return request({
    baseURL: baseURL,
    url: '/api/OtherOut',
    method: 'get',
    params: query
  })
}

export function fetchOtherOut(id) {
  return request({
    baseURL: baseURL,
    url: `/api/OtherOut/${id}`,
    method: 'get',
    params: { id }
  })
}

export function createOtherOut(data) {
  return request({
    baseURL: baseURL,
    url: '/api/OtherOut/create',
    method: 'post',
    data
  })
}

export function updateOtherOut(data) {
  return request({
    baseURL: baseURL,
    url: '/api/OtherOut/update',
    method: 'post',
    data
  })
}

export function deleteOtherOut(id) {
  return request({
    baseURL: baseURL,
    url: `/api/OtherOut/delete/${id}`,
    method: 'post',
    data: { 'id': id }
  })
}

