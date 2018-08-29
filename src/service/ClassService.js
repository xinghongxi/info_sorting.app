import request from '@/utils/request'

class ClassService{
  classList(schoolId){
    return request({
      url:'/school/list/class?companyId=' + schoolId,
      method:'get'
    })
  };
  classListInfo(classId){
    return request({
      url:'/school/get/class/message?classId='+classId,
      method:'get'
    })
  };
  getGrade(){
    return request({
      url:'/school/list/grade',
      method:'get'
    })
  };
  getCalssType(){
    return request({
      url:'/school/list/calssType',
      method:'get'
    })
  };
  addCalssType(companyId,className,classType,grade){  //新增班级
    const params = {
      companyId,
      className,
      classType,
      grade
    };
    return request({
      url:'/school/add/class',
      method:'post',
      params
    })
  };
  untReatedImg(schoolId,classId,staffId){ //待分拣
    return request({
      url:'/picture/list/pictures?schoolId='+schoolId+'&classId='+classId+'&staffId='+staffId+'&pageSize='+10+'&flag='+ false,
      method:'get'
    })
  };
  samplePhoto(schoolId,classId){  //样本
    return request({
      url:'/picture/list/student/samples?schoolId='+schoolId+'&classId='+classId,
      method:'get'
    })
  };
  confirmImg(studentFeedId,staffId,studentId){ //待分拣照片确定
    return request({
      url:'/picture/determine/picture?studentFeedId='+studentFeedId+'&staffId='+staffId+'&studentId='+studentId,
      method:'get'
    })
  };
  passtodoImg(studentFeedId){  //待分拣照片点击叉子
      return request({
        url:'/picture/delete/picture?studentFeedId='+studentFeedId,
        method:'get'
      })
  };
  async getClassList(classId){  //点击处理家长登记获取学生列表
    return request({
      url:'/student/list/class/student?classId='+classId,
      method:'get'
    })
  };
  getStudentInfo(studentId){  //点击处理家长登记通过学生列表获取学生信息
    return request({
      url:'/student/get/student/info?studentId='+studentId,
      method:'get'
    })
  };
  judge(studentId,classId,flag){  //点击处理家长登记通过学生列表获取学生信息处理学生信息
    const params = {
      studentId,
      classId,
      flag
    };
    return request({
      url:'/student/audit/student',
      method:'post',
      params
    })
  };


  //分拣照片时的班级列表
  async sortClassList(teacherId){
    return request({
      url:'/student/get/class?teacherId=' + teacherId,
      method:'get'
    })
  }
}

export default new ClassService();
