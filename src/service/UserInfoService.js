import request from '@/utils/request';

class UserInfoService{
  //获取个人详情
  async staffInfo(staffId){
    return request({
      url:'/staff/get/staff?staffId='+staffId,
      method:'get'
    })
  }
  //修改密码
  async changePassword(oldPassword,newPassword,staffId){
    return request({
      url:'/staff/password/update?oldPassword=' + oldPassword + '&newPassword=' + newPassword + '&staffId=' + staffId,
      method:'get'
    })
  }
  //修改个人信息
  async changeInfo(img,nickname,staffId){
    return request({
      url:'/staff/staff/update?userImg=' + img + '&nickName=' + nickname + '&staffId=' + staffId,
      method:'get'
    })
  }
  //上传图片
  async uploadImage(formData){
    return request({
      url:'/picture/pic/upload',
      data:formData,
      method:'post'
    })
  }
}

export default new UserInfoService()
