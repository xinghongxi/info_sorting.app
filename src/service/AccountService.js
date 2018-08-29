import request from '@/utils/request';

class AccountService{
  async accountBlance(staffId){
    return request({
      url:'/staff/account?staffId=' + staffId,
      method:'get'
    })
  }
  async dealList(staffId,pageNum,pageSize){
    return request({
      url:'/staff/capitalDealList?staffId=' + staffId + '&pageNum=' + pageNum + '&pageSize=' + pageSize,
      method:'get'
    })
  }
}

export default new AccountService();
