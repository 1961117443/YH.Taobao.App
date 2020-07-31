import request from '@/utils/request'

const baseURL = process.env.VUE_APP_YH_Taobao_API

export function fetchList(query) {
  return request({
    baseURL: baseURL,
    url: '/api/Expenses',
    method: 'get',
    params: query
  })
}

export function fetchExpenses(id) {
  return request({
    baseURL: baseURL,
    url: `/api/Expenses/${id}`,
    method: 'get'
  })
}

export function createExpenses(data) {
  return request({
    baseURL: baseURL,
    url: '/api/Expenses/create',
    method: 'post',
    data
  })
}

export function updateExpenses(data) {
  return request({
    baseURL: baseURL,
    url: '/api/Expenses/update',
    method: 'post',
    data
  })
}

export function deleteExpenses(id) {
  return request({
    baseURL: baseURL,
    url: `/api/Expenses/delete/${id}`,
    method: 'post',
    data: { 'id': id }
  })
}

