import request from '@/utils/request'
import qs from 'qs'
// 登录
export function home(data) {
  return request({
    url: 'user',
    method: 'post',
    data: qs.stringify(data)
  })
}
