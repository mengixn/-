import request from '@/utils/request'
import qs from 'qs'
// 头部信息
export function getHeader(data) {
  return request({
    url: 'userOperation/getJdInfo',
    method: 'post',
    data: qs.stringify(data)
  })
}
// 热门b标签
export function getTag(data) {
  return request({
    url: 'userOperation/getRmbq',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 提交
export function getSubmit(data) {
  return request({
    url: 'userOperation/setComment',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 查看评价
export function checkRate(data) {
  return request({
    url: 'userOperation/getComment',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 修改评价
export function modifyRate(data) {
  return request({
    url: 'userOperation/setComment',
    method: 'post',
    data: qs.stringify(data)
  })
}
