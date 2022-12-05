import request from '@/utils/request'

export function getDomains(params) {
  return request({
    url: 'casbin/all_domains',
    method: 'get',
    params
  })
}

export function deleteDomains(params) {
  return request({
    url: '/casbin/domain/' + params,
    method: 'delete',
    params
  })
}

export function addDomains(data) {
  return request({
    url: '/casbin/domain',
    method: 'post',
    data
  })
}
