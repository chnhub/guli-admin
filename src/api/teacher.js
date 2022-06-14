import request from '@/utils/request'

export function getTeacherListPage(teacherQO){
    return request({
        url:`/eduservice/teacher/page`,
        method: 'post',
        data: teacherQO,
    });
}

export function editTeacher(){

}

export function deleteTeacher(){

}