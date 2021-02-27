import request from '@/utils/request'
import qs from 'qs'
// 成绩
export function getGrade(data) {
  return request({
    url: 'score/fraction',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 学术背景
export function getXueshu(data) {
  return request({
    url: 'score/academic',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 实习经历
export function getShixi(data) {
  return request({
    url: 'score/internship',
    method: 'post',
    data: qs.stringify(data)
  })
}
