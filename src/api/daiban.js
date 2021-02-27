import request from '@/utils/request'
import qs from 'qs'
// 登录
export function daiban(data) {
  return request({
    url: 'userOperation/backlog',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 待办节点数量
export function checkNum(data) {
  return request({
    url: 'userOperation/backlogCount',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 确认节点
export function confirmNode(data) {
  return request({
    url: 'userOperation/affirmJd',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 发表评价
export function publish(data) {
  return request({
    url: 'userOperation/getJdInfo',
    method: 'post',
    data: qs.stringify(data)
  })
}
