import request from '@/utils/request'

class studentService{
  studentInfo(classId,schoolId){  //获取学生列表
    return request({
      url:'/school/list/student?schoolId='+schoolId+'&classId='+classId,
      method:'get'
    })
  };
  getStudentInfo(id){  //获取学生详情
    return request({
      url:'/student/get/student?studentId=' + id,
      method:'get'
    })
  };
  getStudentImg(id,pageNum){  //获取学生影像
    const params = {
      pageNum,
      studentId:id,
      pageSize:10,
    };
    return request({
      url:'/picture/sort',
      method:'post',
      params
    })
  };
  getStudentSample(studentId,companyId,classId,pageNum){  //获取影像样本
    return request({
      url:'/student/list/sample?classId='+classId+'&companyId='+companyId+'&studentId='+studentId+'&pageNum='+pageNum+'&pageSize='+10,
      method:'get'
    })
  };
  setStudentInfo(companyId,classId,name,phone,birthDate,id,studentSex){  //设置学生信息
    const params = {
      companyId,
      classId,
      name,
      phone,
      birthDate,
      id,
      studentSex
    };
    console.warn(params)
    return request({
      url:'/student/save',
      method:'post',
      params
    })
  };
  addStudentInfo(companyId,classId,name,phone,birthDate,studentSex){  //设置学生信息
    const params = {
      companyId,
      classId,
      name,
      phone,
      birthDate,
      studentSex
    };
    return request({
      url:'/student/save',
      method:'post',
      params
    })
  };
  checkPhone(phone){  //表单验证 监测手机号是否存在
    return request({
      url:'/school/verify/phone?phone='+phone,
      method:'get',
    })
  }
}

export default new studentService();
