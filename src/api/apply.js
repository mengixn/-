import request from '@/utils/request'
import qs from 'qs'
// 申请流程列表
/**
 *
 * @param {Object} data
 */
export function process(data) {
  return request({
    url: 'apply/process',
    method: 'post',
    data
  })
}

// 申请流程节点
/**
 *
 * @param {Object} data
 */
export function processNode(data) {
  return request({
    url: 'apply/processNode',
    method: 'post',
    data
  })
}
// 标准流程接口
/**
 *
 * @param {Object} data
 */
export function criterion(data) {
  return request({
    url: 'apply/criterion',
    method: 'post',
    data
  })
}
