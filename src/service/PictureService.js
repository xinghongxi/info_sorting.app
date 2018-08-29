import request from '@/utils/request'

class PictureService{
  async uploadPictureList(staffId,classId,pageNum,pageSize){
    return request({
      url:'/picture/list/upload/pictures?staffId=' + staffId + '&classId=' + classId + '&pageNum=' + pageNum + '&pageSize=' + pageSize,
      method:'get'
    })
  }
}

export default new PictureService();
