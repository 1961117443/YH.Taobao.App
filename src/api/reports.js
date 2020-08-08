import request from '@/utils/request'

const baseURL = process.env.VUE_APP_YH_Taobao_API

export function fetchMonthSalesProfitList(query) {
  return request({
    baseURL: baseURL,
    url: '/api/report/sales-profit',
    method: 'get',
    params: query
  })
}
