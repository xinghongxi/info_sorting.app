/* eslint-disable */
import loginDao from '@/service/LoginDao'
const request = require('request');
import loginService from '@/service/LoginService'

function refreshRemoteToken(accessToken, refreshToken) {
	//+ '&access_token=' + accessToken
	let postUrl = process.env.BASE_API + '/oauth/token?grant_type=refresh_token'
	console.log(postUrl);
	let form = {
		refresh_token:refreshToken,
		client_id:process.env.CLIENT_ID,
	    client_secret:process.env.CLIENT_SECRET
	}
	return new Promise( (resolve, reject) => {
		request.post(
			{
				url:postUrl,
				formData: form
			},
			function (err,resp,body){
				if (err) {
					return reject(err)
				}
				resolve(JSON.parse(body))
			}
		)
	})
}
async function getLoginAccessToken(loginAccount) {
	//检查本地的AccessToken 是否过期
	//let login = await loginDao.findLoginToken(loginAccount)
	let currentStaff = loginService.getCurrentLoginStaff();
  	let currentAuth = loginService.getCurrentLoginAuth();
	let loginTime = currentAuth.login_time
	let expires = currentAuth.expires_in
	let end = Date.now()
	let diff = (end - loginTime) / 1000
	let valid = diff < (expires - 30)
	// 如果还在有效期内，返回AccessToken
	if (valid) {
		console.log('有效的 Token ' + currentAuth.access_token)
		return currentAuth.access_token
	} else {
		//如果在一分钟以内，需要刷新Token
		let refreshToken = currentAuth.refresh_token
		let refreshResult = await refreshRemoteToken(currentAuth.access_token,refreshToken);
		if (refreshResult.access_token) {
			console.log('保存 Refresh Token ', refreshResult)
			await loginService.saveAccessToken(loginAccount,refreshResult)
			global.loginAuth = refreshResult
			return refreshResult.access_token;
		}
	}
	return null
}
export  default {getLoginAccessToken}
