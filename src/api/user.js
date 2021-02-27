import request from '@/utils/request'
// import qs from 'qs'
// 登录
export function login(data) {
  return request({
    url: 'login',
    method: 'post',
    data
  })
}

// 登录
export function gwlogin(data) {
  return request({
    url: 'tlogin',
    method: 'post',
    data
  })
}

// 我的待办
export function todo(data) {
  return request({
    url: 'userOperation/backlog',
    method: 'post',
    data
  })
}

// 导师评语
export function pingyu(params) {
  return request({
    url: 'tutor/getcommon',
    method: 'post',
    params
  })
}
