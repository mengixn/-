import request from '@/utils/request'
import qs from 'qs'

export function getTutor(data) {
    return request({
        url: 'tutor/applyTeam',
        method: 'post',
        data: qs.stringify(data)
    })
}

export function getTutorDetails(data) {
    return request({
        url: 'tutor/nodeTeam',
        method: 'post',
        data: qs.stringify(data)
    })
}


// 导师评语
export function tutorComment(data) {
    return request({
        url: 'tutor/getcommon',
        method: 'post',
        data: qs.stringify(data)
    })
}