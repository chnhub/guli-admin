import request from '@/utils/request'

export default{
    //1.添加课程信息
    addCourseInfo(courseInfo){
        return request({
            url: '/eduservice/course/addCourse',
            method: 'post',
            data: courseInfo
        });
    },
    getAllTeacher(){
      return request({
          url:`/eduservice/teacher/findAll`,
          method: 'post',
      });
    },
    //获取所有分类
    getAllSubject(){
      return request({
          url:`/eduservice/subject/getAllSubject`,
          method: 'get',
      });
    },
}
