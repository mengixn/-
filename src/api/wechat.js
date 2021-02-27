
import request from '@/utils/request'
import qs from 'qs'

export function getShare(data) {
  return request({
    url: 'wechat/share',
    method: 'get',
    params: data
  })
}
