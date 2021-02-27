import request from '@/utils/request'
import qs from 'qs'
// 登录
export function contract(data) {
  return request({
    url: 'user/contracts',
    method: 'post',
    data: qs.stringify(data)
  })
}

// toFile
export function toFile(data) {
  return request({
    url: 'user/contractFiles',
    method: 'post',
    data: qs.stringify(data),
    type: 'arraybuffer'
  })
}
