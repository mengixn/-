import request from '@/utils/request'
import qs from 'qs'
// 我的疑问
export function myQuesion(data) {
  return request({
    url: 'userOperation/addDoubt',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 消息提醒
export function notice(data) {
  return request({
    url: 'user/msgList',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 消息已读
export function read(data) {
  return request({
    url: 'user/xxyd',
    method: 'post',
    data: qs.stringify(data)
  })
}
