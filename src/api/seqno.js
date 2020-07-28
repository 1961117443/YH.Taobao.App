import request from '@/utils/request'

const baseURL = process.env.VUE_APP_YH_Taobao_API

export function getSeqNo(query) {
  return request({
    baseURL: baseURL,
    url: '/api/SeqNo',
    method: 'get',
    params: query
  })
}
