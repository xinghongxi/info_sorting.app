import request from '@/utils/request'
import localdb from '@/localstore'

class LoginService {

	login (username,password) {
	  const params = {
	    username,
	    password,
	    grant_type:'password',
      scope:'weixin',
      client_id:process.env.CLIENT_ID,
      client_secret:process.env.CLIENT_SECRET
	  }
	  return request({
	    url: '/oauth/token',
	    method: 'post',
	    params
	  })
	}

	//获取当前登录人
	findLoginStaff () {
		return request({
			url: '/user/info'
		})
	}

	getCurrentLoginStaff () {
		return localdb.getValue('loginStaff');
	}
  setAccessToken(access_token) {
    localdb.setValue('access_token',access_token)
  }
  getAccessToken() {
    return localdb.getValue('access_token');
  }

	refreshRemoteToken(refreshToken) {
		let postUrl = '/oauth/token'
		let params = {
			grant_type:'refresh_token',
			refresh_token:refreshToken,
      scope:'weixin',
      // client_id:'3017100001',
      // client_secret:'Oa8re_a0ocUi'
      client_id:'2017100001',
      client_secret:'test0011'
		}
		return request({
		    url: postUrl,
		    method: 'post',
		    params
		 })
	}
	async saveAccessToken(refreshToken) {
    let refreshResult = await this.refreshRemoteToken(refreshToken);
    if (refreshResult.status == 200) {
      let auth = refreshResult.data;
      auth['login_time'] = Date.now();
      console.log(auth);
      localdb.setValue('loginAuth',auth);
      return auth;
    }
    return null;
  }
}

export default new LoginService()
