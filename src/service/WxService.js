import request from '@/utils/request'

class WxService{

  async wxConfigInfo(){
    return request({
      url:'/weixin/config/info',
      method:'get'
    })
  }
}

export default new WxService();
