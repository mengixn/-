import request from '@/utils/request'
import qs from 'qs'

export function getLists(data) {
  return request({
    url: 'userOperation/addAdvice',
    method: 'post',
    data: qs.stringify(data)
  })
}
