import request from '@/utils/request'
import qs from 'qs'

// 获取用户信息
export function logout(data) {
  return request({
    url: 'user/getUser',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 用户更新
export function update(data) {
  return request({
    url: 'user/updateUser',
    method: 'post',
    data: qs.stringify(data)
  })
}
