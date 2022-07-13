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

export function editTeacher(id, teacherDTO){
    return request({
        url: `/eduservice/teacher/edit/${id}`,
        method: 'post',
        data: teacherDTO
    });
}
// 根据code删除教师
export function deleteTeacher(teacherCode){
    return request({
        url:`/eduservice/teacher/${teacherCode}`,
        method: 'delete',
    });
}
// 根据code获取教师
export function getTeacherByCode(teacherCode){
    // return getTeacherListPage({"teacherCode":teacherCode});
    return request({
        url:`/eduservice/teacher/${teacherCode}`,
        method: 'get',
    });
}


export default{
    deleteTeacher,
    addTeacher,
    getTeacherByCode,
    editTeacher,
    getTeacherListPage
}
