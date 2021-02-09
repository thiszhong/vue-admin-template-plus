import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/vue-admin-template-plus/table/list',
    method: 'get',
    params
  })
}