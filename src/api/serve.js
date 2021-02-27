import request from '@/utils/request'
import qs from 'qs'

export function getLists(data) {
    return request({
        url: 'apply/criterion',
        method: 'post',
        data: qs.stringify(data)
    })
}