import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/vue-admin-template/table/list',
    method: 'get',
    params
  })
}

export function getUsers(params) {
  return request({
    url: '/health',
    method: 'get',
    params
  })
}
