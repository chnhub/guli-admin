import request from '@/utils/request'

export function getTeacherListPage(teacherQO){
    return request({
        url:`/eduservice/teacher/page`,
        method: 'post',
        data: teacherQO,
    });
}

//新增讲师
export function addTeacher(teacherDTO){
    return request({
        url: '/eduservice/teacher/create',
        method: 'post',
        data: teacherDTO
    });
}

export function editTeacher(){

}
// 根据code删除教师
export function deleteTeacher(teacherCode){
    return request({
        url:`/eduservice/teacher/${teacherCode}`,
        method: 'delete',
    });
}

export default{
    deleteTeacher,
    addTeacher
}