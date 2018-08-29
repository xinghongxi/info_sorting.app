import request from '@/utils/request'

class SchoolService{
  //学校详情
  async schoolInfo(companyId){
    return request({
      url:'/school/get/school/message?companyId=' + companyId,
      method:'get'
    })
  }
  //修改学校信息
  async editSchoolInfo(companyId,companyName,userName,phone){
    var params = new URLSearchParams();
    params.append('companyId',companyId);
    params.append('companyName',companyName);
    params.append('userName',userName);
    params.append('phone',phone );
    return request({
      url:'/school/update',
      data:params,
      method:'post'
    })
  }
  //老师列表
  async teacherList(companyId){
    return request({
      url:'/school/teacher/list?companyId=' + companyId,
      method:'get'
    })
  }
  //学校班级列表
  async classList(companyId){
    return request({
      url:'/school/list/check/class?companyId=' + companyId,
      method:'get'
    })
  }

  //老师详情
  async teacherInfo(teacherId){
    return request({
      url:'/school/show/teacher/message?teacherId=' + teacherId,
      method:'get'
    })
  }
  //编辑老师
  async editTeacher(teacherId,teacherImg,teacherName,arrClassIds){
    var params = new URLSearchParams();
    params.append('teacherId',teacherId);
    params.append('teacherImg',teacherImg);
    params.append('teacherName',teacherName);
    params.append('arrClassIds',arrClassIds);
    return request({
      url:'/school/edit/teacher/message',
      data:params,
      method:'post'
    })
  }
  //检查账号是否存在
  async checkLoginAcount(loginAcount){
    return request({
      url:'/school/verify/phone?phone='+ loginAcount,
      method:'get'
    })
  }
  //添加老师
  async addTeacher(companyId,teacherImg,teacherName,loginAccount,pwd,arrClassIds){
    let param = {companyId:companyId,teacherImg:teacherImg,teacherName:teacherName,loginAccount:loginAccount,pwd:pwd,arrClassIds:arrClassIds};
    var params = new URLSearchParams();
    params.append('companyId',companyId);
    params.append('teacherImg',teacherImg);
    params.append('teacherName',teacherName);
    params.append('loginAccount',loginAccount );
    params.append('pwd',pwd);
    params.append('arrClassIds',arrClassIds);
    return request({
      url:'/school/add/teacher',
      data:params,
      method:'post'
    })
  }


}

export default new SchoolService();
